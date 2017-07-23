import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../actions';

class File extends Component {

    closePopup() {
        this.props.closePopup();
    }

    render() {
        return (
            <div className="file-container">
                <div className="file-content-header">
                    <div onClick={() => {this.closePopup()}} className="file-content-close">&times;</div>
                </div>
                <div className="file-content-body">
                    <div className="file-content">
                        {this.props.fileContent}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fileContent: state.file.fileContent
    }
}

export default connect(mapStateToProps, { closePopup })(File);