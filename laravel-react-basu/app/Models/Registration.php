<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $table = 'registration';

    public $timestamps = true;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'updated_at',
    ];
}
