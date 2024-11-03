<?php

use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;


Route::prefix('/')->name('landing')->group(function () {
    Route::get('', [LandingController::class, 'index']);
});
