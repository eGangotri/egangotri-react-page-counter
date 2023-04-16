import "./DailyReport.css";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Icon from "components/common/Icons";
import _ from "lodash";
import React, { useRef, useState } from "react";
import { FaCopy, FaRegTrashAlt, FaUpload } from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import HelperService from "service/HelperService";
import AllPdfStats from "vo/AllPdfStats";

const DailyReport = () => {
  
  const centers = ["Delhi", "Haridwar", "Jammu", "Srinagar", "Varanasi"];

  const libraryMenuOptions = [
    {
      name:centers[0],
      centers:["CSU", "Sarai"]
    },
    {
      name:centers[1],
      centers:["Gurukul-Kangri"]
    },
    {
      name:centers[2],
      centers:["BVT-Lucknow"]
    },
    {
      name:centers[3],
      centers:["SPS", "JKACADEMY"]
    },
    {
      name:centers[4],
      centers:
      ["Vasishth Tripathi",
      "Jangam",
      "Kamalakarji",
      "Mumukshu",
      "Ved Nidhi"]
    }
  ];

  const getLibrariesInCenter = (_center:string = ""):string[]  => {
    const obj = libraryMenuOptions.find(o => o.name === (_center || center));
    const _libraries = obj?.centers || []
    return _libraries
  }
  
  const [pdfData, setPdfData] = useState<AllPdfStats>(new AllPdfStats());
  const [staffName, setStaffName] = useState<string>("");
  const [disabledState, setDisabledState] = useState<boolean>(false);
  const [center, setCenter] = React.useState<string>(centers[0]);
  const [libraries, setLibraries] = React.useState<string[]>(getLibrariesInCenter());
  const [library, setLibrary] = React.useState<string>(libraries[0]);

  const dataHoldingElement = useRef();
  const copyButton = useRef();
  const clearButton = useRef();

  const panelOneCSS = { bgcolor: "white", marginRight:"10px" }
  const clearResults = () => {
    setStaffName("");
    setPdfData(new AllPdfStats());
    setDisabledState(true);
  };

  const copyResults = () => {
    // TODO: Toast Message that Results have been copied.
    navigator.clipboard.writeText(AllPdfStats.toString(pdfData));
  };

  const handleCenterChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    console.log(`val ${val}`);
    setCenter(val);
    const _libraries = getLibrariesInCenter(val);
    setLibrary(_libraries[0]);
    setLibraries(_libraries)
  };

  const handleLibChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    console.log(`val ${val}`);
    setLibrary(val);
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
            <Typography>eGangotri Daily Work Report</Typography>
          </Grid>
          <Grid item xs={8}>
            <Icon icon="gangotri" height="300px" width="650px" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display:"flex", flexDirection: "row"}} >
        <Box sx={panelOneCSS}>
          Please Enter your name:{" "}
          <TextField
            variant="outlined"
            label="Required"
            error={_.isEmpty(staffName)}
            size="small"
            onChange={(e) => setStaffName(e.target.value)}
          />
        </Box>
        <Box sx={panelOneCSS}>
          <InputLabel id="l1">Center</InputLabel>
        </Box>
        <Box sx={panelOneCSS}>
        <Select
            labelId="l1"
            id="demo-simple-select-standard"
            value={center}
            onChange={handleCenterChange}
          >
            {centers.map((option: string) => (
              <MenuItem  key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={panelOneCSS}>
        <InputLabel id="l2">Library</InputLabel>
        </Box>
        <Box sx={panelOneCSS}>

          <Select
            labelId="l2"
            id="demo-simple-select-filled"
            value={library}
            onChange={handleLibChange}
            label="Library"
          >
            {(libraries||[]).map((option: string, index:number) => (
              <MenuItem key={option} value={option} selected={option === library || index===1}>{option}</MenuItem>
            ))}
          </Select>
        </Box>
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
          endIcon={<GoFileMedia style={{ color: "primary" }} />}
        >
          Choose PDFs
        </Button>
      </label>
      <Stack spacing={2} direction="row">
      
      <Button
          color="primary"
          variant="contained"
          component="span"
          disabled={_.isEmpty(staffName)}
          endIcon={<FaUpload style={{ color: "primary" }} />}
        >
          Send to Server
        </Button>
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

export default DailyReport;
