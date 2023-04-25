import { useEffect, useState } from "react";
import { Tab, Box, Grid } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { chartColor, mockData } from "../../assets/dummy/mockData";
import { chartStyle, tabStyle } from "./styles";
import { DataType, ElementData } from "../../models";
import BubbleChart from "../BubbleChart";
import DataTable from "../DataTable";
import Heading from "../Heading";
// import MasterDataForm from "../MasterDataForm";
import eventBus from "../../utilities/event-bus";
import TooltipPanel from "../TooltipPanel";
import { LOCAL_STORAGE, TAB_LABELS } from "../../constants";
import Setting from "../Setting";
import { generateChartData } from "../../transformData";

function BasicTabs() {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<DataType[]>([]);
  const [dataTooltip, setDataTooltip] = useState<ElementData>();

  const handleChange = (event: any, newValue: string) => {
    localStorage.setItem(LOCAL_STORAGE.ACTIVE_TAB, newValue);
    setValue(newValue);
  };

  const updateData = (data: DataType[]) => {
    localStorage.setItem(LOCAL_STORAGE.CHART, JSON.stringify(data));
    setData(data);
    //reset tooltip panel when updated data
    setDataTooltip(undefined);
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
    //Get data from localStorage
    const localStorageDataChart = localStorage.getItem(LOCAL_STORAGE.CHART);
    const localStorageActiveTab = localStorage.getItem(
      LOCAL_STORAGE.ACTIVE_TAB
    );
    const localStorageChartColor = localStorage.getItem(
      LOCAL_STORAGE.CHART_COLOR
    );
    //Set data
    if (typeof localStorageDataChart !== "string") {
      localStorage.setItem(
        LOCAL_STORAGE.CHART,
        JSON.stringify(generateChartData(mockData))
      );
    }
    localStorageDataChart && setData(JSON.parse(localStorageDataChart));
    //Set chart color
    if (typeof localStorageChartColor !== "string") {
      localStorage.setItem(
        LOCAL_STORAGE.CHART_COLOR,
        JSON.stringify(chartColor)
      );
    }
    localStorageChartColor && setValue(localStorageChartColor);
    //Set active tab
    if (typeof localStorageActiveTab !== "string") {
      localStorage.setItem(LOCAL_STORAGE.ACTIVE_TAB, "1");
    }
    localStorageActiveTab && setValue(localStorageActiveTab);
  }, []);
  return (
    <>
      <Heading />
      {value !== "" && (
        <TabContext value={value}>
          <Box sx={tabStyle}>
            <TabList onChange={handleChange}>
              <Tab label={TAB_LABELS.CHART} value="1" />
              {/* <Tab label="Master Data" value="2" /> */}
              <Tab label={TAB_LABELS.DATA} value="2" />
            </TabList>
          </Box>
          <Box sx={chartStyle}>
            <TabPanel value="1">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <BubbleChart propsData={data} />
                </Grid>
                <Grid item xs={2}>
                  <Setting />
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
