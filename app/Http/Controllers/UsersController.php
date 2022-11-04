<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => ['string', 'email'],
            'password' => 'string'
        ]);
        if(!Auth::attempt($request->all()))
            return response('Unable to login', 401);

        $token = Auth::user()->createToken('authToken')->accessToken;

        return ['token' => $token, 'user' => Auth::user()];
    }

    public function checkAuth(){
        return 'weeeeee';
    }
}
