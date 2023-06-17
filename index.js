import * as fs from 'fs/promises';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Rani');
});

app.post('/createfile', async (req, res) => {
  try {
    const currentDateTime = new Date();

    // Format the date and time
    const formattedDateTime = currentDateTime.toISOString().replace(/:/g, '.');

    const filePath = `./vini\\${formattedDateTime}.txt`;
    await fs.writeFile(filePath, `${currentDateTime}`);

    console.log('File created:', formattedDateTime);
    res.send({ message: 'File created successfully.', status: 204 });
  } catch (error) {
    console.log(error);
    res.send({ message: 'Error creating file.', status: 404, errorDetail: error });
  }
});

app.get('/getallfiles', async (req, res) => {
  try {
    const directoryPath = './vini';
    const files = await fs.readdir(directoryPath);
     
    let allfiles =[]
    for (const file of files) {
        allfiles.push(file)
      console.log("new file",file);
    }

    res.send({ message: 'Check all the text files.', status: 204 ,"data":allfiles});
  } catch (error) {
    console.log(error);
    res.send({ message: 'No files in the directory.', status: 404, errorDetail: error });
  }
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
