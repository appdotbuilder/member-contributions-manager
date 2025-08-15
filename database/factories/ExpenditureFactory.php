<?php

namespace Database\Factories;

use App\Models\Expenditure;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expenditure>
 */
class ExpenditureFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Expenditure>
     */
    protected $model = Expenditure::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = Expenditure::getCategories();
        
        return [
            'created_by' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 5, 1000),
            'expenditure_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'category' => $this->faker->randomElement($categories),
            'description' => $this->faker->sentence(6),
            'proof_file' => $this->faker->boolean(60) ? 'expenditures/' . $this->faker->uuid . '.pdf' : null,
            'status' => $this->faker->randomElement(['approved', 'pending', 'rejected']),
        ];
    }

    /**
     * Indicate that the expenditure is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the expenditure is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}