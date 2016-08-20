<?php

namespace App\Http\Controllers;

class FileController extends Controller
{
    public function eventFileUpload($eventJson)
    {
        $path = storage_path() . '/app/events/';

        foreach ($eventJson->file('file') as $file) {
            $file->move($path, $file->getClientOriginalName());
        }
    }
}