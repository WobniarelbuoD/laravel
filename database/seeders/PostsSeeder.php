<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
                $user = \App\Models\User::factory()->create();
                    print_r($user->id);

                    \App\Models\Posts::factory(1)->create([
                        'user_id' => $user->id
                    ]);
    }
}
