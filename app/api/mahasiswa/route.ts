import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Mahasiswa } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: Mahasiswa = await request.json();
  const mahasiswa = await prisma.mahasiswa.create({
    data: {
      npm: body.npm,
      nama: body.nama,
      prodiId: body.prodiId,
    },
  });
  return NextResponse.json(mahasiswa, { status: 201 });
};
