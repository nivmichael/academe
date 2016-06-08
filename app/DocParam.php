<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class DocParam extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'doc_param';

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function post()
	{
		return $this->belongsTo(Post::class);
	}

	public function param()
	{
		return $this->hasMany(Param::class);
	}

	public function docType()
	{
		return $this->hasMany(DocType::class, User::class, 'name', 'type');
	}

}
