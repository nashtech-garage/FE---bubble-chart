import { useCallback, useEffect, useState } from "react";
import {
  GridActionsCellItem,
  GridEditInputCell,
  GridRowId,
  GridRowModel,
  GridRowParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { randomId } from "@mui/x-data-grid-generator";
import { HEADERNAME, LOCAL_STORAGE, NEW_ITEM } from "../../constants";
import { DataChildType, DataTableProps, DataType } from "../../models";
import { CustomToolbar } from "./Toolbar";
import { StyledDataGrid } from "./styles";
import { defineColumns } from "./column";
import { checkVal } from "../../utilities";
import { generateChartData } from "../../transformData";

export default function DataTable({ data, onUpdate }: DataTableProps) {
  const generateGridRows = useCallback((data: DataType[]) => {
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
  }, []);

  const [rows, setRows] = useState<DataChildType[]>(generateGridRows(data));
  const [isUpdateData, setIsUpdate] = useState(false);
  const [isJSON, setIsJSON] = useState(false);

  const defineColumn = defineColumns(data);

  const deleteNode = useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows: DataChildType[]) =>
        prevRows.filter((row: { id: GridRowId }) => row.id !== id)
      );
      setIsUpdate(true);
    },
    []
  );

  const addNew = useCallback(() => {
    const newItem: DataChildType = { id: randomId(), ...NEW_ITEM };
    setRows((prevRows: DataChildType[]) => [newItem, ...prevRows]);
    setIsUpdate(true);
  }, []);

  const handleImport = useCallback(
    (data: DataType[]) => {
      setRows(generateGridRows(data));
      localStorage.setItem(
        LOCAL_STORAGE.CHART,
        JSON.stringify(generateChartData(data))
      );
      setIsUpdate(true);
    },
    [generateGridRows]
  );

  const clear = () => {
    setRows([]);
    localStorage.removeItem(LOCAL_STORAGE.CHART);
    setIsUpdate(true);
  };
  const handleHighLight = useCallback(
    (params: GridRowParams) => () => {
      setRows(() =>
        rows.map((r: any) => {
          if (r.id === params.id) {
            return {
              ...r,
              highlight: !params.row.highlight,
            };
          }
          return r;
        })
      );
      setIsUpdate(true);
    },
    [rows]
  );
  const actionsField = {
    field: "actions",
    type: "actions",
    headerName: HEADERNAME.ACTIONS,
    flex: 1,
    sortable: false,
    width: 100,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        onClick={deleteNode(params.id)}
        label="Delete"
      />,
      <GridActionsCellItem
        icon={
          params.row.highlight ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
        }
        onClick={handleHighLight(params)}
        label=""
      />,
    ],
  };

  const editCell = (field: string, min: number, max: number) => {
    return {
      renderEditCell: (params: any) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max,
            min,
          }}
        />
      ),
      valueSetter: (params: GridValueSetterParams) => {
        const value = Number(checkVal(params.value, min, max));
        const changeValue = JSON.parse(`{"${field}": ${value}}`);
        return { ...params.row, ...changeValue };
      },
    };
  };

  const columns = [
    defineColumn.typeField,
    defineColumn.nameField,
    defineColumn.addedTypeField,
    { ...defineColumn.planField, ...editCell("target", 1, 100) },
    { ...defineColumn.gotSkillField, ...editCell("gotSkill", 1, 100) },
    { ...defineColumn.YTDField, ...editCell("YTD", 1, 100) },
    { ...defineColumn.LMField, ...editCell("LM", 0, 100) },
    { ...defineColumn.XField, ...editCell("x", 0, 100) },
    { ...defineColumn.YField, ...editCell("y", 0, 100) },
    actionsField,
  ];

  const formatOuputData = useCallback(() => {
    const output = data.map((itemType) => {
      const temp = rows.filter((item) => item.type === itemType.type);
      return { ...itemType, data: temp };
    });
    onUpdate(output);
    setIsUpdate(false);
  }, [data, onUpdate, rows]);

  useEffect(() => {
    if (isUpdateData) formatOuputData();
  }, [formatOuputData, isUpdateData, data]);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel) => {
      setRows(() => {
        const temp = rows.map((r: any) => {
          if (r.id === newRow.id) {
            return {
              ...r,
              ...newRow,
            };
          }
          return r;
        });
        return temp;
      });
      setIsUpdate(true);
      return newRow;
    },
    [rows]
  );

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.log(error.message);
  }, []);

  const handleRowClassName = (params: any) => {
    return params.row.highlight ? "highlight" : "";
  };

  return (
    <>
      <StyledDataGrid
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu={true}
        rows={rows}
        columns={columns}
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        getRowClassName={handleRowClassName}
        slots={{
          // custom component passed to the `toolbar` slot
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            data,
            addNew,
            handleImport,
            setIsJSON,
            isJSON,
            clear,
          },
        }}
      />
    </>
  );
}
