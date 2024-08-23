import React, { Fragment } from 'react';
import Data from './Data.js';
import Previous from './Previous';

function Result (props) {
  return (
    <Fragment>
      <Previous/>
      <div className="container h-100">
        <Data />
      </div>
    </Fragment>
  );
}

export default Result;
