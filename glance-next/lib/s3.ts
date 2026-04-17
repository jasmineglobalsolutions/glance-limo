import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  // Keep runtime validation in route handlers too for clear responses.
}

export function getS3Client() {
  return new S3Client({
    region: region ?? 'ap-south-1',
    credentials:
      accessKeyId && secretAccessKey
        ? {
            accessKeyId,
            secretAccessKey,
          }
        : undefined,
  });
}

export function getS3BucketName() {
  return (
    process.env.AWS_S3_BUCKET ||
    process.env.AWS_BUCKET_NAME ||
    process.env.S3_BUCKET_NAME ||
    ''
  );
}
