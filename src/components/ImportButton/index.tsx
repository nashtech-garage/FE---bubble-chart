import { Button, IconButton } from "@mui/material";
import withFields from "../../hocs/withFields";

function ImportButton({ fileImport, isJSON, onChange, file }: any) {
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
      onChange(file, jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Button variant="contained" component="label">
        Upload
        <input
          id="file"
          type="file"
          multiple
          style={{ position: "fixed", top: "-100em" }}
          onChange={handleJsonFile}
        />
      </Button>
    </>
  );
}
export default withFields(ImportButton);
