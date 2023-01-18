<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTracsactionAdvertiseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracsaction_advertise', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('advertise_package_id');
            $table->string('bank');
            $table->string('credit_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracsaction_advertise');
    }
}
