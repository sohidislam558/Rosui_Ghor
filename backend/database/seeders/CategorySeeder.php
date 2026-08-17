<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Breakfast',
                'description' => 'Morning meals, quick bites, and breakfast favorites.',
            ],
            [
                'id' => 2,
                'name' => 'Lunch',
                'description' => 'Hearty midday meals, curries, and rice dishes.',
            ],
            [
                'id' => 3,
                'name' => 'Dinner',
                'description' => 'Comforting evening dinners and family banquets.',
            ],
            [
                'id' => 4,
                'name' => 'Snacks',
                'description' => 'Afternoon appetizers, street foods, and tea-time savories.',
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }
    }
}
