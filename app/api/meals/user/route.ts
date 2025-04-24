import connectMongoDB from '@/config/mongodb';
import Meal from '@/models/mealSchema';
import mongoose from 'mongoose'; // Import mongoose to use ObjectId
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Get the username from the URL search parameters
  const url = new URL(req.url);
  console.log('Request URL:', url.href);
  const userId = url.searchParams.get('user');
  console.log('Fetching meals for user:', userId);
  if (!userId) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // Ensure the username is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid username format' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Convert the username to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch meals where the createdBy matches the ObjectId
    const meals = await Meal.find({ createdBy: userId });

    // Return the filtered meals as a JSON response
    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 });
  }
}