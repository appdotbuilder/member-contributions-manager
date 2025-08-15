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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'member'])->default('member')->after('password');
            $table->string('phone')->nullable()->after('role');
            $table->decimal('balance', 15, 2)->default(0)->after('phone')->comment('Current cash balance for members');
            $table->boolean('is_active')->default(true)->after('balance')->comment('Whether the user is active');
            
            // Add indexes for performance
            $table->index('role');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phone', 'balance', 'is_active']);
        });
    }
};