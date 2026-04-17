import { randomUUID } from 'node:crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

import { getCrmSession } from '@/lib/crm-auth';
import { getS3BucketName, getS3Client } from '@/lib/s3';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

function getPublicUrl(bucket: string, region: string, key: string) {
  const normalizedRegion = region || 'ap-south-1';
  return `https://${bucket}.s3.${normalizedRegion}.amazonaws.com/${key}`;
}

export async function GET() {
  return NextResponse.json({ message: 'Image upload endpoint' });
}

export async function POST(request: Request) {
  try {
    const session = await getCrmSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (e: any) {
      console.error('[UPLOAD_DEBUG] Failed to parse FormData:', e);
      return NextResponse.json({ message: 'Invalid form data', error: e.message }, { status: 400 });
    }

    const file = formData.get('file');
    const service = String(formData.get('service') ?? 'general');

    console.log('[UPLOAD_DEBUG] Form keys:', Array.from(formData.keys()));
    console.log('[UPLOAD_DEBUG] Received file:', file ? {
      name: (file as any).name,
      type: (file as any).type,
      size: (file as any).size,
      typeof: typeof file,
      isBlob: file instanceof Blob,
      isFile: file instanceof File,
    } : 'NULL');

    if (!file) {
      console.log('[UPLOAD_DEBUG] Validation failed: file is missing');
      return NextResponse.json({ message: 'File parameter is missing.' }, { status: 400 });
    }

    // Attempt to treat it as a file-like object even if instanceof fails
    const castFile = file as any;
    
    // Safely extract metadata
    let type = castFile.type || 'image/jpeg';
    let size = castFile.size || 0;
    let name = castFile.name || `upload-${Date.now()}`;

    // Extremely high limit for testing
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    if (size > MAX_SIZE) {
      return NextResponse.json({ message: 'File too large' }, { status: 400 });
    }

    const bucket = getS3BucketName();
    const region = process.env.AWS_REGION ?? 'ap-south-1';

    if (!bucket) {
      return NextResponse.json({ message: 'S3 Bucket missing' }, { status: 500 });
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json({ message: 'AWS Credentials missing' }, { status: 500 });
    }

    let ext = 'jpg';
    if (name.includes('.')) {
      ext = name.split('.').pop() || 'jpg';
    } else if (type.includes('/')) {
      ext = type.split('/').pop() || 'jpg';
    }

    const safeService = service.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';
    const key = `crm/services/${safeService}/${Date.now()}-${randomUUID()}.${ext}`;

    // Ensure we can get an array buffer
    if (typeof castFile.arrayBuffer !== 'function') {
      console.log('[UPLOAD_DEBUG] Object has no arrayBuffer method');
      return NextResponse.json({ message: 'Invalid file object' }, { status: 400 });
    }

    const buffer = Buffer.from(await castFile.arrayBuffer());
    const s3 = getS3Client();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: type,
        ACL: 'public-read',
      }),
    );

    const url = getPublicUrl(bucket, region, key);
    return NextResponse.json({ url, key });
  } catch (err: any) {
    console.error('[UPLOAD_DEBUG] CRITICAL ERROR:', err);
    return NextResponse.json(
      { message: 'Upload failed.', error: err.message, stack: err.stack },
      { status: 500 },
    );
  }
}
