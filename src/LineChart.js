import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import "chart.js/auto";

const LineChart = ({ chartId, datasets, gradient, fillColor }) => {
	const ref = useRef();

	useEffect(() => {
		if (!(datasets && chartId && gradient)) {
			return;
		}
		const chartElement = document.getElementById(chartId);
		const context = chartElement.getContext("2d");
		const linearGradient = context.createLinearGradient(0, 0, 0, gradient.min);
		linearGradient.addColorStop(0, gradient.firstColorStop);
		linearGradient.addColorStop(1, gradient.secondColorStop);

		if (datasets[0].fill) {
			datasets[0].fillColor = linearGradient;
		} else {
			datasets[0].borderColor = linearGradient;
			datasets[0].borderColor = linearGradient;
		}

		try {
			new Chart(context, {
				ref,
				type: "line",
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
	}, [chartId, datasets, gradient]);

	return <canvas id={chartId} />;
};

export default LineChart;
