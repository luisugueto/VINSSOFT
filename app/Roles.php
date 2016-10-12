<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    public function personal()
    {
        return $this->hasMany('App\Personal');
    }
}
