import { DataChildTypeExt } from "./dataTable"


export interface BubbleNodeType {
    x: number,
    y: number,

}
export interface BubbleNodeProps {
    hoverId: string | null,
    bubbleData: DataChildTypeExt,
    onHover: () => void,
    onMouseLeave: () => void,
}
export interface BubbleChartHTMLProps {
    options?: any,
    dataset: any[],
}