<?php namespace App;


use Illuminate\Database\Eloquent\Model;


class Task extends Model{

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tasks';

	public function step()
	{
		return $this->belongsTo('App\Step');
	}
}
