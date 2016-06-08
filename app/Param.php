<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Param extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'param';

	public function docParam()
	{
		return $this->belongsToMany(  DocParam::class, 'doc_param_id' );
	}

	public function paramType()
	{
		return $this->belongsTo(ParamType::class, 'type_id' );
	}

	public function sysParamValues()
	{
		return $this->hasMany(SysParamValues::class, 'param_id');
	}
}
