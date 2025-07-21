import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { date: 'desc' }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { error: 'Database error', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const clientName = formData.get('clientName') as string;
    const reviewText = formData.get('reviewText') as string;
    const rating = Number(formData.get('rating'));
    const type = formData.get('type') as 'web' | 'instalacion';
    const projectUrl = formData.get('projectUrl') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');

    const photosFiles = formData.getAll('photos') as File[];
    const photosUrls: string[] = [];

    for (const file of photosFiles) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const uint8Array = new Uint8Array(bytes);
        const timestamp = Date.now();
        const ext = file.name.split('.').pop();
        const filename = `review-${timestamp}.${ext}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, uint8Array);
        photosUrls.push(`/uploads/${filename}`);
      }
    }

    const review = await prisma.review.create({
      data: {
        clientName,
        reviewText,
        rating,
        type,
        projectUrl: projectUrl || null,
        photos: photosUrls,
        features,
        isActive: true,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Database error', details: String(error) },
      { status: 500 }
    );
  }
}
