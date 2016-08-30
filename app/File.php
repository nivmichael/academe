<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nathanmac\GUID\Facades\GUID;

class File extends Model
{
    protected $table = 'file';

    /**
     * generate a unique file name
     * @param $file
     * @return string
     */
    public static function generateFileName($file) {
        return GUID::generate() . '.' .$file->clientExtension();
    }

}
