<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenditureRequest;
use App\Http\Requests\UpdateExpenditureRequest;
use App\Models\Expenditure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenditureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Expenditure::with('creator');
        
        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by date range
        if ($request->filled('date_from')) {
            $query->where('expenditure_date', '>=', $request->date_from);
        }
        
        if ($request->filled('date_to')) {
            $query->where('expenditure_date', '<=', $request->date_to);
        }
        
        $expenditures = $query->latest('expenditure_date')->paginate(15);
        
        return Inertia::render('expenditures/index', [
            'expenditures' => $expenditures,
            'categories' => Expenditure::getCategories(),
            'filters' => $request->only(['category', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('expenditures/create', [
            'categories' => Expenditure::getCategories(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenditureRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        
        Expenditure::create($data);
        
        return redirect()->route('expenditures.index')
            ->with('success', 'Expenditure recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expenditure $expenditure)
    {
        $expenditure->load('creator');
        
        return Inertia::render('expenditures/show', [
            'expenditure' => $expenditure,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expenditure $expenditure)
    {
        return Inertia::render('expenditures/edit', [
            'expenditure' => $expenditure,
            'categories' => Expenditure::getCategories(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenditureRequest $request, Expenditure $expenditure)
    {
        $expenditure->update($request->validated());
        
        return redirect()->route('expenditures.show', $expenditure)
            ->with('success', 'Expenditure updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expenditure $expenditure)
    {
        $expenditure->delete();
        
        return redirect()->route('expenditures.index')
            ->with('success', 'Expenditure deleted successfully.');
    }
}