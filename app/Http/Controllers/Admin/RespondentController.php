<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RespondentRepository;
use Inertia\Inertia;

class RespondentController extends Controller
{
    public function __construct(
        protected RespondentRepository $respondentRepository
    ) {}

    public function index()
    {
        $respondents = $this->respondentRepository->getAll();
        return Inertia::render('Admin/Respondent/index', [
            'respondents' => $respondents
        ]);
    }

    public function show(string $id)
    {
        //
    }
}
