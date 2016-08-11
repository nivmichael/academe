<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Post extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */

	//protected $connection = 'connection-name';
	protected $table = 'type_post';

	protected $fillable =  ['title', 'description_short', 'created_at', 'updated_at'];

	public $timestamps = true ;

	public function docType()
	{
		return $this->hasMany(DocType::class);
	}

	public function docParam()
	{
		return $this->hasMany(DocParam::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}


}
