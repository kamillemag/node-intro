const fs = require('fs');
const axios = require('axios');
const process = require('process');

function handleOutput(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', function(err){
            if(err){
                console.log('ERROR OCCURRED', err);
                process.exit(400);
            }
        });
    }
    else{
        console.log(text);
    }
}

function cat(path, out){
    fs.readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log("ERROR OCCURRED", err)
            process.exit(400)
        }
        else{
            handleOutput(data, out);
        }
    })
};

async function webCat(url, out){
    let res = await axios.get(url)
    let resData = res.data 
    fs.readFile(resData, 'utf8', (err, data)=>
    {
        if(err){
            console.log("ERROR OCCURRED", err)
            process.exit(400)
        }
        console.log("SUCCESS", data)
    })

    let path;
    let out;

    if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}

};

