import { DataChildTypeExt } from "./dataTable";

export interface BubbleNodeType {
  x: number;
  y: number;
}
export interface BubbleNodeProps {
  hoverId: string | null;
  bubbleData: DataChildTypeExt;
  onHover: () => void;
  onMouseLeave: () => void;
  maxTarget: number;
  defaultTarget: number;
  chartSize: number;
  chartColor: any;
}
export interface BubbleChartHTMLProps {
  options?: any;
  dataSets: any[];
  chartColor: any;
}
