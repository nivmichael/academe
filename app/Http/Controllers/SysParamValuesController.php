<?php namespace App\Http\Controllers;
use App\ImageResize;
use DB;
use Route;
use PDO;
use App;
use Auth;
use App\Post;
use Response;
use Input;
use Schema;
use App\SysParamValues;
use App\Param;
use App\ParamType;
use App\ParamValue;
use File;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Post;

class SysParamValuesController extends Controller  {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$params = DB::table('sys_param_values')
		->get();
		return Response::json($params);
	}
	
	
	public function columnIndex()
	{
		
		$columns = Schema::getColumnListing('sys_param_values');
		$columns = (object) $columns;
// 		
		// return Response::json(array($columns,$params));
		return Response::json($columns);
	}

	public function uploadCv(Request $request){
		if(Auth::check()) {
			$userId = Auth::user()->id;
		}

		$inputAll = Input::all();
		$iteration = $inputAll['iteration'];


		if($iteration == null){
			$path = 'uploads/userCv/'.$userId;
		}else{
			$path = 'uploads/userCv/'.$userId.'/'.$iteration;
		}

		$cv = new SysParamValues();
		if (!is_dir($path)) {
			mkdir($path, 0777, true);
			chmod($path, 0777);
		}

		$cv->doc_type = '1';
		$cv->ref_id   = $userId;
		$cv->param_id = DB::table('param')->where('name', 'cv')->where('doc_param_id', '5')->pluck('id');
		if($iteration === null){
			$iteration = null;
		}elseif($iteration === ''){
			$iteration = null;
		}else{
			$iteration  = $iteration;
			$cv->iteration = $iteration;
		}
		$cv->value_short = $path.'/'.$_FILES[ 'file' ][ 'name' ];

		$hasfileid =DB::table('sys_param_values')->where('param_id',$cv->param_id )->where('ref_id',$userId)->where('iteration',$iteration)->update(['value_short'=>$cv->value_short]);
		//dd($hasfileid);
		if($hasfileid == 0)
		{
			$cv->save();
		}



		if ( !empty( $_FILES ) ) {

			$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];



			$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
			move_uploaded_file( $tempPath, $path.'/'.$_FILES[ 'file' ][ 'name' ] );



			$answer = array( 'answer' => 'File transfer completed', );

			return Response::json($cv->value_short);

		} else {
			return Response::json('failed');
		}

	}
	public function upload()
	{
		
		$param_ref = Input::all();
		
		$param_ref = $param_ref['param_ref'];
		$userId = Auth::user()->id;
		$path = 'uploads/userimgs/'.$userId;
		 if (!is_dir($path)) {    
		     mkdir($path, 0777, true);   
			 chmod($path, 0777);
		 }
        $request = new \Flow\Request();
        $config = new \Flow\Config(array(
            'tempDir' => $path, //With write access
        ));

        $file = new \Flow\File($config, $request);
        $response = Response::make('', 200);
		$fileName = $request->getFileName();
        $destination = $path.'/'.$request->getFileName();
		
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
           
            if (!$file->checkChunk()) {
          
                return Response::make('', 204);
            }
        } else {
            if ($file->validateChunk()) {
                $file->saveChunk();
              

            } else {
         
                // error, invalid chunk upload request, retry
                return Response::make('Error in chunck', 400);
            }
        }
		
        if ($file->validateFile() && $file->save($destination)) {
        	$image = new ImageResize($destination);
			$image->resizeToWidth(250);
			$image->save($destination);
           
            $response = Response::make('upload success', 200);
        }
		
			$photo = new SysParamValues();
			
			//check if phot or partams or whateva iexists..if not then insert new
			
			$photo->doc_type = '';
			$photo->ref_id = $userId;
		//print_r($photo);
		//	$docParamId = DB::table('doc_param')->where('name','')->pluck('id');

		$photo->param_id = DB::table('param')->where('id', $param_ref)->pluck('id');
//			if(is_int($param_ref)){
//				$photo->param_id = DB::table('param')->where('id', $param_ref)->pluck('id');
//			}else{
//				$photo->param_id = DB::table('param')->where('name', $param_ref)->pluck('id');
//			}
	//	dd($param_ref);
		//	$photo->param_id = DB::table('param')->where('name', $param_ref)->pluck('id');
			$photo->iteration = null;
			
			if(!strlen($destination)){
				$photo->value_short = null;
			}else {
				
				$photo->value_short = $destination;
			}
			$photo->doc_type = 1;	
			$photo->value_long= $fileName;
			$photo->value_ref = null;
//			/dd($photo->param_id);
			
			//$hasfileid = DB::table('SysParamValues')->where('param_id', $photo->param_id)->where('ref_id',$userId)->pluck('id');
			$hasfileid =DB::table('sys_param_values')->where('param_id',$photo->param_id )->where('ref_id',$userId)->update(['value_short'=>$photo->value_short]);
			if(!$hasfileid) {
				
				$photo->save();
			}else{
			
				//dd('updated');
			}
			
		
		
		
		
		
		// return Response::json($test);
		
		
		
        return $photo->value_short;
	}

    public function getGroups()
	{
		// $groups  =  DB::select( DB::raw("SELECT param_value.*,
											   // param_value.value AS paramValueName, 
											   // param_type.name AS paramType,
											   // doc_param.name AS docParamName
											   // FROM	param 
											   // LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
											   // LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
											   // LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
											   // LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id 
											   // LEFT JOIN param_type ON param.type_id = param_type.id
											   // "));
// 		$param_id = DB::table()->where()->pluck('id');
//		$param    = DB::table()->where()->get();


		$groups  =  DB::select( DB::raw("SELECT * FROM param_value"));

		return $groups;
	}

	public function setProfilePic()
	{
		$id = Auth::user()->id;
		$param_id = DB::table('param')->where('name', 'profile_pic')->pluck('id');										 
		$profilePic =  DB::table('sys_param_values')->where('ref_id',$id)
													->update(['value_short'=>$_POST['profilePic'],'param_id'=>$param_id]);
		
		return Response::json($id);
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
	
	// public function saveParam()
	// {
		// $all = Input::all();
		// $array = array();
		// foreach($all as $key=>$value){
			// $param = Param::where('name','=', $key)->first();
			// $paramVal = ParamValue::where('value','=', $value)->first();
			// $sysParamValue=SysParamValues::where('param_id','=',$param['id'])->first();
			// $sysParamValue->value_ref = $paramVal['id'];
			// $sysParamValue->save();
			// $array[]=$sysParamValue;
		// }
	 	// //$sys_param_value = SysParamValues::find($param_id);
// 		
		// return Response::json($array);
	// }
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		
		$all = Input::all();
		$all = $all['user'];
		$param_id = $all['id'];
		$sys_param_value = SysParamValues::find($param_id);	 
		
		if(!$sys_param_value){
		
			$sys_param_value = new SysParamValues();
		}else{
				
			$sys_param_value->doc_type	  = $all['doc_type'];
			$sys_param_value->ref_id      = $all['ref_id'];
			$sys_param_value->param_id	  = $all['param_id'];
			$sys_param_value->iteration   = $all['iteration'];
			$sys_param_value->value_short = $all['value_short'];
			$sys_param_value->value_long  = $all['value_long'];
			$sys_param_value->value_ref   = $all['value_ref'];
		}
		$sys_param_value->save();

		return Response::json($param_id);

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$sysParamValues = SysParamValues::where('ref_id','=', $id)->get();
		
		return Response::json($sysParamValues);
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
		SysParamValues::destroy($id);	
		return Response::json($id);
	}
	
	public function deleteimage()
	{
		$path = $_POST['path'];	
		$path = explode('/',$path);
		
		$path[0] = 'public';
		$path=implode('/',$path);
		
		
		
		unlink($path);
		return Response::json($path);
	}
	
	public function deleteimagefromdb()
	{
		$id = $_POST['id'];	
		if($_POST['path']) {
			$path = $_POST['path']['paramValue'];	
		};
	
		$success = DB::table('sys_param_values')->where('value_short', '=', $path)->where('ref_id', '=', $id)->update(['value_short' => 'img/No-Photo.gif']);
	}
	
	public function deleteIterable()
	{
		//$docParamName = $_POST['docParamName'];
		//$iterable = $_POST['param'];
		$all = Input::all();
		$docParamArr = $all['docParam'];

		if(isset($all['user'])){
		
			$all = $all['user'];
			$info=$all['personal_information'];
			$docType = '1';
			//$request = Request::create('/users','POST', array($all));



		}else if(isset($all['post'])) {
			$iterable = $all['param'];
			$all = $all['post'];
			$info=$all['postInfo'];
			$docType = '2';
			//$request = Request::create('/savePost','POST', array($all));
		
	 	}else{

		}


			/*
			*need to check whats going on here because sometimes after delete if we save empty values it deletes the whole docParam.
			*/
			$delete = DB::table('sys_param_values')->where('doc_type',$docType)->where('doc_type',$docType)->where('ref_id',$info['id'])->whereNotNull('iteration')->delete();
		
			//return Route::dispatch($request)->getContent();

		
		return Response::json('deleted');
	}


}
