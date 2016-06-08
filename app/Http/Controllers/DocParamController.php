<?php namespace App\Http\Controllers;

use DB;
use stdClass;
use PDO;
use Response;
use Input;
use Schema;
use App\DocParam;
use App\Param;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class DocParamController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$params = DB::table('doc_param')
		->get();

		return Response::json($params);
	}

	public function jobseekerSteps(){
		$query     = DB::table('doc_param')->where('doc_sub_type','jobseeker')->orderBy('position', 'desc')->get();
		$docParam  = [];
		$docParams =[];

		foreach($query as $result) {
			$docParam['name'] = $result->name;
			$docParam['belongsTo'] = 'jobseeker';
			$docParams[$result->position] = $docParam;
		}

		return Response::json($docParams);
	}
	public function employerSteps(){
		$query = DB::table('doc_param')->where('doc_sub_type','employer')->orderBy('position', 'desc')->get();
		$docParam = [];
		$docParams=[];
		foreach($query as $result) {
			$docParam['name'] = $result->name;
			$docParam['belongsTo'] = 'employer';
			$docParams[$result->position] = $docParam;
		}


		return Response::json($docParams);
	}

	public function columnIndex()
	{
		
		$columns = Schema::getColumnListing('doc_param');
		$columns = (object) $columns;

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
		$id = $all['id'];
		$param = DocParam::find($id);
		if($param){
			$param->id = $id;	
		}else{
			$param = new DocParam();
		}
		$name = $all['name'];
//		$slug = $all['slug'];
		$doc_type_id = $all['doc_type_id'];
		$doc_sub_type = $all['doc_sub_type'];

		$param->name = $name;
//		$param->slug = $slug;
		$param->doc_type_id = $doc_type_id;
		$param->doc_sub_type = $doc_sub_type;
		$param->save();
		
		return Response::json(array('param'=>$param,'id'=>$id));
	}
	
	
	// public function getCompanyParamInput($paramName) {
// 		
		// $param =new stdClass();
// 		
		// $paramTypeId = DB::table('param')->where('name',$paramName)->pluck('type_id');
		// $paramType   = DB::table('param_type')->where('id',$paramTypeId)->pluck('name');
// 		
		// $param->paramName = $paramName;
		// $param->paramValue= '';
		// $param->inputType = $paramType;
// 		
// 		
		// return Response::json($param);
	// }

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		DB::table();
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


	public function deleteIterable(Request $request)
	{
		$all = $request->all();
		$user_id    = $all['user_id'];
		$iteration_key   = $all['index'];
		$docParamId = $all['docParam'][0]['docParamId'];

		DB::table('sys_param_values')
			->leftJoin('param', 'sys_param_values.param_id', '=', 'param.id')
			->where('ref_id', $user_id)
			->where('doc_param_id', $docParamId)
			->where('iteration', $iteration_key)
			->delete();

		return response()->json();

	}
	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		DocParam::destroy($id);	
		return Response::json($id);
	}

}
