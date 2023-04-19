import { useCallback, useEffect, useState, useMemo } from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridEditInputCell,
  GridRowId,
  GridRowModel,
  GridRowParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { randomId } from "@mui/x-data-grid-generator";
import { HEADERNAME, NEW_ITEM } from "../../constants";
import { DataChildType, DataTableProps, DataType } from "../../models";
import { checkVal } from "../../utilities";
import { CustomToolbar } from "./Toolbar";
import { StyledDataGrid } from "./styles";
import { addedType } from "../../assets/dummy/mockData";

export default function DataTable({ data, onUpdate }: DataTableProps) {
  const generateGridRows = useCallback((data: DataType[]) => {
    let rows: DataChildType[] = [];
    data.map((item) =>
      item.data.map((dataItem: any) =>
        rows.push({
          ...dataItem,
          type: item.type,
        })
      )
    );
    return rows;
  }, []);

  const [rows, setRows] = useState<any[]>(generateGridRows(data));
  const [isUpdateData, setIsUpdate] = useState(false);
  const [isJSON, setIsJSON] = useState(false);

  const arrTypes = data.map((item) => item.type);

  const deleteNode = useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows: any[]) =>
        prevRows.filter((row: { id: GridRowId }) => row.id !== id)
      );
      setIsUpdate(true);
    },
    []
  );

  const addNew = useCallback(() => {
    const itemToAdd = { id: randomId(), ...NEW_ITEM };
    setRows((prevRows: any[]) => [itemToAdd, ...prevRows]);
    setIsUpdate(true);
  }, []);

  const handleImport = useCallback(
    (data: any) => {
      setRows(generateGridRows(data));
      localStorage.setItem("chart", JSON.stringify(data));
      setIsUpdate(true);
    },
    [generateGridRows]
  );

  const clear = () => {
    setRows([]);
    localStorage.removeItem("chart");
    setIsUpdate(true);
  };

  const columns = useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "type",
        headerName: HEADERNAME.TYPE,
        editable: true,
        type: "singleSelect",
        valueOptions: arrTypes,
        flex: 1,
        sortable: false,
      },
      {
        field: "name",
        headerName: HEADERNAME.NAME,
        editable: true,
        flex: 1,
        sortable: false,
      },
      {
        field: "addedType",
        headerName: HEADERNAME.ADDED_TYPE,
        editable: true,
        type: "singleSelect",
        valueOptions: addedType,
        flex: 1,
        sortable: false,
      },
      {
        field: "target",
        headerName: HEADERNAME.PLAN,
        type: "number",
        editable: true,
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              max: 100,
              min: 1,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, target: checkVal(params.value, 1, 100) };
        },
      },
      {
        field: "gotSkill",
        headerName: HEADERNAME.GOTS_KILL,
        type: "number",
        editable: true,
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              max: 100,
              min: 1,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, gotSkill: checkVal(params.value, 1, 100) };
        },
      },
      {
        field: "YTD",
        headerName: HEADERNAME.NEW_ADDED,
        type: "number",
        editable: true,
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              min: 0,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, YTD: checkVal(params.value, 1, 100) };
        },
      },
      {
        field: "LM",
        headerName: HEADERNAME.NEW_ADDED_LM,
        type: "number",
        editable: true,
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              min: 0,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, LM: checkVal(params.value, 0, 100) };
        },
      },

      {
        field: "x",
        headerName: HEADERNAME.POSITION_X,
        type: "number",
        editable: true,
        align: "right",
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              max: 100,
              min: 0,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, x: checkVal(params.value, 0, 100) };
        },
      },
      {
        field: "y",
        headerName: HEADERNAME.POSITION_Y,
        type: "number",
        editable: true,
        align: "right",
        flex: 1,
        sortable: false,
        renderEditCell: (params: any) => (
          <GridEditInputCell
            {...params}
            inputProps={{
              max: 100,
              min: 0,
            }}
          />
        ),
        valueSetter: (params: GridValueSetterParams) => {
          return { ...params.row, y: checkVal(params.value, 0, 100) };
        },
      },
      {
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
      },
    ],
    [arrTypes, deleteNode]
  );

  const formatOuputData = useCallback(() => {
    let output: any[] = [];
    output = data.map((itemType) => {
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
          } else return r;
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
    return params.row.LM > 0 ? "highlight" : "";
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
