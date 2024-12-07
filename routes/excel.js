
const express = require('express');
const xlsx = require('xlsx');
const router=express.Router()
const excelsheet =require('../config/excel')




router.post('/', async (req, res) => {
    if (!req.files || !req.files.excelFile) {
        return res.status(400).send('No files were uploaded.');
    }

    const excelFile = req.files.excelFile;
    const filePath = __dirname + '/uploads/' + excelFile.name;

    excelFile.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            // Process the uploaded Excel file
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log(sheetData)

            // Insert the data into MongoDB Atlas
            await excelsheet.insertMany(sheetData);

            console.log(`Inserted ${sheetData.length} documents into MongoDB Atlas`);
            res.send('File uploaded and data stored in MongoDB Atlas successfully.');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('An error occurred while processing the file.');
        }
    });
})

module.exports=router