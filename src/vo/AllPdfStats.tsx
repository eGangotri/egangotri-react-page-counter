import { Box, Typography } from '@mui/material';
import DenseTable from 'components/Table';
import React from 'react';
import * as PageCounterUtil from 'utils/PageCounterUtil';
import Decorator from 'vo/Decorator';

import type PdfStat from './PdfStat';

export default class AllPdfStats {
  title = 'eGangotri Page Counter';

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

  toString(): JSX.Element {
    return (
      <Box>
        <Typography>Work Status for {this.staffName}:</Typography>
        <Typography>
          {' '}
          Total Pdf Count{' '}
          <span style={{ fontWeight: 'bold' }}> {this.pdfCount} </span>
        </Typography>
        <Typography>
          {' '}
          On <span style={{ fontWeight: 'bold' }}>{this.timeOfRequest}</span>
        </Typography>
        <Typography>
          Total Page Count:{' '}
          <span style={{ fontWeight: 'bold' }}>{this.globalCount}</span>{' '}
        </Typography>
        <Typography>
          Total Size:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {PageCounterUtil.sizeInfo(this.totalSize)}
          </span>
        </Typography>
        <Typography>
          <DenseTable rows={this.pdfs} />
        </Typography>
      </Box>
    );
  }
}
