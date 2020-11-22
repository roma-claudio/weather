import React, { Fragment } from 'react';
import SearchBox from './Component';
import './App.css';

function Search() {
  return (
    <Fragment>
      <div className="bg-image">
        <div className="container h-100 z-1">
          <div className="row align-items-center h-100">
            <div className="col-10 mx-auto">
              <SearchBox/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Search;
