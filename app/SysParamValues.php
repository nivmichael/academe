<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class SysParamValues extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'sys_param_values';

	public function user()
	{
		return $this->belongsTo(User::class, 'ref_id');
	}

	public function docType()
	{
		return $this->hasMany(DocType::class, 'name');
	}

	public function param()
	{
		return $this->belongsToMany(Param::class,'id','ref_id');
	}



}
