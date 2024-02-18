<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationAnswerResource;
use App\Http\Resources\ReservationResourceDashboard;
use App\Models\Reservation;
use App\Models\ReservationAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of Reservations
        $total = Reservation::query()->where('user_id', $user->id)->count();

        // Latest Reservations
        $latest = Reservation::query()->where('user_id', $user->id)->latest('created_at')->first();

        // Total Number of answers
        $totalAnswers = ReservationAnswer::query()
            ->join('reservations', 'reservation_answers.reservation_id', '=', 'reservations.id')
            ->where('reservations.user_id', $user->id)
            ->count();

        // Latest 5 answer
        $latestAnswers = ReservationAnswer::query()
            ->join('reservations', 'reservation_answers.reservation_id', '=', 'reservations.id')
            ->where('reservations.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('reservation_answers.*');

        return [
            'totalReservations' => $total,
            'latestReservation' => $latest ? new ReservationResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => ReservationAnswerResource::collection($latestAnswers)
        ];
    }
}
