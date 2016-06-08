<?php

namespace App\Http\Controllers;

use App\Post;
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

        //return response()->json([ 'posts' => $this->posts->forUser( $request->user() ) ]);
          return response()->json([ 'posts' => Post::all() ]);
    }

    public function savePost(Request $request)
    {



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


        $all = request()->all($request);

        $allPostInfo = $all['postInfo'];
        unset($all['files']);

        unset($all['personal_information']);
        unset($all['company']);
        $id = $allPostInfo['id'];

        $userId = Auth::user()->id;

        $post = Post::find($id);
        if($post){
            $post->id = $id;
        }else{
            $post = new Post();
        }
        $post->title = $all['postInfo']['title'];
        $post->user_id = $userId;
        //	$post->description_short =$allPostInfo['description_short'];
        $post->description = $all['postInfo']['description'];
        $post->authorized = 1;
        $post->save();


        unset($all['postInfo']);
        foreach($all as $doc_param => $param_object){
            unset($param_object['docParamId']);
            foreach ($param_object as $param_key => $param_value) {
                $obj[$doc_param][$param_key] = $param_value;
            }
        }
        //dd($obj);
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
        $obj['postInfo'] = $post;
        return Response::json($obj);

    }

    public function store(Request $request)
    {
//      $postInfo = $request->get('postInfo');
//      dd($postInfo['title']);
        $rules = [
            'title' => 'required|min:3',
        ];
        $messages = [
            'title.required' => 'This is the Title, it`s important'
        ];

        $validator = Validator::make( $request->get('postInfo'), $rules, $messages);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return response()->json($messages, 422);
        }
        $this->savePost($request);

//        $request->user()->posts()->create([
//            'description' => $postInfo['title'],
//        ]);
    }


    public function show($id){
        return response()->json($id);
    }

}
