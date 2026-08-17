<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@rosuighor.test'],
            [
                'name' => 'Rosui Ghor Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Normal demo user
        User::updateOrCreate(
            ['email' => 'user@rosuighor.test'],
            [
                'name' => 'Demo Cook',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
    }
}
