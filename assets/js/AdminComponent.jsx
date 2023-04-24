/**
 * Main Admin Component to manage videos as a administrator
 */

import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import AdminVideoList from './AdminVideoList';
import AdminVideoModal from './AdminVideoModal';

export default class extends Component {
  constructor(props) {
    super(props);

    // set up state
    this.state = {
      videos : [],
      showModal : false
    };
  }

  componentDidMount() {
    this.loadVideos().then((videos) => {
      this.setState({videos : videos});
    });
  }

  handleModalHide() {
    this.setState({
      showModal : false
    });
  }

  handleModalSubmit(data) {
    this.submitVideo(data).then(() => {
      return this.loadVideos();
    }).then((videos) => {
      this.setState({
        videos : videos,
        showModal : false
      });
    });
  }

  handleAddModal() {
    this.setState({
       showModal : true
    });
  }

  handleDeleteVideo(video) {
    if (confirm('Are you sure?')) {
      this.deleteVideo(video.id).then(() => {
        this.setState({videos: this.state.videos.filter((v) => {
          return v.id !== video.id;
        })});
      });
    }
  }

  submitVideo(data) {
    const params = new URLSearchParams();
    params.append('url', data.url);
    params.append('title', data.title);
    params.append('description', data.description);

    return fetch('/api/videos', {
      method: 'POST',
      body: params
    });
  }

  loadVideos() {
    return fetch('/api/videos').then((response) => {
      return response.json();
    });
  }

  deleteVideo(id) {
    const url = '/api/videos/' + encodeURIComponent(id);

    return fetch(url, {method: 'DELETE'}).then((response) => {
      return response.json();
    });
  }

  render () {
    return (
      <Fragment>
        <h1 className="my-3">Manage your awesome videos</h1>
        <div className="my-3 text-end">
          <Button onClick={this.handleAddModal.bind(this)}>+</Button>
        </div>
        <AdminVideoList
          videos={this.state.videos}
          onDelete={this.handleDeleteVideo.bind(this)}
        />
        <div className="my-3 text-end">
          <Button onClick={this.handleAddModal.bind(this)}>+</Button>
        </div>
        <AdminVideoModal
          show={this.state.showModal}
          onHide={this.handleModalHide.bind(this)}
          onSubmit={this.handleModalSubmit.bind(this)}
        />
      </Fragment>
    );      
  }
}
