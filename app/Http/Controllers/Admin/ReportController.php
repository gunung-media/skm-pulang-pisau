<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ReportExport;
use App\Http\Controllers\Controller;
use App\Repositories\QuestionRepository;
use App\Repositories\RespondentRepository;
use App\Repositories\ResponseRepository;
use App\Repositories\ServiceRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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


        $report = $this->responseRepository->report(
            $request->has('service_id') && $request->service_id != -1 ?  $request->only('service_id') : [],
            $request->only(['start_date', 'end_date']),
        );

        return response()->json([
            'data' => $data,
            'score' => number_format($report['sumIndex'] * 25, 2),
            'counting' => $report['counting']
        ]);
    }

    public function download(Request $request): BinaryFileResponse
    {
        //TODO: Usage of $request
        return Excel::download(new ReportExport, 'report_skm.xlsx');
    }
}
