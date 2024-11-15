import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all records
export async function GET() {
  try {
    const records = await prisma.employee.findMany();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Add new record
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRecord = await prisma.employee.create({ data });
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Error adding record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
