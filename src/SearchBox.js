import { useState, Fragment, useEffect, useRef } from "react";
import { withRouter } from "./Util.router";
import { useNavigate } from "react-router-dom";
import config from "./Config";
import { debounce } from "lodash";

const SearchBox = (props) => {
	const [suggestions, setSuggestions] = useState([]);
	const [coordinates, setCoordinates] = useState([]);
	const [input, setInput] = useState("");

	const navigate = useNavigate();

	const fetchSuggestions = useRef(
		debounce((value) => {
			fetch(`${config.baseApiUrl}/city?address=${value}`)
				.then((r) => r.json())
				.then((results) => {
					const places = [];
					const coords = [];
					for (const result of results) {
						if (result.addresstype === "city") {
							places.push(result.address.city);
							coords.push({ lat: result.lat, lng: result.lon });
						}
					}
					setSuggestions(places);
					setCoordinates(coords);
				})
				.catch((e) => console.log(e));
		}, 1000)
	).current;

	const onChange = (e) => {
		const input = e.currentTarget.value;
		setInput(input);
		fetchSuggestions(input);
	};

	const onClick = (event, suggestion, lat, long) => {
		navigate(`/weather/results?city=${suggestion}&lat=${lat}&long=${long}`);
		return;
	};

	useEffect(() => {
		// Clean up function
		return () => {
			if (fetchSuggestions.cancel) {
				fetchSuggestions.cancel();
			}
		};
	}, [fetchSuggestions]);

	const SuggestionsHtml = [];

	suggestions.forEach((suggestion, index) => {
		const key = `${suggestion}-${index}`;
		SuggestionsHtml.push(
			<li
				data-coordinates-lat={coordinates[index].lat}
				data-coordinates-long={coordinates[index].lng}
				className={
					suggestion === input ? "list-group-item selected" : "list-group-item"
				}
				onClick={(ev) =>
					onClick(
						ev,
						suggestion,
						coordinates[index].lat,
						coordinates[index].lng,
					)
				}
				onKeyUp={(ev) => {
					if (ev.keyCode === 13) {
						onClick(
							ev,
							suggestion,
							coordinates[index].lat,
							coordinates[index].lng,
						);
					}
				}}
				key={key}
			>
				{suggestion}
			</li>,
		);
	});

	return (
		<Fragment>
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text rounded-0" id="basic-addon1">
						<i className="fas fa-search fa-xs" />
					</span>
				</div>
				<input
					className={
						props.size === "tiny"
							? "form-control rounded-0 tiny"
							: "form-control rounded-0"
					}
					type="text"
					placeholder="City"
					aria-label="City"
					onChange={onChange}
				/>
			</div>
			<ul
				id="result-list"
				className={
					props.size === "tiny"
						? "list-group position-absolute rounded-0 tiny"
						: "list-group rounded-0 position-absolute"
				}
			>
				{SuggestionsHtml}
			</ul>
		</Fragment>
	);
};

export default withRouter(SearchBox);
