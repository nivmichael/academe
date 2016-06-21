<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Schema;
use App\DocParam;
use App\Param;
use App\ParamValue;
use stdClass;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    public function jobseeker()
    {
        $all = DB::table('doc_param as dp')->orderBy('dp.position', 'ASC')
            ->leftJoin('param as p', DB::raw('p.doc_param_id'), '=', DB::raw('dp.id'))
            ->where('dp.doc_sub_type', '=', 'jobseeker')->orderBy('p.position', 'ASC')
            ->leftJoin('param_type as pt', DB::raw('pt.id'), '=', DB::raw('p.type_id'))
            ->select(DB::raw('dp.id as docParamId, dp.name as docParamName, dp.position as docParamPosition, p.position as paramPosition, p.*, pt.name as inputTypeName'))
            ->get();
        $form            = new stdClass();
        $form->formName = [];
        foreach ($all as $key => $param) {



            $parameter               = new stdClass();
            $parameter->type         = "parameter";
            $parameter->paramId      = $param->id;
            $parameter->name         = $param->name;
            $parameter->position     = $param->paramPosition;
            $parameter->docParamName = $param->docParamName;
            $parameter->docParamId   = $param->docParamId;
            $parameter->inputType    = $param->type_id;
            $parameter->inputTypeName= $param->inputTypeName;
            $parameter->modify       = $param->modify;
            $parameter->show         = $param->authorized;
            $parameter->paramValue   = '';


            if(isset($doc_param) && property_exists ($doc_param , 'name' ) ){
                if($doc_param->name == $param->docParamName){
                    $doc_param->params[0][]  = $parameter;
                }else{
//                    var_dump($doc_param);
                    $doc_param = new stdClass();
                    $doc_param->type     = "doc_param";
                    $doc_param->docParamId       = $param->docParamId;
                    $doc_param->name             = $param->docParamName;
                    $doc_param->position     = $param->docParamPosition;
                    $doc_param->show         = $param->displayed;

                    $doc_param->params       = [];
                    $doc_param->params[]     = [];
                    $doc_param->params[0][]  = $parameter;
                }
            }else{
                $doc_param = new stdClass();
                $doc_param->type     = "doc_param";
                $doc_param->docParamId       = $param->docParamId;
                $doc_param->name             = $param->docParamName;
                $doc_param->position = $param->docParamPosition;
                $doc_param->show         = $param->displayed;

                $doc_param->params       = [];
                $doc_param->params[]     = [];
                $doc_param->params[0][]  = $parameter;
            }
            if(!in_array($doc_param, $form->formName)){
                $form->formName[] = $doc_param;
            }
        }
        return response()->json($form->formName);
    }




    public function form($form){

//        dd(strval($form));
        if($form == 'job'){
            $form = null;
        }else if($form == 'jobseeker'){
            $form = 'jobseeker';
        }else if($form == 'employer'){
            $form = 'employer';
        }



        //OrderBY is most important; need to rewrithe this so the ordering doesnt effect the building of object
        $params = DB::table('doc_param as dp')->orderBy('dp.position', 'ASC')

            ->leftJoin( 'param as p', DB::raw( 'p.doc_param_id' ), '=', DB::raw( 'dp.id' ) )
            ->where('dp.doc_sub_type', '=', $form)->orderBy('p.position', 'ASC')
            ->leftJoin( 'param_type as pt', DB::raw( 'pt.id' ), '=', DB::raw( 'p.type_id' ) )
            ->select( DB::raw( 'dp.id as docParamId, dp.name as docParamName, dp.position as docParamPosition, dp.modify as docParamModify,dp.displayed as displayed,  p.position as paramPosition, p.*, pt.name as inputTypeName' ) )
            ->get();

        $form            = new stdClass();
        $form->formName = [];
//dd($params);
        foreach ($params as $key => $param) {



            $parameter               = new stdClass();
            $parameter->type         = "parameter";
            $parameter->paramId      = $param->id;
            $parameter->name         = $param->name;
            $parameter->position     = $param->paramPosition;
            $parameter->docParamName = $param->docParamName;
            $parameter->docParamId   = $param->docParamId;
            $parameter->inputType    = $param->type_id;
            $parameter->inputTypeName= $param->inputTypeName;
            $parameter->modify       = $param->modify;
            $parameter->show         = $param->authorized;


            if(isset($category) && property_exists ($category , 'name' ) ){
                if($category->name == $param->docParamName){
                    if(isset( $param->id)){
                        $category->columns[0][]  = $parameter;
                    }

                }else{
//                  var_dump($category);
                    $category = new stdClass();
                    $category->type     = "category";
                    $category->modify          = $param->docParamModify;
                    $category->docParamId       = $param->docParamId;
                    $category->name             = $param->docParamName;
                    $category->docParamPosition = $param->docParamPosition;
                    $category->show         = $param->displayed;
                    $category->allowedTypes = Array($param->docParamName);

                    $category->columns       = [];
                    $category->columns[]     = [];
                    $category->columns[0][]  = $parameter;
                }
            }else{
                $category = new stdClass();
                $category->type     = "category";
                $category->modify           = $param->docParamModify;
                $category->docParamId       = $param->docParamId;
                $category->name             = $param->docParamName;
                $category->docParamPosition = $param->docParamPosition;
                $category->show             = $param->displayed;
                $category->allowedTypes = Array($param->docParamName);

                $category->columns       = [];
                $category->columns[]     = [];
                if(isset( $param->id)){
                    $category->columns[0][]  = $parameter;
                }
            }
            if(!in_array($category, $form->formName)){
                $form->formName[] = $category;
            }
        }

        return response()->json($form);
    }


    public function reorder_obj($obj){

        foreach($obj as $docParam => $docParamValues){
//            print_r($docParam);
            $obj[$docParam]['docParamPosition'] = $docParam;



            foreach($docParamValues['columns'][0] as $param => $values){
                $obj[$docParam]['columns'][0][$param]['position'] = $param;
            }
        }

        return $obj;
    }
//    public function saveCat(){
//
//    }
//    public function saveParam(){
//
//    }
//    public function saveJobseekerForm(){
//        $obj       = request();
//        if($obj->type == 'category'){
//            $this->saveCat($obj->obj);
//        }else if($obj->type == 'parameter'){
//            $this->saveParam($obj->obj);
//        }
//    }

    public function saveJobseekerForm(){

        $obj       = request()->form['formName'];
        $user_type = request()->type;

        if($user_type == 'jobseeker' || $user_type == 'employer' ){
            $doc_type = 1;
        }else{
            $doc_type = 2;
            $user_type = null;
        }

        if($obj){
            $obj = $this->reorder_obj($obj);
        }


        foreach($obj as $docParam => $docParamValues){

            if(isset($docParamValues['docParamId'])){
                $dp = DocParam::find($docParamValues['docParamId']);
            }else{
//                dd($docParamValues);
                $dp = new DocParam();
            }
            $dp->modify       = 1;
            $dp->displayed    = $docParamValues['show'];
            $dp->name         = $docParamValues['name'];
            $dp->doc_sub_type = $user_type;
            $dp->doc_type_id  = $doc_type;
            $dp->position     = $docParamValues['docParamPosition'];
            $dp->save();

            foreach($docParamValues['columns'][0] as $param => $values){

                if(isset($values['paramId'])){
                    $p = Param::find($values['paramId']);
                }else{
                    $p = new Param;
                }
                $p->name          = $values['name'];
                $p->doc_param_id  = $dp->id;
                $p->modify        = $values['modify'];
                $p->position      = $values['position'];
                $p->type_id       = $values['inputType'];
                $p->authorized          = $values['show'];
                $p->save();

            }

        }




        return $this->form($user_type);
    }

    public function saveOptions(){

        //
        //todo: need some way to format...spaces, underscores..etc...
        //
        //



        $option_id = request()->option_id;
        $options   = request()->options;
        $parameter = request()->parameter;

        foreach($options as $option => $values) {

            if(isset($values['text']) && $values['text'] !== "" && $values['text'] !== null) {


                $value_exists_for_param = ParamValue::where('value', '=', $values['text'])->where('param_id', '=', $parameter['paramId'])->value('id');

                if(isset($values['id'])){
                    $o = ParamValue::find($values['id']);
                    $o->param_id = $parameter['paramId'];
                    $o->parent_id = null;
                    $o->value = $values['text'];

                    $o->save();
                }else if(!$value_exists_for_param && !isset($values['id'])){
                    $o = new ParamValue;
                    $o->param_id = $parameter['paramId'];
                    $o->parent_id = null;
                    $o->value = $values['text'];
                    $o->save();
                }

            }else{
                if(isset($values['id']) && $values['text'] == ""){
                    $o = ParamValue::destroy($values['id']);
                }
            }
        }
    }


//    public function jobseekerForm(){
//
//
//
//        $params = DB::select(DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_user.*,
//											   param.id AS paramId,
//											   param.name AS paramName,
//											   param.position AS paramPosition,
//											   param.param_parent_id AS paramParent,
//											   doc_param.name AS docParamName,
//											   param_type.name AS paramType,
//											   doc_param.id AS docParamId
//											   FROM	param
//											   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
//											   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
//											   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
//											   LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id
//											   LEFT JOIN param_type ON param.type_id = param_type.id
//											   WHERE doc_type_id = 1
//											   AND doc_param.doc_sub_type = 'jobSeeker'
//											   AND authorized = 1
//											   ORDER BY paramPosition ASC;"));
//
//        $form      = new stdClass();
//        $category  = new stdClass();
//
//        foreach ($params as $k => $v) {
//
//            $iteration    = $v->iteration;
//            $docParamId   = $v->docParamId;
//            $docParamName = $v->docParamName;
//            $paramName    = $v->paramName;
//            $inputType    = $v->paramType;
//            $position     = $v->position;
//            $paramId      = $v->paramId;
//            $paramParent  = $v->paramParent;
//
//
//            $parameter       = new stdClass();
//            $parameter->type = "parameter";
//            $parameter->id   = $paramId;
//            $parameter->name = $paramName;
//            $parameter->position = $position;
//
//            $category        = new stdClass();
//            $category->type  = "category";
//            $category->id    = $docParamId;
//            $category->name  = $docParamName;
//            $category->position = $position;
//
//
//
//
//            $category->columns       = [];
//            $category->columns[]     = [];
//            $category->columns[0][]  = $parameter;
//
//
////            $form->jobseeker   = [];
//            $form->jobseeker[] = $category;
//
//
//
//
//
//
//        }
//
//        return response()->json($form);
//
//    }






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
    public function show($form)
    {

        $params =  DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_user.*,
											   param.name AS paramName,
											   param.position AS paramPosition,
											   param_type.name AS paramType,
											   doc_param.name AS docParamName,
											   doc_param.position AS docParamPosition,
											   doc_param.id AS docParamId,
											   param.id AS paramId
											   FROM	param
											   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
											   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
											   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
											   LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id
											   LEFT JOIN param_type ON param.type_id = param_type.id
											   WHERE doc_type_id = 2 AND authorized = 1 ORDER BY docParamPosition, paramPosition"));

        foreach($params as $k=>$v) {
            $paramName    = $v->paramName;
            $docParamName = $v->docParamName;
            $inputType    = $v->paramType;
            $docParamId   = $v->docParamId;
            $paramId      = $v->paramId;
            $position     = $v->paramPosition;
            $required     = $v->required;


            $post[$docParamName][0]['docParamId']           = $docParamId;
            $post[$docParamName][0][$paramId]['paramName']  = $paramName;
            $post[$docParamName][0][$paramId]['paramValue'] = '';
            $post[$docParamName][0][$paramId]['inputType']  = $inputType;
            $post[$docParamName][0][$paramId]['position']   = $position;
            $post[$docParamName][0][$paramId]['required']   = $required;


        }

        if($form == 'job'){
            $postInfo = Schema::getColumnListing('type_post');

            $postInfoKeys = array_flip($postInfo);
            foreach ($postInfoKeys as $key => $value) {
                $postInfoKeys[$key] = '';
            }
            $post['postInfo'] = $postInfoKeys;
        }

        return response()->json($post);

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
