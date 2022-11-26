<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = \App\Models\Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'price' => $this->faker->numberBetween(50, 1000),
            'description' => $this->faker->text(180),
            'image' => $this->faker->randomElement([
                'https://ih1.redbubble.net/image.457036478.8309/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.u2.jpg',
                'https://ih1.redbubble.net/image.580459571.7282/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.u2.jpg',
                'https://ih1.redbubble.net/image.458909738.1995/ssrco,classic_tee,flatlay,322e3f:696a94a5d4,front,wide_portrait,750x1000.u2.jpg',
                'https://ih1.redbubble.net/image.512419742.3962/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.u2.jpg',
                'https://ih1.redbubble.net/image.975548906.9197/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.jpg',
                'https://ih1.redbubble.net/image.2048692408.4905/ssrco,classic_tee,flatlay,353d77:4d8b4ffd91,front,wide_portrait,750x1000.jpg',
                'https://ih1.redbubble.net/image.780875299.4089/ssrco,classic_tee,flatlay,101010:01c5ca27c6,front,wide_portrait,750x1000.u4.jpg',
                'https://ih1.redbubble.net/image.2778473237.1160/ssrco,classic_tee,flatlay,heather_grey,front,wide_portrait,750x1000.u1.jpg',
                'https://ih1.redbubble.net/image.1280570379.5573/ssrco,classic_tee,flatlay,541e68:68f9e309b0,front,wide_portrait,750x1000.jpg'
                ])
        ];
    }
}
