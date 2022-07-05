import "./PageCounter.css";

import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Icon from "components/common/Icons";
import React, { useRef, useState } from "react";
import _ from "lodash";
import { FaCopy, FaRegTrashAlt, FaUpload } from "react-icons/fa";

import HelperService from "service/HelperService";
import AllPdfStats from "vo/AllPdfStats";

const PageCounter = () => {
  const [pdfData, setPdfData] = useState<AllPdfStats>(new AllPdfStats());
  const [staffName, setStaffName] = useState<string>("");
  const [disabledState, setDisabledState] = useState<boolean>(false);

  const dataHoldingElement = useRef();
  const copyButton = useRef();
  const clearButton = useRef();

  const clearResults = () => {
    setStaffName("");
    setPdfData(new AllPdfStats());
    setDisabledState(true);
  };

  const copyResults = () => {
    // TODO: Toast Message that Results have been copied.
    navigator.clipboard.writeText(AllPdfStats.toString(pdfData));
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const data = await HelperService.processFiles(
        Array.from(files!),
        staffName
      );
      setPdfData(data);
    }
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ bgcolor: "#cfe8fc" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>eGangotri PDF Page Counter</Typography>
          </Grid>
          <Grid item xs={8}>
            <Icon icon="gangotri" height="300px" width="650px" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: "white" }}>
        Please Enter your name:{" "}
        <TextField
          variant="outlined"
          label="Required"
          error={_.isEmpty(staffName)}
          size="small"
          onChange={(e) => setStaffName(e.target.value)}
        />
      </Box>
      <label htmlFor="upload-pdf">
        <input
          style={{ display: "none" }}
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
          disabled={_.isEmpty(staffName)}
          endIcon={<FaUpload style={{ color: "primary" }} />}
        >
          Upload
        </Button>
      </label>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          endIcon={<FaCopy style={{ color: "primary" }} />}
          onClick={copyResults}
          disabled={AllPdfStats.isEmpty(pdfData)}
        >
          Copy
        </Button>
        <Button
          variant="contained"
          endIcon={<FaRegTrashAlt style={{ color: "primary" }} />}
          onClick={() => clearResults()}
          disabled={AllPdfStats.isEmpty(pdfData)}
        >
          Clear
        </Button>
      </Stack>
      <Box ref={dataHoldingElement}>{AllPdfStats.decorate(pdfData)}</Box>
    </Stack>
  );
};

export default PageCounter;
