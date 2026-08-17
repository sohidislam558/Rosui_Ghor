# Rosui Ghor

{
"project_name": "Rosui Ghor",
"execution_type": "frontend_and_ui_ux_only",
"platform": "Lovable",
"objective": "Build the complete responsive frontend and UI/UX for Rosui Ghor, a simple single-vendor recipe web application for a university course project. Follow the approved PRD, Design Document, Functional Specification Document, Database Architecture Document, and Tech Stack Document as the source of truth.",
"source_of_truth": {
"prd": "Use the approved Rosui Ghor Product Requirements Document. Implement only the features defined there.",
"design_document": "Use the approved Rosui Ghor Design Document as the visual source of truth.",
"functional_specification": "Use the approved Rosui Ghor Functional Specification Document for page behavior, states, workflows, permissions, validation presentation, and edge cases.",
"database_architecture": "Use the approved Rosui Ghor Database Architecture Document to understand the expected entities and API data shapes.",
"tech_stack": "Use the approved Rosui Ghor Tech Stack Document. Frontend is React + TypeScript + Vite + Tailwind CSS + React Router + Axios + Lucide React.",
"original_reference": "The original Shaad application documentation may be used only as functional inspiration for recipe browsing, categories, recipe details, and admin recipe management. Do not reproduce its subscription, telecom verification, billing, SMS, or AI functionality."
},
"critical_scope": {
"application_type": "single-vendor",
"target_users": "fewer than 50",
"complexity": "minimum university-project complexity",
"ai": false,
"subscription": false,
"payment": false,
"billing": false,
"otp": false,
"sms": false,
"multi_vendor": false,
"multi_tenant": false,
"real_time_features": false,
"hardware_integration": false,
"advanced_analytics": false,
"audit_system": false,
"production_grade_infrastructure": false
},
"mandatory_stack": {
"framework": "React",
"language": "TypeScript",
"build_tool": "Vite",
"styling": "Tailwind CSS",
"routing": "React Router",
"http_client": "Axios",
"icons": "Lucide React"
},
"backend_boundary": {
"instruction": "Build the frontend only. Do not implement Laravel backend logic, database logic, authentication server logic, migrations, controllers, models, APIs, or server-side business logic.",
"api_integration": "Create a clean API service abstraction and typed interfaces so the frontend can later connect to the Laravel backend.",
"mock_data": "Use realistic local mock data or a clearly isolated mock API layer during frontend development. Do not hard-code mock data directly inside page components.",
"authentication": "Implement the frontend authentication state, protected-route UX, role-based navigation, login/register flows, loading states, and unauthorized states. Do not implement actual server authentication.",
"future_backend": "The frontend must be structured so Axios API calls can later be connected to Laravel without redesigning the UI."
},
"brand": {
"name": "Rosui Ghor",
"description": "A modern, warm, simple recipe discovery and recipe management website.",
"visual_mood": [
"modern",
"warm",
"clean",
"food-focused",
"friendly",
"minimal"
]
},
"visual_system": {
"primary": "#D97706",
"secondary": "#166534",
"background": "#FFFDF8",
"surface": "#FFFFFF",
"text_primary": "#1F2937",
"text_secondary": "#6B7280",
"border": "#E5E7EB",
"error": "#DC2626",
"success": "#16A34A",
"heading_font": "Playfair Display",
"body_font": "Inter",
"max_content_width": "1200px",
"button_radius": "8px",
"input_radius": "8px",
"card_radius": "12px",
"large_container_radius": "16px"
},
"design_principles": [
"Make recipe discovery the primary visual focus.",
"Use high-quality food imagery as the main visual element.",
"Keep the interface clean and warm.",
"Use the primary orange sparingly for important actions.",
"Use deep green for secondary and food-related accents.",
"Use generous but controlled whitespace.",
"Avoid excessive gradients.",
"Avoid excessive animation.",
"Avoid generic SaaS dashboard aesthetics.",
"Avoid overly complex visual effects.",
"Do not make the application look like an enterprise CMS.",
"Maintain one coherent visual language across user and admin interfaces."
],
"global_layout": {
"container": "max-width 1200px with responsive horizontal padding",
"spacing_scale": [
"4px",
"8px",
"12px",
"16px",
"24px",
"32px",
"48px",
"64px",
"80px"
],
"section_spacing_desktop": "64px to 96px",
"section_spacing_mobile": "40px to 56px",
"layout_tools": [
"CSS Grid",
"Flexbox",
"responsive widths",
"max-width containers"
],
"avoid": [
"fixed page widths",
"major absolute-positioned layouts",
"fixed-height content sections",
"content that clips when browser zoom changes"
]
},
"responsive_requirements": {
"priority": "critical",
"devices": [
"small mobile",
"large mobile",
"tablet",
"small laptop",
"desktop",
"large desktop"
],
"tailwind_breakpoints": {
"mobile": "<640px",
"sm": "640px+",
"md": "768px+",
"lg": "1024px+",
"xl": "1280px+"
},
"requirements": [
"The application must remain usable at mobile widths.",
"The application must remain usable at tablet widths.",
"The application must remain usable at desktop widths.",
"The application must remain usable when browser zoom is increased.",
"The application must remain usable when browser zoom is decreased.",
"Never rely on exact viewport dimensions.",
"Never create horizontal overflow accidentally.",
"Allow long recipe titles and descriptions to wrap naturally.",
"Use responsive grids instead of fixed card widths.",
"Make admin tables horizontally scrollable or convert them to responsive cards on small screens.",
"Collapse navigation on mobile.",
"Keep touch targets comfortable on mobile."
]
},
"routes": {
"public": [
{
"path": "/",
"page": "Home"
},
{
"path": "/login",
"page": "Login"
},
{
"path": "/register",
"page": "Register"
},
{
"path": "/recipes",
"page": "Recipes"
}
],
"authenticated": [
{
"path": "/recipes/:id",
"page": "Recipe Details"
},
{
"path": "/profile",
"page": "Profile"
}
],
"admin": [
{
"path": "/admin",
"page": "Admin Dashboard"
},
{
"path": "/admin/recipes",
"page": "Admin Recipes"
},
{
"path": "/admin/recipes/create",
"page": "Create Recipe"
},
{
"path": "/admin/recipes/:id/edit",
"page": "Edit Recipe"
},
{
"path": "/admin/categories",
"page": "Admin Categories"
}
]
},
"authentication_ux": {
"single_login_page": true,
"behavior": [
"Users and administrators use the same login page.",
"After successful authentication, user role determines the destination.",
"Normal users enter the user application.",
"Administrators enter the admin dashboard.",
"Guests attempting to access protected recipe details must be redirected to login.",
"Guests attempting to access profile or admin routes must be redirected appropriately.",
"Expired or invalid authentication state must return the user to login.",
"Frontend authorization is for UX only. Backend authorization will be implemented later."
],
"auth_state": [
"loading",
"authenticated_user",
"authenticated_admin",
"unauthenticated",
"authentication_error"
]
},
"pages": {
"home": {
"purpose": "Introduce Rosui Ghor and drive users toward recipe discovery.",
"sections": [
"responsive navbar",
"hero section",
"featured recipes",
"browse by category",
"latest recipes",
"simple call to action",
"footer"
],
"hero": {
"layout_desktop": "two columns",
"layout_mobile": "stacked",
"content": [
"strong food-focused headline",
"short supporting description",
"Explore Recipes CTA",
"high-quality food image"
],
"style": "warm, editorial, clean, premium but simple"
}
},
"login": {
"purpose": "Authenticate users and administrators.",
"fields": [
"email",
"password"
],
"elements": [
"Rosui Ghor branding",
"welcome heading",
"login form",
"login button",
"validation feedback",
"authentication error",
"registration link"
]
},
"register": {
"purpose": "Allow visitors to create a user account.",
"fields": [
"name",
"email",
"password",
"password confirmation"
],
"elements": [
"Rosui Ghor branding",
"registration form",
"validation feedback",
"register button",
"login link"
]
},
"recipes": {
"purpose": "Recipe discovery.",
"elements": [
"page heading",
"search bar",
"category filter",
"responsive recipe grid",
"loading state",
"empty state",
"error state",
"pagination if needed"
],
"recipe_card": [
"image",
"category",
"title",
"cooking time",
"difficulty",
"View Recipe action"
]
},
"recipe_details": {
"protected": true,
"purpose": "Display complete recipe information to authenticated users.",
"desktop_layout": "large recipe image and recipe summary at top, ingredients and instructions below",
"mobile_layout": "single-column vertical layout",
"content": [
"recipe image",
"category",
"title",
"description",
"cooking time",
"difficulty",
"ingredients",
"cooking instructions",
"supported user interaction"
]
},
"profile": {
"protected": true,
"purpose": "Basic user profile.",
"content": [
"name",
"email",
"edit profile action",
"logout"
],
"exclude": [
"subscription",
"billing",
"notifications",
"phone verification",
"advanced privacy settings"
]
},
"admin_dashboard": {
"protected": true,
"admin_only": true,
"purpose": "Simple content management dashboard.",
"statistics": [
"Total Users",
"Total Recipes",
"Total Categories"
],
"optional_sections": [
"recent recipes",
"recipes by category"
],
"exclude": [
"advanced analytics",
"complex charts",
"financial dashboards",
"activity audit logs"
]
},
"admin_recipes": {
"protected": true,
"admin_only": true,
"elements": [
"recipe management heading",
"Add Recipe button",
"recipe list/table",
"edit action",
"delete action",
"responsive layout"
]
},
"create_recipe": {
"protected": true,
"admin_only": true,
"fields": [
"title",
"description",
"category",
"ingredients",
"cooking time",
"difficulty",
"instructions"
],
"image_options": [
"external URL",
"uploaded image"
],
"requirements": [
"image source selector",
"image preview where appropriate",
"client-side validation",
"loading state",
"success feedback",
"error feedback",
"prevent duplicate submission"
]
},
"edit_recipe": {
"protected": true,
"admin_only": true,
"requirements": [
"load existing recipe data",
"edit all supported fields",
"preserve existing image when no replacement is selected",
"support external image URL",
"support image upload",
"save changes",
"show validation errors",
"show success/error feedback"
]
},
"admin_categories": {
"protected": true,
"admin_only": true,
"requirements": [
"category list",
"add category",
"edit category",
"delete category",
"description",
"dependency-aware delete feedback"
]
}
},
"recipe_model": {
"fields": [
"id",
"category_id",
"title",
"description",
"image_url",
"image_path",
"ingredients",
"cooking_time",
"difficulty",
"instructions",
"created_at",
"updated_at"
],
"difficulty_values": [
"Easy",
"Medium",
"Hard"
],
"cooking_time": "Display numeric duration as minutes.",
"initial_categories": [
"Breakfast",
"Lunch",
"Dinner",
"Snacks"
]
},
"recipe_discovery": {
"search": {
"field": "recipe title",
"placeholder": "Search recipes...",
"behavior": "Search and filtering controls should work together."
},
"categories": {
"dynamic": true,
"initial_values": [
"Breakfast",
"Lunch",
"Dinner",
"Snacks"
],
"active_style": "primary orange accent",
"inactive_style": "neutral surface with border"
},
"guest_behavior": "Guests can see recipe cards and basic recipe information but cannot access complete recipe details.",
"authenticated_behavior": "Authenticated users can access complete recipe details."
},
"user_interactions": {
"require_authentication": true,
"storage_contract": [
"user_id",
"recipe_id",
"interaction_type"
],
"frontend_requirements": [
"Show the interaction control on recipe details.",
"Reflect the user's current interaction state.",
"Show loading state during interaction.",
"Prevent duplicate actions while request is pending.",
"Show success/error feedback.",
"Never allow guest users to create an interaction."
],
"note": "Do not invent additional interaction types beyond what is required by the approved functional implementation. Keep the UI flexible enough to support the selected interaction type."
},
"components": {
"global": [
"Navbar",
"Footer",
"Button",
"Input",
"Select",
"Modal",
"Alert",
"LoadingIndicator",
"EmptyState",
"ErrorState"
],
"recipe": [
"RecipeCard",
"RecipeGrid",
"RecipeMetadata",
"CategoryFilter",
"SearchBar",
"RecipeImage",
"RecipeDetails",
"RecipeInteractionButton"
],
"authentication": [
"LoginForm",
"RegisterForm",
"ProtectedRoute"
],
"user": [
"ProfileForm"
],
"admin": [
"AdminSidebar",
"DashboardStatCard",
"RecipeTable",
"RecipeForm",
"CategoryTable",
"CategoryForm",
"DeleteConfirmationModal"
]
},
"recipe_card_design": {
"structure": [
"image",
"category label",
"recipe title",
"cooking time",
"difficulty",
"View Recipe"
],
"image_ratio": "4:3",
"image_behavior": "object-cover",
"hover": [
"subtle image scale",
"slight shadow increase",
"subtle CTA emphasis"
],
"transition_duration": "150ms to 250ms",
"avoid": [
"large hover transformations",
"excessive animation"
]
},
"admin_design": {
"style": "functional extension of the main Rosui Ghor design system",
"desktop": "sidebar plus content area",
"mobile": "collapsible navigation",
"statistics": [
"Users",
"Recipes",
"Categories"
],
"recipe_management": "Use a clear table/list on desktop and a responsive alternative on small screens.",
"destructive_actions": "Always require confirmation before permanent deletion."
},
"forms": {
"input_height": "44px to 48px",
"requirements": [
"visible labels",
"clear focus states",
"consistent spacing",
"inline validation messages",
"disabled/loading state",
"success feedback",
"error feedback"
],
"recipe_form": {
"desktop": "two-column where appropriate, with ingredients and instructions spanning full width",
"mobile": "single column"
}
},
"buttons": {
"primary": {
"background": "#D97706",
"text": "#FFFFFF",
"radius": "8px"
},
"secondary": {
"background": "#FFFFFF",
"border": "#E5E7EB",
"text": "#1F2937"
},
"destructive": {
"color": "#DC2626"
},
"states": [
"default",
"hover",
"focus",
"active",
"disabled",
"loading"
]
},
"states": {
"global": [
"loading",
"success",
"error",
"empty",
"unauthorized",
"not_found",
"network_error"
],
"recipe_list": [
"loading",
"loaded",
"empty",
"error"
],
"recipe_details": [
"loading",
"loaded",
"not_found",
"unauthorized",
"error"
],
"forms": [
"idle",
"submitting",
"validation_error",
"server_error",
"success"
]
},
"accessibility": {
"requirements": [
"Use semantic HTML.",
"Use labels for every form input.",
"Use keyboard-accessible controls.",
"Maintain visible focus states.",
"Use meaningful alt text for recipe images.",
"Maintain readable text contrast.",
"Maintain logical heading hierarchy.",
"Do not rely only on color to communicate state.",
"Make mobile controls touch-friendly."
]
},
"animation_rules": {
"allowed": [
"subtle hover transitions",
"mobile navigation transition",
"modal transition",
"button state transition",
"optional simple page transition"
],
"avoid": [
"constant animation",
"large parallax effects",
"complex 3D effects",
"heavy motion backgrounds",
"animation that interferes with recipe reading"
]
},
"image_rules": {
"recipe_images": [
"high quality",
"consistent aspect ratio",
"responsive",
"object-cover",
"no distortion"
],
"lazy_loading": true,
"alt_text": true,
"upload_preview": true
},
"api_architecture": {
"instruction": "Create frontend service abstractions that can later connect to Laravel.",
"services": [
"authService.ts",
"recipeService.ts",
"categoryService.ts",
"userService.ts",
"interactionService.ts"
],
"typed_models": [
"User",
"Category",
"Recipe",
"RecipeInteraction",
"AuthResponse",
"ApiError",
"Pagination"
],
"api_base_url": "Use VITE_API_URL.",
"mock_layer": "Keep mock data isolated behind the service layer so it can later be replaced by Axios requests without rewriting page components."
},
"frontend_architecture": {
"recommended_structure": [
"src/components/common",
"src/components/recipe",
"src/components/auth",
"src/components/admin",
"src/pages",
"src/pages/admin",
"src/layouts",
"src/services",
"src/context",
"src/hooks",
"src/types",
"src/utils"
],
"state_management": "Use React Context for authentication and local React state for page-specific state.",
"do_not_use": [
"Redux",
"complex global state architecture",
"unnecessary repository abstractions",
"unnecessary service layers"
]
},
"navigation": {
"guest": [
"Home",
"Recipes",
"Categories",
"Login",
"Register"
],
"user": [
"Home",
"Recipes",
"Profile",
"Logout"
],
"admin": [
"Home",
"Recipes",
"Admin Dashboard",
"Logout"
],
"mobile": "Collapse into a clean mobile menu."
},
"responsive_recipe_grid": {
"mobile": "1 column",
"tablet": "2 columns",
"desktop": "3 columns",
"large_desktop": "4 columns"
},
"delete_behavior": {
"recipe": {
"type": "permanent",
"confirmation_required": true,
"message": "This recipe will be permanently deleted."
},
"category": {
"type": "permanent",
"confirmation_required": true,
"dependency_message": "This category contains recipes and cannot be deleted until the related recipes are handled."
}
},
"quality_requirements": {
"do_not_generate": [
"broken placeholder pages",
"dead navigation links",
"fake backend integrations presented as real",
"hard-coded user roles inside individual components",
"duplicate components when reusable components are appropriate",
"desktop-only layouts",
"fixed-width layouts",
"horizontal overflow",
"inaccessible forms",
"unnecessary dependencies"
],
"must_verify": [
"all routes render",
"all navigation links work",
"protected route UX works",
"admin route UX works",
"mobile navigation works",
"recipe cards are responsive",
"recipe details are responsive",
"admin tables work on small screens",
"forms work on mobile",
"browser zoom does not break layout",
"loading states exist",
"empty states exist",
"error states exist",
"delete confirmation exists"
]
},
"implementation_phases": [
{
"phase": 1,
"name": "Foundation",
"tasks": [
"Initialize React + TypeScript + Vite",
"Configure Tailwind CSS",
"Set global typography and colors",
"Create routing",
"Create shared layout components",
"Create responsive navbar and footer"
]
},
{
"phase": 2,
"name": "Public Experience",
"tasks": [
"Build homepage",
"Build recipe listing",
"Build recipe cards",
"Build search UI",
"Build category filters",
"Build loading, empty, and error states"
]
},
{
"phase": 3,
"name": "Authentication UX",
"tasks": [
"Build login",
"Build registration",
"Build authentication context",
"Build protected route UX",
"Build role-aware navigation",
"Build user profile"
]
},
{
"phase": 4,
"name": "Recipe Experience",
"tasks": [
"Build protected recipe details",
"Build ingredients presentation",
"Build instructions presentation",
"Build recipe metadata",
"Build user interaction UI"
]
},
{
"phase": 5,
"name": "Admin Experience",
"tasks": [
"Build admin layout",
"Build dashboard",
"Build statistic cards",
"Build recipe management",
"Build recipe form",
"Build image URL/upload UI",
"Build category management",
"Build delete confirmation"
]
},
{
"phase": 6,
"name": "Responsive Polish",
"tasks": [
"Test mobile layouts",
"Test tablet layouts",
"Test desktop layouts",
"Test browser zoom",
"Fix overflow",
"Refine spacing",
"Refine typography",
"Refine accessibility",
"Remove unnecessary visual complexity"
]
}
],
"final_instruction": "Build Rosui Ghor as a polished but intentionally simple university project. Follow the approved documentation exactly. Prioritize complete functionality, responsive behavior, clean UI, accessibility, and maintainable React structure. Do not expand the scope. Do not implement backend logic. Do not introduce AI, subscriptions, payments, multi-vendor functionality, real-time systems, or production infrastructure. Keep the frontend ready for later Laravel API integration."
}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/828a1ddd-4030-471a-b01e-64626484f013).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
