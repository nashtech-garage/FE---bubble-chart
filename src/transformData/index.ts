import { DataChildType, DataChildTypeExt, DataType } from "../models";

const generateChartData = (data: any) => {
  const bubbleData = data.bubbleData ? data.bubbleData : data
  return bubbleData.map((item: DataType) => {
    const mapped = item.data.map((data: DataChildType) => ({
      ...data,
      highlighted: data.LM > 0 ? true : false,
    }));
    return {
      ...item,
      data: mapped,
    };
  });
}


const generateExportData = (data: DataType[]) =>
  data.map((item: DataType) => ({
    ...item,
    data: item.data.map(({ highlighted, ...rest }) => rest),
  }));

const generateGridRows = (data: DataType[]) => {
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
};
const generateGridRowsFromImported = (data: any) => {
  let rows: DataChildType[] = [];

  data.bubbleData.map((item: any) =>
    item.data.map((dataItem: DataChildType) =>
      rows.push({
        ...dataItem,
        type: item.type,
      })
    )
  );
  return rows;
};

const generateChartDataExt = (data: DataType[], chartColor: any) => {
  let rows: DataChildTypeExt[] = [];
  data.map((item) =>
    item.data.map((dataItem: any) =>
      rows.push({
        ...dataItem,
        type: item.type,
        color: item.color,
      })
    )
  );
  return rows;
};

export {
  generateChartData,
  generateExportData,
  generateGridRows,
  generateChartDataExt,
  generateGridRowsFromImported
};
