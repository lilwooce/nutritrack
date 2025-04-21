// app/api/meals/delete/route.ts
import connectMongoDB from '@/config/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { ids } = (await request.json()) as { ids: string[] };

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { error: 'No IDs provided' },
      { status: 400 }
    );
  }

  try {
    const { db } = await connectMongoDB();
    if (!db) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await db.collection('meals').deleteMany({
      _id: { $in: objectIds },
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'No items found to delete' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${result.deletedCount} items deleted successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting items:', err);
    return NextResponse.json(
      { error: 'Failed to delete items' },
      { status: 500 }
    );
  }
}
