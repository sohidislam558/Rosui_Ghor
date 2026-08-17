# Rosui Ghor Design Document

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **Design Direction**: Modern, Clean, Food-Focused
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS

---

## 1. Design Overview

Rosui Ghor should present itself as a modern recipe website with a warm food-oriented visual identity.

The design should prioritize:

- Recipe imagery
- Easy discovery
- Clear typography
- Simple navigation
- Strong visual hierarchy
- Responsive behavior
- Easy recipe reading
- Simple administration

The interface should feel like a real recipe platform while remaining simple enough to implement for a university project.

The original Shaad application uses recipe cards, category-based discovery, recipe images, recipe details, and a dedicated admin interface. Rosui Ghor retains these visual concepts while removing the original subscription and mobile-specific flows.

---

## 2. Design Philosophy

The visual direction should be:

- Modern
- Warm
- Minimal
- Food-focused
- Clean
- Friendly
- Responsive

Avoid:

- Excessive gradients
- Complex 3D effects
- Heavy animations
- Dashboard-heavy visual styles
- Excessive decorative elements
- Overly complicated navigation
- Corporate enterprise aesthetics

The recipe itself should remain the visual focus.

---

## 3. Visual Mood

The overall mood should communicate:

```text
Warm
   +
Fresh
   +
Clean
   +
Homemade
   +
Modern
```

The website should feel appropriate for:

- Home cooking
- Traditional recipes
- Everyday meals
- Food discovery
- Recipe learning

---

## 4. Brand Identity

### Brand Name

Rosui Ghor

The name should appear prominently in the main navigation and authentication pages.

Recommended visual treatment:

```text
Rosui
Ghor
```

or:

```text
Rosui Ghor
```

The final implementation can choose the stronger typographic treatment based on the selected font.

---

## 5. Color Palette

The palette should use warm food-inspired colors without becoming visually heavy.

### Primary

```text
#D97706
```

Warm amber/orange.

Use for:

- Primary buttons
- Active states
- Important accents
- Selected categories
- Call-to-action elements

### Secondary

```text
#166534
```

Deep green.

Use for:

- Secondary actions
- Food/natural accents
- Selected supporting elements

### Background

```text
#FFFDF8
```

Warm off-white.

Use as the primary page background.

### Surface

```text
#FFFFFF
```

White.

Use for:

- Cards
- Forms
- Panels
- Dashboard sections

### Primary Text

```text
#1F2937
```

Dark neutral.

### Secondary Text

```text
#6B7280
```

Gray.

### Border

```text
#E5E7EB
```

Light gray.

### Error

```text
#DC2626
```

### Success

```text
#16A34A
```

---

## 6. Color Usage Rules

Do not use the primary orange on every element.

Recommended hierarchy:

```text
Primary Orange
    ↓
Important actions

Deep Green
    ↓
Secondary/supporting actions

Neutral colors
    ↓
Most of the interface
```

The majority of the page should remain neutral.

Food photography should provide much of the visual richness.

---

## 7. Typography

### Recommended Font

Use:

```text
Inter
```

Inter provides a clean and readable interface for both desktop and mobile.

If a more food-oriented visual identity is desired, headings can use:

```text
Playfair Display
```

Recommended combination:

```text
Headings:
Playfair Display

Body:
Inter
```

This creates a distinction between editorial recipe content and interface controls.

---

## 8. Typography Scale

### H1

Desktop:

```text
48px
font-weight: 700
line-height: 1.1
```

Tablet:

```text
40px
```

Mobile:

```text
32px
```

### H2

Desktop:

```text
32px
font-weight: 700
```

Mobile:

```text
26px
```

### H3

```text
22px
font-weight: 600
```

### Body

```text
16px
line-height: 1.6
```

### Small Text

```text
14px
```

Use for:

- Metadata
- Category labels
- Supporting information

---

## 9. Layout System

Use a centered responsive container.

Recommended maximum width:

```text
1200px
```

Example:

```text
┌───────────────────────────────────────────────┐
│                1200px max                     │
│                                               │
│                Page Content                   │
│                                               │
└───────────────────────────────────────────────┘
```

The layout should use:

- CSS Grid
- Flexbox
- Responsive widths
- Fluid spacing

Avoid fixed page widths.

---

## 10. Spacing System

Use Tailwind's spacing scale consistently.

Recommended visual spacing:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
```

Typical section spacing:

Desktop:

```text
64px to 96px
```

Mobile:

```text
40px to 56px
```

---

## 11. Border Radius

Use moderate rounding.

Recommended:

```text
Buttons: 8px
Inputs: 8px
Cards: 12px
Large containers: 16px
Images: 12px
```

Avoid extremely rounded pill-shaped interfaces except for:

- Category tags
- Small status labels
- Filter chips

---

## 12. Shadows

Use subtle shadows.

Cards should not look heavily elevated.

Recommended concept:

```text
Small shadow
+
Thin border
```

The border should remain visible even when the shadow is subtle.

---

## 13. Navigation Design

The main navigation should be simple.

Recommended desktop layout:

```text
┌──────────────────────────────────────────────────────┐
│ Rosui Ghor    Home   Recipes   Categories   Profile  │
│                                      Login/Register  │
└──────────────────────────────────────────────────────┘
```

For authenticated users:

```text
Rosui Ghor
Home
Recipes
Profile
Logout
```

For administrators:

```text
Rosui Ghor
Home
Recipes
Admin Dashboard
Logout
```

---

## 14. Mobile Navigation

On smaller screens, navigation should collapse.

Recommended:

```text
┌───────────────────────────────┐
│ Rosui Ghor              ☰     │
└───────────────────────────────┘
```

The menu should open into a vertical navigation panel.

The navigation must not overflow horizontally.

---

## 15. Homepage Structure

Recommended homepage:

```text
Navigation
     ↓
Hero
     ↓
Featured Recipes
     ↓
Categories
     ↓
Latest Recipes
     ↓
Call to Action
     ↓
Footer
```

The homepage should prioritize recipe discovery.

---

## 16. Hero Section

The hero should contain:

- Strong headline
- Short supporting text
- Recipe discovery CTA
- Food image

Recommended layout:

```text
┌──────────────────────┬──────────────────────────┐
│                      │                          │
│ Discover Delicious   │                          │
│ Recipes              │       Food Image        │
│                      │                          │
│ Explore recipes...   │                          │
│                      │                          │
│ [Explore Recipes]    │                          │
│                      │                          │
└──────────────────────┴──────────────────────────┘
```

Desktop:

- Two-column layout

Mobile:

- Image and text stacked

---

## 17. Hero Image

Use a high-quality food image.

Image requirements:

- Landscape or adaptable composition
- Clear food subject
- Good lighting
- No distracting background
- High enough resolution for large screens

The image should have rounded corners.

Avoid excessive overlays.

---

## 18. Featured Recipes

Display a small selection of recipes.

Recommended:

```text
Featured Recipes

┌────────┐ ┌────────┐ ┌────────┐
│ Image  │ │ Image  │ │ Image  │
│        │ │        │ │        │
│ Title  │ │ Title  │ │ Title  │
└────────┘ └────────┘ └────────┘
```

Desktop:

3 or 4 cards.

Tablet:

2 cards per row.

Mobile:

1 card per row or horizontal scroll depending on implementation.

For simplicity, a responsive grid is preferred.

---

## 19. Recipe Card Design

Recipe cards are one of the most important components.

Recommended structure:

```text
┌────────────────────────────┐
│                            │
│         Recipe Image       │
│                            │
├────────────────────────────┤
│ Dinner                     │
│ Chicken Curry              │
│                            │
│ 45 min   •   Medium        │
│                            │
│ View Recipe →              │
└────────────────────────────┘
```

---

## 20. Recipe Card Image

Image:

- Full card width
- Fixed aspect ratio
- `object-cover`
- Rounded top corners

Recommended aspect ratio:

```text
4:3
```

The image must not distort.

---

## 21. Recipe Card Interaction

On hover:

- Slight image scale
- Slight shadow increase
- Button or arrow becomes more prominent

Keep animation subtle.

Recommended duration:

```text
150ms to 250ms
```

Do not use excessive animations.

---

## 22. Recipe Metadata

Display:

```text
Category
Cooking Time
Difficulty
```

Use small icons where appropriate.

Example:

```text
Dinner
30 min
Easy
```

Icons should be used consistently.

---

## 23. Category Section

Categories should be visually easy to scan.

Example:

```text
Browse by Category

[ Breakfast ] [ Lunch ] [ Dinner ] [ Snacks ]
```

On mobile, categories should wrap naturally.

Do not force them into a single horizontal line.

---

## 24. Category Card

Optional category cards may use:

- Small image
- Category name
- Recipe count

Example:

```text
┌──────────────────┐
│      Image       │
│                  │
│     Dinner       │
│   12 Recipes     │
└──────────────────┘
```

If implementation time is limited, simple category buttons are sufficient.

---

## 25. Recipe Listing Page

Recommended structure:

```text
Page Header
     ↓
Search Bar
     ↓
Category Filters
     ↓
Recipe Grid
     ↓
Pagination
```

Example:

```text
Recipes

[ Search recipes... ]

[All] [Breakfast] [Lunch] [Dinner] [Snacks]

┌────────┐ ┌────────┐ ┌────────┐
│ Recipe │ │ Recipe │ │ Recipe │
└────────┘ └────────┘ └────────┘
```

---

## 26. Search Bar

The search field should be prominent but not oversized.

Recommended:

```text
┌────────────────────────────────────────────┐
│ Search recipes...                    🔍    │
└────────────────────────────────────────────┘
```

Use:

- White background
- Border
- Rounded corners
- Clear focus state

---

## 27. Category Filter

The active category should use the primary accent.

Example:

```text
All
Breakfast
Lunch
Dinner
Snacks
```

Active:

```text
[ Dinner ]
```

Inactive:

```text
  Dinner
```

---

## 28. Protected Recipe Details Design

The recipe details page should prioritize readability.

Recommended structure:

```text
┌─────────────────────────────────────────────┐
│                 Recipe Image                │
└─────────────────────────────────────────────┘

Category

Chicken Curry

Description

45 min • Medium

─────────────────────────────────────────────

Ingredients

• Chicken
• Onion
• Garlic
• Spices

─────────────────────────────────────────────

Cooking Instructions

1. Prepare the ingredients.
2. Heat the pan.
3. Cook the chicken.
4. Serve.
```

---

## 29. Recipe Details Desktop Layout

Use a two-column structure near the top:

```text
┌────────────────────────┬─────────────────────┐
│                        │ Category            │
│     Recipe Image       │ Recipe Title        │
│                        │ Description         │
│                        │ Cooking Time        │
│                        │ Difficulty          │
└────────────────────────┴─────────────────────┘
```

Ingredients and instructions should appear below.

---

## 30. Recipe Details Mobile Layout

Stack everything:

```text
Image
↓
Category
↓
Title
↓
Description
↓
Metadata
↓
Ingredients
↓
Instructions
```

No horizontal two-column layout should remain on small screens.

---

## 31. Authentication Pages

Login and registration pages should be visually simple.

Recommended layout:

```text
┌─────────────────────────────────────┐
│                                     │
│            Rosui Ghor               │
│                                     │
│            Welcome Back              │
│                                     │
│ Email                               │
│ [_______________________________]   │
│                                     │
│ Password                            │
│ [_______________________________]   │
│                                     │
│ [           Login               ]   │
│                                     │
│ Don't have an account? Register     │
│                                     │
└─────────────────────────────────────┘
```

---

## 32. Authentication Background

Use the warm off-white background.

A subtle food image may be used on desktop.

On mobile, prioritize the form and avoid excessive background imagery.

---

## 33. Form Design

Inputs should use:

- Clear labels
- Visible borders
- Consistent height
- Rounded corners
- Clear focus state
- Inline validation messages

Recommended height:

```text
44px to 48px
```

---

## 34. Button Design

### Primary Button

```text
Background: #D97706
Text: white
Radius: 8px
```

Examples:

- Explore Recipes
- Login
- Register
- Add Recipe
- Save Recipe

### Secondary Button

White or neutral background with border.

Examples:

- Cancel
- Back
- Clear Filters

### Destructive Button

Use red only for:

- Delete
- Permanent destructive actions

---

## 35. Button States

Buttons must support:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Loading example:

```text
Saving...
```

The button should prevent duplicate submissions while loading.

---

## 36. Admin Dashboard Design

The admin interface should use the same brand identity but have a more functional layout.

Recommended:

```text
┌──────────────────────────────────────────────────┐
│ Rosui Ghor Admin                                 │
├──────────────┬───────────────────────────────────┤
│ Dashboard    │                                   │
│ Recipes      │       Dashboard Statistics        │
│ Categories   │                                   │
│ Logout       │   Users   Recipes   Categories   │
│              │                                   │
│              │       Recent Recipes              │
└──────────────┴───────────────────────────────────┘
```

---

## 37. Admin Sidebar

Desktop:

- Fixed or sticky sidebar
- Navigation links
- Active state
- Logout

Mobile:

- Collapsible navigation
- Drawer or dropdown

The admin interface should not require a completely separate visual system.

---

## 38. Dashboard Statistic Cards

Use three main cards:

```text
┌─────────────┐
│ Users       │
│ 24          │
└─────────────┘

┌─────────────┐
│ Recipes     │
│ 48          │
└─────────────┘

┌─────────────┐
│ Categories  │
│ 4           │
└─────────────┘
```

Cards should remain visually simple.

---

## 39. Admin Recipe Table

Desktop:

```text
┌──────────────────────────────────────────────────┐
│ Image │ Title │ Category │ Time │ Difficulty │   │
├──────────────────────────────────────────────────┤
│ ...   │ ...   │ ...      │ ...  │ ...        │   │
└──────────────────────────────────────────────────┘
```

Actions:

- Edit
- Delete

Mobile:

The table should become horizontally scrollable or transform into stacked cards.

Do not allow table content to break the viewport.

---

## 40. Admin Recipe Form

Use a clean single-column or two-column responsive form.

Desktop:

```text
Title                Category

Description          Difficulty

Cooking Time         Image Source

Image URL / Upload

Ingredients

Instructions

[Cancel] [Save Recipe]
```

Mobile:

All fields become one column.

---

## 41. Image Upload Interface

The administrator should clearly choose:

```text
Image Source

[ External URL ] [ Upload ]
```

External URL:

```text
Image URL
[________________________________]
```

Upload:

```text
Upload Recipe Image
[ Choose File ]
```

A preview should be displayed when practical.

---

## 42. Delete Confirmation

Permanent deletion should require confirmation.

Example:

```text
Delete Recipe?

This recipe will be permanently deleted.

[Cancel] [Delete]
```

The destructive action should be visually distinct.

---

## 43. Feedback Messages

Use consistent notification styles.

Success:

```text
Recipe created successfully.
```

Error:

```text
Unable to save recipe.
Please check the form.
```

Warning:

```text
This category contains recipes and cannot be deleted.
```

---

## 44. Loading States

Use skeletons or simple loading indicators.

Recipe grid:

```text
┌────────┐ ┌────────┐ ┌────────┐
│ ██████ │ │ ██████ │ │ ██████ │
│ ████   │ │ ████   │ │ ████   │
│ █████  │ │ █████  │ │ █████  │
└────────┘ └────────┘ └────────┘
```

Do not create complicated animated loaders.

---

## 45. Empty States

Recipe search:

```text
No recipes found.

Try another search term or category.
```

No recipes:

```text
No recipes have been added yet.
```

Admin category:

```text
No categories available.

[Add Category]
```

---

## 46. Error States

The design should distinguish:

- Validation errors
- Authentication errors
- Permission errors
- Network errors
- Not-found errors
- Server errors

Messages should be short and understandable.

---

## 47. Icons

Use one consistent icon library.

Recommended:

```text
Lucide React
```

Use icons for:

- Search
- Menu
- User
- Clock
- Category
- Edit
- Delete
- Plus
- Logout
- Chevron

Do not use icons as a replacement for important text.

---

## 48. Image Guidelines

Food images should be:

- High quality
- Properly cropped
- Consistent aspect ratio
- Responsive
- Lazy-loaded where appropriate

Recipe cards should use consistent image dimensions.

Avoid distorted images.

Use:

```text
object-cover
```

for card images.

---

## 49. Accessibility

The UI should provide basic accessibility.

Requirements:

- Semantic HTML
- Labels for form inputs
- Keyboard-accessible controls
- Visible focus states
- Sufficient text contrast
- Meaningful button labels
- Alternative text for recipe images
- Logical heading hierarchy

Images should use meaningful `alt` text.

Example:

```text
alt="Chicken curry served in a bowl"
```

---

## 50. Responsive Breakpoints

Use Tailwind's responsive system.

Recommended conceptual breakpoints:

```text
Mobile
< 640px

Small tablet
640px+

Tablet / small desktop
768px+

Desktop
1024px+

Large desktop
1280px+
```

The design must not depend on only these exact widths.

Components should respond naturally to available space.

---

## 51. Responsive Grid

Recipe cards:

Mobile:

```text
1 column
```

Tablet:

```text
2 columns
```

Desktop:

```text
3 columns
```

Large desktop:

```text
4 columns
```

The grid should use flexible sizing rather than hard-coded card widths.

---

## 52. Zoom Behavior

The application must remain usable when browser zoom changes.

Avoid:

- absolute positioning for major content
- fixed pixel widths for page containers
- text embedded in images
- fixed-height sections that clip text
- navigation dependent on exact viewport width

Use:

- max-width containers
- flexible grids
- wrapping text
- responsive spacing
- natural document flow

---

## 53. Animation Guidelines

Animations should be subtle.

Use animation for:

- Card hover
- Button interaction
- Navigation menu
- Modal appearance
- Page transitions if useful

Avoid:

- Constant background animation
- Excessive parallax
- Large motion effects
- Complex animation libraries for simple interactions

Framer Motion is optional.

Tailwind transitions are sufficient for most interactions.

---

## 54. Mobile Interaction Guidelines

Buttons should be large enough for touch interaction.

Avoid placing destructive and safe actions too close together.

Forms should have enough spacing between fields.

The keyboard should not cover important form actions.

Search should remain easily accessible on mobile.

---

## 55. Desktop Interaction Guidelines

Desktop layouts should use available horizontal space efficiently.

The maximum content width should prevent excessive line lengths.

Recipe details should use a readable text width.

Admin tables may use the available desktop width.

---

## 56. Design Consistency

All pages must share:

- Same typography
- Same color palette
- Same button system
- Same form styles
- Same spacing system
- Same border-radius system
- Same icon style
- Same responsive rules

The admin dashboard may be more dense but should still look like part of Rosui Ghor.

---

## 57. Component Inventory

### Global Components

- Navbar
- Footer
- Button
- Input
- Select
- Modal
- Alert
- Loading indicator
- Empty state
- Error state

### Recipe Components

- Recipe Card
- Recipe Grid
- Recipe Metadata
- Category Filter
- Search Bar
- Recipe Image
- Recipe Details

### Authentication Components

- Login Form
- Register Form
- Protected Route

### User Components

- Profile Form
- Interaction Button

### Admin Components

- Admin Sidebar
- Dashboard Card
- Recipe Table
- Recipe Form
- Category Table
- Category Form
- Delete Confirmation Modal

---

## 58. Page-Level Visual Hierarchy

Every page should have one clear primary action.

Examples:

Home:

```text
Explore Recipes
```

Recipes:

```text
Search / Filter
```

Recipe Details:

```text
Read Recipe
```

Login:

```text
Login
```

Register:

```text
Create Account
```

Admin Dashboard:

```text
Manage Content
```

Add Recipe:

```text
Save Recipe
```

---

## 59. Design Reference Direction

The uploaded AI Website Building Guide recommends defining:

- Visual style
- Color palette
- Typography
- Layout
- Components
- Page-specific designs
- Responsive behavior

Rosui Ghor follows that structure while keeping the design scope appropriate for a small university project.

The original Shaad material provides the functional visual direction for recipe browsing, categories, recipe details, and administrative recipe management.

---

## 60. Final Design Principle

The website should make the user reach a recipe quickly.

The visual priority is:

```text
Recipe Image
     ↓
Recipe Name
     ↓
Category / Time / Difficulty
     ↓
Recipe Details
```

The design should never allow decorative elements to compete with the recipe content.

Rosui Ghor should look polished enough for a university project demonstration while remaining simple enough to implement consistently with React, TypeScript, Tailwind CSS, Laravel, and MySQL.
