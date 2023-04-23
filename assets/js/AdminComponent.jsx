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
    return new Promise((resolve, reject) => {
      fetch('/api/videos').then((response) => {
        return response.json();
      }).then((jsonData) => {
        resolve(jsonData);
      }).catch(() => {
        reject();
      });
    });
  }

  render () {
    return (
      <Fragment>
        <h1 className="my-3">Manage your awesome videos</h1>
        <div className="my-3 text-end">
          <Button onClick={this.handleAddModal.bind(this)}>+</Button>
        </div>
        <AdminVideoList videos={this.state.videos} />
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
