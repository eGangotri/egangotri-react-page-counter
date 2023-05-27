import "./DailyReport.css";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { pushReport as pushReportToServer } from "api/service/callApi";
import Icon from "components/common/Icons";
import _ from "lodash";
import React, { useRef, useState } from "react";
import { FaCopy, FaRegTrashAlt, FaUpload } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { GoFileMedia } from "react-icons/go";
import HelperService from "service/HelperService";
import { DailyWorkReportType } from "types/dailyyWorkReportTypes";
import AllPdfStats from "vo/AllPdfStats";
import { libraryMenuOptions, centers } from "pages/constants";
import SendReportDialog from "pages/SendToServerDialog";

const DailyReport = () => {

  const getLibrariesInCenter = (_center: string = ""): string[] => {
    const obj = libraryMenuOptions.find((o) => o.name === (_center || center));
    const _libraries = obj?.centers || [];
    return _libraries;
  };

  const [pdfData, setPdfData] = useState<AllPdfStats>(new AllPdfStats());
  const [validationMsg, setValidationMsg] = useState<boolean>(false);
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [staffName, setStaffName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [disabledState, setDisabledState] = useState<boolean>(false);
  const [center, setCenter] = React.useState<string>(centers[0]);
  const [libraries, setLibraries] = React.useState<string[]>(
    getLibrariesInCenter()
  );
  const [library, setLibrary] = React.useState<string>(libraries[0]);

  const dataHoldingElement = useRef();
  const copyButton = useRef();
  const clearButton = useRef();

  const panelOneCSS = { bgcolor: "white", marginRight: "10px" };
  const clearResults = () => {
    setStaffName("");
    setPassword("");
    setPdfData(new AllPdfStats());
    setDisabledState(true);
    setSnackBarOpen(false);
    setValidationMsg(false);
  };

  const handleCenterChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    console.log(`val ${val}`);
    setCenter(val);
    const _libraries = getLibrariesInCenter(val);
    setLibrary(_libraries[0]);
    setLibraries(_libraries);
  };

  const loginToPortal = async () => {
    const logIn:boolean = await HelperService.logIn(staffName,password);
    setLoggedIn(logIn);
    setValidationMsg(!logIn);
  };

  const handleLibChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    console.log(`val ${val}`);
    setLibrary(val);
  };

  const uploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const data = await HelperService.processFiles(
        Array.from(files!),
        staffName,
        center,
        library
      );
      setPdfData(data);
    }
  };

  return (
    <Stack spacing={2}>
       <Typography variant="h2" >eGangotri Daily Work Report</Typography>
      <Box>
            <Icon icon="gangotri" height="300px" width="650px" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {loggedIn ? 
        <>Hi {staffName} </> :
        <>
        <Box sx={panelOneCSS}>
          First Name:{" "}
          <TextField
            variant="outlined"
            label="Required"
            error={_.isEmpty(staffName)}
            size="small"
            onChange={(e) => setStaffName(e.target.value)}
          />
        </Box>
        <Box sx={panelOneCSS}>
          Password:{" "}
          <TextField
            variant="outlined"
            label="Required"
            error={_.isEmpty(password)}
            size="small"
            type="password"
            onSubmit={()=>loginToPortal()}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box sx={panelOneCSS}>
          <Button
            color="primary"
            variant="contained"
            component="span"
            disabled={(_.isEmpty(staffName) && _.isEmpty(password)) || loggedIn}
            onClick={()=>loginToPortal()}
            endIcon={<FiLogIn style={{ color: "primary" }} />}
          >
            Login
          </Button>
        </Box>
        {validationMsg && <Typography sx={{color:"red"}}>Login Failure/Wrong UserId or Password</Typography>}
        </>
        }
      </Box>
      <Typography>if can't login, then use <a href="https://egangotri-react-page-counter.web.app/">this</a></Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={panelOneCSS}>
          <InputLabel id="l1">Center</InputLabel>
        </Box>
        <Box sx={panelOneCSS}>
          <Select
            labelId="l1"
            id="demo-simple-select-standard"
            value={center}
            onChange={handleCenterChange}
            sx={{minWidth: '200px'}}
            disabled={!loggedIn}
          >
            {centers.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
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
            sx={{minWidth: '200px'}}
            disabled={!loggedIn}
          >
            {(libraries || []).map((option: string, index: number) => (
              <MenuItem
                key={option}
                value={option}
                selected={option === library || index === 1}
              >
                {option}
              </MenuItem>
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
          disabled={!loggedIn || center === centers[0]}
          onChange={uploadPdf}
        />
        <Button
          color="primary"
          variant="contained"
          component="span"
          disabled={!loggedIn || center === centers[0]}
          endIcon={<GoFileMedia style={{ color: "primary" }} />}
        >
          Choose PDFs
        </Button>
      </label>
      <Stack spacing={2} direction="row">
        {/* <Button
          color="primary"
          variant="contained"
          component="span"
         // disabled={!loggedIn || AllPdfStats.isEmpty(pdfData)}
          endIcon={<FaUpload style={{ color: "primary" }} />}
         // onClick={() => prepareReportForPush()}
        >
          Send to Server
        </Button> */}

        <SendReportDialog pdfData={pdfData} setPdfData={setPdfData} snackBarOpen={snackBarOpen} setSnackBarOpen={setSnackBarOpen}/>
        
        {/* <Button
          variant="contained"
          endIcon={<FaCopy style={{ color: "primary" }} />}
          onClick={copyResults}
          disabled={AllPdfStats.isEmpty(pdfData)}
        >
          Copy
        </Button> */}
        <Button
          variant="contained"
          endIcon={<FaRegTrashAlt style={{ color: "primary" }} />}
          onClick={() => clearResults()}
          disabled={AllPdfStats.isEmpty(pdfData)}
        >
          Clear
        </Button>
       <Box>
       <Snackbar open={snackBarOpen} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Report Sent succcessfully
          </Alert>
        </Snackbar>
       </Box>
      </Stack>
      <Box ref={dataHoldingElement}>{AllPdfStats.decorate(pdfData)}</Box>
    </Stack>

  );
};

export default DailyReport;
