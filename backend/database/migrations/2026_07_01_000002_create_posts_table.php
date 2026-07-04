<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category', 100);
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('author', 150)->default('Emerson Souza');
            $table->string('read_time', 20)->default('5 min');
            $table->string('color', 20)->default('#6C63FF');
            $table->string('image_path')->nullable();
            $table->string('image_url', 1000)->nullable();
            $table->boolean('published')->default(true);
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('posts'); }
};
