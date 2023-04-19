import { useEffect, useState } from "react";
import { Tab, Box, Grid } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { mockData } from "../../assets/dummy/mockData";
import { chartStyle, tabStyle } from "./styles";
import { DataType, ElementData } from "../../models";
import BubbleChart from "../BubbleChart";
import DataTable from "../DataTable";
import Heading from "../Heading";
// import MasterDataForm from "../MasterDataForm";
import eventBus from "../../utilities/event-bus";
import TooltipPanel from "../TooltipPanel";

function BasicTabs() {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<DataType[]>([]);
  const [dataTooltip, setDataTooltip] = useState<ElementData>();

  const handleChange = (event: any, newValue: string) => {
    localStorage.setItem("activeTab", newValue);
    setValue(newValue);
  };

  const updateData = (data: DataType[]) => {
    localStorage.setItem("chart", JSON.stringify(data));
    setData(data);
  };

  useEffect(() => {
    eventBus.on("chart-tooltip", (data: ElementData) => {
      setDataTooltip(data);
    });

    return eventBus.remove("chart-tooltip", (): void => {
      return;
    });
  }, []);

  useEffect(() => {
    const localStorageDataChart = localStorage.getItem("chart");
    const localStorageActiveTab = localStorage.getItem("activeTab");

    if (typeof localStorageDataChart !== "string") {
      localStorage.setItem("chart", JSON.stringify(mockData));
    }
    localStorageDataChart && setData(JSON.parse(localStorageDataChart));

    if (typeof localStorageActiveTab !== "string") {
      localStorage.setItem("activeTab", "1");
    }
    localStorageActiveTab && setValue(localStorageActiveTab);
  }, []);
  return (
    <>
      <Heading />
      {value !== "" && (
        <TabContext value={value}>
          <Box sx={tabStyle}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chart" value="1" />
              {/* <Tab label="Master Data" value="2" /> */}
              <Tab label="Data" value="2" />
            </TabList>
          </Box>
          <Box sx={chartStyle}>
            <TabPanel value="1">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <BubbleChart propsData={data} />
                </Grid>
                <Grid item xs={2}>
                  <div>Setting</div>
                  {dataTooltip?.elementData && (
                    <TooltipPanel elementData={dataTooltip} />
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            {/* <TabPanel value="2">
              <MasterDataForm />
            </TabPanel> */}
            <TabPanel value="2">
              <DataTable data={data} onUpdate={updateData} />
            </TabPanel>
          </Box>
        </TabContext>
      )}
    </>
  );
}

export default BasicTabs;
