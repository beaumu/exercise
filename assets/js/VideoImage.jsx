/**
 * Renders image with video thumbnail
 * 
 * Properties
 *   - video  Video data from API
 *   - className
 *
 * Only Youtube video URLs are supported a.t.m.
 */

import React, {Component} from 'react';

export default class extends Component {
  getImageUrl() {
    if (this.props.video && this.props.video.url) {
      const url = new URL(this.props.video.url);

      switch (url.hostname) {
        case 'www.youtube.com':
          if (url.searchParams.get('v')) {
            return 'https://img.youtube.com/vi/' +
              encodeURIComponent(url.searchParams.get('v')) +
              '/mqdefault.jpg';
          }
          break;
        case 'youtu.be':
          if ('/' !== url.pathname) {
            return 'https://img.youtube.com/vi' + url.pathname +
              '/mqdefault.jpg';
          }
          break;
      }
    }
  }

  render() {
    const url = this.getImageUrl();

    return url && <img src={url} className={this.props.className} />;
  }
}
