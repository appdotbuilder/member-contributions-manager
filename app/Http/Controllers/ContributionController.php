<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContributionRequest;
use App\Http\Requests\UpdateContributionRequest;
use App\Models\Contribution;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Contribution::with('user');
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by month
        if ($request->filled('month') && $request->filled('year')) {
            $query->whereMonth('due_date', $request->month)
                  ->whereYear('due_date', $request->year);
        }
        
        // Search by user name
        if ($request->filled('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }
        
        $contributions = $query->latest()->paginate(15);
        
        return Inertia::render('contributions/index', [
            'contributions' => $contributions,
            'filters' => $request->only(['status', 'month', 'year', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $members = User::members()->active()->orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('contributions/create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContributionRequest $request)
    {
        Contribution::create($request->validated());
        
        return redirect()->route('contributions.index')
            ->with('success', 'Contribution created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contribution $contribution)
    {
        $contribution->load('user');
        
        return Inertia::render('contributions/show', [
            'contribution' => $contribution,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contribution $contribution)
    {
        $members = User::members()->active()->orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('contributions/edit', [
            'contribution' => $contribution,
            'members' => $members,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContributionRequest $request, Contribution $contribution)
    {
        $contribution->update($request->validated());
        
        return redirect()->route('contributions.show', $contribution)
            ->with('success', 'Contribution updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contribution $contribution)
    {
        $contribution->delete();
        
        return redirect()->route('contributions.index')
            ->with('success', 'Contribution deleted successfully.');
    }


}