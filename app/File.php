<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nathanmac\GUID\Facades\GUID;

class File extends Model
{
    protected $table = 'file';

    public static function generateFileName($file) {

        $newFileName = str_replace('.' . $file->clientExtension(), GUID::generate() . '.' .$file->clientExtension(), $file->getClientOriginalName());
        
        return $newFileName;
    }

}
