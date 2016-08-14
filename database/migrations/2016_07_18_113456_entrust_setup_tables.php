<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class EntrustSetupTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        // Create table for storing roles
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Create table for associating roles to users (Many-to-Many)
        Schema::create('role_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('type_user')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['user_id', 'role_id']);
        });

        // Create table for storing permissions
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Create table for associating permissions to roles (Many-to-Many)
        Schema::create('permission_role', function (Blueprint $table) {
            $table->integer('permission_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['permission_id', 'role_id']);
        });

        // Create table for Events
        Schema::create('ac_event', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->timestamp('event_date');
            $table->string('event_type');
            $table->string('event_subject');
            $table->text('event_text');
            $table->text('event_comment');
            $table->boolean('active');
        });

        // Create table for list invites
        Schema::create('ac_event_invites', function(Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('event_id');
            $table->integer('user_id');
            $table->integer('user_status');
            $table->text('comments');
        });

        // Create table for user event status
        Schema::create('ac_event_user_status_list', function(Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('event_id');
            $table->integer('user_id');
            $table->integer('invite_id');
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_user');
        Schema::drop('roles');
        Schema::drop('ac_event');
        Schema::drop('ac_event_invites');
        Schema::drop('ac_event_user_status_list');
    }
}
