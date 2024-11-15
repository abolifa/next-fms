import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get record using params id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const record = await prisma.fuelType.findUnique({
      where: { id: params.id },
    });
    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Edit record using params id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedRecord = await prisma.fuelType.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete record using params id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
