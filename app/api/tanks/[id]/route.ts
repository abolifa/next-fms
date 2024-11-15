import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get record using params id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const record = await prisma.tank.findUnique({
      where: { id: params.id },
      include: {
        fuelType: true,
      },
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
    const updatedRecord = await prisma.tank.update({
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
    await prisma.tank.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
