<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->sentence(20),
            'content' =>fake()->paragraph(120),
            'image' => 'https://picsum.photos/1200/700?param='.rand(0,1999999),
            'user_id' => null
        ];
    }
}
