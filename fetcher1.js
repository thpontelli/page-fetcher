const request = require('request');
const fs = require('fs');
const readline = require('readline');

const downloadToFile = function(URL, filename) {
  request(URL, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the page.
    
      fs.open(filename, 'w+', (err, body) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile (filename, body, 'w+', err => {
            if (err) {
              console.error(err);
            }
          })
        }
        // file written successfully
        fs.close();
      });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const commandLineArgs = process.argv.splice(2);
console.log(commandLineArgs);

fs.readFile(commandLineArgs[1], 'utf8', (error, data) => {
  console.log("In readFile's Callback: it has the data.");
  // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
  if (!error) {
    rl.question('File already exists, do you want to overwrite it? (Y/N): ', (answer) => {
      if (answer === "Y" || answer === "y") {
        console.log("User wants to overwrite the file")
        downloadToFile(commandLineArgs[0], commandLineArgs[1])
      } else {
        console.log("Operation cancelled")
      }
      rl.close();
    });
  } else {
    //console.log(error);
    downloadToFile(commandLineArgs[0], commandLineArgs[1]);
  }
  //console.log(data);
});





