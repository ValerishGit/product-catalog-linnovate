// app/api/products/insert/route.ts
import { insertProducts } from '@/lib/database/initDatabase';
import { NextResponse } from 'next/server';

// Define a handler for POST requests to insert products
export async function POST(request: Request) {
  try {
    // Call the function to insert the sample data into the database
    const result = await insertProducts();

    // Return a success response
    return NextResponse.json(
      { message: `${result.insertedCount} products inserted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error inserting products:', error);
    return NextResponse.json(
      { message: 'Failed to insert products' },
      { status: 500 }
    );
  }
}
