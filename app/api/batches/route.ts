import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const batches = await prisma.batches.findMany({
      orderBy: { batch_name: 'asc' },
      select: { batch_id: true, batch_name: true },
    });
    return NextResponse.json(batches.map((b) => b.batch_name));
  } catch (error) {
    console.error('[GET /api/batches] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
  }
}
