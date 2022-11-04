<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Posts;

class PostsController extends Controller
{
    public function index(){
        return Posts::latest()->with('user')->get();
    }
    public function single($id){
        return Posts::with('user')->find($id);
    }
    public function create(Request $request){
        Posts::create($request->all());
        return 'post successfully created';
    }
    public function edit($id, Request $request){
        Posts::find($id)->update($request->all());
        return 'post successfully updated';
    }
    public function delete($id){
        Posts::find($id)->delete();
        return 'post successfully deleted';
    }
}
