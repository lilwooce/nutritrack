// api/food/update/route.ts
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI as string; // MongoDB URI from your environment variables
const client = new MongoClient(uri);

export async function PUT(request: Request) {
  try {
    // Parse the body of the request to get the updated food item
    const updatedItem = await request.json();
    console.log('Updated Item:', updatedItem);

    if (!updatedItem.id) {
      return NextResponse.json(
        { message: 'Item ID is required' },
        { status: 400 }
      );
    }

    if (!updatedItem.name) {
      return NextResponse.json(
        { message: 'Name is a Required Field.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db('Nutritrack'); // Replace 'nutritionDB' with your database name
    const collection = db.collection('meals'); // Replace 'meals' with your collection name

    // Find the item by ID and update it
    const result = await collection.updateOne(
      { _id: new ObjectId(updatedItem.id) }, // Find the food item by ID
      {
        $set: {
          name: updatedItem.name,
          description: updatedItem.description,
          category: updatedItem.category || 'Uncategorized', // Default to 'Uncategorized' if not provided
          isVegan: updatedItem.isVegan,
          isVegetarian: updatedItem.isVegetarian,
          isGlutenFree: updatedItem.isGlutenFree,
          imageUrl: updatedItem.imageUrl,
          dateAvailable: updatedItem.dateAvailable,
          dateAdded: updatedItem.dateAdded,
          diningLocation: updatedItem.diningLocation,
          nutrients: updatedItem.nutrients,
          tags: updatedItem.tags,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Food item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Food item updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating food item:', error);
    return NextResponse.json(
      { message: 'Failed to update food item' },
      { status: 500 }
    );
  } finally {
    // Close the database connection
    await client.close();
  }
}
