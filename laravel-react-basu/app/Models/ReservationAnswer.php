<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationAnswer extends Model
{
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['reservation_id', 'start_date', 'end_date'];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
