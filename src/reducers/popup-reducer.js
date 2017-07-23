import { CLOSE_POPUP, OPEN_FILE } from '../actions/types';

export default function(state={isPopupOpened:false, fileContent: ""}, action){
    switch(action.type){
        case CLOSE_POPUP:
            return {...state, isPopupOpened:false};
        case OPEN_FILE:
            return {...state, isPopupOpened:true, fileContent: action.payload};
    }
    return state;
}