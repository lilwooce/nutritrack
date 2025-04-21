import connectMongoDB from '@/config/mongodb';
import Meal from '@/models/mealSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    await connectMongoDB();
    const meals = await Meal.find({});
    return NextResponse.json(meals);
  }


export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const newMeal = new Meal(body);
    const savedMeal = await newMeal.save();

    return NextResponse.json({ message: 'Meal added successfully', meal: savedMeal }, { status: 201 });
  } catch (error) {
    console.error('Error adding meal:', error);
    return NextResponse.json({ message: 'Failed to add meal' }, { status: 500 });
  }
}