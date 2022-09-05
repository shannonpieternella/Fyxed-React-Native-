import * as Popup from '../constants/popup.constants';

const initialState = {
    stadSearch: 'hoi2',
   
    
    
}

const Popupreducer = (state = initialState, action) => {
    switch (action.type) {
        
                
                    case Popup.STAD_FILTER:
                    return {
                        ...state,
                        visiblemodal: action.payload,
                       
                    } 
            default:
                return state;
    };
}

export default Popupreducer;