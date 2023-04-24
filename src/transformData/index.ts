import { DataChildType, DataType } from "../models";

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

export { generateChartData, generateExportData, generateGridRows };
