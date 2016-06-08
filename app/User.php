<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    protected $table = 'type_user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'subtype',
        'status',
        'first_name',
        'last_name',
        'gender',
        'martial_status',
        'education_status',
        'email',
        'password',
        'street_1',
        'city',
        'state',
        'zipcode',
        'country',
        'phone_1',
        'mobile',
        'date_of_birth',
        'registration'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    //protected $dateFormat = 'U';
    //protected $connection = 'connection-name';
    public $timestamps = true;




    public function docParam()
    {
        return $this->hasMany(DocParam::class , 'doc_sub_type', 'subtype' );
    }

    public function docType()
    {
        return $this->hasOne(DocType::class, 'name', 'type');
    }


    public function posts()
    {
        return $this->hasMany(Post::class);
    }

}
