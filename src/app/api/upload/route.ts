import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';

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
    const cleanBaseName = file.name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
    const fileName = `upload_${Date.now()}_${cleanBaseName}.${fileExt}`;

    let publicUrl = '';

    // Tentative Supabase Storage
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
      // Supabase non lié ou bucket non accessible
    }

    // Sauvegarde physique dans public/uploads pour affichage et prévisualisation immédiats
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const diskPath = path.join(uploadDir, fileName);
      fs.writeFileSync(diskPath, buffer);
      
      if (!publicUrl) {
        publicUrl = `/uploads/${fileName}`;
      }
    } catch (diskErr) {
      console.warn('Could not write to public/uploads disk:', diskErr);
      if (!publicUrl) {
        const base64Data = buffer.toString('base64');
        publicUrl = `data:${file.type};base64,${base64Data}`;
      }
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
