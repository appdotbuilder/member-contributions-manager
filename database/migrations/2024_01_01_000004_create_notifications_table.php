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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title', 255)->comment('Notification title');
            $table->text('message')->comment('Notification content');
            $table->enum('type', ['dues_reminder', 'payment_received', 'expenditure_alert', 'general'])->default('general');
            $table->boolean('is_read')->default(false)->comment('Whether the notification has been read');
            $table->boolean('sent_via_whatsapp')->default(false)->comment('Whether sent via WhatsApp');
            $table->timestamp('sent_at')->nullable()->comment('When the notification was sent');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index(['user_id', 'is_read']);
            $table->index(['type', 'sent_at']);
            $table->index('sent_via_whatsapp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};