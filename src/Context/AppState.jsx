/* eslint-disable react/prop-types */
import { reducer, initialValue } from '../Reducer/Reducer'
import AppContext from "./AppContext";
import { useReducer, useEffect } from "react";

const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const value = {
        user: state,
        userLogin: (User) => {
            dispatch({ type: 'USER_LOGIN', payload: User })
        }

    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state));
    }, [state])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppState;