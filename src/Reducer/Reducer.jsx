
export const initialValue = {
    _id : '',
    email:'',
}

export const reducer = (state , action) =>{
        const {type,payload} = action;
        switch(type){
            case 'USER_LOGIN':{
                return{
                    email: payload.email,
                    _id: payload._id
                }
            }
            default:
                return state
        }

}