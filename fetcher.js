const request = require('request');
const fs = require('fs');

const commandLineArgs = process.argv.splice(2);
console.log(commandLineArgs);

request(commandLineArgs[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the page.
  
    fs.writeFile(commandLineArgs[1], body, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
});