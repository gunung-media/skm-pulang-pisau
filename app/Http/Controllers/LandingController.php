<?php

namespace App\Http\Controllers;

use App\Repositories\QuestionRepository;
use App\Repositories\RespondentRepository;
use App\Repositories\ResponseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __construct(
        protected QuestionRepository $questionRepository,
        protected RespondentRepository $respondentRepository,
        protected ResponseRepository $responseRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Landing/index', [
            'questions' => $this->questionRepository->getAll()
        ]);
    }

    public function store(Request $request)
    {
        $questions = $this->questionRepository->getActive();

        $request->validate([
            'name' => 'required',
            'gender' => 'required',
            'age' => 'required|integer',
            'education' => 'required',
            'jobs' => 'required',
            'type_of_service' => 'required',
            'response' => "required|array|min:{$questions->count()}"
        ]);

        DB::beginTransaction();
        try {
            $respondent = $this->respondentRepository->create($request->except('response'));
            $responses = $request->only('response')['response'];

            foreach ($responses as $response) {
                $this->responseRepository->create([...$response, 'respondent_id' => $respondent->id]);
            }
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response($th, status: 500);
        }
    }
}
