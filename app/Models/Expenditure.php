<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Expenditure
 *
 * @property int $id
 * @property int $created_by
 * @property float $amount
 * @property \Illuminate\Support\Carbon $expenditure_date
 * @property string $category
 * @property string $description
 * @property string|null $proof_file
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereExpenditureDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereProofFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure approved()
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Expenditure currentMonth()
 * @method static \Database\Factories\ExpenditureFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Expenditure extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'created_by',
        'amount',
        'expenditure_date',
        'category',
        'description',
        'proof_file',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'expenditure_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that created the expenditure.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include approved expenditures.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include pending expenditures.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include current month expenditures.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrentMonth($query)
    {
        return $query->whereMonth('expenditure_date', now()->month)
                    ->whereYear('expenditure_date', now()->year);
    }

    /**
     * Get common expenditure categories.
     *
     * @return array<string>
     */
    public static function getCategories(): array
    {
        return [
            'Operations',
            'Maintenance',
            'Events',
            'Utilities',
            'Supplies',
            'Emergency',
            'Other',
        ];
    }
}