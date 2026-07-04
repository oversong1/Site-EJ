<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle');
            $table->string('cta_text', 100)->nullable();
            $table->string('cta_link', 500)->nullable();
            $table->string('cta2_text', 100)->nullable();
            $table->string('cta2_link', 500)->nullable();
            $table->string('image_path')->nullable();
            $table->string('image_url', 1000)->nullable();
            $table->string('layout', 20)->default('background'); // background | right | left
            $table->boolean('active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('banners'); }
};
