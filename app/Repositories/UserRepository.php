<?php

namespace App\Repositories;

use App\User;
use App\SysParamValues;
use App\DocParam;
use App\Post;
use App\an_apply;
use App\Role;
use App\Param;
use App\Permission;
use DB;

use Schema;
use response;


class UserRepository
{


    public function getUserRoles(User $user)
    {
        $id = $user->id;
        $roles =  [];
        foreach(User::find($id)->roles as $role )
        {
            $roles[] =  $role->name;
        }
        return $roles;

    }

    public function getLabeledPosts(User $user)
    {



        $id = $user->id;
        $posts = [];
        $appliedIds = DB::table('sys_param_values as spv')
                        ->leftJoin( 'param as p',      DB::raw( 'p.id'  ), '=', DB::raw( 'spv.param_id' ) )
                        ->leftJoin( 'doc_param as dp', DB::raw( 'dp.id' ), '=', DB::raw( 'p.doc_param_id' ) )
                        ->where('p.name', '=', 'applied')
                        ->where('spv.ref_id', '=', $id)
                        ->where( 'dp.doc_sub_type', '=', $user->subtype)
                        ->value('spv.value_short');

        $explode = explode('|', $appliedIds);
        foreach($explode as $postId){
            if($postId != '' && $postId != null)
            $posts['applied'][] = (int) $postId;
        }

        return $posts;

    }



    //query builder
    public function all(User $user, $namedKeys = null)
    {

        $id = $user->id;
        $params = DB::table('param as p')->orderBy('p.position', 'ASC')

            ->leftJoin( 'doc_param as dp',         DB::raw( 'dp.id'          ), '=', DB::raw( 'p.doc_param_id' ) )
            ->leftJoin( 'doc_type as dt' ,         DB::raw( 'dp.doc_type_id' ), '=', DB::raw( 'dt.id' ) )
            ->leftJoin( 'sys_param_values as spv', DB::raw( 'p.id'           ), '=', DB::raw( 'spv.param_id' ) )
            ->leftJoin( 'param_value as pv',       DB::raw( 'spv.value_ref'  ), '=', DB::raw( 'pv.id' ) )
            ->leftJoin( 'type_user as u',          DB::raw( 'spv.ref_id'     ), '=', DB::raw( 'u.id' ) )
            ->leftJoin( 'param_type as pt',        DB::raw( 'p.type_id'      ), '=', DB::raw( 'pt.id' ) )

            // where value_short / value_long / value_ref not null ?
            ->where('dp.doc_sub_type', '!=', null)
            ->where('u.id', '=', $id)
            ->where('dp.displayed', '=', 1 )
            ->select( DB::raw( 'dp.id as docParamId,
                                dp.name as docParamName,
                                dp.position as docParamPosition,
                                dp.modify as docParamModify,
                                dp.displayed as docParamDisplay,
                                p.id as paramId,
                                p.position as paramPosition,
                                p.name as paramName,
                                p.authorized as paramDisplay,
                                p.param_parent_id as paramParent,
                                pt.name as paramTypeName,
                                u.id as userId,
                                spv.id as spvId,
                                spv.*' ) )
            ->get();

        foreach ($params as $k => $v) {
            $iteration    = $v->iteration;
            $docParamId   = $v->docParamId;
            $docParamName = $v->docParamName;
            $paramName    = $v->paramName;
            $inputType    = $v->paramTypeName;

            $position     = $v->paramPosition;
            $paramId      = $v->paramId;
            $paramParent  = $v->paramParent;

            if ($v->value_ref == null) {
                $value = $v->value_short;
            } else {
                $value = $v->value;
            }
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
            if($namedKeys){
                $key = $paramName;
            }else{
                $key = $paramId;
            }
            $u[$docParamName][$iteration]['docParamId'] = $docParamId;
            $u[$docParamName][$iteration][$key]['paramName'] = $paramName;
            $u[$docParamName][$iteration][$key]['paramId'] = $paramId;
            $u[$docParamName][$iteration][$key]['paramParentId'] = $paramParent;
            $u[$docParamName][$iteration][$key]['paramValue'] = $value;
            $u[$docParamName][$iteration][$key]['inputType'] = $inputType;

        }
        $u['personal_information'] = $user['original'];
        return $u;

    }

    public function all2(User $user)
    {
        $user = User::find($user->id);
        $user->sysParamValues;
        return $user;
    }


}