<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\SysParamValues;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class LabelController extends Controller
{
    public function getPiped($arr){
        $arr = explode($arr, '|');
        return $arr;
    }

    public function setPiped($values, $spv_id, $value){
//        print_r($values);


        $values = explode('|', $values);
        if(!in_array($value, $values)) {
            $values[] = $value;
        }

        $values = implode('|', $values);

        return $values;
    }

    public function apply($post_id)
    {
        $user_id = request()->user_id;

            $test = DB::table('param as p')
                    ->join('doc_param as dp', DB::raw('p.doc_param_id'),'=', DB::raw('dp.id'))
                    ->where('p.name', '=', 'applied')
                    ->select(DB::raw('dp.id as docParamId, dp.name as docParamName, dp.position as docParamPosition, dp.doc_sub_type as docSubType, p.position as paramPosition, p.*'))
                    ->get();

            foreach($test as $row){
                if($row->docSubType == null){
                    $docType= '2';
                    $value  = $user_id;
                    $ref_id = $post_id;
                }else{
                    $docType= '1';
                    $value  = $post_id;
                    $ref_id = $user_id;
                }

                $spv_id = DB::table('sys_param_values')
                            ->where('doc_type', '=', $docType)
                            ->where('ref_id', '=', $ref_id)
                            ->where('param_id', '=', $row->id)
                            ->value('id');

                $insert =  ['doc_type' => $docType, 'ref_id' => $ref_id, 'param_id' => $row->id, 'value_short'=>$value];

                if($spv_id){
                    $spv_values = DB::table('sys_param_values')->where('id', '=',$spv_id)->value('value_short');
                    $insert['value_short'] = $this->setPiped($spv_values,$spv_id,$value);

                    DB::table('sys_param_values')->where('id','=',$spv_id)->update($insert);
                }else{
                    DB::table('sys_param_values')->insert($insert);
                }

            }








    }

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
    public function store(Request $request)
    {
        //
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
