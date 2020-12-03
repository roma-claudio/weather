import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Previous extends Component {

    onClick = () => {
        this.props.history.push("/weather");
        return;
    }

    render() {
        return(
            <div className="row position-absolute mb-4 h-100">
                <div className="col mx-auto my-auto">
                    <i className="position-fixed fas fa-chevron-left fa-2x text-muted ml-4 previous-btn" onClick={this.onClick}></i>
                </div>
            </div>
        )
    }
}

export default withRouter(Previous);