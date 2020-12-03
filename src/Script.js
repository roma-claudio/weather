import React, { Fragment } from 'react';

function ChartJS() {
    return (
        <Fragment>
           <script type="text/javascript" src="/node_modules/chart.js/dist/Chart.js"></script>
        </Fragment>
    );
}

function FontAwesome() {
    return (
        <Fragment>
           <script src="https://kit.fontawesome.com/e799faf1eb.js" crossOrigin="anonymous"></script>
        </Fragment>
    );
}


export {ChartJS, FontAwesome};