function generateAPIKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    for (let i = 0; i < length; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
  }
  
//   console.log(generateAPIKey(32)); // Example output: 'uA7jKp9XrV6E3MqDcG5LhF2fBvTnZtW'
  