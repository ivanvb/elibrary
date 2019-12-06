import React, {useState} from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        isAuthenticated: false
    })

    console.log(user);
    if(!user.isAuthenticated){
        fetch('/user/')
        .then(async ans =>{
            if(ans.status === 200){
                let json = await ans.json();
                console.log(json)
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