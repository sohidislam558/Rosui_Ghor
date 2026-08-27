<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the recipe interactions created by the user.
     */
    public function recipeInteractions(): HasMany
    {
        return $this->hasMany(RecipeInteraction::class);
    }

    /**
     * Send the password reset notification pointing to the React frontend.
     */
    public function sendPasswordResetNotification($token): void
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');

        \Illuminate\Auth\Notifications\ResetPassword::createUrlUsing(function ($notifiable, $token) use ($frontendUrl) {
            return $frontendUrl . '/reset-password?token=' . $token . '&email=' . urlencode($notifiable->email);
        });

        $this->notify(new \Illuminate\Auth\Notifications\ResetPassword($token));
    }
}
