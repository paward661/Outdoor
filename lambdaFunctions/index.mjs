import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
const s3 = new S3Client();

export const handler = async (event) => {
    try {
        // Receive the image data in the event from an API Gateway
        const imageBuffer = Buffer.from(event.body, 'base64');
        const httpMethod = event.httpMethod;
        console.log(`Received ${httpMethod} request.`);

        //#############################################################################################################
        // Need to make objectKey dynamic
        // Add to API gateway methods
        //#############################################################################################################
        // S3 bucket and object location
        const bucketName = 'outdoorprofilepic';
        const objectKey = 'images/profile/user123.jpg';

        if (httpMethod == 'POST') {
            // Create the file write cmd
            const putObjectCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
                Body: imageBuffer,
                ACL: 'public-read', 
                ContentType: 'image/jpg',
            });

            // Upload the image to S3
            await s3.send(putObjectCommand);
        } else {
            // Create the file read cmd
            const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
            });

            // Read the image from S3
            const { Body } = await s3.send(getObjectCommand);
            //#########################################################################################################
            // Need to figure out how to convert the binary to base64 or something like that
            // Need to figure out how to send the image back through the API Gateway to my profile.js
            // Need to add GET method to API Gateway
            //#########################################################################################################
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
            },
            body: JSON.stringify({ message: 'S3 accessed or modified' }),
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