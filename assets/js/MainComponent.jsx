import React, {Component, Fragment} from 'react';
import {Button} from 'react-bootstrap';

export default class extends Component {
  render () {
    return (
      <Fragment>
            <h1>Here starts your app</h1>
            <p>This is called from this controller: {controllerName}</p>
            <p>Please read the readme.md file in root</p>
            <p>Change the colors in the ./assets/styles/app.scss </p>
      </Fragment>
    );      
  }
}
