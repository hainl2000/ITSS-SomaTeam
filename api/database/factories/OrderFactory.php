<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => function() {
                return \App\Models\User::factory()->create()->id;
            },
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'total_price' => '10000'
        ];
    }
}