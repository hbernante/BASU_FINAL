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
        Schema::create('reservation_question_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\ReservationQuestion::class, 'reservation_question_id');
            $table->foreignIdFor(\App\Models\ReservationAnswer::class, 'reservation_answer_id');
            $table->text('answer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_question_answers');
    }
};
