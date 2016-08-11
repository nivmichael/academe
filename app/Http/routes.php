<?php


/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|



+--------+-----------+------------------------------------------+----------------------------+--------------------------------------------------------------+--------------------------------------------------------+
| Domain | Method    | URI                                      | Name                       | Action                                                       | Middleware                                             |
+--------+-----------+------------------------------------------+----------------------------+--------------------------------------------------------------+--------------------------------------------------------+
|        | GET|HEAD  | /                                        |                            | Closure                                                      | web,domain                                             |
|        | POST      | api/admin/forms/jobseeker                |                            | App\Http\Controllers\FormController@saveJobseekerForm        | web,domain                                             |
|        | POST      | api/admin/forms/options                  |                            | App\Http\Controllers\FormController@saveOptions              | web,domain                                             |
|        | GET|HEAD  | api/admin/forms/{form}                   |                            | App\Http\Controllers\FormController@form                     | web,domain                                             |
|        | POST      | api/an_apply                             | api.an_apply.store         | App\Http\Controllers\An_applyController@store                | web,domain                                             |
|        | GET|HEAD  | api/an_apply                             | api.an_apply.index         | App\Http\Controllers\An_applyController@index                | web,domain                                             |
|        | GET|HEAD  | api/an_apply/create                      | api.an_apply.create        | App\Http\Controllers\An_applyController@create               | web,domain                                             |
|        | DELETE    | api/an_apply/{an_apply}                  | api.an_apply.destroy       | App\Http\Controllers\An_applyController@destroy              | web,domain                                             |
|        | PUT|PATCH | api/an_apply/{an_apply}                  | api.an_apply.update        | App\Http\Controllers\An_applyController@update               | web,domain                                             |
|        | GET|HEAD  | api/an_apply/{an_apply}                  | api.an_apply.show          | App\Http\Controllers\An_applyController@show                 | web,domain                                             |
|        | GET|HEAD  | api/an_apply/{an_apply}/edit             | api.an_apply.edit          | App\Http\Controllers\An_applyController@edit                 | web,domain                                             |
|        | GET|HEAD  | api/an_open_file                         | api.an_open_file.index     | App\Http\Controllers\An_open_fileController@index            | web,domain                                             |
|        | POST      | api/an_open_file                         | api.an_open_file.store     | App\Http\Controllers\An_open_fileController@store            | web,domain                                             |
|        | GET|HEAD  | api/an_open_file/create                  | api.an_open_file.create    | App\Http\Controllers\An_open_fileController@create           | web,domain                                             |
|        | GET|HEAD  | api/an_open_file/{an_open_file}          | api.an_open_file.show      | App\Http\Controllers\An_open_fileController@show             | web,domain                                             |
|        | PUT|PATCH | api/an_open_file/{an_open_file}          | api.an_open_file.update    | App\Http\Controllers\An_open_fileController@update           | web,domain                                             |
|        | DELETE    | api/an_open_file/{an_open_file}          | api.an_open_file.destroy   | App\Http\Controllers\An_open_fileController@destroy          | web,domain                                             |
|        | GET|HEAD  | api/an_open_file/{an_open_file}/edit     | api.an_open_file.edit      | App\Http\Controllers\An_open_fileController@edit             | web,domain                                             |
|        | POST      | api/an_search                            | api.an_search.store        | App\Http\Controllers\An_searchController@store               | web,domain                                             |
|        | GET|HEAD  | api/an_search                            | api.an_search.index        | App\Http\Controllers\An_searchController@index               | web,domain                                             |
|        | GET|HEAD  | api/an_search/create                     | api.an_search.create       | App\Http\Controllers\An_searchController@create              | web,domain                                             |
|        | GET|HEAD  | api/an_search/{an_search}                | api.an_search.show         | App\Http\Controllers\An_searchController@show                | web,domain                                             |
|        | DELETE    | api/an_search/{an_search}                | api.an_search.destroy      | App\Http\Controllers\An_searchController@destroy             | web,domain                                             |
|        | PUT|PATCH | api/an_search/{an_search}                | api.an_search.update       | App\Http\Controllers\An_searchController@update              | web,domain                                             |
|        | GET|HEAD  | api/an_search/{an_search}/edit           | api.an_search.edit         | App\Http\Controllers\An_searchController@edit                | web,domain                                             |
|        | GET|HEAD  | api/authenticate                         | api.authenticate.index     | App\Http\Controllers\AuthenticateController@index            | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/authenticate                         |                            | App\Http\Controllers\AuthenticateController@authenticate     | web,domain                                             |
|        | GET|HEAD  | api/columns/jobPost                      |                            | App\Http\Controllers\TypePostController@jobPostColumnIndex   | web,domain                                             |
|        | POST      | api/db                                   | api.db.store               | App\Http\Controllers\DBController@store                      | web,domain                                             |
|        | GET|HEAD  | api/db                                   | api.db.index               | App\Http\Controllers\DBController@index                      | web,domain                                             |
|        | GET|HEAD  | api/db/create                            | api.db.create              | App\Http\Controllers\DBController@create                     | web,domain                                             |
|        | PUT|PATCH | api/db/{db}                              | api.db.update              | App\Http\Controllers\DBController@update                     | web,domain                                             |
|        | DELETE    | api/db/{db}                              | api.db.destroy             | App\Http\Controllers\DBController@destroy                    | web,domain                                             |
|        | GET|HEAD  | api/db/{db}                              | api.db.show                | App\Http\Controllers\DBController@show                       | web,domain                                             |
|        | GET|HEAD  | api/db/{db}/edit                         | api.db.edit                | App\Http\Controllers\DBController@edit                       | web,domain                                             |
|        | POST      | api/deleteIterable                       |                            | App\Http\Controllers\docParamController@deleteIterable       | web,domain                                             |
|        | POST      | api/docParam                             | api.docParam.store         | App\Http\Controllers\DocParamController@store                | web,domain                                             |
|        | GET|HEAD  | api/docParam                             | api.docParam.index         | App\Http\Controllers\DocParamController@index                | web,domain                                             |
|        | GET|HEAD  | api/docParam/create                      | api.docParam.create        | App\Http\Controllers\DocParamController@create               | web,domain                                             |
|        | GET|HEAD  | api/docParam/{docParam}                  | api.docParam.show          | App\Http\Controllers\DocParamController@show                 | web,domain                                             |
|        | DELETE    | api/docParam/{docParam}                  | api.docParam.destroy       | App\Http\Controllers\DocParamController@destroy              | web,domain                                             |
|        | PUT|PATCH | api/docParam/{docParam}                  | api.docParam.update        | App\Http\Controllers\DocParamController@update               | web,domain                                             |
|        | GET|HEAD  | api/docParam/{docParam}/edit             | api.docParam.edit          | App\Http\Controllers\DocParamController@edit                 | web,domain                                             |
|        | POST      | api/docType                              | api.docType.store          | App\Http\Controllers\DocTypeController@store                 | web,domain                                             |
|        | GET|HEAD  | api/docType                              | api.docType.index          | App\Http\Controllers\DocTypeController@index                 | web,domain                                             |
|        | GET|HEAD  | api/docType/create                       | api.docType.create         | App\Http\Controllers\DocTypeController@create                | web,domain                                             |
|        | PUT|PATCH | api/docType/{docType}                    | api.docType.update         | App\Http\Controllers\DocTypeController@update                | web,domain                                             |
|        | DELETE    | api/docType/{docType}                    | api.docType.destroy        | App\Http\Controllers\DocTypeController@destroy               | web,domain                                             |
|        | GET|HEAD  | api/docType/{docType}                    | api.docType.show           | App\Http\Controllers\DocTypeController@show                  | web,domain                                             |
|        | GET|HEAD  | api/docType/{docType}/edit               | api.docType.edit           | App\Http\Controllers\DocTypeController@edit                  | web,domain                                             |
|        | GET|HEAD  | api/employerSteps                        |                            | App\Http\Controllers\DocParamController@employerSteps        | web,domain                                             |
|        | POST      | api/form                                 | api.form.store             | App\Http\Controllers\FormController@store                    | web,domain                                             |
|        | GET|HEAD  | api/form                                 | api.form.index             | App\Http\Controllers\FormController@index                    | web,domain                                             |
|        | GET|HEAD  | api/form/create                          | api.form.create            | App\Http\Controllers\FormController@create                   | web,domain                                             |
|        | PUT|PATCH | api/form/{form}                          | api.form.update            | App\Http\Controllers\FormController@update                   | web,domain                                             |
|        | GET|HEAD  | api/form/{form}                          | api.form.show              | App\Http\Controllers\FormController@show                     | web,domain                                             |
|        | DELETE    | api/form/{form}                          | api.form.destroy           | App\Http\Controllers\FormController@destroy                  | web,domain                                             |
|        | GET|HEAD  | api/form/{form}/edit                     | api.form.edit              | App\Http\Controllers\FormController@edit                     | web,domain                                             |
|        | GET|HEAD  | api/forms/employer                       |                            | App\Http\Controllers\TypeUserController@columnIndexEmployer  | web,domain                                             |
|        | GET|HEAD  | api/forms/jobPost                        |                            | App\Http\Controllers\TypePostController@jobPostColumnIndex   | web,domain                                             |
|        | GET|HEAD  | api/forms/jobseeker                      |                            | App\Http\Controllers\TypeUserController@columnIndexJobSeeker | web,domain                                             |
|        | GET|HEAD  | api/getAllOptionValues                   |                            | App\Http\Controllers\ParamValueController@getAllOptionValues | web,domain                                             |
|        | GET|HEAD  | api/getAllPosts                          |                            | App\Http\Controllers\PostController@index                    | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/job/apply/{id}                       |                            | App\Http\Controllers\LabelController@apply                   | web,domain                                             |
|        | GET|HEAD  | api/job/{id}                             |                            | App\Http\Controllers\TypePostController@show                 | web,domain                                             |
|        | GET|HEAD  | api/jobseekerSteps                       |                            | App\Http\Controllers\DocParamController@jobseekerSteps       | web,domain                                             |
|        | GET|HEAD  | api/me                                   |                            | App\Http\Controllers\TypeUserController@getAccount           | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/me                                   |                            | App\Http\Controllers\TypeUserController@updateUser           | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/param                                | api.param.store            | App\Http\Controllers\ParamController@store                   | web,domain                                             |
|        | GET|HEAD  | api/param                                | api.param.index            | App\Http\Controllers\ParamController@index                   | web,domain                                             |
|        | GET|HEAD  | api/param/create                         | api.param.create           | App\Http\Controllers\ParamController@create                  | web,domain                                             |
|        | GET|HEAD  | api/param/{param}                        | api.param.show             | App\Http\Controllers\ParamController@show                    | web,domain                                             |
|        | DELETE    | api/param/{param}                        | api.param.destroy          | App\Http\Controllers\ParamController@destroy                 | web,domain                                             |
|        | PUT|PATCH | api/param/{param}                        | api.param.update           | App\Http\Controllers\ParamController@update                  | web,domain                                             |
|        | GET|HEAD  | api/param/{param}/edit                   | api.param.edit             | App\Http\Controllers\ParamController@edit                    | web,domain                                             |
|        | POST      | api/paramType                            | api.paramType.store        | App\Http\Controllers\ParamTypeController@store               | web,domain                                             |
|        | GET|HEAD  | api/paramType                            | api.paramType.index        | App\Http\Controllers\ParamTypeController@index               | web,domain                                             |
|        | GET|HEAD  | api/paramType/create                     | api.paramType.create       | App\Http\Controllers\ParamTypeController@create              | web,domain                                             |
|        | GET|HEAD  | api/paramType/{paramType}                | api.paramType.show         | App\Http\Controllers\ParamTypeController@show                | web,domain                                             |
|        | DELETE    | api/paramType/{paramType}                | api.paramType.destroy      | App\Http\ Controllers\ParamTypeController@destroy             | web,domain                                             |
|        | PUT|PATCH | api/paramType/{paramType}                | api.paramType.update       | App\Http\Controllers\ParamTypeController@update              | web,domain                                             |
|        | GET|HEAD  | api/paramType/{paramType}/edit           | api.paramType.edit         | App\Http\Controllers\ParamTypeController@edit                | web,domain                                             |
|        | GET|HEAD  | api/paramValue                           | api.paramValue.index       | App\Http\Controllers\ParamValueController@index              | web,domain                                             |
|        | POST      | api/paramValue                           | api.paramValue.store       | App\Http\Controllers\ParamValueController@store              | web,domain                                             |
|        | GET|HEAD  | api/paramValue/create                    | api.paramValue.create      | App\Http\Controllers\ParamValueController@create             | web,domain                                             |
|        | DELETE    | api/paramValue/{paramValue}              | api.paramValue.destroy     | App\Http\Controllers\ParamValueController@destroy            | web,domain                                             |
|        | PUT|PATCH | api/paramValue/{paramValue}              | api.paramValue.update      | App\Http\Controllers\ParamValueController@update             | web,domain                                             |
|        | GET|HEAD  | api/paramValue/{paramValue}              | api.paramValue.show        | App\Http\Controllers\ParamValueController@show               | web,domain                                             |
|        | GET|HEAD  | api/paramValue/{paramValue}/edit         | api.paramValue.edit        | App\Http\Controllers\ParamValueController@edit               | web,domain                                             |
|        | GET|HEAD  | api/password/email                       |                            | App\Http\Controllers\Auth\PasswordController@getEmail        | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | api/password/email                       |                            | App\Http\Controllers\Auth\PasswordController@postEmail       | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | api/password/reset                       |                            | App\Http\Controllers\Auth\PasswordController@postReset       | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | GET|HEAD  | api/password/reset/{token}               |                            | App\Http\Controllers\Auth\PasswordController@getReset        | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | api/post                                 | api.post.store             | App\Http\Controllers\PostController@store                    | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/post                                 | api.post.index             | App\Http\Controllers\PostController@index                    | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/post/create                          | api.post.create            | App\Http\Controllers\PostController@create                   | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | PUT|PATCH | api/post/{post}                          | api.post.update            | App\Http\Controllers\PostController@update                   | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | DELETE    | api/post/{post}                          | api.post.destroy           | App\Http\Controllers\PostController@destroy                  | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/post/{post}                          | api.post.show              | App\Http\Controllers\PostController@show                     | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/post/{post}/edit                     | api.post.edit              | App\Http\Controllers\PostController@edit                     | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/signup                               |                            | App\Http\Controllers\AuthenticateController@signup           | web,domain                                             |
|        | GET|HEAD  | api/steps                                |                            | App\Http\Controllers\StepController@index                    | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/sysParamValues                       | api.sysParamValues.store   | App\Http\Controllers\SysParamValuesController@store          | web,domain                                             |
|        | GET|HEAD  | api/sysParamValues                       | api.sysParamValues.index   | App\Http\Controllers\SysParamValuesController@index          | web,domain                                             |
|        | GET|HEAD  | api/sysParamValues/create                | api.sysParamValues.create  | App\Http\Controllers\SysParamValuesController@create         | web,domain                                             |
|        | DELETE    | api/sysParamValues/{sysParamValues}      | api.sysParamValues.destroy | App\Http\Controllers\SysParamValuesController@destroy        | web,domain                                             |
|        | GET|HEAD  | api/sysParamValues/{sysParamValues}      | api.sysParamValues.show    | App\Http\Controllers\SysParamValuesController@show           | web,domain                                             |
|        | PUT|PATCH | api/sysParamValues/{sysParamValues}      | api.sysParamValues.update  | App\Http\Controllers\SysParamValuesController@update         | web,domain                                             |
|        | GET|HEAD  | api/sysParamValues/{sysParamValues}/edit | api.sysParamValues.edit    | App\Http\Controllers\SysParamValuesController@edit           | web,domain                                             |
|        | GET|HEAD  | api/users                                | api.users.index            | App\Http\Controllers\TypeUserController@index                | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/users                                | api.users.store            | App\Http\Controllers\TypeUserController@store                | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/users/create                         | api.users.create           | App\Http\Controllers\TypeUserController@create               | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/users/{users}                        | api.users.show             | App\Http\Controllers\TypeUserController@show                 | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | DELETE    | api/users/{users}                        | api.users.destroy          | App\Http\Controllers\TypeUserController@destroy              | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | PUT|PATCH | api/users/{users}                        | api.users.update           | App\Http\Controllers\TypeUserController@update               | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | GET|HEAD  | api/users/{users}/edit                   | api.users.edit             | App\Http\Controllers\TypeUserController@edit                 | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | api/validate                             |                            | App\Http\Controllers\AuthenticateController@validateThis     | web,domain                                             |
|        | GET|HEAD  | comment                                  |                            | Closure                                                      | web,domain                                             |
|        | GET|HEAD  | layout                                   |                            | App\Http\Controllers\SitesController@getLayout               | web,domain                                             |
|        | GET|HEAD  | param/{paramName}/{docParamId}/{isPost?} | whatever                   | App\Http\Controllers\ParamValueController@getOptionValues    | web,domain                                             |
|        | GET|HEAD  | password/email                           |                            | App\Http\Controllers\Auth\PasswordController@getEmail        | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | password/email                           |                            | App\Http\Controllers\Auth\PasswordController@postEmail       | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | password/reset                           |                            | App\Http\Controllers\Auth\PasswordController@postReset       | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | GET|HEAD  | password/reset/{token}                   |                            | App\Http\Controllers\Auth\PasswordController@getReset        | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
|        | POST      | setStatus                                |                            | App\Http\Controllers\TypeUserController@setStatus            | web,domain,Tymon\JWTAuth\Middleware\GetUserFromToken   |
|        | POST      | verifyToken                              |                            | App\Http\Controllers\Auth\PasswordController@verifyToken     | web,domain,App\Http\Middleware\RedirectIfAuthenticated |
+--------+-----------+------------------------------------------+----------------------------+--------------------------------------------------------------+--------------------------------------------------------+
 *
 *
 * */
use App\Role;
use App\Permission;
use App\User;

Route::get('/start', function()
{

//      $user = User::where('email', '=', 'dor@acade-me.co.il')->first();
//      $admin = Role::where('name','=','tech_admin')->first();
//        $jobseeker = Role::where('name','=','jobseeker')->first();
//
//    $read    = Permission::where('name','=','can_read')->first();
//      $edit    = Permission::where('name','=','can_edit')->first();
//      $delete  = Permission::where('name','=','can_delete')->first();
//      $admin->attachPermission($delete);
//      $admin->attachPermission($read);
//    $jobseeker = new Role();
//    $jobseeker->name = 'jobseeker';
//    $jobseeker->save();
//
//    $employer = new Role();
//    $employer->name = 'employer';
//    $employer->save();

//    $user->attachRole($jobseeker);
//
//    $content_admin = new Role();
//    $content_admin->name = 'content_admin';
//    $content_admin->save();
//
//    $faculty = new Role();
//    $faculty->name = 'faculty';
//    $faculty->save();
//
//    $tech_admin = new Role();
//    $tech_admin->name = 'tech_admin';
//    $tech_admin->save();
//
//    $read = new Permission();
//    $read->name = 'can_read';
//    $read->display_name = 'Can Read';
//    $read->save();
//
//    $edit = new Permission();
//    $edit->name = 'can_edit';
//    $edit->display_name = 'Can Edit';
//    $edit->save();

//    $edit = new Permission();
//    $edit->name = 'can_editFromSelfAcc';
//    $edit->display_name = 'Can edit from own account';
//    $edit->save();
//
//    $delete = new Permission();
//    $delete->name = 'can_deleteFromSelfAcc';
//    $delete->display_name = 'Can delete from own account';
//    $delete->save();

//    //permissions
//    $user->attachPermission($read);
//
//    $guest->attachPermission($read);
//    $content_admin->attachPermission($edit);
//
//    $tech_admin->attachPermission($read);
//    $tech_admin->attachPermission($edit);
//
//    $faculty->attachPermission($read);
//    $faculty->attachPermission($edit);
//
//    $user1 = User::find(139);
////    $user2 = User::find(2);
////    $user3 = User::find(3);
////    $user4 = User::find(4);
////
//    $user1->attachRole($tech_admin);
////    $user2->attachRole($content_admin);
////    $user3->attachRole($tech_admin);
////    $user4->attachRole($faculty);

    return 'Woohoo!';
});


Route::group(['domain' => 'localhost'], function(){

});

Route::group(['middleware' => ['web','domain']], function () {
    //comment is a dev tool..
    Route::any('/comment', function () { return view('comment'); });

    //index - the only page that actually displays..
    Route::get('/', function () { return view('index'); });

    // get logo and colors
    Route::get('layout', 'SitesController@getLayout');

    //api
    Route::group(['prefix' => 'api'], function()
    {
        //auth
        Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
        Route::post('/authenticate',    'AuthenticateController@authenticate');
        Route::post('/signup',          'AuthenticateController@signup');

        // Password reset routes... - this block of routes was outside `api` too -
        // so maybe it has to be outside i dont know..because gmail stmp doesnt work..again

        Route::post('/password/email',        'Auth\PasswordController@postEmail');
        Route::get('/password/reset/{token}', 'Auth\PasswordController@getReset');
        Route::post('/password/reset',        'Auth\PasswordController@postReset');

        //get my account
        Route::get('/me',                 'TypeUserController@getAccount');
        Route::post('/me',                'TypeUserController@updateUser');
        Route::post('/deleteIterable',    'sysParamValuesController@deleteIterable');
        Route::get('/getAllPosts',        'PostController@index');
        Route::get('/getAllOptionValues', 'ParamValueController@getAllOptionValues');

        //should use a resource
        Route::post('/job/apply/{id}',    'LabelController@apply');
        Route::post('/job/unApply/{id}',  'LabelController@unApply');

//        Route::get('/isApplied', 'An_applyController@checkApplication');


        //Steps - there is a chance i dont even need this because the steps are coming from the Form service anyway;
        Route::get('/steps' ,'StepController@index');

        //async validation for registration
        Route::post('/validate', 'AuthenticateController@validateThis');
        Route::post('/validatePost', 'PostController@validatePost');

        Route::resource('/post',           'PostController');
        Route::resource('/param',          'ParamController');
        Route::resource('/sysParamValues', 'SysParamValuesController');
        Route::resource('/paramValue',     'ParamValueController');
        Route::resource('/paramType',      'ParamTypeController');
        Route::resource('/docType',        'DocTypeController');
        Route::resource('/docParam',       'DocParamController');
        Route::resource('/users',          'TypeUserController');
        Route::resource('/db',             'DBController');
        Route::resource('/an_search',      'An_searchController');
        Route::resource('/an_apply',       'An_applyController');
        Route::resource('/an_open_file',   'An_open_fileController');
        Route::resource('/form',           'FormController');
        Route::resource('/role',           'RoleController');
        Route::resource('/permission',     'PermissionController');

        //admin form manager
        //  '/admin/forms/options' important that it is above '/admin/forms/{form}'
        Route::post('/admin/forms/options', 'FormController@saveOptions');
        Route::get('/admin/forms/{form}',   'FormController@form');
        Route::post('/admin/forms/{form}',  'FormController@saveForm');
        Route::post('/admin/forms/save',    'FormController@saveForm');

        Route::get('/jobseekerSteps', 'DocParamController@jobseekerSteps');

    });

    Route::get('/password/email',         'Auth\PasswordController@getEmail');
    Route::post('verifyToken', 'Auth\PasswordController@verifyToken');
    Route::post('/setStatus' ,'TypeUserController@setStatus');
    Route::get('/param/{paramName}/{docParamId}/{isPost?}', ['as'=>'whatever','uses'=>'ParamValueController@getOptionValues']);

});






















//      this is for auth with linkdin and all that stuff
//      Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);


//        deprecated
//        Route::get('/jobseekerSteps', 'DocParamController@jobseekerSteps');
//        Route::get('/employerSteps', 'DocParamController@employerSteps');
//        Route::get('/forms/jobseeker', 'FormController@jobseeker');
//        Route::get('/forms/employer',  'FormController@employer');

//        deprecated
//        Route::get('/forms/jobseeker', 'TypeUserController@columnIndexJobSeeker');
//        Route::get('/forms/employer',  'TypeUserController@columnIndexEmployer');
//        Route::get('/job/{id}', 'TypePostController@show');

//        //get the form for new - see how we can use resource instead
//        Route::get('/forms/jobPost',   'TypePostController@jobPostColumnIndex');
//    Route::resource('/api/posts/{userId?}', 'PostController');

