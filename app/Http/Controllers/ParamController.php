<?php namespace App\Http\Controllers;

use DB;
use PDO;
use Response;
use Input;
use Schema;
use App\Param;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ParamController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$params = DB::table('param')
//					->leftJoin('doc_param', 'param.doc_param_id', '=', 'doc_param.id')
					->get();
		//->leftJoin('param_value', 'param.id', '=', 'param_value.param_id')

		
// 		
		// $columns = Schema::getColumnListing('param');
		// $columns = (object) $columns;
// 		
		// return Response::json(array($columns,$params));
		return Response::json($params);
	}
	
	public function columnIndex()
	{
		
		$columns = Schema::getColumnListing('param');
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
	public function store($id)
	{

		$all = Input::all();
		$all = $all['user'];
		$id = $all['id'];

		$param = Param::find($id);
		if($param){
			$param->id = $id;
		}else{
			$param = new Param();
		}

		$name = $all['name'];
		$param->authorized = $all['authorized'];
		$param->name = $name;

		$param->type_id = $all['type_id'];
		$param->doc_param_id = $all['doc_param_id'];
		$param->save();
		return Response::json(array('param'=>$param,'id'=>$id));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
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
	public function update($id, Request $request)
	{
		 $all = $request->input();

		 $param = Param::find($id);
		 $param->$all['key'] = $all['value'];
// 		
		 $param->save();
// 		
		 return Response::json(array('param'=>$param))		 ;
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
		Param::destroy($id);	
		return Response::json($id);
	}

}
