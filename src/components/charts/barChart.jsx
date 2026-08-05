import ReactECharts from "echarts-for-react";

function BarChart({ title, labels, data }) {
  const lastIndex = data.length - 1;

  const formattedData = data.map((value, index) => {
    const isLast = index === lastIndex;

    return {
      value,
      itemStyle: {
        color: isLast ? "#7a7a7a" : "#cfcfcf",
        borderColor: "#4a4a4a",
        borderWidth: 2,
        borderType: "solid",
        shadowBlur: 0,
        decal: {
          symbol: "rect",
          dashArrayX: [1, 0],
          dashArrayY: [2, 3],
          rotation: Math.PI / 6,
          color: isLast ? "#3f3f3f" : "#8a8a8a",
        },
      },
    };
  });

  const option = {
    backgroundColor: "#f5f3ee",

    title: {
      text: title,
      left: "center",
      top: 20,
      textStyle: {
        color: "#2f2f2f",
        fontSize: 18,
        fontWeight: "normal",
      },
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "#f1efe8",
      borderColor: "#8c8c8c",
      borderWidth: 1,
      textStyle: {
        color: "#333",
      },
      axisPointer: {
        type: "shadow",
      },
    },

    grid: {
      left: "8%",
      right: "5%",
      bottom: "18%",
      top: "20%",
    },

    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        rotate: 45,
        color: "#555",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#7b7b7b",
          width: 2,
        },
      },
      axisTick: {
        lineStyle: {
          color: "#7b7b7b",
        },
      },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        color: "#555",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#d7d3cc",
          type: "dashed",
          width: 1,
        },
      },
    },

    series: [
      {
        type: "bar",
        data: formattedData,
        barWidth: "58%",
        emphasis: {
          itemStyle: {
            color: "#9a9a9a",
            borderColor: "#2f2f2f",
            borderWidth: 2,
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        background: "#f5f3ee",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #d8d2c8",
      }}
    >
      <ReactECharts option={option} style={{ height: "420px", width: "100%" }} />
    </div>
  );
}

export default BarChart;