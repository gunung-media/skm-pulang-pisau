<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RespondentRepository;
use App\Repositories\ResponseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected RespondentRepository $respondentRepository,
        protected ResponseRepository $responseRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard/index');
    }

    public function getData(Request $request): array
    {
        $gender = $request->query('gender', 'Semua');
        $avgSatisfaction = $this->responseRepository->avgSatisfaction($gender);

        return [
            'avgSatisfaction' => $avgSatisfaction
        ];
    }
}
