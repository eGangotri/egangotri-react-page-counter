//repetition of code: use monorepo
export type DailyWorkReportType = {
  operatorName: string;
  center: string;
  lib: string;
  totalPdfCount: number;
  totalPageCount: number;
  totalSize: string;
  dateOfReport: Date;
  pageCountStats: PageCountStatsType[];
};

export type PageCountStatsType = {
  fileName: string;
  pageCount: number;
  fileSize: string;
};
