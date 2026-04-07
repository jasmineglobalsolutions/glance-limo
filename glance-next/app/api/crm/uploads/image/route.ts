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

export async function POST(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const service = String(formData.get('service') ?? 'general');

  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'Image file is required.' }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: 'Only JPG, PNG, and WEBP are supported.' },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return NextResponse.json(
      { message: 'Image must be 8MB or smaller.' },
      { status: 400 },
    );
  }

  const bucket = getS3BucketName();
  const region = process.env.AWS_REGION ?? 'ap-south-1';

  if (!bucket) {
    return NextResponse.json(
      {
        message:
          'Missing S3 bucket name. Set AWS_S3_BUCKET (or AWS_BUCKET_NAME/S3_BUCKET_NAME) in .env.',
      },
      { status: 500 },
    );
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { message: 'Missing AWS credentials in .env.' },
      { status: 500 },
    );
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
  const safeService = service.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';
  const key = `crm/services/${safeService}/${Date.now()}-${randomUUID()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const s3 = getS3Client();

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    }),
  );

  const url = getPublicUrl(bucket, region, key);
  return NextResponse.json({ url, key });
}
