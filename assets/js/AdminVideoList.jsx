/**
 * Show a list of videos for the admin to manage
 * 
 * Properties
 *   - videos  Video data to render inside list
 */

import React, {Component, Fragment} from 'react';
import {Row, Col, Button, ListGroup, Container, Card, Badge} from 'react-bootstrap';

export default class extends Component {
  constructor(props) {
    super(props);

    // cached list of reviews for videos
    this.reviews = [];

    this.state = {
      // active video data, loaded from API
      activeVideo : null,
      activeReviews : [],
      showReviews : false
    };
  }

  async toggleVideoDetails(video) {
    if (this.state.activeVideo && this.state.activeVideo.id === video.id) {
      // collapse current video details
      this.setState({
        activeVideo : null,
        activeReviews : [],
        showReviews : false
      });
    } else {
      // check if reviews for video are already cached and load reviews in cache
      // if not loaded already
      if (!this.reviews[video.id]) {
        const url = '/api/videos/' + encodeURIComponent(video.id) + '/reviews';

        this.reviews[video.id] = await fetch(url).then((response) => {
          return response.json();
        });
      }

      // expand video details
      this.setState({
        activeVideo : video,
        activeReviews : this.reviews[video.id],
        showReviews : false
      });
    }
  }

  toggleReviews() {
    this.setState({
      showReviews : !this.state.showReviews
    });
  }

  render () {
    return (
      <ListGroup>
        {this.props.videos.map((video) => {
          return (
            <ListGroup.Item key={video.id} action onClick={() => {
              this.toggleVideoDetails(video);
            }}>
              <div className="fw-bold">{video.title}</div>
              {this.state.activeVideo && (this.state.activeVideo.id == video.id) && (
                <Fragment>
                  <p>{video.description}</p>
                  <Row>
                    <Col><a href={video.url}>{video.url}</a></Col>
                    <Col className="col-auto">
                      {this.state.activeReviews.length && (
                        <Button href="#" variant="link" onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          this.toggleReviews();
                        }}>
                          see reviews
                          <Badge className="ms-1">
                            {this.state.activeReviews.length}
                          </Badge>
                        </Button>
                      ) || 'no reviews'}
                    </Col>
                  </Row>
                  {this.state.showReviews && (
                    <Container>
                      <Row>
                        {this.state.activeReviews.map((review) => {
                          return (
                            <Col key={review.id} md="4" className="my-3">
                              <Card>
                                <Card.Body>
                                  <Card.Title>{review.author}</Card.Title>
                                  <Card.Text>{review.comments}</Card.Text>
                                  <Card.Text>
                                    <strong>Rating:</strong> {review.rating}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  )}
                </Fragment>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
