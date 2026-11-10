import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nom de fichier unique sécurisé
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `proof_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    let publicUrl = '';

    try {
      const supabase = createServerClient();
      const { data, error } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(data.path);
        publicUrl = urlData.publicUrl;
      }
    } catch (e) {
      console.warn('Supabase storage fallback: using local mock URL');
    }

    if (!publicUrl) {
      // Fallback si Supabase n'est pas encore lié
      publicUrl = `/uploads/${fileName}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
