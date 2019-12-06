import React, {useContext} from 'react';
import {UserContext} from '../Shared/context/User.context';

const UserProfile = () => {
    const [user] = useContext(UserContext);
    return (
        <div>
            <h1>Perfil</h1>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
        </div>
    );
};

export default UserProfile;