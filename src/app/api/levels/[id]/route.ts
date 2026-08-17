import { NextRequest, NextResponse } from 'next/server';
import { LEVELS, hashSecret } from '@/lib/levels';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params;
  const levelId = parseInt(p.id, 10);
  const level = LEVELS.find(l => l.id === levelId);

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Returns the system prompt (which inherently contains the secret, per design)
  // and the hints array
  return NextResponse.json({
    systemPrompt: level.systemPrompt,
    hints: level.hints
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params;
  const levelId = parseInt(p.id, 10);
  const level = LEVELS.find(l => l.id === levelId);

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  try {
    const { guess } = await request.json();
    if (!guess) {
      return NextResponse.json({ success: false, error: "No guess provided" }, { status: 400 });
    }

    const hashedGuess = hashSecret(guess);
    const success = hashedGuess === level.secretHash;

    return NextResponse.json({ success });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
