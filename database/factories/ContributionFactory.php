<?php

namespace Database\Factories;

use App\Models\Contribution;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contribution>
 */
class ContributionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Contribution>
     */
    protected $model = Contribution::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dueDate = $this->faker->dateTimeBetween('-3 months', '+2 months');
        $isPaid = $this->faker->boolean(70); // 70% chance of being paid
        $status = $isPaid ? 'paid' : ($dueDate < now() ? 'overdue' : 'pending');
        
        return [
            'user_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'due_date' => $dueDate,
            'paid_date' => $isPaid ? $this->faker->dateTimeBetween($dueDate, 'now') : null,
            'status' => $status,
            'notes' => $this->faker->optional(30)->sentence(),
            'payment_proof' => $isPaid && $this->faker->boolean(50) ? 'proofs/' . $this->faker->uuid . '.jpg' : null,
        ];
    }

    /**
     * Indicate that the contribution is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_date' => $this->faker->dateTimeBetween($attributes['due_date'], 'now'),
            'payment_proof' => $this->faker->boolean(80) ? 'proofs/' . $this->faker->uuid . '.jpg' : null,
        ]);
    }

    /**
     * Indicate that the contribution is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_date' => null,
            'payment_proof' => null,
        ]);
    }

    /**
     * Indicate that the contribution is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'overdue',
            'due_date' => $this->faker->dateTimeBetween('-2 months', '-1 day'),
            'paid_date' => null,
            'payment_proof' => null,
        ]);
    }
}