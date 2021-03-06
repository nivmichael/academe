<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\An_apply;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class An_applyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {


        $post_id   = request()->post_id;
        $u_id      = request()->user['id'];
        $u_type    = request()->user['education_status'];
        $posted_by = request()->postedBy;

        $isApplied = DB::table('an_apply')->where('u_id','=',$u_id)
                                          ->where('u_type','=',$u_type)
                                          ->where('post_id','=',$post_id)
                                          ->where('posted_by','=',$posted_by)->value('id');
        $isApplied = An_apply::find($isApplied);
        if($isApplied){
            $an_apply = $isApplied;
        }else{
            $an_apply = new An_apply();
        }

        $an_apply ->u_id      = $u_id;
        $an_apply ->u_type    = $u_type;
        $an_apply ->post_id   = $post_id;
        $an_apply ->posted_by = $posted_by;

        $an_apply ->save();

        return response()->json($an_apply);
    }

    public function checkApplication() {

        $user_id = request()->user;
        $post_id = request()->post;

//        $applied = DB::table('an_apply')->where('u_id', $user_id)->where('post_id', $post_id)->get();
        return response()->json([$user_id,$post_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
