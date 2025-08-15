<?php

namespace Database\Seeders;

use App\Models\Contribution;
use App\Models\Expenditure;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ContributionManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+1234567890',
            'balance' => 0,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create test member
        $testMember = User::create([
            'name' => 'Test Member',
            'email' => 'member@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
            'phone' => '+0987654321',
            'balance' => 150.00,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create additional members
        $members = User::factory()->count(15)->member()->create();
        
        // Add test member to members collection for consistency
        $allMembers = $members->push($testMember);

        // Create contributions for all members
        foreach ($allMembers as $member) {
            // Create contributions for the last 6 months
            for ($i = 0; $i < 6; $i++) {
                $dueDate = now()->subMonths($i)->startOfMonth()->addDays(15);
                $isPaid = $i > 0 || fake()->boolean(80); // Current month 80% paid, past months 100% paid
                
                Contribution::create([
                    'user_id' => $member->id,
                    'amount' => fake()->randomElement([50.00, 75.00, 100.00, 125.00]),
                    'due_date' => $dueDate,
                    'paid_date' => $isPaid ? $dueDate->copy()->addDays(fake()->numberBetween(0, 10)) : null,
                    'status' => $isPaid ? 'paid' : ($dueDate->isPast() ? 'overdue' : 'pending'),
                    'notes' => fake()->optional(30)->sentence(),
                    'payment_proof' => $isPaid && fake()->boolean(70) ? 'proofs/' . fake()->uuid . '.jpg' : null,
                ]);
            }
        }

        // Create expenditures
        for ($i = 0; $i < 20; $i++) {
            Expenditure::create([
                'created_by' => $admin->id,
                'amount' => fake()->randomFloat(2, 10, 500),
                'expenditure_date' => fake()->dateTimeBetween('-3 months', 'now'),
                'category' => fake()->randomElement(Expenditure::getCategories()),
                'description' => fake()->sentence(8),
                'proof_file' => fake()->boolean(60) ? 'expenditures/' . fake()->uuid . '.pdf' : null,
                'status' => fake()->randomElement(['approved', 'pending']),
            ]);
        }

        // Create notifications for members
        foreach ($allMembers as $member) {
            // Create 2-5 notifications per member
            $notificationCount = fake()->numberBetween(2, 5);
            
            for ($i = 0; $i < $notificationCount; $i++) {
                $type = fake()->randomElement(['dues_reminder', 'payment_received', 'expenditure_alert', 'general']);
                
                $titles = [
                    'dues_reminder' => 'Monthly Contribution Due',
                    'payment_received' => 'Payment Confirmed',
                    'expenditure_alert' => 'New Organization Expense',
                    'general' => 'Important Update',
                ];
                
                $messages = [
                    'dues_reminder' => 'Your monthly contribution of $' . fake()->numberBetween(50, 150) . ' is due on ' . now()->addDays(5)->format('M d, Y') . '. Please make your payment on time.',
                    'payment_received' => 'Thank you! We have received your payment of $' . fake()->numberBetween(50, 150) . ' on ' . now()->subDays(2)->format('M d, Y') . '.',
                    'expenditure_alert' => 'A new expense of $' . fake()->numberBetween(50, 300) . ' has been recorded for ' . fake()->randomElement(['office supplies', 'utilities', 'maintenance', 'events']) . '.',
                    'general' => 'Please note our new meeting schedule. All members are requested to attend the monthly meeting on ' . now()->addDays(10)->format('M d, Y') . '.',
                ];

                Notification::create([
                    'user_id' => $member->id,
                    'title' => $titles[$type],
                    'message' => $messages[$type],
                    'type' => $type,
                    'is_read' => fake()->boolean(40),
                    'sent_via_whatsapp' => fake()->boolean(30),
                    'sent_at' => fake()->optional(90)->dateTimeBetween('-2 weeks', 'now'),
                ]);
            }
        }

        $this->command->info('Sample data created successfully!');
        $this->command->info('Admin credentials: admin@example.com / password');
        $this->command->info('Member credentials: member@example.com / password');
    }
}