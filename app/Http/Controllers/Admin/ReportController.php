<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionRepository;
use App\Repositories\RespondentRepository;
use App\Repositories\ResponseRepository;
use App\Repositories\ServiceRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ServiceRepository $serviceRepository,
        protected QuestionRepository $questionRepository,
        protected RespondentRepository $respondentRepository,
        protected ResponseRepository $responseRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Report/index', [
            'services' => $this->serviceRepository->getAll(),
        ]);
    }

    public function data(Request $request): JsonResponse
    {
        $data = $this->responseRepository->findByAttributesWhereBetween(
            $request->has('service_id') && $request->service_id != -1 ?  $request->only('service_id') : [],
            $request->only(['start_date', 'end_date']),
            paginate: true
        );


        $forCounting = $this->responseRepository->findByAttributesWhereBetween(
            $request->has('service_id') && $request->service_id != -1 ?  $request->only('service_id') : [],
            $request->only(['start_date', 'end_date']),
        );

        $totalRespondent = $this->respondentRepository->count();
        $totalQuestion = $this->questionRepository->count();
        $perQuestionResponses = $forCounting->groupBy('question_id')->toArray();

        $counting = [];
        $sumIndex = 0;


        foreach ($perQuestionResponses as $key => $value) {
            $value = collect($value);
            $sumPerQuestion = $value->sum('answer');
            $averagePerQuestion = $sumPerQuestion / $totalRespondent;
            $indexPerQuestion = $averagePerQuestion / $totalQuestion;
            $counting[$key] = [
                'sum' => $sumPerQuestion,
                'average' => $averagePerQuestion,
                'index' => $indexPerQuestion
            ];
            $sumIndex += $indexPerQuestion;
        }

        return response()->json([
            'data' => $data,
            'score' => number_format($sumIndex * 25, 2),
            'counting' => $counting
        ]);
    }
}
