<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\An_open_file;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class An_open_fileController extends Controller
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
        $user = request() ->user['user']['personal_information'];
        $post = request() ->post['postInfo'];
        if($user['subtype'] == 'employer'){
            //when employer sees a jobseeker after seeing system matches


        }else{
            //when a jobseeker looks at a job

            $u_type         = $user['education_status'];
            $file_id        = $post['id'];
            $file_type      = 'post';
        }
            $u_id      = $user['id'];

        $an_of             = new An_open_file();
        $an_of ->u_id      = $u_id;
        $an_of ->u_type    = $u_type;
        $an_of ->file_id   = $file_id;
        $an_of ->file_type = $file_type;

        $an_of ->save();

        return response()->json($an_of);
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
