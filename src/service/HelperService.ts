import { PDFDocument } from 'pdf-lib';
import * as PageCounterUtil from 'utils/PageCounterUtil';
import AllPdfStats from 'vo/AllPdfStats';
import type PdfStat from 'vo/PdfStat';

export class HelperService {
  static processFiles = async (files: File[], staffName: string) => {
    const data = await this.createData(files);
    return this.processData(data, staffName);
  };

  static createData = async (files: File[]) => {
    const promises: Promise<PdfStat>[] = [];
    files.forEach((file: File) => {
      promises.push(this.countPages(file));
    });

    const data = await Promise.all(promises);
    return data;
  };

  static processData(pdfStats: PdfStat[], staffName: string) {
    const allPdfStats: AllPdfStats = new AllPdfStats();
    allPdfStats.pdfCount = pdfStats.length;
    allPdfStats.timeOfRequest = new Date().toDateString();
    allPdfStats.globalCount = PageCounterUtil.aggregate(
      pdfStats.map((x) => x.pageCount)
    );
    allPdfStats.totalSize = PageCounterUtil.aggregate(
      pdfStats.map((x) => x.pdfSize)
    );
    allPdfStats.staffName = staffName;
    allPdfStats.pdfs = pdfStats;
    return allPdfStats;
  }

  static clipboardResult(allPdfStats: AllPdfStats) {}
  // static clipboardResult = (pdfInfo: PdfInfo) => {
  //   let clipBoardData = `${pdfInfo.stats.header}\n`;
  //   if (pdfInfo.stats.errorMsgs) {
  //     clipBoardData += `${pdfInfo.stats.errorMsgs}\n`;
  //   }
  //   for (let i = 0; i <= pdfInfo.stats.result.length; i++) {
  //     const res = pdfInfo.stats.result[i];
  //     if (res) {
  //       clipBoardData += `${res?.counter} ${res?.name} ${res?.pageCount} ${res?.pdfSize}\n\n`;
  //     }
  //   }
  //   clipBoardData += `Total Page Count: ${pdfInfo.globalCount}`;
  //   clipBoardData += `\nTotal Size: ${PageCounterUtil.sizeInfo(
  //     pdfInfo.totalSize
  //   )}`;
  //   return clipBoardData;
  // };

  static countPages = async (file: File): Promise<PdfStat> => {
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer, {
      ignoreEncryption: true,
    });

    const pageCount = pdfDoc.getPageCount();
    const pdfSize = file.size;
    const row: PdfStat = {
      name: file.name,
      pageCount,
      pdfSize,
    };
    return row;
  };
}

export default HelperService;
