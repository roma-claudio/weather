import React from 'react';
import { withRouter } from "./Util.router";
import { useNavigate } from "react-router-dom";

const Previous = () => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/Weather");
        return;
    }

    
    return(
        <div className="row position-absolute mb-4 h-100">
            <div className="col mx-auto my-auto">
                <i className="position-fixed fas fa-chevron-left fa-2x text-muted ml-4 previous-btn" onClick={onClick}></i>
            </div>
        </div>
    )
    
}

export default withRouter(Previous);