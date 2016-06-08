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
*/


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
Route::group(['domain' => 'localhost'], function(){

});

Route::group(['middleware' => ['web','domain']], function () {

    Route::get('/', function () { return view('index'); });
    Route::get('layout', 'SitesController@getLayout');

    Route::group(['prefix' => 'api'], function()
    {

        //get the forms steps
        Route::get('/jobseekerSteps', 'DocParamController@jobseekerSteps');
        Route::get('/employerSteps', 'DocParamController@employerSteps');

        Route::get('/forms/register_jobseeker', 'TypeUserController@columnIndexJobSeeker');
        Route::get('/forms/register_employer', 'TypeUserController@columnIndexEmployer');


        Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
        Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);
        Route::get('/password/email', 'Auth\PasswordController@getEmail');
        Route::post('/password/email', 'Auth\PasswordController@postEmail');

        // Password reset routes...
        Route::get('/password/reset/{token}', 'Auth\PasswordController@getReset');
        Route::post('/password/reset', 'Auth\PasswordController@postReset');
        Route::post('/authenticate', 'AuthenticateController@authenticate');
        Route::post('/signup', 'AuthenticateController@signup');

        //get my account
        Route::get('/me', 'TypeUserController@getAccount');
        Route::post('/me', 'TypeUserController@updateUser');
        Route::get('/forms/jobPost', 'TypePostController@jobPostColumnIndex');
        Route::post('/deleteIterable', 'docParamController@deleteIterable');
        Route::get('/getAllPosts', 'PostController@index');
        Route::get('/getAllOptionValues', 'ParamValueController@getAllOptionValues');

        //job post
        Route::get('/columns/jobPost' ,'TypePostController@jobPostColumnIndex');
        Route::get('/job/{id}', 'TypePostController@show');
        Route::post('savePost', 'PostController@savePost');

        //Steps
        Route::get('/steps' ,'StepController@index');

        //validate
        Route::post('/validate', 'AuthenticateController@validateThis');



        //resource CRUD

        Route::resource('/post', 'PostController');
        Route::resource('/param', 'ParamController');
        Route::resource('/sysParamValues', 'SysParamValuesController');
        Route::resource('/paramValue', 'ParamValueController');
        Route::resource('/paramType', 'ParamTypeController');
        Route::resource('/docType', 'DocTypeController');
        Route::resource('/docParam', 'DocParamController');
        Route::resource('/users', 'TypeUserController');
        Route::resource('/db', 'DBController');

        Route::resource('/form', 'FormController');

        //admin form manager
        Route::get('/admin/forms/{form}', 'FormController@form');
        Route::post('/admin/forms/jobseeker', 'FormController@saveJobseekerForm');
        Route::post('/admin/forms/options', 'FormController@saveOptions');

    });

    // Password reset link request routes...
    Route::get('/password/email', 'Auth\PasswordController@getEmail');
    Route::post('/password/email', 'Auth\PasswordController@postEmail');

    // Password reset routes...
    Route::get('/password/reset/{token}', 'Auth\PasswordController@getReset');
    Route::post('/password/reset', 'Auth\PasswordController@postReset');
    Route::post('verifyToken', 'Auth\PasswordController@verifyToken');
    Route::post('/setStatus' ,'TypeUserController@setStatus');
    Route::get('/param/{paramName}/{docParamId}/{isPost?}', ['as'=>'whatever','uses'=>'ParamValueController@getOptionValues']);
//    Route::resource('/api/posts/{userId?}', 'PostController');
});

