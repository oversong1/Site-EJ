<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('key', 50)->unique(); // 'emerson', 'julio'
            $table->string('name');
            $table->string('role', 200)->nullable();
            $table->text('bio')->nullable();
            $table->string('linkedin', 500)->nullable();
            $table->string('photo_path')->nullable();
            $table->string('photo_url', 1000)->nullable();
            $table->integer('order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->string('url', 1000);
            $table->unsignedBigInteger('size')->default(0);
            $table->string('context', 50)->default('general');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('team_members');
    }
};
