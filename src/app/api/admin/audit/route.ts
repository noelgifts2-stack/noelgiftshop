import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs, addAuditLog } from '@/lib/adminStore';

export async function GET(request: NextRequest) {
  try {
    const logs = getAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry = addAuditLog(body);
    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
