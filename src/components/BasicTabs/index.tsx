import { useEffect, useRef, useState } from "react";
import { Tab, Box, Grid } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import * as htmlToImage from "html-to-image";

import { mockData, mockChartColor } from "../../assets/dummy/mockData";
import { chartStyle, tabStyle } from "./styles";
import { DataType, ElementData } from "../../models";
import DataTable from "../DataTable";
import Heading from "../Heading";
import eventBus from "../../utilities/event-bus";
import TooltipPanel from "../TooltipPanel";
import { LOCAL_STORAGE, TAB_LABELS } from "../../constants";
import Setting from "../Setting";
import { generateChartData } from "../../transformData";
import BubbleChartHTML from "../BubbleChartHTML";
import moment from "moment";
import MasterDataForm from "../MasterDataForm";

function BasicTabs() {
  const chartRef = useRef<any>(null);

  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<DataType[]>([]);
  const [dataTooltip, setDataTooltip] = useState<ElementData>();
  const [chartColor, setChartColor] = useState<any>(null);

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

  const captureChart = async () => {
    const dataUrl = await htmlToImage.toPng(chartRef.current);
    // download image
    const link = document.createElement("a");
    link.download = `chart-${moment().format("MM-DD-YYYY-HH-mm-ss")}.png`;
    link.href = dataUrl;
    link.click();
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
        JSON.stringify(mockChartColor)
      );
    }
    localStorageChartColor && setChartColor(JSON.parse(localStorageChartColor));

    //Set active tabs
    if (typeof localStorageActiveTab !== "string") {
      localStorage.setItem(LOCAL_STORAGE.ACTIVE_TAB, "2");
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
              <Tab label={TAB_LABELS.CHART} value="0" />
              <Tab label={TAB_LABELS.MASTER} value="1" />
              <Tab label={TAB_LABELS.DATA} value="2" />
            </TabList>
          </Box>
          <Box sx={chartStyle}>
            <TabPanel value="0">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Box ref={chartRef} sx={{ backgroundColor: "white" }}>
                    <BubbleChartHTML chartColor={chartColor} dataSets={data} />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Setting
                    chartColor={chartColor}
                    dataSets={data}
                    captureChart={captureChart}
                    updateColor={setChartColor}
                  />
                  {dataTooltip?.elementData && (
                    <TooltipPanel
                      chartColor={chartColor}
                      elementData={dataTooltip}
                    />
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="1">
              <MasterDataForm dataSets={data} updateData={updateData} />
            </TabPanel>
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
