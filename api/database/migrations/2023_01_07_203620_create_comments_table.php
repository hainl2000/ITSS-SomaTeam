<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string("content");
            $table->float("rating");
            $table->integer("comment_by");
            $table->integer("comment_in");
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->float("rating")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
        if (Schema::hasColumn('products', 'rating'))
        {
            Schema::table('products', function (Blueprint $table)
            {
                $table->dropColumn('rating');
            });
        }
    }
}
