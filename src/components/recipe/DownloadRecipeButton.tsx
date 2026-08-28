import { useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import type { Recipe } from "@/types";
import { Button } from "@/components/common/Button";

interface DownloadRecipeButtonProps {
    recipe: Recipe;
    variant?: "primary" | "secondary" | "ghost" | "green";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function DownloadRecipeButton({
    recipe,
    variant = "secondary",
    size = "md",
    className,
}: DownloadRecipeButtonProps) {
    const [downloading, setDownloading] = useState(false);

    const handleDownloadPdf = () => {
        try {
            setDownloading(true);

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 16;
            const contentWidth = pageWidth - margin * 2;
            let y = 20;

            // 1. Header Banner / Brand
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.setTextColor(217, 83, 79); // Rosui Ghor Brand Coral
            doc.text("Rosui Ghor", margin, y);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(120, 120, 120);
            doc.text("Authentic Homemade Recipes", margin + 46, y);
            y += 8;

            // Horizontal Divider
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            y += 10;

            // 2. Recipe Title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor(33, 37, 41);
            const titleLines = doc.splitTextToSize(recipe.title, contentWidth);
            doc.text(titleLines, margin, y);
            y += titleLines.length * 7 + 2;

            // 3. Metadata Row (Category, Cook Time, Difficulty)
            doc.setFontSize(9.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(100, 100, 100);
            const metaText = `Category: ${recipe.category?.name || "General"}    |    Cook Time: ${recipe.cooking_time} mins    |    Difficulty: ${recipe.difficulty}`;
            doc.text(metaText, margin, y);
            y += 8;

            // 4. Recipe Description
            if (recipe.description) {
                doc.setFont("helvetica", "italic");
                doc.setFontSize(10);
                doc.setTextColor(75, 85, 99);
                const descLines = doc.splitTextToSize(recipe.description, contentWidth);
                doc.text(descLines, margin, y);
                y += descLines.length * 5 + 6;
            }

            // 5. Ingredients Section Box
            doc.setDrawColor(217, 83, 79);
            doc.setFillColor(254, 242, 242);
            doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "FD");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(217, 83, 79);
            doc.text("INGREDIENTS", margin + 4, y + 5.5);
            y += 13;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9.5);
            doc.setTextColor(40, 40, 40);

            const ingredients = recipe.ingredients
                .split("\n")
                .map((i) => i.trim())
                .filter(Boolean);

            for (const ing of ingredients) {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                doc.setFillColor(217, 83, 79);
                doc.circle(margin + 3, y - 1, 0.8, "FD");
                const ingLines = doc.splitTextToSize(ing, contentWidth - 8);
                doc.text(ingLines, margin + 7, y);
                y += ingLines.length * 5 + 2;
            }
            y += 6;

            // 6. Instructions Section Box
            if (y > 250) {
                doc.addPage();
                y = 20;
            }

            doc.setDrawColor(46, 125, 50);
            doc.setFillColor(240, 253, 244);
            doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "FD");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(46, 125, 50);
            doc.text("STEP-BY-STEP INSTRUCTIONS", margin + 4, y + 5.5);
            y += 14;

            const instructions = recipe.instructions
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);

            instructions.forEach((step, idx) => {
                if (y > 265) {
                    doc.addPage();
                    y = 20;
                }
                const cleanStep = step.replace(/^\d+[\.\)]\s*/, "");

                // Step number
                doc.setFont("helvetica", "bold");
                doc.setTextColor(46, 125, 50);
                doc.text(`${idx + 1}.`, margin + 2, y);

                // Step description
                doc.setFont("helvetica", "normal");
                doc.setTextColor(40, 40, 40);
                const stepLines = doc.splitTextToSize(cleanStep, contentWidth - 10);
                doc.text(stepLines, margin + 8, y);
                y += stepLines.length * 5 + 4;
            });

            // 7. Footer on all pages
            const totalPages = doc.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Rosui Ghor Recipe Collection  •  Page ${i} of ${totalPages}`,
                    pageWidth / 2,
                    290,
                    { align: "center" }
                );
            }

            // 8. Trigger download
            const filename = `${recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-recipe.pdf`;
            doc.save(filename);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("Failed to create PDF. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Button
            type="button"
            variant={variant}
            size={size}
            loading={downloading}
            onClick={handleDownloadPdf}
            className={className}
            title="Download Recipe as PDF"
        >
            <Download className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>{downloading ? "Preparing PDF…" : "Download PDF"}</span>
        </Button>
    );
}
