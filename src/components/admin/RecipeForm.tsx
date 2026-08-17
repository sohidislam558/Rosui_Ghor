import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Image as ImageIcon, Upload, Link2 } from "lucide-react";
import type { Category, Difficulty, RecipeInput } from "@/types";
import { Input, Textarea, Select } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";

interface RecipeFormProps {
  initialValues?: Partial<RecipeInput>;
  categories: Category[];
  onSubmit: (data: RecipeInput) => Promise<void>;
  submitLabel?: string;
  isEditing?: boolean;
}

export function RecipeForm({
  initialValues,
  categories,
  onSubmit,
  submitLabel = "Save Recipe",
  isEditing: _isEditing = false,
}: RecipeFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [categoryId, setCategoryId] = useState<number>(
    initialValues?.category_id ?? (categories[0]?.id ?? 1)
  );
  const [cookingTime, setCookingTime] = useState<number>(initialValues?.cooking_time ?? 30);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialValues?.difficulty ?? "Medium");

  // Image source mode: 'url' or 'upload'
  const [imageSource, setImageSource] = useState<"url" | "upload">(
    initialValues?.image_path ? "upload" : "url"
  );
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.image_url ?? initialValues?.image_path ?? null
  );

  const [ingredients, setIngredients] = useState(initialValues?.ingredients ?? "");
  const [instructions, setInstructions] = useState(initialValues?.instructions ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setImageFile(null);
    setPreviewUrl(url.trim() ? url.trim() : null);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs["title"] = "Recipe title is required.";
    if (!description.trim()) errs["description"] = "Short description is required.";
    if (!categoryId) errs["category_id"] = "Category is required.";
    if (!cookingTime || cookingTime <= 0) errs["cooking_time"] = "Valid cooking time in minutes is required.";
    if (!ingredients.trim()) errs["ingredients"] = "Ingredients list is required.";
    if (!instructions.trim()) errs["instructions"] = "Cooking instructions are required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        category_id: Number(categoryId),
        cooking_time: Number(cookingTime),
        difficulty,
        image_url: imageSource === "url" && imageUrl.trim() ? imageUrl.trim() : null,
        image_path: null,
        image: imageSource === "upload" ? imageFile : null,
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
      });
    } catch (err: any) {
      setError(err?.message || "Failed to save recipe. Please check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {error && (
        <Alert variant="error" title="Form Error">
          {error}
        </Alert>
      )}

      {/* Main Details Section */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Recipe Title"
              id="recipe-title"
              required
              placeholder="e.g. Traditional Mustard Hilsa (Ilish Bhapa)"
              value={title}
              error={errors["title"]}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors["title"]) setErrors((prev) => ({ ...prev, title: "" }));
              }}
            />
          </div>

          <Select
            label="Category"
            id="recipe-category"
            required
            value={categoryId}
            error={errors["category_id"]}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select
            label="Difficulty Level"
            id="recipe-difficulty"
            required
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>

          <Input
            label="Cooking Time (minutes)"
            id="recipe-time"
            type="number"
            min="1"
            required
            placeholder="e.g. 45"
            value={cookingTime}
            error={errors["cooking_time"]}
            onChange={(e) => {
              setCookingTime(Number(e.target.value));
              if (errors["cooking_time"]) setErrors((prev) => ({ ...prev, cooking_time: "" }));
            }}
          />

          <div className="sm:col-span-2">
            <Textarea
              label="Short Description / Summary"
              id="recipe-description"
              required
              placeholder="Brief summary introducing the flavours, texture, and serving suggestion…"
              value={description}
              error={errors["description"]}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors["description"]) setErrors((prev) => ({ ...prev, description: "" }));
              }}
            />
          </div>
        </div>
      </div>

      {/* Image Selection Section */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recipe Image</h2>
            <p className="text-xs text-muted-foreground">
              Provide an external image URL or upload a photo from your computer.
            </p>
          </div>

          {/* Source Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            <button
              type="button"
              onClick={() => setImageSource("url")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                imageSource === "url"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              External URL
            </button>
            <button
              type="button"
              onClick={() => setImageSource("upload")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                imageSource === "upload"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              File Upload
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {imageSource === "url" ? (
              <Input
                label="Image URL"
                id="recipe-image-url"
                type="url"
                placeholder="https://images.unsplash.com/..."
                hint="Direct URL to a high-resolution food photo"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Choose Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary-hover"
                />
                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP, AVIF (Max 2MB)</p>
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Image Preview</label>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-dashed border-border bg-muted/40 flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Recipe Preview"
                  className="h-full w-full object-cover"
                  onError={() => setPreviewUrl(null)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
                  <span className="text-xs">No image provided yet (a default placeholder will be used)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Content: Ingredients & Instructions */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Cooking Details</h2>

        <Textarea
          label="Ingredients (one item per line)"
          id="recipe-ingredients"
          required
          rows={6}
          placeholder="2 cups rice&#10;500g chicken breast, cubed&#10;1 tbsp mustard oil&#10;1 tsp turmeric powder&#10;Salt to taste"
          hint="Press Enter after each ingredient with its quantity."
          value={ingredients}
          error={errors["ingredients"]}
          onChange={(e) => {
            setIngredients(e.target.value);
            if (errors["ingredients"]) setErrors((prev) => ({ ...prev, ingredients: "" }));
          }}
        />

        <Textarea
          label="Step-by-Step Instructions (one step per line)"
          id="recipe-instructions"
          required
          rows={7}
          placeholder="1. Wash and rinse the rice thoroughly until water runs clear.&#10;2. Marinate chicken with mustard oil and spices for 20 minutes.&#10;3. Heat oil in a heavy-bottomed pot over medium heat.&#10;4. Simmer gently for 25 minutes until chicken is tender."
          hint="Enter numbered or sequential preparation and cooking instructions."
          value={instructions}
          error={errors["instructions"]}
          onChange={(e) => {
            setInstructions(e.target.value);
            if (errors["instructions"]) setErrors((prev) => ({ ...prev, instructions: "" }));
          }}
        />
      </div>

      {/* Form Action Controls */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <Link to="/admin/recipes">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </Link>
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
