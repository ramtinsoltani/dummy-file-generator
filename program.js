#!/usr/bin/env node
const program = require('commander');
const path = require("path");
const fs = require("fs");

const { generateDummyContent, getChunkSize } = require(".");

program
    .usage('<filename> <size>')
    .action((filename, size) => {

        if (typeof filename !== 'string' || typeof size !== 'string') {

            console.log('Both filename and size must be provided!');
            process.exit(1);

        }

        generateDummyContent(size).then((stream) => {

            const filepath = path.join('.', filename);

            const chunkSize = getChunkSize(size);

            const writeStream = fs.createWriteStream(filepath, { highWaterMark: chunkSize });

            stream.pipe(writeStream);

        })
            .catch(console.log);

    })
    .parse(process.argv);
