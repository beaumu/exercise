/**
 * AdminVideoModal renders a modal dialog where you can enter your video data
 * to be submitted to database
 * 
 * Properties
 *   - show      Show/hide modal
 *   - onHide    Hide event handler
 *   - onSubmit  Handle video submit
 */

import React, {Component} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

export default class extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    
    this.props.onSubmit({
      url : data.get('url'),
      title : data.get('title'),
      description : data.get('description')
    });
  }

  render () {
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Group className="mb-3" controlId="videoUrl">
                <Form.Label>URL*</Form.Label>
                <Form.Control type="url" name="url" required={true}
                  placeholder="Enter Video URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="videoTitle">
                <Form.Label>Title*</Form.Label>
                <Form.Control type="text" name="title" required={true}
                  placeholder="Enter Video Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="videoDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" />
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
