<?php

namespace App\Http\Controllers;
use App\Models\Webuser;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function addUser(Request $req){

        $user = new Webuser;


        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = $req->input('password');
        $user->role = $req->input('role');
        $user->save();

        return $user;


    }


    function viewUser(){

        return Webuser::all();


    }

    function updateUser(Request $req, $id ){

            $user= Webuser::find($id);


            if(!$user){

                response()->json(['error'=>'User not Found']);


            }else{

                $user->name = $req->input('name');
                $user->email = $req->input('email');
                $user->password = $req->input('password');
                $user->role = $req->input('role');
                
                $user->save();
        

            }

            
    }



    function removeUser($id){

        
        $user= Webuser::find($id);


        if(!$user){

            response()->json(['error'=>'User not Found']);


        }else{

            $user->delete();

        }

    }
}