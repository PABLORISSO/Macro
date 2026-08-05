import ReactECharts from "echarts-for-react";

function LineChart({ title, labels, data }) {
  const option = {
    title: {
      text: title,
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
        smooth: true,
      },
    ],
  };

  return <ReactECharts option={option} />;
}

export default LineChart;