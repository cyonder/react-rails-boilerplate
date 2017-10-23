import React from 'react';

import Header from '../Header';

const AppLayout = (props) => {
    return(
        <div>
            <Header />
            { props.children }
        </div>
    )
}

export default AppLayout;
