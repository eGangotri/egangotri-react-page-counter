import './PageCounter.css';

import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FaCopy, FaEraser, FaUpload } from 'react-icons/fa';
import HelperService from 'service/HelperService';

const PageCounter = () => {
  const [pdfData, setPdfData] = useState<JSX.Element>(<></>);
  const [staffName, setStaffName] = useState<string>('');

  const clearResults = () => {
    console.log('clearResults');
    setStaffName('');
    setPdfData(<></>);
  };

  const copyResults = () => {
    // Toast Message that Results have bhoseen copied.
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(`files ${files}`);
    console.log(`files ${files && files[0].name}`);
    console.log(`files ${files && files[0].size}`);

    if (files) {
      const data = await HelperService.processFiles(
        Array.from(files!),
        staffName
      );
      setPdfData(data.toString());
    }
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ bgcolor: '#cfe8fc' }}>eGangotri PDF Page Counter</Box>
      <Box sx={{ bgcolor: 'white' }}>
        Please Enter your name:{' '}
        <TextField
          id="filled-basic"
          variant="filled"
          onChange={(e) => setStaffName(e.target.value)}
        />
      </Box>
      <label htmlFor="upload-pdf">
        <input
          style={{ display: 'none' }}
          id="upload-pdf"
          name="upload-pdf"
          type="file"
          multiple
          accept=".pdf"
          onChange={onChange}
        />
        <Button
          color="primary"
          variant="contained"
          component="span"
          endIcon={<FaUpload style={{ color: 'primary' }} />}
        >
          Upload button
        </Button>
      </label>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          endIcon={
            <FaCopy style={{ color: 'primary' }} />
          }
          onClick={copyResults}
        >
          Copy Results
        </Button>
        <Button
          variant="contained"
          endIcon={
            <FaEraser
              style={{ color: 'primary' }}
            />
          }
          onClick={() => clearResults()}
        >
          Clear Results
        </Button>
      </Stack>
      <Box>{pdfData}</Box>
    </Stack>
  );
};

export default PageCounter;
