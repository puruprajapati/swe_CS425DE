import * as React from "react";

import { Box, Grid, Paper } from "@mui/material";
import ReactECharts from "echarts-for-react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { BarChart, PieChart } from "echarts/charts";
// import components, all suffixed with Component
import {
  GridComponent,
  CalendarComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  TimelineComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

import Loading from "../components/Loading";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useAxios } from "../api/userAxios";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  PieChart,
  VisualMapComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  TimelineComponent,
  CalendarComponent,
  BarChart,
]);

const PieChartComponent = (props) => {
  const notify = (msg, method = "error") => toast[method](msg);

  const { data, error, loading, execute, queryParam } = useAxios(
    "get",
    props.url
  );

  if (loading) {
    return (
      <>
        <Header />
        <Loading loading={loading} />
      </>
    );
  }

  const option = {
    title: {
      text: "Total income",
      subtext: "",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: data.data.map((item) => item.propertyName),
    },
    series: [
      {
        name: "Income",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: data.data.map((item) => {
          return {
            value: item.transactionAmount,
            name: item.propertyName,
            id: item.id,
          };
        }),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const getOption = () => {
    return option;
  };

  function onChartReady(echarts) {
    console.log("echarts is ready", echarts);
  }

  function onChartClick(param, echarts) {
    console.log(param, echarts);
  }

  function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts);
  }

  return (
    <Paper>
      <ReactECharts
        option={getOption()}
        style={{ height: 400 }}
        onChartReady={onChartReady}
        onEvents={{
          click: onChartClick,
          legendselectchanged: onChartLegendselectchanged,
        }}
      />
    </Paper>
  );
};

export default PieChartComponent;
