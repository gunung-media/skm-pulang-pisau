<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionTypeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class QuestionTypeController extends Controller
{
    public function __construct(
        protected QuestionTypeRepository $questionTypeRepository
    ) {}

    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/QuestionType/index', [
            'questionTypes' => $this->questionTypeRepository->getAll()
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/QuestionType/Form/index');
    }

    public function store(Request $request): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->questionTypeRepository->create($request->all());
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function edit(string $id): InertiaResponse
    {
        return Inertia::render('Admin/QuestionType/Form/index', [
            'questionType' => $this->questionTypeRepository->findById($id)
        ]);
    }

    public function update(Request $request, string $id): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->questionTypeRepository->update($id, $request->all());
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
            $this->questionTypeRepository->delete($id);
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }
}
