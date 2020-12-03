import React, { Fragment } from 'react';
import SearchBox from './SearchBox';
import './App.css';

function Search() {
  return (
    <Fragment>
      <div className="bg-image"></div>
      <div className="container h-100">
        <div className="row align-items-center h-90">
          <div className="col-10 mx-auto">
            <p className="h2 text-center text-white"><strong>Check how the weather looks like<br/>in the rest of the world</strong></p>
            <p className="lead text-center text-white mb-5">This is a collection of data about temperatures and precipitations, that has been<br/>recorded in the last 30 years, around the world.</p>
            <SearchBox/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Search;
