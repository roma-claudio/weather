import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "./Util.router";
import { useNavigate } from "react-router-dom";
import config from "./Config";

const SearchBox = (props) => {
	const [suggestions, setSuggestions] = useState([]);
	const [coordinates, setCoordinates] = useState([]);
	// const [show, setShow] = useState(false);
	const [input, setInput] = useState("");
	// const [selected, setSelected] = useState(null);

	const navigate = useNavigate();

	// const getSelectedElement = () => {
	//     let selectedOption;
	//     for (let option of document.getElementById("result-list").children) {
	//         if (option.classList.contains("selected")) {
	//             selectedOption = option;
	//             break;
	//         }
	//     }

	//     return ({
	//         cityName: selectedOption.dataset.cityName,
	//         coordinates: {
	//             lat: selectedOption.dataset.coordinatesLat,
	//             long: selectedOption.dataset.coordinatesLong
	//         }
	//     });
	// }

	const onChange = (e) => {
		const input = e.currentTarget.value;
		fetch(`${config.baseApiUrl}/city?address=${input}`)
			.then((result) => result.json())
			.then((result) => {
				const places = [];
				const distance = [];
				const coordinates = [];

				for (const resultItem of result.items) {
					if (resultItem.resultType === "locality") {
						places.push(resultItem.title);
						distance.push(resultItem.distance);
						coordinates.push(resultItem.position);
					}
				}

				// setSelected(-1);
				setSuggestions(places);
				// setShow(true);
				setInput(input);
				setCoordinates(coordinates);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const onClick = (event, suggestion, lat, long) => {
		navigate(`/Weather?city=${suggestion}&lat=${lat}&long=${long}`);
		return;
	};

	const onKeyDown = (e) => {
		//Arrow down
		if (e.keyCode === 40) {
			/*
            if ( (this.state.suggestions.length - 1) === this.state.selected) return;
            e.target.value = this.state.suggestions[this.state.selected + 1];
            this.setState({
                selected: this.state.selected + 1,
                show: false,
                input: this.state.suggestions[this.state.selected + 1],
            })
            */
			return;
		}

		//Arrow up
		if (e.keyCode === 38) {
			/*
            if (this.state.selected === 0 ) return;
            e.target.value = this.state.suggestions[this.state.selected - 1];
            this.setState({
                selected: this.state.selected - 1,
                show: false,
                input: this.state.suggestions[this.state.selected - 1],
            })
            */
			return;
		}

		//Enter
		if (e.keyCode === 13) {
			/*
            this.props.history.push(document.location.pathname+"/"+this.state.suggestions[this.state.selected]+"&"+this.state.coordinates[this.state.selected][0]+"&"+this.state.coordinates[this.state.selected][1]);
            return;
            */
		}
	};

	// const isInViewport = element => {
	//     const rect = element.getBoundingClientRect();
	//     return (
	//         rect.top >= 0 &&
	//         rect.left >= 0 &&
	//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	//     );
	// }

	// const scrollToSelected = elementId => {
	//     document.getElementById(elementId).childNodes.forEach( (e) =>  {
	//         if (e.classList.contains('selected') && !isInViewport(e)) e.scrollIntoView(true);
	//     });
	// }

	useEffect(() => {
		// Clean up function
		return () => {
			// scrollToSelected('result-list');
		};
	}, []);

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
					onKeyDown={onKeyDown}
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
