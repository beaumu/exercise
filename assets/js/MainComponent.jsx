/**
 * Main component where visiters can see a list of videos
 */

import React, {Component, Fragment} from 'react';
import {Button} from 'react-bootstrap';
import VideoList from './VideoList';

export default class extends Component {
  render () {
    return (
      <Fragment>
        <h1 className="my-3">Watch these awesome videos</h1>
        <VideoList />
      </Fragment>
    );      
  }
}
