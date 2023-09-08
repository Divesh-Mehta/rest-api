const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST method endpoint
app.post('/api/user', (req, res) => {
  const requestData = req.body;

  // Ensure all required fields are present in the request
  if (!requestData || !requestData.userID || !requestData.collegeEmail || !requestData.collegeRollNumber || !requestData.numbers || !requestData.alphabets) {
    return res.status(400).json({ error: 'Incomplete request data' });
  }

  const numbersArray = requestData.numbers;
  const alphabetsArray = requestData.alphabets;

  if (!Array.isArray(numbersArray) || !Array.isArray(alphabetsArray)) {
    return res.status(400).json({ error: 'Invalid array format' });
  }

  const highestAlphabet = Math.max(...alphabetsArray.map((char) => char.charCodeAt(0)));

  const response = {
    status: 'Success',
    userID: requestData.userID,
    collegeEmail: requestData.collegeEmail,
    collegeRollNumber: requestData.collegeRollNumber,
    numbers: numbersArray,
    alphabets: alphabetsArray,
    highestAlphabet: String.fromCharCode(highestAlphabet),
  };

  return res.status(200).json(response);
});

// GET method endpoint
app.get('/api/operation_code', (req, res) => {
  // Generate an operation code (you can use any logic here)
  const operationCode = generateOperationCode();

  return res.status(200).json({ operation_code: operationCode });
});

function generateOperationCode() {
  // Implement your logic to generate an operation code here
  return 'ABC123';
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
