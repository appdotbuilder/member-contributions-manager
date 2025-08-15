<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Notification>
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['dues_reminder', 'payment_received', 'expenditure_alert', 'general'];
        $type = $this->faker->randomElement($types);
        
        $titles = [
            'dues_reminder' => 'Payment Reminder',
            'payment_received' => 'Payment Confirmed',
            'expenditure_alert' => 'New Expenditure',
            'general' => 'Important Notice',
        ];
        
        $messages = [
            'dues_reminder' => 'Your monthly contribution is due soon. Please make your payment by the due date.',
            'payment_received' => 'We have received your payment. Thank you for contributing!',
            'expenditure_alert' => 'A new expenditure has been recorded for this month.',
            'general' => 'This is an important update regarding our organization.',
        ];
        
        return [
            'user_id' => User::factory(),
            'title' => $titles[$type],
            'message' => $messages[$type],
            'type' => $type,
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
            'sent_via_whatsapp' => $this->faker->boolean(20), // 20% chance of WhatsApp
            'sent_at' => $this->faker->optional(80)->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
        ]);
    }

    /**
     * Indicate that the notification was sent via WhatsApp.
     */
    public function whatsapp(): static
    {
        return $this->state(fn (array $attributes) => [
            'sent_via_whatsapp' => true,
            'sent_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}