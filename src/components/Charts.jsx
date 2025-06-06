import React from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const data = [320, 380, 550, 420, 360, 350, 430, 360, 300, 280, 310, 380];
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const maxValue = Math.max(...data);
  const maxIndex = data.indexOf(maxValue);
  const maxCategory = categories[maxIndex];

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      offsetX: 0,
      offsetY: 0,
      padding: 0,
    },

    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "category",
      categories: categories,
    },
    yaxis: {
      min: 0,
      max: 800,
      labels: {
        formatter: function (value) {
          return `$${value.toLocaleString()}`;
        },
        offsetX: -10,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return `$${value.toLocaleString()}`;
        },
      },
    },
    annotations: {
      points: [
        {
          x: maxCategory,
          y: maxValue,
          marker: {
            size: 0,
            // fillColor: "blue",
            // strokeColor: "#fff",
            // radius: 10,
          },
          label: {
            borderColor: "#fff",
            offsetY: 10,
            style: {
              color: "#fff",
              background: "#008FFB",
              fontSize: "10px",
              fontWeight: 600,
              borderRadius: 8,
              padding: {
                left: 12,
                right: 12,
                top: 6,
                bottom: 6,
              },
            },
            text: `$${maxValue.toLocaleString()}`,
          },
        },
      ],
    },
  };

  const series = [
    {
      name: "Sales",
      data: data,
    },
  ];

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <div className="min-w-[700px] h-[350px]">
        <Chart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};

export default Charts;
