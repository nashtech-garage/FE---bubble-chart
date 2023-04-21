import { Button, Alert } from "@mui/material";
import {
  GridSlotsComponentsProps,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import ExportButton from "../ExportButton";
import ImportButton from "../ImportButton";

export function CustomToolbar(
  props: NonNullable<GridSlotsComponentsProps["toolbar"]>
) {
  return (
    <>
      <GridToolbarContainer>
        <Button onClick={props.addNew}>Add New</Button>
        {props.rows.length > 0 && <ExportButton data={props.data} />}
        <ImportButton
          fileImport={props.handleImport}
          isJSON={(isJSON: boolean) => props.setIsJSON(!isJSON)}
        />
        <Button onClick={props.clear}>Clear data</Button>
      </GridToolbarContainer>
      {props.isJSON && (
        <Alert severity="error">Please import JSON file !!!</Alert>
      )}
    </>
  );
}
