import React from 'react';
import Map from './Map.js';

function Result (props) {
  console.log(document.location.pathname);
  return (
    <div className="container h-100">
      <Map cityName={decodeURIComponent(document.location.pathname.replace("/","").split("&")[0])} lat={document.location.pathname.replace("/","").split("&")[1]} long={document.location.pathname.replace("/","").split("&")[2]} />
    </div>
  );
  
}

export default Result;
