

const initialState = {
    id: '',
    username: '',
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user) {
    return{
        type: UPDATE_USER,
        payload: user
    }
}


export default function reducer (state=initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return Object.assign({}, state, {username: action.payload, profile_pic: action.payload, id: action.payload})
        default:
            return state
    }
}