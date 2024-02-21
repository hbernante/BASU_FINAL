<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location; // Import the Location model

class LocationController extends Controller
{
    // Method to update user's live location
    public function updateLocation(Request $request)
    {
        // Validate request data
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        // Update or create the user's location
        $location = Location::updateOrCreate(
            ['user_id' => auth()->id()], // Assuming user_id is stored in the locations table
            ['latitude' => $request->latitude, 'longitude' => $request->longitude]
        );

        return response()->json(['message' => 'Location updated successfully']);
    }

    // Method to get user's live location
    public function getLocation()
    {
        // Retrieve the user's location
        $location = Location::where('user_id', auth()->id())->first(); // Assuming user_id is stored in the locations table

        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        return response()->json($location);
    }
}
