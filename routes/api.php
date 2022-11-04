<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UsersController;

Route::post('/login', [UsersController::class, 'login']);
Route::get('/check-auth', [UsersController::class, 'checkAuth'])->middleware('auth:api');

Route::get('/posts', [PostsController::class, 'index']);
Route::get('/posts/{id}', [PostsController::class, 'single'])->middleware('auth:api');
Route::post('/posts', [PostsController::class, 'create'])->middleware('auth:api');
Route::put('/posts/{id}', [PostsController::class, 'edit'])->middleware('auth:api');
Route::delete('/posts/{id}', [PostsController::class, 'delete'])->middleware('auth:api');
