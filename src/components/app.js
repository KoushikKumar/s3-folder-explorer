import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from './file';
import Folders from './folders';

class App extends Component {
  render() {
    const { isPopupOpened } = this.props;
    return (
      <div>
        {isPopupOpened && <File />}
        <Folders />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPopupOpened: state.file.isPopupOpened
  }
}

export default connect(mapStateToProps)(App);
