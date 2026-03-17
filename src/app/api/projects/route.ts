import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function generateCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Fuel Haulage & Delivery': 'fuel-haulage',
    'Heavy Duty Equipment': 'equipment-hire',
    'Real Estate Solutions': 'real-estate',
  };
  return categoryMap[category] || generateSlug(category);
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, category, client, year, location, duration, description, mainImage, media, metrics } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(name);
    // Ensure slug uniqueness by appending a timestamp suffix if needed
    let slug = baseSlug;
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        category,
        categorySlug: generateCategorySlug(category),
        client: client || null,
        year: year || null,
        location: location || null,
        duration: duration || null,
        description: description || null,
        mainImage: mainImage || null,
        media: media ? JSON.stringify(media) : null,
        metrics: metrics ? JSON.stringify(metrics) : null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
