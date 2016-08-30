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
        
        if (!Schema::hasTable('roles')) {
            
            // Create table for storing roles
            Schema::create('roles', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->unique();
                $table->string('display_name')->nullable();
                $table->string('description')->nullable();
                $table->timestamps();
            });
        }
        
        if (!Schema::hasTable('role_user')) {
            
            // Create table for associating roles to users (Many-to-Many)
            Schema::create('role_user', function (Blueprint $table) {
                $table->mediumInteger('user_id')->unsigned();
                $table->integer('role_id')->unsigned();

                $table->foreign('user_id')->references('id')->on('type_user')
                    ->onUpdate('cascade')->onDelete('cascade');
                $table->foreign('role_id')->references('id')->on('roles')
                    ->onUpdate('cascade')->onDelete('cascade');
                $table->primary(['user_id', 'role_id']);
            });
        }

        if (!Schema::hasTable('permissions')) {
            
            // Create table for storing permissions
            Schema::create('permissions', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->unique();
                $table->string('display_name')->nullable();
                $table->string('description')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('permission_role')) {
            
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
        }


        if (!Schema::hasTable('step_type')) {

            // Create type steps table
            Schema::create('step_type', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
            });
        }

        if (!Schema::hasTable('steps')) {

            // Create steps table
            Schema::create('steps', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->integer('order');
                $table->integer('type_id')->unsigned();
                $table->foreign('type_id')
                    ->references('id')
                    ->on('step_type')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });
        }

        if (!Schema::hasTable('ac_event')) {
            
            // Create table for Events
            Schema::create('ac_event', function (Blueprint $table) {
                $table->increments('id');
                $table->timestamps();
                $table->timestamp('event_date');

                $table->integer('event_type')->unsigned();
                $table->foreign('event_type') ->references('id')
                    ->on('steps')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->string('event_subject');
                $table->text('event_text');
                $table->text('event_comment');
                $table->boolean('active');
            });
        }

        if (!Schema::hasTable('ac_event_user_status_list')) {

            //Create table for user event status
            Schema::create('ac_event_user_status_list', function (Blueprint $table) {
                $table->increments('id');
                $table->string('user_status_type');
            });
        }

        if (!Schema::hasTable('ac_event_invites')) {
            
            // Create table for list invites
            Schema::create('ac_event_invites', function (Blueprint $table) {
                $table->timestamps();

                $table->integer('event_id')->unsigned();
                $table->foreign('event_id')
                    ->references('id')
                    ->on('ac_event')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->mediumInteger('user_id')->unsigned();
                $table->foreign('user_id')
                    ->references('id')
                    ->on('type_user')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->integer('user_status')->unsigned();
                $table->foreign('user_status')
                     ->references('id')
                     ->on('ac_event_user_status_list')
                     ->onUpdate('cascade')
                     ->onDelete('cascade');

                $table->text('comments');

                $table->unique(['event_id', 'user_id']);
                $table->primary(['event_id', 'user_id']);
            });
        }

        if (!Schema::hasTable('file')) {

            // Create table for event files
            Schema::create('file', function (Blueprint $table) {
                $table->increments('id');
                $table->timestamps();
                $table->string('path');
                $table->string('filename');
                $table->string('originalName');
                $table->enum('choises', ['event-attachment']);
            });
        }

        if (!Schema::hasTable('ac_event_file')) {

            // Create table for event files
            Schema::create('ac_event_file', function (Blueprint $table) {
                $table->integer('file_id')->unsigned();
                $table->foreign('file_id')
                    ->references('id')
                    ->on('file')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->integer('event_id')->unsigned();
                $table->foreign('event_id')
                    ->references('id')
                    ->on('ac_event')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        if (Schema::hasTable('permission_role')) {
            Schema::drop('permission_role');
        }

        if (Schema::hasTable('permissions')) {
            Schema::drop('permissions');
        }

        if (Schema::hasTable('role_user')) {
            Schema::drop('role_user');
        }

        if (Schema::hasTable('roles')) {
            Schema::drop('roles');
        }

        if (Schema::hasTable('ac_event_invites')) {
            Schema::drop('ac_event_invites');
        }

        if (Schema::hasTable('ac_event_user_status_list')) {
            Schema::drop('ac_event_user_status_list');
        }
        
        if (Schema::hasTable('ac_event_file')) {
            Schema::drop('ac_event_file');
        }

        if (Schema::hasTable('file')) {
            Schema::drop('file');
        }

        if (Schema::hasTable('ac_event')) {
            Schema::drop('ac_event');
        }

        if (Schema::hasTable('steps')) {
            Schema::drop('steps');
        }

        if (Schema::hasTable('step_type')) {
            Schema::drop('step_type');
        }
    }
}
