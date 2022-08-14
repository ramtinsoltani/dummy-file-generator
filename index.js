const Stream = require('stream');

function write(stream1, size) {

    let chunk = createChunk(size);

    stream1.write(chunk);

    chunk = null;

    console.log(`Wrote ${size} bytes...`);

}

async function writeMany(stream1, size, times) {

    for ( let i = 0; i < times; i++ ) {

        console.log(`Writing chunk ${i+1}/${times}`);
        await write(stream1, size);

    }

}

function createChunk(size) {

    const charset = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    let chunk = '';

    for ( let i = 0; i < size; i++ ) {
        chunk += charset[Math.floor(Math.random() * charset.length)];
    }

    return chunk;

}

function getChunkSize(size) {

    let chunkSize = Math.floor(size / 10);

    if (!chunkSize) chunkSize = 256;
    if (chunkSize > 10 * 1000 * 1000) chunkSize = 10 * 1000 * 1000;

    return chunkSize;

}

async function generateDummyContent(size) {

    const bMatch = size.match(/^(\d+)$/i);
    const kbMatch = size.match(/^(\d+)kb$/i);
    const mbMatch = size.match(/^(\d+)mb/i);
    const gbMatch = size.match(/^(\d+)gb/i);

    if (bMatch) size = +bMatch[1];
    if (kbMatch) size = +kbMatch[1] * 1000;
    if (mbMatch) size = +mbMatch[1] * 1000 * 1000;
    if (gbMatch) size = +gbMatch[1] * 1000 * 1000 * 1000;

    const stream = new Stream.PassThrough();

    const chunkSize = getChunkSize(size);

    const rounds = Math.floor(size / chunkSize);
    const lastRound = size % chunkSize;

    writeMany(stream, chunkSize, rounds)
        .then(() => {

            stream.end(createChunk(lastRound), () => {

            console.log('File has been generated.');

        });

    })
    .catch(console.log);

    return stream;

}

module.exports = {
    getChunkSize,
    generateDummyContent,
};
