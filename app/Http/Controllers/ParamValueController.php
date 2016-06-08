<?php namespace App\Http\Controllers;


use DB;
use PDO;
use Response;
use Input;
use Schema;
use App\ParamType;
use App\Param;
use App\ParamValue;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ParamValueController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$values = DB::table('param_value')
		->get();
		
		return Response::json($values);
	}
	
	public function columnIndex()
	{
		
		$columns = Schema::getColumnListing('param_value');
		$columns = (object) $columns;
// 		
		// return Response::json(array($columns,$params));
		return Response::json($columns);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		
	  $all = Input::all();	
	  $all = $all['user'];
	  $array = array();	 
	  $paramValue=Input::all();
	  foreach($paramValue as $paramValueKey=>$paramValueValue){
	  	$value = Param::where('name','=',$paramValueKey)->first();	 		
	  	$array[$value['id']]=$paramValueValue;	 
	  }		 
	  $params=array();
	  foreach($array as $arrayKey=>$arrayValue){
	  	$param = ParamValue::find($all['id']);	 	
		if(!$param){			 	
			$param = new ParamValue();
	  	}
		$param->value = $all['value']; 
		$param->param_id = $all['param_id']; 
		
		$param->save();
		$params[]=$param;
	  }	
	  return Response::json($params);
	}

//$paramName, $doc_param_id, $is_post = false
	public function getAllOptionValues()
	{

		$param_values = DB::table('param_value')
							->select('param_value.id','param_value.param_id as paramId','param_value.parent_id','param_value.value','param.name as paramName','param.param_parent_id', 'param.modify')
							->leftJoin('param', 'param_value.param_id', '=', 'param.id')->get();



		foreach($param_values as $key => $value) {
			$option['id']			   = $value->id;
			$option['paramId']	       = $value->paramId;
			$option['parent_id'] 	   = $value->parent_id;
			$option['param_parent_id'] = $value->param_parent_id;
			$option['modify']    	   = $value->modify;
			$option['value']    	   = $value->value;
			$option['text']      	   = $value->value;
			$option['paramName'] 	   = $value->paramName;

			$paramOptions[$value->paramName][] = $option;
		}





		return response()->json($paramOptions);









//		//dd($doc_param_id);
//		$option = [];
//
//		$paramId = DB::table('param')->where('name',$paramName)->where('doc_param_id',$doc_param_id)->pluck('id');
//		if(!$paramId)
//		{
//			return Response::json(false);
//		}
//
//		if ($is_post){
//			$docParamName = DB::table('doc_param')->where('id',$doc_param_id)->pluck('name');
//			$user_doc_param_id = DB::table('doc_param')->where('name',$docParamName)->where('doc_type_id',1)->where('doc_sub_type','jobseeker')->pluck('id');
//			$paramId = DB::table('param')->where('name',$paramName)->where('doc_param_id',$user_doc_param_id)->pluck('id');
//
//		}

//		$values =  DB::table('param_value')->get();
//
//
//
//
//
//
//
//
//		foreach($values as $key => $value) {
//			$option['id'] = $value->id;
//			$option['parent_id'] = $value->parent_id;
//			$option['value'] = $value->value;
//			$option['text'] = $value->value;
//
//			$paramOptions[$key] = $option;
//		}
//		return Response::json($paramOptions);
//


//
//		$paramValues = DB::table('param_value')->where('param_id',$paramId)->lists('value');
//
//
//
//		if(!$paramValues){
//
//			return Response::json(false);
//		}else
//		{
//			foreach($paramValues as $key => $value) {
//				$id	= DB::table('param_value')->where('value',$value)->value('id');
//
//				$parent_id	= DB::table('param_value')->where('value',$value)->value('parent_id');
//				$option['id'] = $id;
//				$option['parent_id'] = $parent_id;
//				$option['value'] = $value;
//				$option['text'] = $value;
//
//				$paramOptions[$key] = $option;
//			}
//			return Response::json($paramOptions);
//		}


	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$paramValue = ParamValue::find($id);
		
		return Response::json($paramValue);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		ParamValue::destroy($id);	
		return Response::json($id);
	}

}
