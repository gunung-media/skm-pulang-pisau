<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RespondentRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RespondentController extends Controller
{
    public function __construct(
        protected RespondentRepository $respondentRepository
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Respondent/index');
    }

    public function getRespondents(Request $request): LengthAwarePaginator
    {
        $duration = $request->get('duration');

        switch ($duration) {
            case '1h':
                return $this->respondentRepository->paginateByHour();
            case '24h':
                return $this->respondentRepository->paginateByDay();
            case '1w':
                return $this->respondentRepository->paginateByWeek();
            case '1m':
                return $this->respondentRepository->paginateByMonth();
            default:
                return $this->respondentRepository->paginate(10);
        }
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/Respondent/Detail/index', [
            'respondent' => $this->respondentRepository->findById($id)
        ]);
    }
}
