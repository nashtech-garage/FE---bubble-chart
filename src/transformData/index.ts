import { DataChildType, DataType } from "../models";

export const generateChartData = (data: any[]) => (data.map((item: any) => ({ ...item, data: item.data.map((data: DataChildType) => ({ ...data, highlighted: data.LM > 0 ? true : false })) })))
export const generateExportData = (data: DataType[]) => (data.map((item: DataType) => ({ ...item, data: item.data.map(({ highlighted, ...rest }) => rest) })))
export const generateGridRows = (data: DataType[]) => {
    let rows: DataChildType[] = [];
    data.map((item) =>
        item.data.map((dataItem: DataChildType) =>
            rows.push({
                ...dataItem,
                type: item.type,
            })
        )
    );
    return rows;
}