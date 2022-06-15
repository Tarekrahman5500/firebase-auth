import React, {createContext, useMemo} from 'react';
import useFireBase from "../Components/Hooks/UseFireBase";


export const AuthContext = createContext(null)
const AuthProvider = (props) => {

    const allContext = useFireBase()
    const memoizedValue = useMemo(() => (allContext), [allContext])
    return (
        <AuthContext.Provider value={memoizedValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;