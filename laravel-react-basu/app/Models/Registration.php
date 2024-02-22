<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $table = 'registration';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
    ];
}
