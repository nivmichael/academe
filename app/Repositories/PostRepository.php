<?php

namespace App\Repositories;

use App\User;
use App\Post;
use DB;

use Schema;
use response;


class PostRepository
{

    public function index($user)
    {
        $user_type = $user['personal_information']['subtype'];
        if($user_type == 'employer'){
            return $this->forUser($user);
        }else{
            return $this->getAllPosts($user);
        }
    }

    public function getAllPosts($user)
    {
        $posts    = [];
        $postsArr = [];
        $params   = DB::select( DB::raw("SELECT param.*, sys_param_values.*,param_value.*,type_post.*,
										   param.name AS paramName,

										   param_type.name AS paramType,
										   param_value.value AS paramValue,
										   doc_param.name AS docParamName,
										   param.id AS paramId,
										   type_post.id AS postId,
										   param.param_parent_id AS paramParent,
										   doc_param.id AS docParamId
										   FROM	param
										   LEFT JOIN doc_param ON param.doc_param_id = doc_param.id
										   LEFT JOIN sys_param_values ON param.id = sys_param_values.param_id
										   LEFT JOIN param_value ON sys_param_values.value_ref = param_value.id
										   LEFT JOIN type_post ON sys_param_values.ref_id = type_post.id
										   LEFT JOIN param_type ON param.type_id = param_type.id"));
										//   WHERE  type_post.id = ".$id));
//        dd($params);
        foreach($params as $k=>$v) {

            $iteration    = $v->iteration;
            $docParamName = $v->docParamName;
            $paramName    = $v->paramName;
            $inputType    = $v->paramType;
            $paramParentId = $v->paramParent;
            $paramValue   = $v->paramValue;
            $docParamId   = $v->docParamId;
            $paramId      = $v->paramId;
            $postId       = $v->postId;


            if($v->value_ref == null) {
                $value = $v->value_short;
            } else {
                $value = $v->value;
            }

            $posts[$postId][$docParamName][$iteration]['docParamId'] = $docParamId;
            $posts[$postId][$docParamName][$iteration][$paramName]['paramValue'] = $value;
            $posts[$postId][$docParamName][$iteration][$paramName]['paramName']  = $paramName;
            $posts[$postId][$docParamName][$iteration][$paramName]['inputType'] = $inputType;
            $posts[$postId][$docParamName][$iteration][$paramName]['paramParentId'] = $paramParentId;
//            $posts[$postId]['postInfo']['id'] = $postId;

            }

        unset( $posts['']);
        foreach($posts as $post) {

//            $match = $this->calcMatchPercentage($post, $user);
//            $post['match'] = $match;

            $postsArr[] = $post;

        }
        //sorted on client side

        return $postsArr;

    }

    public function forUser($user)
    {
        $user_id = $user['personal_information']['id'];
        $user_posts = Post::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        $posts = [];
        foreach($user_posts as $post) {
            $match = $this->calcMatchPercentage($post, $user);
            $post['match'] = $match;
            $posts[] = $post;
        }
        //sorted on client side
        return $posts;

    }

    public function calcMatchPercentage($post, $user)
    {
        //dd($user);
        $match['total'] = 0.0;

        if ($post && $user) {
            if ($post['education']) {
                $degree_array = [];
                foreach($post['education'] as $post_education_iteration_key => $params) {
                    $degree_array[] = $params['degree']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($degree_array)) {
                    $num_of_variables++;
                    if (!empty($user['education'])) {
                        foreach ($user['education'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'degree') {
                                    if (in_array($param_properties['paramValue'], $degree_array)) {
                                        $score++;
                                        break 2;
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
                $major_array = [];
                foreach($post['education'] as $post_education_iteration_key => $params) {
                    $major_array[] = $params['major']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($major_array)) {
                    $num_of_variables++;
                    if (!empty($user['education'])) {
                        foreach ($user['education'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'major') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $major_array)) {
                                        if(in_array($param_properties['paramParentValue'], $degree_array )) {
                                            $score++;
                                            break 2;
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
                $minor_array = [];
                foreach($post['education'] as $post_education_iteration_key => $params) {
                    $minor_array[] = $params['minor']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($minor_array)) {
                    $num_of_variables++;
                    if (!empty($user['education'])) {
                        foreach ($user['education'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'minor') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $minor_array)) {
                                        if (in_array($param_properties['paramParentValue'], $major_array)) {
                                            $score++;
                                            break 2;
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
            }
            if ($post['employment']) {


                $user_career_goals_main_field_array = [];
                $user_career_goals_profession_array = [];

                foreach($user['career_goals'] as $iteration_key => $params) {
                    foreach($params as $param_id => $param_properties) {
                        if($param_properties['paramName'] == 'main_field') {
                            $user_career_goals_main_field_array[] = $param_properties['paramValue'];
                        }
                        if($param_properties['paramName'] == 'profession') {
                            $user_career_goals_profession_array[] = $param_properties['paramValue'];
                        }
                    }
                }



                $main_field_array = [];
                foreach($post['employment'] as $post_education_iteration_key => $params) {
                    $main_field_array[] = $params['main_field']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($main_field_array)) {
                    $num_of_variables++;
                    if (!empty($user['employment'])) {
                        foreach ($user['employment'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {


                                if($param_properties['paramName'] == 'main_field') {


                                    if (in_array($param_properties['paramValue'], $main_field_array)) {
                                        $score++;
                                        break 2;
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
                $profession_array = [];
                foreach($post['employment'] as $post_education_iteration_key => $params) {
                    $profession_array[] = $params['profession']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($profession_array)) {
                    $num_of_variables++;
                    if (!empty($user['employment'])) {
                        foreach ($user['employment'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'profession') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $profession_array)) {
                                        if (in_array($param_properties['paramParentValue'], $main_field_array)) {
                                            $score++;
                                            break 2;
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
            }
            if ($post['career_goals']) {
                $job_title_array = [];
                foreach($post['career_goals'] as $post_education_iteration_key => $params) {

                    $job_title_array[] = $params['job_title']['paramValue'] ;

                    $post['career_goals'][ $post_education_iteration_key]['main_field'] = $post['employment'][ $post_education_iteration_key]['main_field'];
                    $post['career_goals'][ $post_education_iteration_key]['profession'] = $post['employment'][ $post_education_iteration_key]['profession'];
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty( $job_title_array)) {
                    $num_of_variables++;
                    if (!empty($user['career_goals'])) {
                        foreach ($user['career_goals'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'job_title') {
                                    if (in_array($param_properties['paramValue'], $job_title_array)) {
                                        $score++;
                                        break 2;
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
                $language_array = [];
                foreach($post['career_goals'] as $post_education_iteration_key => $params) {
                    $language_array[] = $params['language']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($language_array)) {
                    $num_of_variables++;
                    if (!empty($user['career_goals'])) {
                        foreach ($user['career_goals'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'language') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $language_array)) {
                                        if (in_array($param_properties['paramParentValue'], $job_title_array)) {
                                            $score++;
                                            break 2;
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }
                $location_array = [];
                foreach($post['career_goals'] as $post_education_iteration_key => $params) {
                    $location_array[] = $params['location']['paramValue'] ;
                }
                $score = 0;
                $num_of_variables = 0;
                if (!empty($location_array)) {
                    $num_of_variables++;
                    if (!empty($user['career_goals'])) {
                        foreach ($user['career_goals'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'location') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $location_array)) {
                                        if (in_array($param_properties['paramParentValue'], $language_array)) {
                                            $score++;
                                            break 2;
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }


                $score = 0;
                $num_of_variables = 0;
                if (!empty($user_career_goals_main_field_array)) {
                    $num_of_variables++;
                    if (!empty($user['career_goals'])) {
                        foreach ($user['career_goals'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'main_field') {


                                    if (in_array($param_properties['paramValue'], $user_career_goals_main_field_array)) {
                                        $score++;
                                        break 2;
                                    };

                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }

                $score = 0;
                $num_of_variables = 0;
                if (!empty($user_career_goals_profession_array)) {
                    $num_of_variables++;
                    if (!empty($user['career_goals'])) {
                        foreach ($user['career_goals'] as $user_education_iteration_key => $params) {
                            unset($params['docParamId']);
                            foreach($params as $param_id => $param_properties) {
                                if($param_properties['paramName'] == 'profession') {
                                    if(isset($param_properties['paramParentId']) && $param_properties['paramParentId'] != null && $param_properties['paramParentId'] != 0) {
                                        $param_properties['paramParentValue'] = $params[$param_properties['paramParentId']]['paramValue'];
                                    }
                                    if (in_array($param_properties['paramValue'], $user_career_goals_main_field_array)) {
                                        if (in_array($param_properties['paramParentValue'], $user_career_goals_profession_array)) {
                                            $score++;
                                            break 2;
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
                if ($num_of_variables > 0) {
                    $match['total'] = $match['total'] + ($score/$num_of_variables)*0.1;
                }

            }
        }
        return  round($match['total']*100)  ;
    }

}