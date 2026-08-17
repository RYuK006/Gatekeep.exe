import { NextRequest, NextResponse } from 'next/server';
import { LEVELS, hashSecret } from '@/lib/levels';

export async function POST(request: NextRequest) {
  try {
    const { levelId, guess } = await request.json();

    if (!levelId || !guess) {
      return NextResponse.json({ error: "Missing levelId or guess" }, { status: 400 });
    }

    const level = LEVELS.find(l => l.id === levelId);
    
    if (!level) {
      return NextResponse.json({ error: "Level not found" }, { status: 404 });
    }

    // Hash the incoming guess and compare
    const guessHash = hashSecret(guess);
    const success = guessHash === level.secretHash;

    return NextResponse.json({ success });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
