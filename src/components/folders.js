import  React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBucketData, openFile } from '../actions';

class Folders extends Component {
    constructor(props){
        super(props);
        this.state = {foldersData: {}};
    }

    componentWillMount() {
        this.props.fetchBucketData();
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.foldersData)!==(JSON.stringify(this.state.foldersData))) {
            this.setState({foldersData: nextProps.foldersData});
        }
    }

    changeFolderState(e, childPath) {
        e.stopPropagation();
        if(childPath.endsWith("/")) {
            this.setState({foldersData: this.state.foldersData.changeFolderState(childPath)});
        } else {
            this.props.openFile(childPath);
        }
    }

    renderIcons(isOpen, path) {
        if (path.endsWith("/")){
            const caretIcon = isOpen ? "fa fa-caret-down" : "fa fa-caret-right";
            const folderIcon =  isOpen ? "fa fa-folder-open-o" : "fa fa-folder-o";
            return (
                <div className="fa-icons">
                    <i className={caretIcon} aria-hidden="true"></i>
                    <i className={folderIcon} aria-hidden="true"></i>
                </div>
            );
        } else {
            return (
                <div className="fa-icons">
                    <i className="fa fa-file-o" aria-hidden="true"></i>
                </div>
            )
        }
    }

    renderSubFolders(children, isOpen) {
        if(isOpen) {
            return children.map(child => {
                return (
                    <div onClick={(e)=>{this.changeFolderState(e, child.path)}} className="folder" key={child.path}>
                        {this.renderIcons(child.isOpen, child.path)}
                        <label>{child.content}</label>
                        {this.renderSubFolders(child.children, child.isOpen)}
                    </div>
                )
            });
        }
    }

    render() {
        if(this.state.foldersData.content) {
            return (
                <div className="folders">
                    {this.renderSubFolders(this.state.foldersData.children, true)}
                </div>
            )
        }
        return false;
    }
}

function mapStateToProps(state){
    return {
        foldersData: state.bucketData.foldersData
    }
}

export default connect(mapStateToProps, { fetchBucketData, openFile })(Folders);
