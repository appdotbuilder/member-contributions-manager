<?php

use App\Http\Controllers\ContributionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenditureController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page with app showcase
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - shows different views for admin vs member
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin-only routes  
    Route::group(['middleware' => function ($request, $next) {
        if (!auth()->check()) {
            return redirect()->route('login');
        }
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }
        return $next($request);
    }], function () {
        
        // Member management
        Route::resource('members', MemberController::class);
        
        // Contribution management
        Route::resource('contributions', ContributionController::class);
        
        // Expenditure management
        Route::resource('expenditures', ExpenditureController::class);
    });
    
    // Routes accessible by both admin and members
    Route::controller(ContributionController::class)->group(function () {
        // Members can view their own contributions
        Route::get('/my-contributions', function () {
            $contributions = auth()->user()->contributions()->latest('due_date')->paginate(15);
            return Inertia::render('contributions/my-contributions', [
                'contributions' => $contributions,
            ]);
        })->name('my-contributions');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';