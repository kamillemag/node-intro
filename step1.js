const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log("ERROR OCCURRED", err)
            process.exit(400)
        }
        console.log("SUCCESS", data)
    })
};

cat('one.txt')