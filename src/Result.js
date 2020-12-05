import React, { Fragment } from 'react';
import Data from './Data.js';
import Previous from './Previous';

function Result (props) {
  return (
    <Fragment>
      <Previous/>
      <div className="container h-100">
        <Data cityName={decodeURIComponent(document.location.pathname.replace("/","").split("&")[0])} lat={document.location.pathname.replace("/","").split("&")[1]} long={document.location.pathname.replace("/","").split("&")[2]} />
      </div>
    </Fragment>
  );
}

export default Result;
