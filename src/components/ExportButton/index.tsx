import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";
import { DataType } from "../../models";
import moment from "moment";
import { generateExportData } from "../../transformData";
import { LOCAL_STORAGE } from "../../constants";

export interface ExportButtonProps {
  data: DataType[];
}

export default function ExportButton({ data }: ExportButtonProps) {
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({
        bubble_data: generateExportData(data),
        title: localStorage.getItem(LOCAL_STORAGE.TITLE),
        year: localStorage.getItem(LOCAL_STORAGE.YEAR),
      })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `data-${moment().format("MM-DD-YYYY-HH-mm-ss")}.json`;

    link.click();
  };
  return (
    <>
      <IconButton aria-label="export" onClick={exportData}>
        <FileDownloadIcon />
      </IconButton>
    </>
  );
}
