import { DataChildType, DataChildTypeExt } from "./dataTable"


export interface BubbleNodeType {
    x: number,
    y: number,

}
export interface BubbleNodeProps {
    bubbleData: DataChildTypeExt,
    onHover: () => void,
    onMouseLeave: () => void,
}
export interface BubbleChartHTMLProps {
    options?: any,
    dataset: any[],
}