# Dummy File Generator

A simple dummy file generator for testing.

# Installation

```
npm install dummy-file-generator
```

# Usage (CLI)

```
dummy <filename> <size>
```

- **filename** The filename to be generated (relative to current working directory)
- **size** The size in bytes or with the following suffix: `kb`, `mb`, `gb`

## Example

```
dummy test.txt 256kb
```


# Usage (Lib)

```
const { generateDummyContent } = require('dummy-file-generator');
```

- **size** The size in bytes or with the following suffix: `kb`, `mb`, `gb`

## Example

```
const uploadStream = await generateDummyContent('256kb');

const s3.upload({ Bucket, Key, Body: uploadStream }).promise();
```