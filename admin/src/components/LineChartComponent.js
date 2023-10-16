import * as React from "react";

import { Box, Grid, Paper } from "@mui/material";
import ReactECharts from 'echarts-for-react';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { BarChart, PieChart, } from "echarts/charts";
// import components, all suffixed with Component
import { GridComponent, CalendarComponent, ToolboxComponent, TooltipComponent, TitleComponent, TimelineComponent, LegendComponent, DataZoomComponent, VisualMapComponent } from "echarts/components";
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


const LineChartComponent = () => {

  const notify = (msg, method = "error") => toast[method](msg);

  const { data, error, loading, execute, queryParam } = useAxios(
    "get",
    "properties/property-by-income"
  );

  if (loading) {
    return (
      <>
        <Header />
        <Loading loading={loading} />
      </>
    );
  }

  const lineChartOption = {
    title: {
      text: 'Number of properties rented'
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {}
      }
    },
    tooltip: {},
    legend: {
      data: ['Properties']
    },
    xAxis: {
      data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    },
    yAxis: {},
    series: [{
      name: 'Properties',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20, 0]
    }]
  };


  return (
    <Paper>
      <ReactECharts
        option={lineChartOption}
        style={{ height: 400 }}
      />
    </Paper>
  );

}

export default LineChartComponent;