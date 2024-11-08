<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RespondentRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function getRespondents(): LengthAwarePaginator
    {
        return $this->respondentRepository->paginate(10);
    }

    public function show(string $id): void
    {
        //
    }
}
