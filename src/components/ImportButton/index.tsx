import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton } from "@mui/material";

export default function ImportButton({ fileImport, isJSON }: any) {
  const handleJsonFile = (event: any) => {
    const file = event.target.files[0] || "";
    const isJsonFile = file && file.name.endsWith(".json");
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (!isJsonFile) {
      isJSON(isJsonFile);
      return;
    }

    reader.onload = (e: any) => {
      const jsonString = e.target.result;
      const jsonData = JSON.parse(jsonString);
      // Use the imported JSON data
      isJSON(isJsonFile);
      fileImport(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <label htmlFor="file">
        <input
          id="file"
          type="file"
          multiple
          style={{ position: "fixed", top: "-100em" }}
          onChange={handleJsonFile}
        />
        <IconButton component="span" aria-label="import">
          <FileUploadIcon />
        </IconButton>
      </label>
    </>
  );
}
