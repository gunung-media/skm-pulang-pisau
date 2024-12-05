<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionTypeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected QuestionTypeRepository $questionTypeRepository
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Report/index', [
            'questionTypes' => $this->questionTypeRepository->getAll()
        ]);
    }
}
