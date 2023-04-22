/**
 * Show a list of videos for the admin to manage
 * 
 * Properties
 *   - videos  Video data to render inside list
 */

import React, {Component, Fragment} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeVideo : null
    };
  }
  
  toggleVideoDetails(video) {
    this.setState({
      activeVideo : video
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
                  <a href={video.url}>video.url</a>
                </Fragment>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
