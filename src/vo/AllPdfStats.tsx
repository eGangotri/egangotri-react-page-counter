import React from 'react';
import { Box, Typography } from '@mui/material';
import DenseTable from 'components/Table';

import * as DailyReportUtil from 'utils/DailyReportUtil';
import * as GeneralUtils from 'utils/GeneralUtils';
import Decorator from 'vo/Decorator';

import type PdfStat from './PdfStat';
import { DailyWorkReportType } from 'types/dailyyWorkReportTypes';
import moment from 'moment';

export default class AllPdfStats {
  title = 'eGangotri Daily Work Report';

  center = "";

  lib = "";

  dateOfReport = new Date();

  globalCount = 0;

  totalSize = 0;

  isWait = false;

  stats: Decorator = new Decorator();

  pdfCount = 0;

  timeOfRequest = '';

  staffName = '';

  errorCount = 0;

  pdfs: PdfStat[] = [];

  resetToDefault() {
    this.globalCount = 0;
    this.stats.reset();
    this.pdfCount = 0;
    this.isWait = true;
    this.timeOfRequest = '';
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
    }
    return (
      <Box>
        <Typography>
          Work Status for <span style={{ fontWeight: 'bold' }}>{GeneralUtils.capitalize(all.staffName)} ({all.center}/{all.lib})</span> :
        </Typography>
        <Typography>
          {' '}
          Total Pdf Count{' '}
          <span style={{ fontWeight: 'bold' }}> {all.pdfCount} </span>
        </Typography>
        <Typography>
          {' '}
          On <span style={{ fontWeight: 'bold' }}>{all.timeOfRequest}</span>
        </Typography>
        <Typography>
          Total Page Count:{' '}
          <span style={{ fontWeight: 'bold' }}>{all.globalCount}</span>{' '}
        </Typography>
        <Typography>
          Total Size:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {DailyReportUtil.sizeInfo(all.totalSize)}
          </span>
        </Typography>
        <Typography>
          <DenseTable rows={all.pdfs} />
        </Typography>
      </Box>
    );
  };

  static pdfDataArrayToString = (_pdfs: PdfStat[]) => {
    let dataAsString = '';
    _pdfs.forEach((pdfStat: PdfStat, index: number) => {
      dataAsString += this.pdfDataToString(pdfStat, index + 1);
    });
    return dataAsString;
  };

  static pdfDataToString = (pdfStat: PdfStat, index: number) => {
    return `(${index}) ${pdfStat.name}\t ${
      pdfStat.pageCount
    } pages \t ${DailyReportUtil.sizeInfo(pdfStat.pdfSize)}\n\n`;
  };

  static toString = (all: AllPdfStats): string => {
    return `${GeneralUtils.capitalize(all.staffName)} (${all.center}/${all.lib}) Work Status for ${
      all.pdfCount
    } pdf(s) On ${all.timeOfRequest}\n
Total Page Count:${all.globalCount}
Total Size: ${DailyReportUtil.sizeInfo(all.totalSize)}\n
${AllPdfStats.pdfDataArrayToString(all.pdfs)}`;
  };

  static convertPdfStatsToDailyWorkReportTypeObject= (pdfData: AllPdfStats) => {
    const dailyWorkReport:DailyWorkReportType =
      {
        "operatorName": pdfData.staffName,
        "center": pdfData.center,
        "lib": pdfData.lib,
        "totalPdfCount": pdfData.pdfCount,
        "totalPageCount": pdfData.globalCount,
        "totalSize": DailyReportUtil.sizeInfo(pdfData.totalSize),
        "dateOfReport":  pdfData.dateOfReport,
        pageCountStats:[]
      }

      pdfData.pdfs.forEach( (_pdf:PdfStat)=>{
        dailyWorkReport.pageCountStats.push({
          "fileName": _pdf.name,
          "pageCount": _pdf.pageCount,
          "fileSize": DailyReportUtil.sizeInfo(_pdf.pdfSize)
        })
      })
      return dailyWorkReport
  }
}
