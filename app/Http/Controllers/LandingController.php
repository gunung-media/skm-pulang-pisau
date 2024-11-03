<?php

namespace App\Http\Controllers;

use App\Repositories\QuestionRepository;
use App\Repositories\RespondentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __construct(
        protected QuestionRepository $questionRepository,
        protected RespondentRepository $respondentRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Landing/index', [
            'questions' => $this->questionRepository->getAll()
        ]);
    }

    public function store() {}
}
