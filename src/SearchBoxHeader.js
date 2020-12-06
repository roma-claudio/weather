import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

class SearchBoxHeader extends Component{
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
        this.props.history.push("/Weather/"+suggestion+"&"+lat+"&"+long);
        return;
    }

    onKeyDown = e => {
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
            this.props.history.push(document.location.pathname+"/"+this.state.suggestions[this.state.selected]+"&"+this.state.coordinates[this.state.selected][0]+"&"+this.state.coordinates[this.state.selected][1]);
            return;
        }
    }

    scrollToSelected = elementId => {
        document.getElementById(elementId).childNodes.forEach( (e) =>  {
            if (e.classList.contains('selected') && !this.isInViewport(e)) e.scrollIntoView(true);
        });
        
    }

    isInViewport = element => {
        const rect = element.getBoundingClientRect();
        console.log(rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth))
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate()');
        this.scrollToSelected('result-list')
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
                <div className="input-group w-50 ml-auto">
                    <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                            <i className="fas fa-search fa-sm"></i> 
                        </span>
                    </div>
                    <input className={"form-control tiny rounded-0"} type="text" placeholder="City" aria-label="City" onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                </div>
                <ul id="result-list" className={this.props.size === 'tiny' ? "list-group position-absolute rounded-0 tiny": "list-group rounded-0 position-absolute"}>
                    {SuggestionsHtml}
                </ul>
            </Fragment>
           
        )
        
    }

}

export default withRouter(SearchBoxHeader);