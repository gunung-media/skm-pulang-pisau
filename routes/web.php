<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/static_data', [ApiController::class, 'getStaticData'])->name('api.static_data');

Route::prefix('/')->name('landing')->group(function () {
    Route::get('', [LandingController::class, 'index']);
    Route::post('', [LandingController::class, 'store'])->name('.submit');
});

Route::prefix('/admin')->name('admin.')->namespace('App\Http\Controllers\Admin')->group(function () {
    Route::group(['middleware' => 'guest'], function () {
        Route::get('/login', 'LoginController@index')->name('login');
        Route::post('/login', 'LoginController@login')->name('login.post');
    });

    Route::group(['middleware' => 'auth'], function () {
        Route::get('/', 'DashboardController@index')->name('dashboard');
        Route::get('api/dashboard', 'DashboardController@getData')->name('dashboard.get');
        Route::resource('question', 'QuestionController')->except('show');
        Route::resource('questionType', 'QuestionTypeController')->except('show');
        Route::resource('service', 'ServiceController')->except('show');
        Route::resource('respondent', 'RespondentController')->only(['index', 'show']);
        Route::get('api/respondent', 'RespondentController@getRespondents')->name('respondent.get');


        Route::prefix('/report')->name('report.')->group(function () {
            Route::get('/', 'ReportController@index')->name('index');
        });
    });
});
