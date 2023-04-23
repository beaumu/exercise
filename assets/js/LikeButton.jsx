/**
 * LikeButton renders a button where you can like/dislike a video
 * 
 * Properties
 *   - video Video to like/dislike
 */

import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked : props.video.liked
    };
  }

  toggleLike() {
    event.preventDefault();

    const url = '/api/videos/' + encodeURIComponent(this.props.video.id)
      + '/liked';
    const params = new URLSearchParams();
    params.append('liked', (this.state.liked ? 0 : 1));

    fetch(url, {
      method: 'POST',
      body: params
    }).then((result) => {
      return result.json();
    }).then((data) => {
      this.setState({liked : data});
    });
  }

  render() {
    return (
      <Button variant={(this.state.liked ? 'primary' : 'outline-primary')} 
        onClick={() => {
          this.toggleLike();
        }
      }>
        <i className={this.state.liked ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-up'}>
          <span className="visually-hidden">thumb up</span>
        </i>
      </Button>
    );
  }
}
