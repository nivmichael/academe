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