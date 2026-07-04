<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('service_cards', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 50)->default('🖥️');          // emoji ou SVG id
            $table->string('title');
            $table->text('description');
            $table->json('tags')->nullable();                     // ["PHP","Laravel","React"]
            $table->string('link', 500)->nullable();              // link para a seção
            $table->boolean('active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('service_cards'); }
};
