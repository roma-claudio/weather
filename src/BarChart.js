import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import "chart.js/auto";

const BarChart = ({ chartId, datasets }) => {
	const ref = useRef();
	Chart.defaults.plugins.legend.display = false;
	Chart.defaults.layout.padding.left = "5px";
	Chart.defaults.layout.autoPadding = false;
	console.log(Chart.defaults);

	useEffect(() => {
		if (!(datasets && chartId)) {
			return;
		}
		const chartElement = document.getElementById(chartId);
		const context = chartElement.getContext("2d");

		try {
			new Chart(context, {
				ref,
				type: "bar",
				data: {
					//Bring in data
					labels: [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					],
					datasets,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [chartId, datasets]);

	return <canvas id={chartId} />;
};

export default BarChart;
