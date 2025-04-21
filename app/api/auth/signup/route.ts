import connectMongoDB from '@/config/mongodb';
import User from '@/models/userSchema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectMongoDB();
  const { username, email, password } = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const user = new User({ username, email, password });
    await user.save();

    return NextResponse.json({ message: 'User created successfully', user: user }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error for debugging
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
