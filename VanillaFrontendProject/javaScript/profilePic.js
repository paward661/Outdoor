export class profilePicS3 {
    saveImageToS3(upImg) {
        fetch('https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic', {
                method: 'POST',
                body: upImg, // Pass the base64-encoded image data
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            })
            .then(response => {
                if (response.ok) {
                    // Image uploaded successfully
                    console.log(response.json());
                } else {
                    console.error('Image upload failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }
}