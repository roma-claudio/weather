import { Fragment, useEffect, useState } from "react";
import config from "./Config";
import { withRouter } from "./Util.router";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Loader from "./Loader";

const Data = () => {
	const [averageTemperatureChart, setAverageTemperatureChart] = useState(null);
	const [maxTemperatureChart, setMaxTemperatureChart] = useState(null);
	const [minTemperatureChart, setMinTemperatureChart] = useState(null);
	const [precipitationChart, setPrecipitationChart] = useState(null);

	const urlParams = new URLSearchParams(window.location.search);
	const lat = urlParams.get("lat");
	const long = urlParams.get("long");
	const cityName = urlParams.get("city").split(",")[0];
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		fetch(`${config.baseApiUrl}/stats?lat=${lat}&long=${long}`)
			.then((response) => response.json())
			.then((response) => {
				setTimeout(() => {
					setIsLoaded(true);
					setAverageTemperatureChart({
						datasets: [
							{
								strokeColor: "#ff6c23",
								pointColor: "#fff",
								pointStrokeColor: "#ff6c23",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "#ff6c23",
								data: response.data.map((data) => data.tavg),
								fill: false,
							},
						],
						gradient: {
							min: 300,
							firstColorStop: "rgba(0, 0, 0, 0.25)",
							secondColorStop: "rgba(0, 0, 0, 0.25)",
						},
					});

					setMaxTemperatureChart({
						datasets: [
							{
								strokeColor: "#ff6c23",
								pointColor: "#fff",
								pointStrokeColor: "#ff6c23",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "#ff6c23",
								data: response.data.map((data) => data.tmax),
								fill: false,
							},
						],
						gradient: {
							min: 400,
							firstColorStop: "rgba(179, 0, 0, 1)",
							secondColorStop: "rgba(250,174,50,0.25)",
						},
					});

					setMinTemperatureChart({
						datasets: [
							{
								strokeColor: "#ff6c23",
								pointColor: "#fff",
								pointStrokeColor: "#ff6c23",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "#ff6c23",
								data: response.data.map((data) => data.tmin),
								fill: false,
							},
						],
						gradient: {
							min: 300,
							firstColorStop: "rgba(50,178,250,1)",
							secondColorStop: "rgba(185,46,249,0.25)",
						},
					});

					setPrecipitationChart({
						datasets: [
							{
								borderColor: "rgba(75, 192, 192, 1)",
								backgroundColor: "rgba(75, 192, 192, 0.2)",
								data: response.data.map((data) => data.prcp),
							},
						],
					});
				}, 750);
			});
	}, [lat, long]);

	if (!isLoaded) {
		return <Loader />;
	}

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
						<div
							className="tab-content rounded-bottom"
							style={{
								display: "flex",
								flexWrap: "wrap",
								alignItems: "center",
								justifyContent: "start",
							}}
						>
							<div
								style={{
									flex: "1 0 21%",
								}}
							>
								<p className="display-5 text-muted align-self-end">
									Average Temperature (°C)
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
							</div>
							<div
								style={{
									flex: "1 0 21%",
								}}
							>
								<p className="display-5 text-muted align-self-end">
									Max Temperature (°C)
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
							</div>
							<div
								style={{
									flex: "1 0 21%",
								}}
							>
								<p className="display-5 text-muted align-self-end mt-5">
									Min Temperature (°C)
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
							</div>
							<div
								style={{
									flex: "1 0 21%",
								}}
							>
								<p className="display-5 text-muted align-self-end mt-5">
									Average Precipitations (mm)
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
			</div>
		</Fragment>
	);
};

export default withRouter(Data);
