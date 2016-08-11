<?php namespace App;


use Illuminate\Database\Eloquent\Model;


class Step extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'steps';

	public function tasks()
	{
		return $this->hasMany('App\Task', 'step_id', 'id');
	}

}
