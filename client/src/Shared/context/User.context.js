import React, {useState} from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        isAuthenticated: false
    })

    if(!user.isAuthenticated){
        fetch('/user/')
        .then(async ans =>{
            if(ans.status === 200){
                let json = await ans.json();
                setUser({
                    ...json,
                    isAuthenticated: true
                });
            }
        });
    }
    
    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}