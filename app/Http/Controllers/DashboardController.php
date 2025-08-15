<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use App\Models\Expenditure;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            return $this->adminDashboard();
        }
        
        return $this->memberDashboard($user);
    }

    /**
     * Display the admin dashboard.
     */
    protected function adminDashboard()
    {
        // Calculate dashboard metrics
        $totalMembers = User::members()->active()->count();
        $totalCash = User::sum('balance');
        $monthlyIncome = Contribution::paid()->currentMonth()->sum('amount');
        $monthlyExpenses = Expenditure::approved()->currentMonth()->sum('amount');
        
        // Recent activities
        $recentContributions = Contribution::with('user')
            ->latest()
            ->limit(5)
            ->get();
            
        $recentExpenditures = Expenditure::with('creator')
            ->latest()
            ->limit(5)
            ->get();
            
        // Members with arrears
        $membersInArrears = User::members()
            ->whereHas('contributions', function ($query) {
                $query->where('status', 'overdue');
            })
            ->withCount(['contributions as overdue_count' => function ($query) {
                $query->where('status', 'overdue');
            }])
            ->limit(10)
            ->get();

        return Inertia::render('admin-dashboard', [
            'stats' => [
                'total_members' => $totalMembers,
                'total_cash' => $totalCash,
                'monthly_income' => $monthlyIncome,
                'monthly_expenses' => $monthlyExpenses,
                'net_cash_flow' => $monthlyIncome - $monthlyExpenses,
            ],
            'recent_contributions' => $recentContributions,
            'recent_expenditures' => $recentExpenditures,
            'members_in_arrears' => $membersInArrears,
        ]);
    }

    /**
     * Display the member dashboard.
     */
    protected function memberDashboard(User $user)
    {
        // Current month contribution
        $currentContribution = Contribution::where('user_id', $user->id)
            ->currentMonth()
            ->first();
            
        // Recent contributions history
        $contributionHistory = Contribution::where('user_id', $user->id)
            ->orderBy('due_date', 'desc')
            ->limit(10)
            ->get();
            
        // Recent expenditures
        $recentExpenditures = Expenditure::approved()
            ->with('creator')
            ->latest()
            ->limit(5)
            ->get();
            
        // Unread notifications
        $notifications = Notification::where('user_id', $user->id)
            ->unread()
            ->recent()
            ->limit(5)
            ->get();

        return Inertia::render('member-dashboard', [
            'current_contribution' => $currentContribution,
            'contribution_history' => $contributionHistory,
            'recent_expenditures' => $recentExpenditures,
            'notifications' => $notifications,
            'user_balance' => $user->balance,
        ]);
    }
}