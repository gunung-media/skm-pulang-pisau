<?php

use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;


Route::prefix('/')->name('landing')->group(function () {
    Route::get('', [LandingController::class, 'index']);
    Route::post('', [LandingController::class, 'store'])->name('.submit');
});

Route::prefix('/admin')->name('admin.')->namespace('App\Http\Controllers\Admin')->group(function () {
    Route::group(['middleware' => 'guest'], function () {
        Route::get('/login', 'LoginController@index')->name('login');
        Route::post('/login', 'LoginController@login')->name('login');
    });

    Route::group(['middleware' => 'auth'], function () {
        Route::get('/', 'DashboardController')->name('dashboard');
        Route::resource('question', 'QuestionController');
    });
});
