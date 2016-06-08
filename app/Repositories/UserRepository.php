<?php

namespace App\Repositories;

use App\User;
use App\Post;
use DB;

use Schema;
use response;


class UserRepository
{

    public function getAll()
    {
        return Post::all();
    }

    public function all(User $user)
    {
        $id = $user->id;
        $user = array();
        $userpersonal_information = User::find($id);
        $params = DB::select(DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_user.*,

											   param.id AS paramId,
											   param.name AS paramName,
											   param.position AS paramPosition,
											   param.param_parent_id AS paramParent,
											   doc_param.name AS docParamName,
											   param_type.name AS paramType,
											   doc_param.id AS docParamId
										   FROM	param
										   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
										   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
										   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
										   LEFT JOIN type_user ON sys_param_values.ref_id = type_user.id
										   LEFT JOIN param_type ON param.type_id = param_type.id
										   WHERE doc_type_id = 1
										   AND type_user.id = " . $id));

        //return($params);
        $user['personal_information'] = $userpersonal_information['original'];

        foreach ($params as $k => $v) {
            $iteration = $v->iteration;
            $docParamId = $v->docParamId;
            $docParamName = $v->docParamName;
            $paramName = $v->paramName;
            $inputType = $v->paramType;

            $position = $v->position;
            $paramId = $v->paramId;
            $paramParent = $v->paramParent;

            if ($v->value_ref == null) {
                $value = $v->value_short;
            } else {
                $value = $v->value;
            }

            if ($iteration !== NULL) {


                $values = array();
                if ($inputType == 'checklist') {
                    $value = explode('|', $value);
                    foreach ($value as $key => $value) {
                        //			$paramOptions[$key] = [];
//
//						$option['value'] = $value;
//						$option['text'] = $value;
//						$values[]  =$option;
                        if ($value) {
                            $values[] = $value;
                        }
                    }
                }
                if ($values) {
                    $value = $values;
                }


                $user[$docParamName][$iteration]['docParamId'] = $docParamId;
                $user[$docParamName][$iteration][$paramId]['paramName'] = $paramName;
                $user[$docParamName][$iteration][$paramId]['paramId'] = $paramId;
                $user[$docParamName][$iteration][$paramId]['paramParentId'] = $paramParent;

                $user[$docParamName][$iteration][$paramId]['paramValue'] = $value;
                $user[$docParamName][$iteration][$paramId]['inputType'] = $inputType;
            } elseif ($iteration == NULL) {

                $values = array();
                if ($inputType == 'checklist') {
                    $value = explode('|', $value);
                    foreach ($value as $key => $value) {

                        if ($value) {
                            $values[] = $value;
                        }
                    }
                }
                if ($values) {
                    $value = $values;
                }
                $user[$docParamName]['docParamId'] = $docParamId;
                $user[$docParamName][$paramId]['paramName'] = $paramName;
                $user[$docParamName][$paramId]['paramId'] = $paramId;
                $user[$docParamName][$paramId]['paramParentId'] = $paramParent;

                $user[$docParamName][$paramId]['paramValue'] = $value;
                $user[$docParamName][$paramId]['inputType'] = $inputType;

            }
        }
        return $user;
        //return Response::json($user);

    }




}