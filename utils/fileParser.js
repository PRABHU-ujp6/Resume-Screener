const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

export async function parseResume(filePath){
    const ext = path.extname(filePath);

    if(ext === '.pdf'){
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    }

    if(ext === '.docx'){
        const result = await mammoth.extractRawText({ path: filePath});
        return result.value;
    }

    throw new Error("Unsupported file format..");
}