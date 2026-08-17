import { NextResponse } from 'next/server';
import { LEVELS } from '@/lib/levels';

export async function GET() {
  // Only return metadata, never the secret or systemPrompt
  const metadata = LEVELS.map(level => ({
    id: level.id,
    codename: level.codename
  }));
  
  return NextResponse.json(metadata);
}
