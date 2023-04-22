/**
 * List of videos
 */

import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class extends Component {
  constructor(props) {
    super(props);

    // set up state
    this.state = {
      videos : []
    };
  }

  componentDidMount() {
    fetch('/api/video-links').then((response) => {
      return response.json();
    }).then((jsonData) => {
      this.setState({
        videos : jsonData
      });
    });
  }

  render () {
    return this.state.videos.map((video) => {
      return (
        <Card key={video.id} className="my-5">
          <Card.Body>
            <Card.Title>{video.title}</Card.Title>
            <Card.Text>{video.description}</Card.Text>
            <Button href={video.url}>Watch</Button>
          </Card.Body>
        </Card>
      );
    });
  }
}
