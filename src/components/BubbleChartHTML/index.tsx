import { Box } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef, useMemo } from "react";
import { BubbleChartHTMLProps } from "../../models/bubbleNode";
import BubbleNode from "../BubbleNode";
import { DataChildType } from "../../models";
import { generateChartDataExt } from "../../transformData";
import { legendSection } from "./styles";
import LegendButton from "../LegendButton";
import Quadrant from "../Quadrant";
import ScalesXY from "../ScalesXY";
import NoteSection from "../NoteSection";

const BubbleChartHTML = ({ dataSets, chartColor }: BubbleChartHTMLProps) => {
  const dataTypes = dataSets.map((dataSet) => dataSet.type);
  const [bubbles] = useState<DataChildType[]>(generateChartDataExt(dataSets));
  const [showTypes, setShowTypes] = useState(dataTypes);
  const [hoverId, setHoverId] = useState(null);

  const chartRef = useRef<any>(null);

  const [chartWidth, setChartWidth] = useState(0);

  useLayoutEffect(() => {
    if (chartRef.current) setChartWidth(chartRef.current.offsetWidth);
  }, []);

  const maxTarget = useMemo(
    () => Math.max(...bubbles.map((data: any) => data.target)),
    [bubbles]
  );
  const defaultTarget = Math.round(maxTarget / 2);

  const handleDatasetToggle = (type: string) => {
    if (showTypes.includes(type)) {
      setShowTypes(showTypes.filter((t) => t !== type));
    } else {
      setShowTypes([...showTypes, type]);
    }
  };
  const handleHover = (id: any) => {
    setHoverId(id);
  };
  const handleLeave = () => {
    setHoverId(null);
  };
  return (
    <Box
      sx={{
        border: "1px solid green",
        padding: "30px",
        position: "relative",
        zIndex: "1",
      }}
    >
      <Box
        ref={chartRef}
        className={hoverId ? "hover" : ""}
        sx={{
          backgroundColor: "white",
          position: "relative",
          zIndex: "1",
          border: "1px solid rgba(1,1,1,0.25)",
          borderBottomLeftRadius: "12px",
          height: "80vh",
        }}
      >
        {/* ScalesXY */}
        <ScalesXY />
        {/* Quadrants */}
        <Quadrant />
        {/* Bubbles */}
        {showTypes.map((type) => (
          <div key={type}>
            {bubbles &&
              bubbles
                .filter((bubble) => bubble.type === type)
                .map((bubble: any, i: number) => (
                  <BubbleNode
                    chartColor={chartColor}
                    key={`bubble-${i}`}
                    bubbleData={bubble}
                    onHover={() => handleHover(bubble.id)}
                    onMouseLeave={handleLeave}
                    hoverId={hoverId}
                    maxTarget={maxTarget}
                    defaultTarget={defaultTarget}
                    chartSize={chartWidth}
                  />
                ))}
          </div>
        ))}
        {/* Legends */}
        <Box sx={legendSection}>
          {dataSets
            .filter((dataSet) => dataSet.data.length > 0)
            .map((dataSet) => (
              <LegendButton
                key={dataSet.id}
                dataSet={dataSet}
                handleToggle={handleDatasetToggle}
              />
            ))}
        </Box>
        <NoteSection chartColor={chartColor} />
      </Box>
    </Box>
  );
};
export default BubbleChartHTML;
