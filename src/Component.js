import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            coordinates: [],
            show: false,
            input: "",
            selectedCoordinates: null
        }
    }

    getSelectedElement = () => {
        let selectedOption;
        for (let option of document.getElementById("result-list").children) {
            if (option.classList.contains("selected")) {
                selectedOption = option;
                break;
            }
        }

        return ({
            cityName: selectedOption.dataset.cityName,
            coordinates: {
                lat: selectedOption.dataset.coordinatesLat,
                long: selectedOption.dataset.coordinatesLong
            }
        });
    }

    onChange = e => {
        const input = e.currentTarget.value;
        fetch("https://nodejs-295719.ew.r.appspot.com/city?"+input)
        .then( result => result.json() )
        .then( (result) => {
            let places = [];
            let distance = [];
            let coordinates = [];
            result.results.forEach((r) => {
                if (r.category !== "street-square") {
                   places.push(r.title)
                   distance.push(r.distance);
                   coordinates.push(r.position) 
                }
            });

            this.setState({
                selected: -1,
                suggestions: places,
                show: true,
                input: input,
                coordinates: coordinates
            });
        });

    }

    onClick = (event,suggestion,lat,long) => {
        this.props.history.push("/"+suggestion+"&"+lat+"&"+long);
        return;
    }

    onKeyDown = e => {
        //Arrow down
        if (e.keyCode === 40) {
            if ( (this.state.suggestions.length - 1) === this.state.selected) return;
            e.target.value = this.state.suggestions[this.state.selected + 1];
            this.setState({
                selected: this.state.selected + 1,
                show: false,
                input: this.state.suggestions[this.state.selected + 1],
            })
            return;
        }

        //Arrow up
        if (e.keyCode === 38) {
            if (this.state.selected === 0 ) return;
            e.target.value = this.state.suggestions[this.state.selected - 1];
            this.setState({
                selected: this.state.selected - 1,
                show: false,
                input: this.state.suggestions[this.state.selected - 1],
            })
            return;
        }

        //Enter
        if (e.keyCode === 13) {
            this.props.history.push("/"+this.state.suggestions[this.state.selected]+"&"+this.state.coordinates[this.state.selected][0]+"&"+this.state.coordinates[this.state.selected][1]);
            return;
        }
    }

    render() {

        let SuggestionsHtml = []
        
        this.state.suggestions.forEach((suggestion, index) => {
            SuggestionsHtml.push(
                <li 
                    data-coordinates-lat={this.state.coordinates[index][0]}
                    data-coordinates-long={this.state.coordinates[index][1]}
                    className={ suggestion === this.state.input ? "list-group-item selected" : "list-group-item"}
                    onClick={(ev) => this.onClick(ev,suggestion, this.state.coordinates[index][0], this.state.coordinates[index][1])}
                    key={suggestion+index}
                    >
                        {suggestion}
                </li>
            );        
        })
       
        return(
            <Fragment>
                <input className={this.props.size === "tiny" ? "form-control transparent tiny" : "form-control transparent"} type="text" placeholder="City" aria-label="City" onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                <ul id="result-list" className={this.props.size === 'tiny' ? "list-group position-absolute tiny": "list-group position-absolute"}>
                    {SuggestionsHtml}
                </ul>
            </Fragment>
           
        )
        
    }

}

export default withRouter(SearchBox);