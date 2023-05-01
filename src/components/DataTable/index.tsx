import { useCallback, useEffect, useState } from "react";
import {
  GridActionsCellItem,
  GridEditInputCell,
  GridRowId,
  GridRowModel,
  GridRowParams,
  GridValueSetterParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { randomId } from "@mui/x-data-grid-generator";
import { HEADERNAME, LOCAL_STORAGE, NEW_ITEM } from "../../constants";
import { DataChildType, DataTableProps } from "../../models";
import { CustomToolbar } from "./Toolbar";
import { StyledDataGrid } from "./styles";
import { defineColumns } from "./column";
import { checkVal, updateLocalStorage } from "../../utilities";
import {
  generateChartData,
  generateGridRows,
  generateGridRowsFromImported,
} from "../../transformData";

export default function DataTable({ data, onUpdate }: DataTableProps) {
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

  const handleImport = useCallback((data: any) => {
    if (data.bubbleData) {
      setRows(generateGridRowsFromImported(data));
      localStorage.setItem(
        LOCAL_STORAGE.CHART,
        JSON.stringify(generateChartData(data))
      );
      setIsUpdate(true);
    }
    data.year && updateLocalStorage(LOCAL_STORAGE.YEAR, data.year);
    data.title && updateLocalStorage(LOCAL_STORAGE.TITLE, data.title);
  }, []);

  const clear = () => {
    setRows([]);
    localStorage.removeItem(LOCAL_STORAGE.CHART);
    setIsUpdate(true);
  };

  const apiRef = useGridApiRef();

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
    ],
  };

  const editCell = (col: any) => {
    return {
      renderEditCell: (params: any) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: col.max,
            min: col.min,
          }}
        />
      ),
      valueSetter: (params: GridValueSetterParams) => {
        const value = Number(checkVal(params.value, col.min, col.max));
        const changeValue = JSON.parse(`{"${col.field}": ${value}}`);
        return { ...params.row, ...changeValue };
      },
    };
  };

  const editHighlightedCell = (col: any) => {
    return {
      valueSetter: (params: GridValueSetterParams) => {
        return { ...params.row, highlighted: params.value };
      },
    };
  };

  const columns = [
    defineColumn.typeField,
    defineColumn.nameField,
    defineColumn.addedTypeField,
    {
      ...defineColumn.planField,
      ...editCell(defineColumn.planField),
    },
    {
      ...defineColumn.gotSkillField,
      ...editCell(defineColumn.gotSkillField),
    },
    {
      ...defineColumn.YTDField,
      ...editCell(defineColumn.YTDField),
    },
    {
      ...defineColumn.LMField,
      ...editCell(defineColumn.LMField),
    },
    {
      ...defineColumn.XField,
      ...editCell(defineColumn.XField),
    },
    {
      ...defineColumn.YField,
      ...editCell(defineColumn.YField),
    },
    {
      ...defineColumn.HighlightField,
      ...editHighlightedCell(defineColumn.HighlightField),
    },
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
    return params.row.highlighted ? "highlight" : "";
  };

  return (
    <>
      <StyledDataGrid
        apiRef={apiRef}
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
            rows,
          },
        }}
      />
    </>
  );
}
