import { useCallback, useEffect, useState } from "react";
import {
  GridActionsCellItem,
  GridCallbackDetails,
  GridEditInputCell,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridValueSetterParams,
  useGridApiRef,
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
import { generateChartData, generateGridRows } from "../../transformData";

export default function DataTable({ data, onUpdate }: DataTableProps) {
  const [rows, setRows] = useState<DataChildType[]>(generateGridRows(data));
  const [isUpdateData, setIsUpdate] = useState(false);
  const [isJSON, setIsJSON] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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

  const apiRef = useGridApiRef();
  const handleHighLight = useCallback(
    (params: GridRowParams) => () => {
      const rowMode = apiRef.current.getRowMode(params.id);
      if (rowMode === "view") {
        setRows(() =>
          rows.map((r: any) => {
            if (r.id === params.id) {
              return {
                ...r,
                highlighted: !params.row.highlighted,
              };
            }
            return r;
          })
        );
      } else {
        setRowModesModel({
          [params.id]: { mode: GridRowModes.View },
        });
        setRows(() =>
          rows.map((r: any) => {
            if (r.id === params.id) {
              return {
                ...params.row,
                ...Object.values(apiRef.current.state.editRows)[0],
                highlighted: !params.row.highlighted,
              };
            }
            return r;
          })
        );
      }

      setIsUpdate(true);
    },
    [apiRef, rows]
  );
  const handleRowModesModelChange = (
    rowModesModel: GridRowModesModel,
    details: GridCallbackDetails
  ) => {
    setRowModesModel(rowModesModel);
  };
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
          params.row.highlighted ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )
        }
        onClick={handleHighLight(params)}
        label="highlight"
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
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        getRowClassName={handleRowClassName}
        onRowModesModelChange={handleRowModesModelChange}
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
