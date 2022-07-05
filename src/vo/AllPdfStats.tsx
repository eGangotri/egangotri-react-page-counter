import { Box, Typography } from "@mui/material";
import DenseTable from "components/Table";
import React from "react";
import * as PageCounterUtil from "utils/PageCounterUtil";
import Decorator from "vo/Decorator";
import * as GeneralUtils from "utils/GeneralUtils";
import type PdfStat from "./PdfStat";

export default class AllPdfStats {
  title = "eGangotri Page Counter";

  globalCount = 0;

  totalSize = 0;

  isWait = false;

  stats: Decorator = new Decorator();

  pdfCount = 0;

  timeOfRequest = "";

  staffName = "";

  errorCount = 0;

  pdfs: PdfStat[] = [];

  resetToDefault() {
    this.globalCount = 0;
    this.stats.reset();
    this.pdfCount = 0;
    this.isWait = true;
    this.timeOfRequest = "";
    this.totalSize = 0;
    this.errorCount = 0;
    this.pdfs = [];
  }

  static isEmpty(all: AllPdfStats) {
    return all.pdfCount === 0;
  }

  static decorate = (all: AllPdfStats): JSX.Element => {
    if (AllPdfStats.isEmpty(all)) {
      return <></>;
    } else
      return (
        <Box>
          <Typography>Work Status for {GeneralUtils.capitalize(all.staffName)}:</Typography>
          <Typography>
            {" "}
            Total Pdf Count{" "}
            <span style={{ fontWeight: "bold" }}> {all.pdfCount} </span>
          </Typography>
          <Typography>
            {" "}
            On <span style={{ fontWeight: "bold" }}>{all.timeOfRequest}</span>
          </Typography>
          <Typography>
            Total Page Count:{" "}
            <span style={{ fontWeight: "bold" }}>{all.globalCount}</span>{" "}
          </Typography>
          <Typography>
            Total Size:{" "}
            <span style={{ fontWeight: "bold" }}>
              {PageCounterUtil.sizeInfo(all.totalSize)}
            </span>
          </Typography>
          <Typography>
            <DenseTable rows={all.pdfs} />
          </Typography>
        </Box>
      );
  };

  static pdfDataArrayToString = (_pdfs: PdfStat[]) => {
    let dataAsString = "";
    _pdfs.forEach((pdfStat: PdfStat, index: number) => {
      dataAsString += this.pdfDataToString(pdfStat, index + 1);
    });
    return dataAsString;
  };

  static pdfDataToString = (pdfStat: PdfStat, index: number) => {
    return `(${index}) ${pdfStat.name}\t ${
      pdfStat.pageCount
    } pages \t ${PageCounterUtil.sizeInfo(pdfStat.pdfSize)}\n\n`;
  };

  static toString = (all: AllPdfStats): string => {
    return `${GeneralUtils.capitalize(all.staffName)} Work Status for ${all.pdfCount} pdf(s) On ${
      all.timeOfRequest
    }\n
Total Page Count:${all.globalCount}
Total Size: ${PageCounterUtil.sizeInfo(all.totalSize)}\n
${AllPdfStats.pdfDataArrayToString(all.pdfs)}`;
  };
}
