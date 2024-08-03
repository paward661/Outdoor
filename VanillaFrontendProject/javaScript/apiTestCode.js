function testPreflight() {
    fetch('https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic', {
        method: 'OPTIONS',
    })
    .then(response => {
        if (response.ok) {
            console.log(response.json());
        } else {
            console.error('Preflight response failed:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error checking preflight:', error);
    })
}