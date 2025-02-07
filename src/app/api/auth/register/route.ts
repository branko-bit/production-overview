import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Update this path according to where your Prisma client is located
import bcrypt from 'bcrypt'; // Use bcryptjs for hashing passwords

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this username already exists.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        role: 'SPECTATOR',
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
