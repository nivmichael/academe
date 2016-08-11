<?php namespace App\Http\Controllers;
use DB;
use PDO;
use Response;
use Input;
use Schema;
use App\ParamType;
use App\Param;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ParamTypeController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
				$params = DB::table('param_type')
		->get();
		
		return Response::json($params);
	}
	
	public function columnIndex()
	{
		
		$columns = Schema::getColumnListing('param_type');
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
		$all=Input::all();
		$all = $all['user'];
		$id = Input::get('id');
		$param = ParamType::find($id);
		if($param){
			$param->id = $id;	
		}else{
			$param = new ParamType();
		}
		$name = $all['name'];
		$param->name = $name;
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
		ParamType::destroy($id);	
		return Response::json($id);
	}

}
