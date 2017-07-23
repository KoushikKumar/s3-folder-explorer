import axios from 'axios';
import { BUCKET_DATA, CLOSE_POPUP, OPEN_FILE } from './types';
import { BUCKET_DATA_URI } from './uris';
import Folder from '../components/folder';

export function fetchBucketData() {
    return function(dispatch){
        axios.get(BUCKET_DATA_URI)
            .then(response => {
                const xmlData = ( new window.DOMParser() ).parseFromString(response.data, "text/xml");
                const bucketName = xmlData.documentElement.getElementsByTagName("Name")[0].innerHTML
                const nodeList = xmlData.documentElement.getElementsByTagName("Contents");
                const bucket = new Folder(bucketName, [], "");
                for(var i = 0; i<nodeList.length;i++) {
                    bucket.addChildren(nodeList[i].getElementsByTagName("Key")[0].innerHTML);
                }
                return dispatch({
                    type:BUCKET_DATA,
                    payload: bucket
                })
            })
    }
}

export function closePopup() {
    return {
        type: CLOSE_POPUP
    }
}

export function openFile(filePath) {
    return function(dispatch) {
        axios.get(`${BUCKET_DATA_URI}/${filePath}`)
            .then(response => {
                return dispatch({
                    type: OPEN_FILE,
                    payload: response.data
                })
            })
    }
}