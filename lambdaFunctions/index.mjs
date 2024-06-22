import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const s3 = new S3Client();

export const handler = async (event) => {
    try {
        // Receive the image data in the event from an API Gateway
        const imageBuffer = Buffer.from(event.body, 'base64');

        // S3 bucket and object location
        const bucketName = 'outdoorprofilepic';
        const objectKey = 'images/profile/user123.jpg';

        // Create the PutObjectCommand
        const putObjectCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            Body: imageBuffer,
            ACL: 'public-read', 
            ContentType: 'image/jpg',
        });

        // Upload the image to S3
        await s3.send(putObjectCommand);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
            },
            body: JSON.stringify({ message: 'Image uploaded successfully' }),
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONSPOST',
            },
            body: JSON.stringify({ error: 'Image upload failed' }),
        };
    }
};