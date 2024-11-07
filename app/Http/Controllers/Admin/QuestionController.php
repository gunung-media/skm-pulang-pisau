<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class QuestionController extends Controller
{
    public function __construct(
        protected QuestionRepository $questionRepository
    ) {}

    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/Question/index', [
            'questions' => $this->questionRepository->getAll()
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Question/Form/index');
    }

    public function store(Request $request): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->questionRepository->create($request->all());
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function edit(string $id): InertiaResponse
    {
        return Inertia::render('Admin/Question/Form/index', [
            'question' => $this->questionRepository->findById($id)
        ]);
    }

    public function update(Request $request, string $id): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->questionRepository->update($id, $request->all());
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function destroy(string $id): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->questionRepository->delete($id);
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }
}
