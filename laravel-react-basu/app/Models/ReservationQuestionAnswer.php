<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['reservation_question_id', 'reservation_answer_id', 'answer'];
}
