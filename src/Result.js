import React, { Fragment } from 'react';
import Map from './Map.js';
import Previous from './Previous';

function Result (props) {
  return (
    <Fragment>
      <div className="row bg-light w-100 m-0">
      </div>
      <Previous/>
      <div className="container h-100">
        <Map cityName={decodeURIComponent(document.location.pathname.replace("/","").split("&")[0])} lat={document.location.pathname.replace("/","").split("&")[1]} long={document.location.pathname.replace("/","").split("&")[2]} />
      </div>
    </Fragment>
  );
  
}

export default Result;
