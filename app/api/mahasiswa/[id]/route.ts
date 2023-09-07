import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Mahasiswa } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Mahasiswa = await request.json();
  const mahasiswa = await prisma.mahasiswa.update({
    where: {
      id: Number(params.id),
    },
    data: {
      npm: body.npm,
      nama: body.nama,
      prodiId: body.prodiId,
    },
  });
  return NextResponse.json(mahasiswa, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const mahasiswa = await prisma.mahasiswa.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(mahasiswa, { status: 200 });
};
