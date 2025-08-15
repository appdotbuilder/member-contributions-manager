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
        Schema::create('expenditures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 15, 2)->comment('Expenditure amount');
            $table->date('expenditure_date')->comment('Date of expenditure');
            $table->string('category', 100)->comment('Expenditure category');
            $table->text('description')->comment('Description of the expenditure');
            $table->string('proof_file')->nullable()->comment('Path to proof file');
            $table->enum('status', ['approved', 'pending', 'rejected'])->default('approved');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index(['expenditure_date', 'category']);
            $table->index('created_by');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditures');
    }
};