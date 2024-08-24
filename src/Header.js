import React, { Fragment } from 'react';
import SearchBoxHeader from './SearchBoxHeader';

function Header() {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light w-100 container">
                <div className="col-8 d-flex mr-auto ml-auto">
                    <a className="navbar-brand" href="/weather">Home</a>
                    <div className="collapse navbar-collapse">
                        <SearchBoxHeader size="tiny"/>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Header;