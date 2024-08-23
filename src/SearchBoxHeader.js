import React, { Component, Fragment } from "react";
import { withRouter } from "./Util.router";
import config from "./Config";

class SearchBoxHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
			coordinates: [],
			show: false,
			input: "",
			selectedCoordinates: null,
		};
	}

	getSelectedElement = () => {
		let selectedOption;
		for (const option of document.getElementById("result-list").children) {
			if (option.classList.contains("selected")) {
				selectedOption = option;
				break;
			}
		}

		return {
			cityName: selectedOption.dataset.cityName,
			coordinates: {
				lat: selectedOption.dataset.coordinatesLat,
				long: selectedOption.dataset.coordinatesLong,
			},
		};
	};

	onChange = (e) => {
		const input = e.currentTarget.value;
		fetch(`${config.baseApiUrl}city?${input}`)
			.then((result) => result.json())
			.then(({results}) => {
				const places = [];
				const distance = [];
				const coordinates = [];

				for (const result of results) {
					if (result.category !== "street-square") {
						places.push(result.title);
						distance.push(result.distance);
						coordinates.push(result.position);
					}
				}

				this.setState({
					selected: -1,
					suggestions: places,
					show: true,
					input: input,
					coordinates: coordinates,
				});
			});
	};

	onClick = (event, suggestion, lat, long) => {
		this.props.history.push(
			`/Weather?city=${suggestion}&${lat}&${long}`,
		);
		return;
	};

	onKeyDown = (e) => {
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
			this.props.history.push(
				`${document.location.pathname}/${this.state.suggestions[this.state.selected]}&${this.state.coordinates[this.state.selected][0]}&${this.state.coordinates[this.state.selected][1]}`,
			);
			return;
		}
	};

	scrollToSelected = (elementId) => {
		for (const element of document.getElementById(elementId).childNodes) {
			if (element.classList.contains("selected") && !this.isInViewport(element))
				element.scrollIntoView(true);
		}
	};

	isInViewport = (element) => {
		const rect = element.getBoundingClientRect();
		console.log(
			rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <=
					(window.innerWidth || document.documentElement.clientWidth),
		);
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	};

	componentDidUpdate() {
		console.log("componentDidUpdate()");
		this.scrollToSelected("result-list");
	}

	render() {
		const SuggestionsHtml = [];

		this.state.suggestions.forEach((suggestion, index) => {
			SuggestionsHtml.push(
				<li
					data-coordinates-lat={this.state.coordinates[index][0]}
					data-coordinates-long={this.state.coordinates[index][1]}
					className={
						suggestion === this.state.input
							? "list-group-item selected"
							: "list-group-item"
					}
					onClick={(ev) =>
						this.onClick(
							ev,
							suggestion,
							this.state.coordinates[index][0],
							this.state.coordinates[index][1],
						)
					}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            this.onClick(
                                e,
                                suggestion,
                                this.state.coordinates[index][0],
                                this.state.coordinates[index][1],
                            );
                        }
                    }}
					key={suggestion}
				>
					{suggestion}
				</li>,
			);
		});

		return (
			<Fragment>
				<div className="input-group w-50 ml-auto">
					<div className="input-group-append border-right-0">
						<span className="input-group-text bg-transparent border-right-0">
							<i className="fas fa-search fa-sm" />
						</span>
					</div>
					<input
						className={"form-control tiny rounded-0"}
						type="text"
						placeholder="City"
						aria-label="City"
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
					/>
				</div>
				<ul
					id="result-list"
					className={
						this.props.size === "tiny"
							? "list-group position-absolute rounded-0 tiny"
							: "list-group rounded-0 position-absolute"
					}
				>
					{SuggestionsHtml}
				</ul>
			</Fragment>
		);
	}
}

export default withRouter(SearchBoxHeader);
