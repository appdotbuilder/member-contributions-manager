<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 15, 2)->comment('Contribution amount');
            $table->date('due_date')->comment('When the contribution is due');
            $table->date('paid_date')->nullable()->comment('When the contribution was paid');
            $table->enum('status', ['pending', 'paid', 'overdue'])->default('pending');
            $table->text('notes')->nullable()->comment('Additional notes or description');
            $table->string('payment_proof')->nullable()->comment('Path to payment proof file');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index(['user_id', 'due_date']);
            $table->index(['status', 'due_date']);
            $table->index('paid_date');
            $table->unique(['user_id', 'due_date'], 'unique_user_monthly_contribution');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contributions');
    }
};