import React from 'react';
import { withRouter } from "./Util.router";
import { useNavigate } from "react-router-dom";

const Previous = () => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
        return;
    }

    
    return(
        <div className="row position-absolute mb-4 h-100">
            <div className="col mx-auto my-auto">
                <i className="position-fixed fas fa-chevron-left fa-2x text-muted ml-2 previous-btn" onClick={onClick} onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                        onClick();
                    }
                }}/>
            </div>
        </div>
    )
    
}

export default withRouter(Previous);