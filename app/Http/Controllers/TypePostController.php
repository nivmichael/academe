<?php namespace App\Http\Controllers;

use DB;
use Response;
use Input;
use DateTime;
use App\User;
use App\Post;
use App\param;
use App\paramValue;
use App\SysParamValues;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use stdClass;
use Schema;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Hash;

use Illuminate\Http\Request;

class TypePostController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
//
//		$post = array();
//		$postsArr=array();
//		$posts = DB::table('type_post')
//		->where('user_id',Auth::user()->id)
//		->get();
//
//		foreach($posts as $key=>$postParams){
//
//
//			$sys_param_values = DB::table('sys_param_values')->where('ref_id','=',$postParams->id)->get();
//			foreach ($sys_param_values as $value) {
//				$paramId      = $value->param_id;
//	 			$value 	      = $value->value_short;
//				$paramName    = DB::table('param')->where('id','=',$paramId)->pluck('name');
//				$docParamId   = DB::table('param')->where('name','=',$paramName)->pluck('doc_param_id');
//				///print_r($docParamId);die;
//				$docParamName   = DB::table('doc_param')->where('id','=',$docParamId)->pluck('name');
//				$post[$docParamName][$paramName] = $value;
//
//				$postInfo = Post::find($postParams->id);
//				$post['postInfo'] = $postInfo;
//			}
//				// $logo_param_id = DB::table('param')->where('name','company_logo')->pluck('id');
//				// $company_logo  = DB::tab le('sys_param_values')->where('id',$logo_param_id)->get();
//				$logo_param_id = DB::table('param')->where('name','company_logo')->pluck('id');
//				$company_logo  = DB::table('sys_param_values')->where('param_id',$logo_param_id)->where('ref_id',$postParams->user_id)->pluck('value_short');
//				$post['postInfo']['company_logo'] = $company_logo;
//				$postsArr[] = $post;
//		}
//		//var_dump($company_logo);die;
//
//
//
//		return Response::json($postsArr);
	}

	public function getAllPosts()
	{
//
//		$post = array();
//		$postsArr=array();
//		$posts = DB::table('type_post')
//		->get();
//
//		foreach($posts as $key=>$postParams){
//
//
//			$sys_param_values = DB::table('sys_param_values')->where('ref_id','=',$postParams->id)->get();
//			foreach ($sys_param_values as $value) {
//				$paramId      = $value->param_id;
//	 			$value 	      = $value->value_short;
//				$paramName    = DB::table('param')->where('id','=',$paramId)->pluck('name');
//				$docParamId   = DB::table('param')->where('name','=',$paramName)->pluck('doc_param_id');
//				///print_r($docParamId);die;
//				$docParamName   = DB::table('doc_param')->where('id','=',$docParamId)->pluck('name');
//				$post[$docParamName][$paramName] = $value;
//
//				$postInfo = Post::find($postParams->id);
//				$post['postInfo'] = $postInfo;
//				$logo_param_id = DB::table('param')->where('name','company_logo')->pluck('id');
//				$company_logo  = DB::table('sys_param_values')->where('param_id',$logo_param_id)->where('ref_id',$postParams->user_id)->pluck('value_short');
//				$post['postInfo']['company_logo'] = $company_logo;
//				//var_dump($company_logo);
//			}
//
//				$postsArr[] = $post;
//		}
//
//
//
//
//		return Response::json($postsArr);
	}
	public function savePost(Request $request)
	{



		$all = $request->all();
		dd($all);
		$allPostInfo = $all['post']['postInfo'];
		unset($all['post']['files']);
		unset($all['post']['personal_information']);
		unset($all['post']['company']);
		$id = $allPostInfo['id'];

		$userId = Auth::user()->id;

		$post = Post::find($id);
		if($post){
				$post->id = $id;
		}else{
			$post = new Post();
		}
		$post->title = $all['post']['postInfo']['title'];
		$post->user_id = $userId;
	//	$post->description_short =$allPostInfo['description_short'];
		$post->description = $all['post']['postInfo']['description'];
		$post->authorized = 1;
		$post->save();


		unset($all['post']['postInfo']);
		foreach($all['post'] as $doc_param => $param_object){
			unset($param_object['docParamId']);
			foreach ($param_object as $param_key => $param_value) {
				$obj[$doc_param][$param_key] = $param_value;
			}
		}

		foreach($obj as $docParamName => $docParamValues) {

			$doc_param_id = DB::table('doc_param')->where('name', $docParamName)->where('doc_type_id', 2)->value('id');

			foreach($docParamValues as $iteration_count => $params) {

				foreach ($params as $param_id => $param_values) {

					$paramValue = $param_values['paramValue'];
					$paramName  = $param_values['paramName'];
					$iterable   = $iteration_count;

					if (is_array($paramValue)) {
						$paramValue = implode('|', $paramValue);
					}

					if ($param_id) {
						//checking where the values come from? from param_value? or from short/long?
						$value_ref = DB::table('param_value')->where('id', $paramValue)->value('id');
						$existsId  = DB::table('sys_param_values')->where('param_id', $param_id)->where('ref_id', $post->id)->where('iteration', $iteration_count)->value('id');

						if ($existsId) {
							if (!$value_ref) {
								DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $post->id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
							} else {
								DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $post->id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
							}
						} else {
							if (!$value_ref) {
								DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $post->id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
							} else {
								DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $post->id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
							}
						}
					}
				}
			}
		}
		return Response::json($obj);










// 		
		// $all = Input::all();
		// $allPostInfo = $all['post']['postInfo'];
		// $id = $allPostInfo['id'];
		// $userId = Auth::user()->id;
// 	
		// $post = Post::find($id);
		// if($post){
				// $post->id = $id;
		// }else{
			// $post = new Post();
		// }
		// $post->title = $all['post']['postInfo']['title'];
		// $post->user_id = $userId;
		// $post->description_short = $all['post']['postInfo']['description_short'];
		// $post->description = $all['post']['postInfo']['description'];
		// $post->authorized = $all['post']['postInfo']['authorized'];
		// $post->save();
// 		
		// unset($all['post']['postInfo']);
		// foreach($all['post'] as $doc_param => $param_object){
			// foreach ($param_object as $param_key => $param_value) {
				// $obj[$doc_param][$param_key] = $param_value;
			// }
		// }
// 	
		// foreach($obj as $docParamName => $docParamVals) {
			// $doc_param_id = DB::table('doc_param')->where('name', $docParamName)->where('doc_type_id', 2)->pluck('id');
			// $iterableCount = 0;
			// foreach($docParamVals as $param => $props) {
// 			
				// if(is_int($param)) {
					// foreach($props as $propKey => $propVal) {
					// $paramValue = $propVal['paramValue'];
					// $paramName  = $propVal['paramName'];
					// $iterable = $param;
// 					
					// $param_id = DB::table('param')->where('name', $paramName)->where('doc_param_id', $doc_param_id)->pluck('id');
						// if ($param_id) {
							// //checking where the values come from? from param_value? or from short/long?
							// $value_ref = DB::table('param_value')->where('value', $paramValue)->pluck('id');
// 				
							// // if($iterable){
								// $existsId  = DB::table('sys_param_values')->where('param_id',$param_id)->where('iteration',null)->where('ref_id',$post->id)->pluck('id');
								// if(!$existsId) {
									// $existsId  = DB::table('sys_param_values')->where('param_id',$param_id)->where('iteration',$iterableCount)->where('ref_id',$post->id)->pluck('id');
								// }
							// // }else{
								// // $existsId  = DB::table('sys_param_values')->where('param_id',$param_id)->where('iteration',NULL)->where('ref_id',$post->id)->pluck('id');
							// // }
// // 							
							// if($existsId) {
// 							
								// if(!$value_ref) {
									// DB::table('sys_param_values')->where('id',$existsId)->update(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>$iterableCount,'value_ref'=>NULL,'value_short'=>$paramValue,'value_long'=>NULL]);
								// } else {
									// DB::table('sys_param_values')->where('id',$existsId)->update(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>$iterableCount,'value_ref'=>$value_ref,'value_short'=>NULL,'value_long'=>NULL]);
								// }
							// }else {
								// if(!$value_ref) {
									// DB::table('sys_param_values')->insert(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>$iterableCount,'value_ref'=>NULL,'value_short'=>$paramValue,'value_long'=>NULL]);
								// } else {
									// DB::table('sys_param_values')->insert(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>$iterableCount,'value_ref'=>$value_ref,'value_short'=>NULL,'value_long'=>NULL]);
								// }
							// }
						// }
					// }
				// }else if(!is_int($param)){
// 					
					// $paramValue = $props['paramValue'];
					// $param_id = DB::table('param')->where('name', $param)->where('doc_param_id', $doc_param_id)->pluck('id');
// 					
// 
					// $value_ref = DB::table('param_value')->where('value', $paramValue)->pluck('id');
					// $existsId = DB::table('sys_param_values')->where('param_id',$param_id)->where('ref_id',$post->id)->pluck('id');
					// if($existsId) {
						// if(!$value_ref) {
							// DB::table('sys_param_values')->where('id',$existsId)->update(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>null,'value_ref'=>NULL,'value_short'=>$paramValue,'value_long'=>NULL]);
						// } else {
							// DB::table('sys_param_values')->where('id',$existsId)->update(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>null,'value_ref'=>$value_ref,'value_short'=>NULL,'value_long'=>NULL]);
						// }
					// } else {
						// if(!$value_ref) {
							// DB::table('sys_param_values')->insert(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>null,'value_ref'=>NULL,'value_short'=>$paramValue,'value_long'=>NULL]);
						// } else {
							// DB::table('sys_param_values')->insert(['doc_type'=>2,'ref_id'=>$post->id,'param_id'=>$param_id,'iteration'=>null,'value_ref'=>$value_ref,'value_short'=>NULL,'value_long'=>NULL]);
						// }
					// }
				// }
		// $iterableCount ++;
			// }
		// }
		// return Response::json($obj);
// 				
// 		
	}

	public function jobPostColumnIndex()
	{
		$postInfo = new stdClass();
		$post = array();




		$params =  DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_user.*,

											   param.name AS paramName,
											   param.position AS position,
											   param_type.name AS paramType,
											   doc_param.name AS docParamName,
											   doc_param.id AS docParamId,
											   param.id AS paramId


											   FROM	param
											   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
											   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
											   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
											   LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id 
											   LEFT JOIN param_type ON param.type_id = param_type.id

											   WHERE doc_type_id = 2 AND authorized = 1 ORDER BY position"));

		$postInfo = Schema::getColumnListing('type_post');

		$postInfoKeys = array_flip($postInfo);
		foreach ($postInfoKeys as $key => $value) {
			$postInfoKeys[$key] = '';
		}

		foreach($params as $k=>$v) {
		$paramName    = $v->paramName;
		$docParamName = $v->docParamName;
		$inputType    = $v->paramType;
		$docParamId   = $v->docParamId;
		$paramId      = $v->paramId;
		$position     = $v->position;


		$post[$docParamName][0]['docParamId'] = $docParamId;
		$post[$docParamName][0][$paramId]['paramName'] = $paramName;
		$post[$docParamName][0][$paramId]['paramValue'] = '';
		$post[$docParamName][0][$paramId]['inputType'] = $inputType;
		$post[$docParamName][0][$paramId]['position'] = $position;


	}


		 $post['postInfo'] = $postInfoKeys;



		return Response::json($post);
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
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{

		$postUserId;

		$post = array();
		$postInfo = Post::find($id);
		$params =  DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_post.*,
										   param.name AS paramName, 
										   param.slug AS slug,
										   param_type.name AS paramType,
										   param_value.value AS paramValue,
										   doc_param.name AS docParamName,
										   doc_param.id AS docParamId
										   FROM	param
										   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
										   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
										   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
										   LEFT JOIN type_post ON sys_param_values.ref_id = type_post.id  
										   LEFT JOIN param_type ON param.type_id = param_type.id
										   WHERE  type_post.id = ".$id));

		$isMultiple = false;
		$post['postInfo'] = $postInfo;
		foreach($params as $k=>$v) {

			$iteration    = $v->iteration;
			$docParamName = $v->docParamName;
			$paramName    = $v->paramName;
			$inputType    = $v->paramType;
			$paramValue   = $v->paramValue;
			$docParamId   = $v->docParamId;
			$slug = $v->slug;
			$logo_param_id = DB::table('param')->where('name','company_logo')->value('id');
			$ref_id = DB::table('type_post')->where('id',$id)->value('user_id');
			$postUserId = $ref_id;
			$company_logo  = DB::table('sys_param_values')->where('param_id',$logo_param_id)->where('ref_id',$ref_id)->value('value_short');
			$post['postInfo']['company_logo'] = $company_logo;


			if($v->value_ref == null) {
				$value = $v->value_short;
			} else {
				$value = $v->value;
			}




			if($iteration !== NULL) {
				$post[$docParamName][$iteration]['docParamId'] = $docParamId;
				$post[$docParamName][$iteration][$paramName]['paramName'] = $paramName;
				$post[$docParamName][$iteration][$paramName]['slug'] = $slug;
				$post[$docParamName][$iteration][$paramName]['paramValue'] = $value;
				$post[$docParamName][$iteration][$paramName]['inputType'] = $inputType;

				//$post[$docParamName][$iteration][$paramName] = $value;


			}elseif($iteration == NULL) {
				$post[$docParamName]['docParamId'] = $docParamId;
				$post[$docParamName][$paramName]['paramName'] = $paramName;
				$post[$docParamName][$paramName]['slug'] = $slug;
				$post[$docParamName][$paramName]['paramValue'] = $value;
				$post[$docParamName][$paramName]['inputType'] = $inputType;







				//$post[$docParamName][$paramName] = $value;

			}

		}





		$user = array();
		$userpersonal_information = User::find($postUserId);

//		$userParams =  DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_user.*,
//										   param.name AS paramName,
//										   param.slug AS slug,
//										   param_type.name AS inputType,
//										   doc_param.name AS docParamName
//										   FROM	param
//										   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
//										   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
//										   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
//										   LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id
//										   LEFT JOIN param_type ON param.type_id = param_type.id
//										   WHERE doc_type_id = 1
//										   AND type_user.id = ".$postUserId));
//
//
//
//
//		$post['personal_information'] = $userpersonal_information['original'];
//
//
//		foreach($userParams as $k=>$v) {
//			$iteration    = $v->iteration;
//			$docParamName = $v->docParamName;
//			$paramName = $v->paramName;
//			$inputType = $v->inputType;
//			$slug = $v->slug;
//			if($v->value_ref == null) {
//				$value = $v->value_short;
//			}else{
//				$value = $v->value;
//			}
//
//			if($iteration !== NULL) {
//
//				$post[$docParamName][$iteration][$paramName]['paramName'] = $paramName;
//				$post[$docParamName][$iteration][$paramName]['slug'] = $slug;
//				$post[$docParamName][$iteration][$paramName]['paramValue'] = $value;
//				$post[$docParamName][$iteration][$paramName]['inputType'] = $inputType;
//
//				//$user[$docParamName][$iteration][$paramName] = $value;
//
//
//
//			}elseif($iteration == NULL) {
//
//
//
//				$post[$docParamName][$paramName]['paramName'] = $paramName;
//				$post[$docParamName][$paramName]['slug'] = $slug;
//				$post[$docParamName][$paramName]['paramValue'] = $value;
//				$post[$docParamName][$paramName]['inputType'] = $inputType;
//
//
//				//$user[$docParamName][$paramName] = $value;
//
//			}
//
//		}

		//$test = array_values($post[$docParamName]);
	//	$post[$docParamName] = array_values($post[$docParamName]);
		return Response::json($post);
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
		//
	}

	public function calculate_match_percentage($post_parameters, $user_parameters, $exclude_job_parameters, $user_id = false) {

		// Note:
		// The 'exclude' array specified whether we need to NOT calculate certain parameters.
		// This is used if the Employer is associated with a MemberZone that defines less job-parameters than usual.
		// This "exclude" parameter is called "exclude_job_parameters" and belongs to the Doc MemberZone.

		$match['total'] = 0.05;

		if ($post_parameters && $user_parameters) {

//            if (!$exclude_job_parameters['experience']) {
//                $score = 0;
//                $num_of_variables = 0;
//                if ($post_parameters['general']['experience']['value']) {
//                    $experience = explode('-',$post_parameters['general']['experience']['value']);
//                    $num_of_variables++;
//                    if ($user_parameters['general']['experience'] >= $experience[0] && $user_parameters['general']['experience'] <= $experience[1]) {
//                        $score++;
//                    }
//                }
//                if ($num_of_variables > 0) {
//                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
//                }
//            }

			if (!$exclude_job_parameters['education']) {

				$degree_array = array();
				foreach($post_parameters['education'] as $post_education_param) {
					$degree_array[] = $post_education_param['degree']['value'];
				}

				$score = 0;
				$num_of_variables = 0;
				if (!empty($degree_array)) {
					$num_of_variables++;
					if (!empty($user_parameters['education'])) {
						foreach ($user_parameters['education'] as $education_param) {
							if (in_array($education_param['degree'], $degree_array)) {
								$score++;
								break;
							}
						}
					}
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
				}
				$faculty_array = array();
				foreach($post_parameters['education'] as $post_education_param) {
					$faculty_array[] = $post_education_param['faculty']['value'];
				}

				$score = 0;
				$num_of_variables = 0;
				if (!empty($faculty_array)) {
					$num_of_variables++;
					if (!empty($user_parameters['education'])) {
						foreach ($user_parameters['education'] as $education_param) {
							$user_education_array = (array)json_decode($education_param['faculty'], TRUE);
							foreach ($faculty_array as $value) {
								if (array_key_exists($value, $user_education_array)) {
									$score++;
									break 2;
								}
							}
						}
					}
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
				}
				$class_array = array();
				foreach($post_parameters['education'] as $post_education_param) {
					$class_array[] = $post_education_param['class']['value'];
				}
				$score = 0;
				$num_of_variables = 0;
				if (!empty($class_array)) {
					$num_of_variables++;
					if (!empty($user_parameters['education'])) {
						foreach ($user_parameters['education'] as $education_param) {
							// see that we decode faculty from user again - this is because classes are stored in a json in faculty param
							$user_education_array = (array)json_decode($education_param['faculty'], TRUE);
							foreach($user_education_array as $classes) {
								foreach ($class_array as $value) {
									if (array_key_exists($value, $classes)) {
										$score++;
										break 3;
									}
								}
							}
						}
					}
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.45;
				}


			}

			$score = 0;
			$num_of_variables = 0;
			if ($post_parameters['employment']['category']['value']) {
				$num_of_variables++;
				if ($post_parameters['employment']['category']['value'] == $user_parameters['next_step']['category']) {
					$score++;
				}
			}
			if ($num_of_variables > 0) {
				$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
			}

			$score = 0;
			$num_of_variables = 0;
			if ($post_parameters['employment']['category']['value']) {
				$num_of_variables++;
				if (!empty($user_parameters['employment'])) {
					foreach ($user_parameters['employment'] as $employment_param) {
						if ($employment_param['category'] == $post_parameters['employment']['category']['value']) {
							$score++;
							break;
						}
					}
				}
			}
			if ($num_of_variables > 0) {
				$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
			}

			$score = 0;
			$num_of_variables = 0;
			if ($post_parameters['employment']['profession']['value']) {
				$num_of_variables++;
				if ($post_parameters['employment']['profession']['value'] == $user_parameters['next_step']['profession']) {
					$score++;
				}
			}
			if ($num_of_variables > 0) {
				$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
			}

			$score = 0;
			$num_of_variables = 0;
			if ($post_parameters['employment']['profession']['value']) {
				$num_of_variables++;
				if (!empty($user_parameters['employment'])) {
					foreach ($user_parameters['employment'] as $employment_param) {
						$profession_arr = (array)json_decode($employment_param['profession']);
						if (in_array($post_parameters['employment']['profession']['value'], $profession_arr)) {
							$score++;
							break;
						}
					}
				}
			}
			if ($num_of_variables > 0) {
				$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
			}

			if (!$exclude_job_parameters['job_title']) {
				$score = 0;
				$num_of_variables = 0;
				if ($post_parameters['next_step']['job_title']['value']) {
					$num_of_variables++;
					if ($post_parameters['next_step']['job_title']['value'] == $user_parameters['next_step']['job_title']) {
						$score++;
					}
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
				}
			}

			if (!$exclude_job_parameters['salary']) {
				$score = 0;
				$num_of_variables = 0;
				if ($post_parameters['next_step']['salary']['value']) {
					if ($post_parameters['next_step']['salary']['value'] == $user_parameters['next_step']['salary']) {
						$score++;
					}
					$num_of_variables++;
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
				}
			}

			if (!$exclude_job_parameters['location']) {
				$score = 0;
				$num_of_variables = 0;
				if ($post_parameters['next_step']['location']['value']) {
					if ($post_parameters['next_step']['location']['value'] == $user_parameters['next_step']['location']) {
						$score++;
					}
					$num_of_variables++;
				}
				if ($num_of_variables > 0) {
					$match['total'] = $match['total'] + ($score/$num_of_variables)*0.05;
				}
			}

			$score = 0;
			$num_of_variables = 0;
			if ($post_parameters['languages']['language']['value']) {
				$num_of_variables++;
				if (!empty($user_parameters['languages'])) {
					foreach ($user_parameters['languages'] as $languages_param) {
						if ($languages_param['language'] == $post_parameters['languages']['language']['value']) {
							$score++;
							break;
						}
					}
				}
			}
			if ($num_of_variables > 0) {
				$match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
			}

			if ($match['total'] > 0) {
				return round($match['total']*100);
			} else {
				return 0;
			}

		}

	}

}