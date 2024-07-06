export type IndexData = {
  key: string;
  index: string;
  indexSymbol: string;
  last: number;
  variation: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  indicativeClose: number;
  pe: string;
  pb: string;
  dy: string;
  declines: string;
  advances: string;
  unchanged: string;
  perChange365d: number;
  date365dAgo: string;
  chart365dPath: string;
  date30dAgo: string;
  perChange30d: number;
  chart30dPath: string;
  chartTodayPath: string;
  previousDay: number;
  oneWeekAgo: number;
  oneMonthAgo: number;
  oneYearAgo: number;
};

export type ResponseData = {
  data: IndexData[];
};
