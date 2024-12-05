<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\ServiceRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ServiceController extends Controller
{
    public function __construct(
        protected ServiceRepository $serviceRepository
    ) {}

    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/Service/index', [
            'services' => $this->serviceRepository->getAll()
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Service/Form/index');
    }

    public function store(Request $request): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->serviceRepository->create($request->all());
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function edit(string $id): InertiaResponse
    {
        return Inertia::render('Admin/Service/Form/index', [
            'service' => $this->serviceRepository->findById($id)
        ]);
    }

    public function update(Request $request, string $id): Response|RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->serviceRepository->update($id, $request->all());
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
            $this->serviceRepository->delete($id);
            DB::commit();
            return response(status: 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }
}
