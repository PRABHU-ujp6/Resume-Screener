const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

exports.parseResume = async(filePath) => {
    const ext = path.extname(filePath).toLowerCase();

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