<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Response;
use Validator;
use DB;
use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;
use App\Repositories\UserRepository;

class PostController extends Controller
{

    /**
     * The post repository instance.
     *
     * @var PostRepository
     */

    protected $posts;

    /**
     * Create a new controller instance.
     *
     * @param  PostRepository  $posts
     * @return void
     */

    public function __construct(PostRepository $posts, UserRepository $user)
    {
        $this->middleware('jwt.auth');
        $this->user  = $user;
        $this->posts = $posts;
    }


    public function index(Request $request)
    {
        //$posts = Post::where('user_id', $request->user()->id)->get();

        return response()->json( $this->posts->getAllPosts( $request->user() ) );
//          return response()->json([ 'posts' => Post::all() ]);
    }

    public function savePost()
    {

        $postObj = request()->post;
        unset($postObj['postInfo']);
        if(request()->post_id){
           $post = Post::find(request()->post_id);
        }else{
           $post = new Post();
        }

        $general = [];
        unset($postObj['general'][0]['docParamId']);
        foreach($postObj['general'][0] as $param){
            $general[$param['paramName']] = $param['paramValue'];
        }

        $post->title      = $general['job_description'];
        $post->user_id    = Auth::user()->id;
        $post->authorized = 1;
        $post->save();

        $all    = $postObj;
        $id     = $post->id;
        $userId = Auth::user()->id;




        foreach($all as $doc_param => $param_object){
            foreach ($param_object as $param_key => $param_value) {
                unset($param_value['docParamId']);
                $obj[$doc_param][$param_key] = $param_value;
            }
        }
//        dd($obj);
        foreach($obj as $docParamName => $docParamValues) {

            $doc_param_id = DB::table('doc_param')->where('name', $docParamName)->where('doc_type_id', 2)->value('id');

            foreach($docParamValues as $iteration_count => $params) {

                foreach ($params as $param_id => $param_values) {
//                    var_dump($params);
                    $paramValue = $param_values['paramValue'];
                    $paramName  = $param_values['paramName'];
                    $iterable   = $iteration_count;

                    if (is_array($paramValue)) {
                        $paramValue = implode('|', $paramValue);
                    }

                    if ($param_id) {
                        //checking where the values come from? from param_value? or from short/long?
                        $value_ref = DB::table('param_value')->where('id', $paramValue)->value('id');
                        $existsId  = DB::table('sys_param_values')->where('param_id', $param_id)->where('ref_id', $id)->where('iteration', $iteration_count)->value('id');

                        if ($existsId) {
                            if (!$value_ref) {
                                DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
                            } else {
                                DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
                            }
                        } else {
                            if (!$value_ref) {
                                DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
                            } else {
                                DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
                            }
                        }
                    }
                }
            }
        }
        return $post;

    }

    public function update(){
        return response()->json('update');
    }

//    public function savePost(Request $request)
//    {
//


//        $all = request()->all($request);
//
//
//
//
//        $allPostInfo = $all['post']['postInfo'];
//        unset($all['post']['files']);
//
//        unset($all['post']['personal_information']);
//        unset($all['post']['company']);
//        $id = $allPostInfo['id'];

//
//        $all = request()->all($request);
//
//        $allPostInfo = $all['postInfo'];
//        unset($all['files']);
//
//        unset($all['personal_information']);
//        unset($all['company']);
//        $id = $allPostInfo['id'];
//
//        $userId = Auth::user()->id;
//
//        $post = Post::find($id);
//        if($post){
//            $post->id = $id;
//        }else{
//            $post = new Post();
//        }
//        $post->title = $allPostInfo['title'];
//        $post->user_id = $userId;
//        //	$post->description_short =$allPostInfo['description_short'];
//        $post->description =  $allPostInfo['description'];
//        $post->authorized = 1;
//        $post->save();
//        $id = $post->id;
//
//        unset( $all['postInfo'] );
//        foreach($all as $doc_param => $param_object){
//            foreach ($param_object as $param_key => $param_value) {
//                unset($param_value['docParamId']);
//                $obj[$doc_param][$param_key] = $param_value;
//            }
//        }
//
//        foreach($obj as $docParamName => $docParamValues) {
//
//            $doc_param_id = DB::table('doc_param')->where('name', $docParamName)->where('doc_type_id', 2)->value('id');
//
//            foreach($docParamValues as $iteration_count => $params) {
//
//                foreach ($params as $param_id => $param_values) {
////                    var_dump($params);
//                    $paramValue = $param_values['paramValue'];
//                    $paramName  = $param_values['paramName'];
//                    $iterable   = $iteration_count;
//
//                    if (is_array($paramValue)) {
//                        $paramValue = implode('|', $paramValue);
//                    }
//
//                    if ($param_id) {
//                        //checking where the values come from? from param_value? or from short/long?
//                        $value_ref = DB::table('param_value')->where('id', $paramValue)->value('id');
//                        $existsId  = DB::table('sys_param_values')->where('param_id', $param_id)->where('ref_id', $id)->where('iteration', $iteration_count)->value('id');
//
//                        if ($existsId) {
//                            if (!$value_ref) {
//                                DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
//                            } else {
//                                DB::table('sys_param_values')->where('id', $existsId)->update(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
//                            }
//                        } else {
//                            if (!$value_ref) {
//                                DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => NULL, 'value_short' => $paramValue, 'value_long' => NULL]);
//                            } else {
//                                DB::table('sys_param_values')->insert(['doc_type' => 2, 'ref_id' => $id, 'param_id' => $param_id, 'iteration' => $iteration_count, 'value_ref' => $value_ref, 'value_short' => NULL, 'value_long' => NULL]);
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return $obj['postInfo'] = $post;
//
//    }
    public function validatePost(Request $request)
    {

        $validateThis = [];
        $rules = [
            'job_description' => 'required|min:3',
            'main_field'      => 'required|min:3',
            'degree'          => 'required',
            'description'     => 'required',
            'requirements'    => 'required',
        ];
        $messages = [
            'regex' => 'Please insert only english characters.'
        ];
        $post = $request->post;
        if(isset($post['postInfo'])){
            unset($post['postInfo']);
        }
        foreach($post as $docParam => $iteration){
            foreach($iteration as $params){
                foreach($params as $param){
                    if(isset($param['paramName'], $rules)){
                        $validateThis[$param['paramName']] = $param['paramValue'];
                    }
                }
            }
        }

        $validator = Validator::make($validateThis, $rules, $messages);
        if ($validator->fails()) {

            return response()->json( $validator->messages() , 422);
        }
    }

    public function store(Request $request)
    {

        /*
         * Validation goes here
         *
         * job_description
         *
         * category
         *
         * degree
         *
         * Description*
         * Requirements*
         *
         * */


        $validateThis = [];
        $rules = [
            'job_description' => 'required|min:3',
            'main_field'      => 'required|min:3',
            'degree'          => 'required',
            'description'     => 'required',
            'requirements'    => 'required',
        ];
        $messages = [
            'regex' => 'Please insert only english characters.'
        ];
        $post = $request->post;
        if(isset($post['postInfo'])){
            unset($post['postInfo']);
        }
        foreach($post as $docParam => $iteration){
            foreach($iteration as $params){
                foreach($params as $param){
                    if(isset($param['paramName'], $rules)){
                        $validateThis[$param['paramName']] = $param['paramValue'];
                    }
                }
            }
        }

        $validator = Validator::make($validateThis, $rules, $messages);
        if ($validator->fails()) {

            return response()->json( $validator->messages() , 422);
        }

        return  $this->savePost($request);

    }





        public function show($id)
        {



            //TODO: very important that we get the `applied` parameter for the user - a jobseeker doesnt need to see post's applied values because it contains othe user ids.


            $postUserId;

            $post = array();
            $postInfo = Post::find($id);
            $params =  DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_post.*,
										   param.name AS paramName,
										   param.id AS paramId,

										   param_type.name AS paramType,
										   param_value.value AS paramValue,

										   doc_param.name AS docParamName,
                                           param.position AS paramPosition,
										   doc_param.position AS docParamPosition,
										   doc_param.id AS docParamId
										   FROM	param
										   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
										   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
										   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
										   LEFT JOIN type_post ON sys_param_values.ref_id = type_post.id
										   LEFT JOIN param_type ON param.type_id = param_type.id
										   WHERE param.authorized = 1 AND doc_type_id = 2  AND type_post.id = ".$id ." ORDER BY docParamPosition, paramPosition"));

            $isMultiple = false;
            $post['postInfo'] = $postInfo;
            foreach($params as $k=>$v) {

                $iteration    = $v->iteration;
                $docParamName = $v->docParamName;
                $paramName    = $v->paramName;
                $inputType    = $v->paramType;
                $paramValue   = $v->paramValue;
                $docParamId   = $v->docParamId;
                $paramId      = $v->paramId;
//			$slug = $v->slug;
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




//			if($iteration !== NULL) {
                $post[$docParamName][$iteration]['docParamId'] = $docParamId;
                $post[$docParamName][$iteration][$paramId]['paramName'] = $paramName;
//				$post[$docParamName][$iteration][$paramId]['slug'] = $slug;
                $post[$docParamName][$iteration][$paramId]['paramValue'] = $value;
                $post[$docParamName][$iteration][$paramId]['inputType'] = $inputType;
                $post[$docParamName][$iteration][$paramId]['paramId'] = $paramId;

                //$post[$docParamName][$iteration][$paramName] = $value;


//			}elseif($iteration == NULL) {
//				$post[$docParamName]['docParamId'] = $docParamId;
//				$post[$docParamName][$paramName]['paramName'] = $paramName;
////				$post[$docParamName][$paramName]['slug'] = $slug;
//				$post[$docParamName][$paramName]['paramValue'] = $value;
//				$post[$docParamName][$paramName]['inputType'] = $inputType;
//
//
//
//
//
//
//
//				//$post[$docParamName][$paramName] = $value;
//
//			}

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





}
