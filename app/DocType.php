<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class DocType extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'doc_type';


	public function sysParamValues()
	{
		return $this->hasMany(SysParamValues::class, 'name');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'id' , 'type' );
	}

	public function docParam()
	{
		return $this->hasMany(DocParam::class , 'doc_type_id');
	}


	public function post()
	{
		return $this->belongsTo(Post::class);
	}


}
