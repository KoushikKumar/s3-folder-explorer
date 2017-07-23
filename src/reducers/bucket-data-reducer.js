import { BUCKET_DATA } from '../actions/types';

export default function(state={foldersData:{}}, action) {
    switch(action.type){
        case BUCKET_DATA:
            return { ...state, foldersData:action.payload}
    }
    return state;
}