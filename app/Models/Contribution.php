<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Contribution
 *
 * @property int $id
 * @property int $user_id
 * @property float $amount
 * @property \Illuminate\Support\Carbon $due_date
 * @property \Illuminate\Support\Carbon|null $paid_date
 * @property string $status
 * @property string|null $notes
 * @property string|null $payment_proof
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution wherePaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution wherePaymentProof($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution paid()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution overdue()
 * @method static \Illuminate\Database\Eloquent\Builder|Contribution currentMonth()
 * @method static \Database\Factories\ContributionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Contribution extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'amount',
        'due_date',
        'paid_date',
        'status',
        'notes',
        'payment_proof',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the contribution.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include paid contributions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Scope a query to only include pending contributions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include overdue contributions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue');
    }

    /**
     * Scope a query to only include current month contributions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrentMonth($query)
    {
        return $query->whereMonth('due_date', now()->month)
                    ->whereYear('due_date', now()->year);
    }

    /**
     * Check if the contribution is overdue.
     *
     * @return bool
     */
    public function isOverdue(): bool
    {
        return $this->status !== 'paid' && $this->due_date->isPast();
    }

    /**
     * Mark the contribution as paid.
     *
     * @return bool
     */
    public function markAsPaid(): bool
    {
        return $this->update([
            'status' => 'paid',
            'paid_date' => now(),
        ]);
    }
}