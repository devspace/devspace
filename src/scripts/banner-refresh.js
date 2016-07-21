import React from 'react';

class BannerRefresh extends React.Component {
  constructor() {
    super();

    this.state = {
      hasUpdates: undefined
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.hasUpdates !== this.state.hasUpdates;
  }

  componentWillMount() {
    let self = this;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').then(function(reg) {
        reg.onupdatefound = function() {
          let installingWorker = reg.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  self.setState({
                    hasUpdates: true
                  });
                } else {
                  // Content is now available offline!
                }
                break;
              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }
          };
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
    }
  }

  handleRefresh() {
    window.location.reload();
  }

  render() {
    if (this.state.hasUpdates) {
      return (
        <div className="banner banner-refresh Alert--info">
          <span className="octicon octicon-heart"></span> <strong>New version is available.</strong> Would you like to update now?
          <div className="banner-buttons">
            <button className="Button Button--sm Button--primary" onClick={this.handleRefresh.bind(this)}>Get the New Version</button>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default BannerRefresh;