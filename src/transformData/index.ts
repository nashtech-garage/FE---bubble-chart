import { LOCAL_STORAGE } from "../constants";
import { DataChildType, DataChildTypeExt, DataType } from "../models";
const getChartColor: any = localStorage.getItem(LOCAL_STORAGE.CHART_COLOR);
const chartColor = JSON.parse(getChartColor);

const generateChartData = (data: DataType[]) =>
  data.map((item: DataType) => {
    const mapped = item.data.map((data: DataChildType) => ({
      ...data,
      highlighted: data.LM > 0 ? true : false,
    }));
    return {
      ...item,
      data: mapped,
    };
  });

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

const generateChartDataExt = (data: DataType[]) => {
  let rows: DataChildTypeExt[] = [];
  const found = (item: any) =>
    chartColor.types.find((i: any) => i.type === item.type);
  data.map((item) =>
    item.data.map((dataItem: any) =>
      rows.push({
        ...dataItem,
        type: found(item).type,
        color: found(item).color,
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
};
