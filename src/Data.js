import { Fragment, useEffect, useState } from "react";
import config from "./Config";
import { withRouter } from "./Util.router";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const Data = () => {
	const [averageTemperatureChart, setAverageTemperatureChart] = useState(null);
	const [maxTemperatureChart, setMaxTemperatureChart] = useState(null);
	const [minTemperatureChart, setMinTemperatureChart] = useState(null);
	const [precipitationChart, setPrecipitationChart] = useState(null);

	const urlParams = new URLSearchParams(window.location.search);
	const lat = urlParams.get("lat");
	const long = urlParams.get("long");
	const cityName = urlParams.get("city").split(",")[0];

	useEffect(() => {
		fetch(`${config.baseApiUrl}/stats?lat=${lat}&long=${long}`)
			.then((response) => response.json())
			.then((response) => {


				setAverageTemperatureChart({
					datasets: [
						{
							label: "Average Temperature",
							strokeColor : "#ff6c23",
							pointColor : "#fff",
							pointStrokeColor : "#ff6c23",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "#ff6c23",
							data: [
								response.data[0].tavg,
								response.data[1].tavg,
								response.data[2].tavg,
								response.data[3].tavg,
								response.data[4].tavg,
								response.data[5].tavg,
								response.data[6].tavg,
								response.data[7].tavg,
								response.data[8].tavg,
								response.data[9].tavg,
								response.data[10].tavg,
								response.data[11].tavg,
							],
							fill: "start",
						},
					],
					gradient: {
						min: 400,
						firstColorStop: "rgba(250,174,50,1)",
						secondColorStop: "rgba(250,174,50,0)",
					},
				});

				setMaxTemperatureChart({
					datasets: [
						{
							label: "Average Max Temperature",
							strokeColor: "#ff6c23",
							pointColor: "#fff",
							pointStrokeColor: "#ff6c23",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "#ff6c23",
							data: [
								response.data[0].tmax,
								response.data[1].tmax,
								response.data[2].tmax,
								response.data[3].tmax,
								response.data[4].tmax,
								response.data[5].tmax,
								response.data[6].tmax,
								response.data[7].tmax,
								response.data[8].tmax,
								response.data[9].tmax,
								response.data[10].tmax,
								response.data[11].tmax,
							],
							fill: false,
						},
					],
					gradient: {
						min: 400,
						firstColorStop: "rgba(249,107,46,1)",
						secondColorStop: "rgba(250,174,50,0.45)",
					},
				});

				setMinTemperatureChart({
					datasets: [
						{
							label: "Average Min Temperature",

							strokeColor: "#ff6c23",
							pointColor: "#fff",
							pointStrokeColor: "#ff6c23",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "#ff6c23",

							data: [
								response.data[0].tmin,
								response.data[1].tmin,
								response.data[2].tmin,
								response.data[3].tmin,
								response.data[4].tmin,
								response.data[5].tmin,
								response.data[6].tmin,
								response.data[7].tmin,
								response.data[8].tmin,
								response.data[9].tmin,
								response.data[10].tmin,
								response.data[11].tmin,
							],
							fill: false,
						},
					],
					gradient: {
						min: 300,
						firstColorStop: "rgba(50,178,250,1)",
						secondColorStop: "rgba(185,46,249,0.1)",
					},
				});

				setPrecipitationChart({
					datasets: [
						{
							label: "Average precipitation",
							borderColor: "rgba(75, 192, 192, 1)",
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							data: [
								response.data[0].prcp,
								response.data[1].prcp,
								response.data[2].prcp,
								response.data[3].prcp,
								response.data[4].prcp,
								response.data[5].prcp,
								response.data[6].prcp,
								response.data[7].prcp,
								response.data[8].prcp,
								response.data[9].prcp,
								response.data[10].prcp,
								response.data[11].prcp,
							],
						},
					],
				});
			});
	}, [lat, long]);

	return (
		<Fragment>
			<div className="row align-items-center h-90" key={Date.now()}>
				<div className="col-9 mx-auto card border-0 chart-card">
					<div className="card-body p-2 pb-0">
						<p className="display-3 align-self-end compensate-left">
							{cityName}
						</p>
						<div className="d-flex justify-content-between">
							<p className="align-self-end pb-2">
								{lat}° {long}°
							</p>
						</div>
					</div>

					<div className="classic-tabs p-2">
						<div className="tab-content rounded-bottom">
							<p className="display-5 text-muted align-self-end">
								Average Temperature
							</p>
							<div
								className="tab-pane fade in show active"
								id="panel1001"
								role="tabpanel"
							>
								{averageTemperatureChart && (
									<LineChart
										chartId="averageTemperatureChart"
										datasets={averageTemperatureChart.datasets}
										gradient={averageTemperatureChart.gradient}
									/>
								)}
							</div>
							<p className="display-5 text-muted align-self-end mt-5">
								Max Temperature
							</p>
							<div
								className="tab-pane fade in show active"
								id="panel1002"
								role="tabpanel"
							>
								{maxTemperatureChart && (
									<LineChart
										chartId="maxTemperatureChart"
										datasets={maxTemperatureChart.datasets}
										gradient={maxTemperatureChart.gradient}
									/>
								)}
							</div>
							<p className="display-5 text-muted align-self-end mt-5">
								Min Temperature
							</p>
							<div
								className="tab-pane fade in show active"
								id="panel1003"
								role="tabpanel"
							>
								{minTemperatureChart && (
									<LineChart
										chartId="minTemperatureChart"
										datasets={minTemperatureChart.datasets}
										gradient={minTemperatureChart.gradient}
									/>
								)}
							</div>
							<p className="display-5 text-muted align-self-end mt-5">
								Average Precipitations
							</p>
							<div
								className="tab-pane fade in show active"
								id="panel1004"
								role="tabpanel"
							>
								{precipitationChart && (
									<BarChart
										chartId="precipitationChart"
										datasets={precipitationChart.datasets}
										gradient={precipitationChart.gradient}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default withRouter(Data);
