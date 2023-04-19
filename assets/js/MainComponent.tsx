import React, {Fragment} from 'react';

interface propMapping {
    controllerName: string
}

const MainComponent = ({controllerName}: propMapping) => {

    return (
        <Fragment>
            <h1>Here starts your app</h1>
            <p>This is called from this controller: {controllerName}</p>
            <p>Please read the readme.md file in root</p>
            <p>Change the colors in the ./assets/styles/app.scss </p>
        </Fragment>
    );
}

export default MainComponent