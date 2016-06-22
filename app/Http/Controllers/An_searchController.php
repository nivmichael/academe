<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\an_search;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class An_searchController extends Controller
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

        if(isset(request()->post_id)){
            $post_id = request()->post_id;
        }else{
            $post_id =null;
        }
        $u_id   = request()->user['personal_information']['id'];
        $u_type = request()->user['personal_information']['subtype'];

        $an_search = new An_search();
        $an_search ->u_id   = $u_id;
        $an_search ->u_type = $u_type;
        $an_search->post_id = $post_id;
        $an_search->save();

        return response()->json($an_search);
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
