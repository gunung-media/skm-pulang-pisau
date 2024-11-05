<?php

use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/')->name('landing')->group(function () {
    Route::get('', [LandingController::class, 'index']);
    Route::post('', [LandingController::class, 'store'])->name('.submit');
});

Route::prefix('/admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard/index');
    });
});
