import React, {Fragment} from 'react';
import ReactDom from 'react-dom';
import {createRoot} from "react-dom/client";

const App = () => {
    return (
        <Fragment>
            <h1>Here starts your app</h1>
            <p>Please read the readme.md file in root</p>
        </Fragment>
    )
}

const container: any = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)