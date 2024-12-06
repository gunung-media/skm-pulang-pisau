<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionTypeRepository;
use App\Repositories\ResponseRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected QuestionTypeRepository $questionTypeRepository,
        protected ResponseRepository $responseRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Report/index', [
            'questionTypes' => $this->questionTypeRepository->getAll(),
        ]);
    }

    public function data(Request $request): JsonResponse
    {
        $data = $this->responseRepository->findByAttributesWhereBetween(
            $request->only('question_type_id'),
            $request->only(['start_date', 'end_date']),
            paginate: true
        );

        return response()->json([
            'data' => $data
        ]);
    }
}
