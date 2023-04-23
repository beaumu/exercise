/**
 * List of videos
 */

import React, {Component, Fragment} from 'react';
import {ListGroup, Button, Card, Row, Col} from 'react-bootstrap';
import ReviewModal from './ReviewModal';
import LikeButton from './LikeButton';

export default class extends Component {
  constructor(props) {
    super(props);

    // set up state
    this.state = {
      // List of videos from API to be shown
      videos : [],
      // Replace with video data from API to display modal dialog to enter
      // a review for that video. Set to null to hide review dialog.
      reviewVideo : null // video data shows modal
    };
  }

  componentDidMount() {
    fetch('/api/videos').then((response) => {
      return response.json();
    }).then((jsonData) => {
      this.setState({
        videos : jsonData
      });
    });
  }

  showReviewModal(video) {
    this.setState({
      reviewVideo : video
    });
  }

  hideReviewModal() {
    this.setState({
      reviewVideo : null
    });
  }

  render () {
    return (
      <Fragment>
        <ReviewModal
          video={this.state.reviewVideo}
          show={!!this.state.reviewVideo}
          onHide={this.hideReviewModal.bind(this)}
        />
        {this.state.videos.map((video) => {
          return (
            <Card key={video.id} className="my-5">
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Card.Text>{video.description}</Card.Text>
                <Row>
                  <Col>
                    <Button href={video.url}>Watch</Button>
                    <Button variant="link" onClick={() => {
                      this.showReviewModal(video);
                    }}>Write a review</Button>
                  </Col>
                  <Col className="col-auto">
                    <LikeButton video={video} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </Fragment>
    );
  }
}
