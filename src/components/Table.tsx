import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import * as DailyReportUtil from 'utils/DailyReportUtil';
import type PdfStat from 'vo/PdfStat';

type PdfStatsProps = {
  rows: PdfStat[];
};

const DenseTable: React.FC<PdfStatsProps> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Pdf Name</TableCell>
            <TableCell align="right">Page Count</TableCell>
            <TableCell align="right">Pdf Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: PdfStat, index: number) => (
            <TableRow
              key={index + 1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.pageCount}</TableCell>
              <TableCell align="right">
                {DailyReportUtil.sizeInfo(row.pdfSize)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DenseTable;
