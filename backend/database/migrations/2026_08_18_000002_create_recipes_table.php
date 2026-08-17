<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('restrict');
            $table->string('title');
            $table->text('description');
            $table->text('image_url')->nullable();
            $table->string('image_path')->nullable();
            $table->text('ingredients');
            $table->unsignedInteger('cooking_time');
            $table->enum('difficulty', ['Easy', 'Medium', 'Hard'])->default('Easy');
            $table->text('instructions');
            $table->timestamps();

            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
