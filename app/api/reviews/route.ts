import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "reviews",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url || '');
            }
          ).end(buffer);
        });

        photosUrls.push(uploadResult);
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
