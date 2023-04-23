/**
 * ReviewModal renders a modal dialog where you can enter your review data
 * for a video to be submitted to database
 * 
 * Properties
 *   - video     Video to write review for
 *   - show      Show/hide modal
 *   - onHide    Hide event handler
 */

import React, {Component} from 'react';
import {Modal, Row, Form, Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating : 0
    };
  }
  
  setRating(rating) {
    this.setState({
      rating : rating
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const url = '/api/videos/' + encodeURIComponent(this.props.video.id)
      + '/reviews';
    const params = new URLSearchParams();
    params.append('video', this.props.video.id);
    params.append('author', data.get('author'));
    params.append('rating', data.get('rating'));
    params.append('comments', data.get('comments'));

    fetch(url, {
      method: 'POST',
      body: params
    }).then((result) => {
      alert('Thank you for your review');
      this.props.onHide();
    });
  }

  render () {
    const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Write a review
              {(this.props.video && (' for "' + this.props.video.title + '"'))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Group className="mb-3" controlId="videoUrl">
                <Form.Label>Author*</Form.Label>
                <Form.Control type="text" name="author" required={true}
                  placeholder="Enter your name" maxLength={255}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="videoTitle">
                <Form.Label>Rating*</Form.Label>
                <Row>
                  <ToggleButtonGroup type="radio" name="rating"
                    value={this.state.rating} onChange={(value) => {
                      this.setState({rating : value});
                    }}
                  >
                    {ratings.map((rating) => {
                      return (
                        <ToggleButton key={rating} id={'reviewrating' + rating}
                          value={rating} variant="outline-primary"
                        >{rating}</ToggleButton>
                      );
                    })}
                </ToggleButtonGroup>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="videoDescription">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" name="comments" />
                <Form.Text muted>* Required</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
      </Modal>
    );      
  }
}
