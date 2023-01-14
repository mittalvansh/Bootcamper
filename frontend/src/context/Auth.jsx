import React, {useState} from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: null,
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;