import type { Category, Recipe, RecipeInteraction, User } from "@/types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const mockCategories: Category[] = [
  { id: 1, name: "Breakfast", description: "Bright morning plates to start the day well.", created_at: "2026-01-04T08:00:00Z" },
  { id: 2, name: "Lunch", description: "Everyday midday meals that come together fast.", created_at: "2026-01-04T08:05:00Z" },
  { id: 3, name: "Dinner", description: "Comforting evening cooking for the whole table.", created_at: "2026-01-04T08:10:00Z" },
  { id: 4, name: "Snacks", description: "Small bites, tea-time treats and street food.", created_at: "2026-01-04T08:15:00Z" },
];

const recipe = (
  id: number,
  category_id: number,
  title: string,
  description: string,
  image: string,
  cooking_time: number,
  difficulty: Recipe["difficulty"],
  ingredients: string[],
  instructions: string[],
): Recipe => ({
  id,
  category_id,
  title,
  description,
  image_url: image,
  image_path: null,
  ingredients: ingredients.join("\n"),
  cooking_time,
  difficulty,
  instructions: instructions.join("\n"),
  created_at: `2026-0${Math.min(9, 1 + (id % 6))}-1${id % 9}T09:00:00Z`,
  updated_at: `2026-0${Math.min(9, 1 + (id % 6))}-1${id % 9}T09:00:00Z`,
});

export const mockRecipes: Recipe[] = [
  recipe(1, 1, "Fluffy Buttermilk Pancakes", "Tall, tender pancakes with crisp golden edges, served warm with butter and syrup.", img("photo-1567620905732-2d1ec7ab7445"), 25, "Easy",
    ["2 cups all-purpose flour", "2 tbsp sugar", "1 tsp baking soda", "2 cups buttermilk", "2 eggs", "3 tbsp melted butter", "Pinch of salt"],
    ["Whisk the dry ingredients together in a large bowl.", "Beat the buttermilk, eggs and melted butter in a second bowl.", "Fold the wet mixture into the dry ingredients until just combined; a few lumps are fine.", "Rest the batter for 10 minutes while the pan heats over medium heat.", "Cook a ladle at a time until bubbles form, flip and cook one more minute.", "Serve warm with butter and syrup."]),
  recipe(2, 1, "Masala Omelette with Toast", "A spiced, herb-packed omelette folded over soft onions and green chilli.", img("photo-1482049016688-2d3e1b311543"), 15, "Easy",
    ["3 eggs", "1 small onion, finely chopped", "1 green chilli, minced", "2 tbsp coriander leaves", "1/4 tsp turmeric", "Salt and pepper", "1 tbsp oil", "2 slices bread"],
    ["Beat the eggs with turmeric, salt and pepper until light.", "Stir in the onion, chilli and coriander.", "Heat oil in a non-stick pan over medium heat.", "Pour in the eggs and cook undisturbed until the edges set.", "Fold in half and cook 30 seconds more.", "Serve with toasted bread."]),
  recipe(3, 1, "Honey Almond Overnight Oats", "Creamy make-ahead oats with toasted almonds and a spoon of honey.", img("photo-1517248135467-4c7edcad34c4"), 10, "Easy",
    ["1 cup rolled oats", "1 cup milk", "1/2 cup yogurt", "2 tbsp honey", "1/4 cup toasted almonds", "1/2 tsp cinnamon"],
    ["Stir the oats, milk, yogurt, honey and cinnamon together in a jar.", "Cover and refrigerate overnight.", "Top with toasted almonds before serving."]),
  recipe(4, 2, "Grilled Chicken Caesar Bowl", "Charred chicken over crisp romaine with a light lemony dressing.", img("photo-1512621776951-a57141f2eefd"), 35, "Medium",
    ["2 chicken breasts", "1 large romaine heart", "1/2 cup croutons", "1/4 cup grated parmesan", "2 tbsp olive oil", "1 lemon", "1 tsp Dijon mustard", "1 clove garlic"],
    ["Season the chicken with oil, salt and pepper and grill 6 minutes per side.", "Whisk the lemon juice, mustard, grated garlic and remaining oil into a dressing.", "Toss the chopped romaine with the dressing.", "Slice the rested chicken and arrange over the leaves.", "Finish with croutons and parmesan."]),
  recipe(5, 2, "Spiced Chickpea Wraps", "Warm cumin chickpeas rolled with yogurt sauce and crunchy salad.", img("photo-1540189549336-e6e99c3679fe"), 25, "Easy",
    ["1 can chickpeas, drained", "1 tsp cumin", "1/2 tsp smoked paprika", "2 tbsp olive oil", "4 flatbreads", "1/2 cup yogurt", "1 tbsp tahini", "1 cup shredded cabbage"],
    ["Toss the chickpeas with the spices and oil, then pan-fry until crisp.", "Mix the yogurt with tahini, lemon and salt.", "Warm the flatbreads for 30 seconds per side.", "Layer cabbage, chickpeas and sauce, then roll tightly."]),
  recipe(6, 2, "Tomato Basil Soup", "Slow-simmered tomatoes blended smooth and finished with basil.", img("photo-1476124369491-e7addf5db371"), 40, "Easy",
    ["1 kg ripe tomatoes", "1 onion, sliced", "3 cloves garlic", "2 tbsp olive oil", "1 cup stock", "Handful of basil", "Salt and pepper"],
    ["Soften the onion and garlic in olive oil over low heat.", "Add the chopped tomatoes and cook 20 minutes until collapsed.", "Pour in the stock and simmer 10 minutes.", "Blend until smooth, then stir in torn basil.", "Season to taste and serve hot."]),
  recipe(7, 3, "Slow-Simmered Chicken Curry", "A fragrant weeknight curry with warm spices and a silky tomato base.", img("photo-1546069901-ba9599a7e63c"), 55, "Medium",
    ["800 g chicken thighs", "2 onions, sliced", "3 tomatoes, pureed", "1 tbsp ginger-garlic paste", "1 tsp turmeric", "2 tsp chilli powder", "1 tsp garam masala", "3 tbsp oil", "Coriander to finish"],
    ["Brown the onions slowly in oil until deep golden.", "Stir in the ginger-garlic paste and cook one minute.", "Add the ground spices and the tomato puree; cook until the oil separates.", "Add the chicken and coat well in the masala.", "Cover and simmer 30 minutes, stirring occasionally.", "Finish with garam masala and coriander."]),
  recipe(8, 3, "Garlic Butter Salmon", "Pan-seared salmon basted in garlic butter with lemon.", img("photo-1504674900247-0877df9cc836"), 20, "Medium",
    ["4 salmon fillets", "3 tbsp butter", "4 cloves garlic, sliced", "1 lemon", "Fresh thyme", "Salt and pepper"],
    ["Pat the fillets dry and season generously.", "Sear skin-side down in a hot pan for 4 minutes.", "Flip, add butter, garlic and thyme.", "Baste continuously for 3 minutes.", "Squeeze lemon over and rest 2 minutes before serving."]),
  recipe(9, 3, "Wood-Fired Style Margherita", "A blistered thin-crust pizza with tomato, mozzarella and basil.", img("photo-1565299624946-b28f40a0ae38"), 90, "Hard",
    ["400 g bread flour", "260 ml water", "7 g salt", "3 g dry yeast", "1 cup crushed tomatoes", "250 g mozzarella", "Fresh basil", "Olive oil"],
    ["Mix the flour, water, yeast and salt into a shaggy dough and knead 10 minutes.", "Prove for one hour, then divide into two balls and rest 30 minutes.", "Heat the oven as hot as it goes with a tray or stone inside.", "Stretch each ball by hand and top with tomato and torn mozzarella.", "Bake 7-9 minutes until the crust blisters.", "Finish with basil and olive oil."]),
  recipe(10, 3, "Vegetable Khichuri", "A soft rice and lentil one-pot with seasonal vegetables.", img("photo-1490645935967-10de6ba17061"), 45, "Easy",
    ["1 cup rice", "1/2 cup moong dal", "1 potato, cubed", "1 carrot, sliced", "1/2 cup peas", "1 tsp cumin seeds", "1 tsp turmeric", "2 tbsp ghee", "Salt to taste"],
    ["Dry-roast the dal until fragrant, then rinse with the rice.", "Temper cumin seeds in ghee, add the vegetables and turmeric.", "Add the rice, dal and 4 cups of water.", "Simmer covered 25 minutes until soft and porridge-like.", "Stir in a spoon of ghee before serving."]),
  recipe(11, 4, "Crispy Vegetable Samosas", "Flaky pastry parcels filled with spiced potato and peas.", img("photo-1601050690597-df0568f70950"), 60, "Hard",
    ["2 cups flour", "4 tbsp oil", "3 potatoes, boiled", "1/2 cup peas", "1 tsp cumin", "1 tsp coriander powder", "1/2 tsp chilli powder", "Oil for frying"],
    ["Rub oil into the flour, add water and knead a firm dough; rest 30 minutes.", "Mash the potatoes coarsely and mix with peas and spices.", "Roll the dough thin, cut into halves and shape into cones.", "Fill and seal the edges with water.", "Fry on medium heat until crisp and golden.", "Drain and serve with chutney."]),
  recipe(12, 4, "Chilli Cheese Toast", "Bubbling cheese toast with green chilli and a sprinkle of chaat masala.", img("photo-1484723091739-30a097e8f929"), 12, "Easy",
    ["4 slices bread", "1 cup grated cheese", "2 green chillies, chopped", "2 tbsp sweetcorn", "1/2 tsp chaat masala", "1 tbsp butter"],
    ["Butter the bread slices lightly.", "Mix the cheese, chillies, corn and chaat masala.", "Spread the mixture to the edges of each slice.", "Grill 5-6 minutes until golden and bubbling.", "Slice and serve immediately."]),
];

export const mockUsers: (User & { password: string })[] = [
  { id: 1, name: "Admin", email: "admin@rosuighor.test", role: "admin", password: "password", created_at: "2026-01-01T08:00:00Z" },
  { id: 2, name: "Aqib Jawwad", email: "user@rosuighor.test", role: "user", password: "password", created_at: "2026-01-02T08:00:00Z" },
];

export const mockInteractions: RecipeInteraction[] = [];

export const withCategory = (r: Recipe): Recipe => ({
  ...r,
  category: mockCategories.find((c) => c.id === r.category_id),
});

export const recipeImage = (r: Recipe) =>
  r.image_url ?? r.image_path ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70";
