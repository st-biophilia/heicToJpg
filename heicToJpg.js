const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

const SRC_FOLDER_PATH = './src/test/' // create src folder and edit here
const DIST_FOLDER_PATH = './dist/test/' // create dist folder and edit here

fs.readdir(SRC_FOLDER_PATH, (err, files) => {
    files.forEach(file => {
        (async() => {
            // read input file
            const inputBuffer = await promisify(fs.readFile)(SRC_FOLDER_PATH + file);
            // convert 
            const outputBuffer = await convert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 1
            });
            // write output file
            await promisify(fs.writeFile)(DIST_FOLDER_PATH + file + '.jpg', outputBuffer); 
        })();
    });
});