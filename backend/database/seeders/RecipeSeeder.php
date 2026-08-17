<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'id' => 1,
                'category_id' => 1,
                'title' => 'Fluffy Buttermilk Pancakes',
                'description' => 'Golden-brown, light and airy pancakes served with warm maple syrup and fresh berries.',
                'image_url' => 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 25,
                'difficulty' => 'Easy',
                'ingredients' => "2 cups all-purpose flour\n2 tbsp sugar\n2 tsp baking powder\n1 tsp baking soda\n1/2 tsp salt\n2 cups buttermilk\n2 large eggs\n1/4 cup melted butter",
                'instructions' => "1. In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.\n2. In a separate bowl, whisk buttermilk, eggs, and melted butter until combined.\n3. Pour wet ingredients into dry ingredients and stir gently until just combined (small lumps are fine).\n4. Heat a lightly greased skillet or griddle over medium heat.\n5. Pour 1/4 cup batter for each pancake.\n6. Cook until bubbles appear on the surface (2-3 minutes), flip and cook until golden brown on the other side.",
            ],
            [
                'id' => 2,
                'category_id' => 1,
                'title' => 'Classic Masala Omelette',
                'description' => 'A flavorful breakfast omelette packed with finely chopped onions, green chilies, tomatoes, and cilantro.',
                'image_url' => 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 15,
                'difficulty' => 'Easy',
                'ingredients' => "3 large eggs\n1 small onion, finely chopped\n1 green chili, finely minced\n1 small tomato, diced\n2 tbsp chopped fresh cilantro\n1/4 tsp turmeric powder\n1/4 tsp red chili powder\nSalt to taste\n1 tbsp butter or oil",
                'instructions' => "1. Crack eggs into a bowl, add salt, turmeric, and chili powder. Whisk until frothy.\n2. Fold in chopped onions, green chilies, tomatoes, and cilantro.\n3. Heat butter or oil in a non-stick pan over medium heat.\n4. Pour the egg mixture and tilt the pan to spread evenly.\n5. Cook for 2 minutes until the base sets, then carefully flip and cook for another minute.\n6. Fold in half and serve hot with toasted bread or paratha.",
            ],
            [
                'id' => 3,
                'category_id' => 1,
                'title' => 'Avocado & Poached Egg Toast',
                'description' => 'Crispy sourdough toast topped with seasoned smashed avocado, perfectly poached eggs, and red pepper flakes.',
                'image_url' => 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 15,
                'difficulty' => 'Easy',
                'ingredients' => "2 slices artisan sourdough bread\n1 ripe avocado\n2 fresh eggs\n1 tbsp lemon juice\n1 tbsp white vinegar (for poaching)\nSalt and freshly cracked black pepper\nPinch of red pepper flakes\n1 tsp extra virgin olive oil",
                'instructions' => "1. Toast sourdough slices until golden and crisp.\n2. In a bowl, mash avocado with lemon juice, salt, and pepper.\n3. Bring a small pot of water to a gentle simmer, add vinegar, and create a whirlpool with a spoon.\n4. Crack an egg into the center of the vortex; poach for 3-4 minutes until whites are set and yolks are runny.\n5. Spread mashed avocado generously over the toast, top with poached eggs, drizzle olive oil, and garnish with red pepper flakes.",
            ],
            [
                'id' => 4,
                'category_id' => 2,
                'title' => 'Shorshe Ilish (Hilsa in Mustard Gravy)',
                'description' => 'Quintessential Bengali delicacy of hilsa fish simmered in a pungent mustard paste with green chilies and mustard oil.',
                'image_url' => 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 35,
                'difficulty' => 'Medium',
                'ingredients' => "4 pieces Hilsa fish steaks\n2 tbsp yellow mustard seeds\n1 tbsp black mustard seeds\n5 green chilies, slit\n1/2 tsp turmeric powder\n1/2 tsp nigella seeds (kalo jeere)\n3 tbsp pure mustard oil\nSalt to taste",
                'instructions' => "1. Soak mustard seeds in warm water with 1 green chili and a pinch of salt for 15 minutes, then grind to a smooth paste.\n2. Smear fish steaks with turmeric and salt.\n3. Heat mustard oil in a pan, temper with nigella seeds and slit green chilies.\n4. Lower the heat, stir in mustard paste, turmeric, and 1/2 cup warm water.\n5. Gently slide in fish steaks, cover, and simmer for 10-12 minutes until fish is cooked.\n6. Drizzle 1 tsp raw mustard oil on top before serving with hot steamed rice.",
            ],
            [
                'id' => 5,
                'category_id' => 2,
                'title' => 'Bengali Chicken Bhuna',
                'description' => 'Tender chicken pieces slow-cooked in caramelized onions, ginger-garlic paste, and aromatic whole garam masala.',
                'image_url' => 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 45,
                'difficulty' => 'Medium',
                'ingredients' => "750g bone-in chicken, cut into curry pieces\n2 large onions, thinly sliced\n1.5 tbsp ginger-garlic paste\n1 bay leaf, 3 green cardamoms, 1-inch cinnamon stick\n1 tsp cumin powder\n1 tsp coriander powder\n1 tsp Kashmiri red chili powder\n1/2 tsp turmeric powder\n3 tbsp mustard oil or ghee\nSalt to taste",
                'instructions' => "1. Marinate chicken with half the ginger-garlic paste, turmeric, and 1 tsp oil for 30 minutes.\n2. Heat mustard oil in a heavy-bottomed pan, add whole spices and bay leaf until fragrant.\n3. Add sliced onions and sauté over medium heat until deep golden brown.\n4. Add remaining ginger-garlic paste and ground spices with a splash of water; fry until oil separates.\n5. Add chicken pieces and sear over high heat for 5 minutes.\n6. Lower heat, cover, and cook in its own juices for 25-30 minutes, stirring occasionally until thick gravy clings to the chicken.",
            ],
            [
                'id' => 6,
                'category_id' => 2,
                'title' => 'Creamy Mediterranean Hummus Bowl',
                'description' => 'Velvety smooth chickpea hummus topped with roasted spiced chickpeas, kalamata olives, cucumbers, and warm pita.',
                'image_url' => 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 20,
                'difficulty' => 'Easy',
                'ingredients' => "1 can (400g) chickpeas, rinsed and drained\n1/3 cup tahini\n3 tbsp fresh lemon juice\n1 garlic clove, minced\n3-4 tbsp ice-cold water\n1/2 tsp ground cumin\nSalt to taste\n2 tbsp extra virgin olive oil\nToppings: kalamata olives, diced cucumber, smoked paprika",
                'instructions' => "1. In a food processor, blend tahini and lemon juice for 1 minute until creamy.\n2. Add garlic, cumin, and salt; process for 30 seconds.\n3. Add drained chickpeas in two batches, pureeing between additions.\n4. With the motor running, drizzle in ice-cold water until texture is ultra-smooth and whipped.\n5. Spoon hummus into a wide bowl, create a swirl with the back of a spoon, drizzle with olive oil, and garnish with toppings.",
            ],
            [
                'id' => 7,
                'category_id' => 3,
                'title' => 'Traditional Mutton Kacchi Biryani',
                'description' => 'A royal celebration dish of marinated raw mutton and half-cooked aromatic basmati rice cooked together on dum.',
                'image_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 90,
                'difficulty' => 'Hard',
                'ingredients' => "1 kg goat meat/mutton, large pieces\n750g aged basmati rice\n1 cup fried crispy onions (beresta)\n1/2 cup plain yogurt\n2 tbsp ginger-garlic paste\n1 tbsp raw papaya paste (meat tenderizer)\n1 tbsp shahi garam masala powder\n1/2 cup warm milk with saffron strands\n4 medium potatoes, fried golden\n1/2 cup ghee\nSalt to taste",
                'instructions' => "1. Marinate mutton with yogurt, ginger-garlic, papaya paste, half the beresta, spices, and salt for at least 4 hours.\n2. Parboil soaked basmati rice with whole spices in salted water until 60% cooked, then drain.\n3. In a heavy bottom handi, arrange marinated mutton at the bottom, place fried potatoes over it.\n4. Layer parboiled rice evenly over the meat, top with remaining beresta, saffron milk, and ghee.\n5. Seal the pot with dough or aluminum foil with a tight-fitting lid.\n6. Cook on high heat for 10 minutes, then transfer to low heat (dum) over a tava for 75 minutes. Rest 15 minutes before opening.",
            ],
            [
                'id' => 8,
                'category_id' => 3,
                'title' => 'Creamy Garlic Butter Salmon',
                'description' => 'Pan-seared salmon fillets in a rich garlic, butter, and white wine reduction with fresh spinach and cherry tomatoes.',
                'image_url' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 30,
                'difficulty' => 'Medium',
                'ingredients' => "2 fresh salmon fillets (skin-on)\n2 tbsp olive oil\n3 tbsp unsalted butter\n4 cloves garlic, finely minced\n1 cup heavy cream\n2 cups baby spinach\n1/2 cup halved cherry tomatoes\n1/4 cup grated parmesan cheese\nSalt and cracked pepper\nFresh dill and lemon wedges for serving",
                'instructions' => "1. Season salmon fillets generously with salt and black pepper.\n2. Heat olive oil in a large skillet over medium-high heat. Sear salmon skin-side up for 5 minutes, flip and cook 3 minutes, then transfer to a plate.\n3. In the same skillet, melt butter and sauté minced garlic until fragrant (about 1 minute).\n4. Add cherry tomatoes and cook until blistered, then pour in heavy cream and bring to a simmer.\n5. Stir in baby spinach and parmesan cheese until sauce thickens.\n6. Return salmon fillets to the skillet, spoon sauce over the fish, and simmer for 2 minutes before serving.",
            ],
            [
                'id' => 9,
                'category_id' => 3,
                'title' => 'Slow-Cooked Beef Bhuna Khichuri',
                'description' => 'Comforting short-grain chinigura rice and roasted moong dal cooked with tender spiced beef cubes and green chilies.',
                'image_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 60,
                'difficulty' => 'Hard',
                'ingredients' => "500g beef cubes (curry cut)\n2 cups Chinigura / Kalijira rice\n1 cup yellow moong dal (dry roasted)\n2 large onions, sliced\n2 tbsp ginger-garlic paste\n1 tsp turmeric, 1 tsp cumin, 1 tsp chili powder\nWhole garam masala (cardamom, cloves, cinnamon)\n4 tbsp mustard oil & 2 tbsp ghee\n6 whole green chilies",
                'instructions' => "1. Dry-roast moong dal until fragrant and golden, wash and soak together with rice for 30 minutes.\n2. Cook beef with half the onions, ginger-garlic, and spices in a pressure cooker or heavy pot until 90% tender.\n3. In a separate large pot, heat mustard oil and ghee, fry remaining onions and whole spices.\n4. Add soaked rice-dal mixture and sauté (bhuna) for 5 minutes until glossy.\n5. Add cooked beef with its gravy and 5 cups of boiling water; season with salt.\n6. Cover and cook over medium heat until water reduces, drop in whole green chilies, lower flame, and steam (dum) for 15 minutes.",
            ],
            [
                'id' => 10,
                'category_id' => 4,
                'title' => 'Crispy Vegetable Pakoras',
                'description' => 'Crunchy golden fritters made with thinly shredded onions, potatoes, spinach, and seasoned chickpea flour.',
                'image_url' => 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 20,
                'difficulty' => 'Easy',
                'ingredients' => "1.5 cups besan (gram/chickpea flour)\n2 large onions, thinly sliced\n1 medium potato, cut into thin matchsticks\n1/2 cup chopped fresh spinach\n2 green chilies, minced\n1 tsp ajwain (carom seeds)\n1/2 tsp turmeric powder\n1/2 tsp chaat masala\nSalt to taste\nOil for deep frying",
                'instructions' => "1. In a mixing bowl, toss sliced onions, potatoes, spinach, and green chilies with salt; let sit for 5 minutes.\n2. Sprinkle in besan, ajwain, turmeric, and chaat masala. Mix using your hands, allowing the vegetables' moisture to form a thick batter without excess water.\n3. Heat oil in a deep kadai over medium-high heat.\n4. Drop small bite-sized clusters of batter into the hot oil.\n5. Fry for 4-5 minutes, turning occasionally, until crisp and golden brown.\n6. Drain on paper towels and sprinkle with chaat masala; serve immediately with mint-coriander chutney.",
            ],
            [
                'id' => 11,
                'category_id' => 4,
                'title' => 'Spiced Chicken Shami Kebabs',
                'description' => 'Melt-in-the-mouth minced chicken and chana dal patties infused with whole spices and pan-fried to a golden crust.',
                'image_url' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 40,
                'difficulty' => 'Medium',
                'ingredients' => "500g minced chicken\n1/2 cup Bengal gram (chana dal), soaked\n1 medium onion, sliced\n1 tbsp ginger-garlic paste\n1 tsp whole cumin, 1 black cardamom, 3 cloves, 1-inch cinnamon\n1 egg\n1/4 cup chopped mint and coriander\n1/2 tsp garam masala powder\nSalt to taste\nOil or ghee for shallow frying",
                'instructions' => "1. Cook minced chicken, soaked chana dal, sliced onions, ginger-garlic, whole spices, and salt with 1 cup water until dal is tender and water completely evaporates.\n2. Allow mixture to cool, remove large whole spices, and grind in a food processor to a smooth paste.\n3. Mix in chopped mint, coriander, garam masala, and beaten egg.\n4. Shape into round patties.\n5. Heat 2 tbsp oil or ghee in a flat skillet over medium heat.\n6. Shallow fry patties for 3-4 minutes per side until golden brown and crusty; serve with lemon wedges and onion rings.",
            ],
            [
                'id' => 12,
                'category_id' => 4,
                'title' => 'Bengali Singara (Spiced Potato Samosa)',
                'description' => 'Flaky, pyramid-shaped pastries stuffed with a fragrant spiced potato and peanut filling with a hint of panch phoron.',
                'image_url' => 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
                'image_path' => null,
                'cooking_time' => 50,
                'difficulty' => 'Hard',
                'ingredients' => "Pastry: 2 cups all-purpose flour, 4 tbsp ghee/oil, 1/2 tsp nigella seeds (kalo jeere), salt, cold water\nFilling: 3 medium potatoes (boiled and diced into small cubes), 1/4 cup roasted peanuts, 1 tsp panch phoron, 1 tbsp minced ginger, 2 green chilies, 1/2 tsp turmeric, 1/2 tsp roasted cumin-coriander powder, salt\nOil for slow deep frying",
                'instructions' => "1. Rub ghee into flour with nigella seeds and salt until breadcrumb consistency; knead with minimal cold water into a stiff dough. Rest 30 minutes.\n2. For filling: temper hot oil with panch phoron and ginger, add diced potatoes, spices, peanuts, and sauté for 5 minutes. Cool completely.\n3. Divide dough into balls, roll into ovals, cut in half.\n4. Form each half-circle into a cone, fill with 2 tbsp filling, dampen edges with water, and pleat-seal the base.\n5. Heat oil on low heat; slide in singaras and fry very slowly for 18-20 minutes, gradually increasing heat at the end until blister-free, crisp, and golden.\n6. Serve hot with tamarind and mint chutney.",
            ],
        ];

        foreach ($recipes as $rec) {
            Recipe::updateOrCreate(['id' => $rec['id']], $rec);
        }
    }
}
