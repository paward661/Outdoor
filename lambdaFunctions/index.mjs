import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
const s3 = new S3Client();

export const handler = async (event) => {
  try {
    const httpMethod = event.httpMethod;
    console.log(`Received ${httpMethod} request.`);

    //#############################################################################################################
    // Need to make objectKey dynamic
    // Add to API gateway methods
    //#############################################################################################################
    // S3 bucket and object location
    const bucketName = "outdoorprofilepic";
    const objectKey = "images/profile/user123.jpg";

    if (httpMethod == "POST") {
      // Receive the image data in the event from an API Gateway
      const imageBuffer = Buffer.from(event.body, "base64");

      // Create the file write cmd
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        Body: imageBuffer,
        ACL: "public-read",
        ContentType: "image/jpg",
      });

      // Upload the image to S3
      await s3.send(putObjectCommand);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "S3 accessed or modified" }),
      };
    } else if (httpMethod == "GET") {
      // Create the file read cmd
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });

      // Read the image from S3
      const item = await s3.send(getObjectCommand);
      const base64Data = await streamToString(item.Body);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
          "Content-Type": item.ContentType,
        },
        body: base64Data,
        isBase64Encoded: false,
      };
    } else if (httpMethod == "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Replace with your allowed origin(s)
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST", // Adjust based on your allowed methods
        },
        body: JSON.stringify({ message: "Image uploaded successfully" }),
      };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ error: "Image upload failed" }),
    };
  }
};

// Utility function to convert stream to String
async function streamToString(stream) {
  return new Promise((resolve, reject) => {
    if (!stream) {
      reject(new Error("Stream is undefined."));
      return;
    }
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
