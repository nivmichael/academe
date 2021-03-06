<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Zizaco\Entrust\HasRole;
class User extends Authenticatable
{

    use EntrustUserTrait; // add this trait to your user model

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
        'password_confirmation',
        'street_1',
        'city',
        'state',
        'zipcode',
        'country',
        'phone',
        'mobile',
        'date_of_birth',
        'disclaimer',
        'send_newsletters',
        'registration'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','password_confirmation'
    ];

    //protected $dateFormat = 'U';
    //protected $connection = 'connection-name';
    public $timestamps = true;



//    public function param()
//    {
//        return $this->hasManyThrough(
//            Param::class, DocParam::class,
//            'id','doc_param_id', 'doc_sub_type', 'subtype'
//        );
//    }

//    public function docParam()
//    {
//        return $this->hasMany(DocParam::class , 'doc_sub_type', 'subtype' );
//    }
//
//    public function sysParamValues()
//    {
//        return $this->hasMany(SysParamValues::class , 'ref_id', 'id' );
//    }
    public function sysParamValues()
    {
        return $this->hasManyThrough(
            SysParamValues::class, Param::class,
            'id', 'ref_id', 'param_id'
        );
    }
//    public function param()
//    {
//        return $this->hasManyThrough(
//            SysParamValues::class, Param::class,'ref_id','ref_id','ref_id'
//        );
//    }



//    public function docType()
//    {
//        return $this->hasOne(DocType::class, 'name', 'type');
//    }



    public function posts()
    {
        return $this->hasMany(Post::class);
    }

}
