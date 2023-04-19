import BasicTabs from "./components/BasicTabs";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ModeSwitcher } from "./components/ModeSwitcher";

import theme from "./theme";
function App() {
  return (
    <>
      <CssVarsProvider theme={theme}>
        <ModeSwitcher />
        <BasicTabs />
      </CssVarsProvider>
    </>
  );
}

export default App;
