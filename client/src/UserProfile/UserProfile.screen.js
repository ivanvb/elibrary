import React, {useContext} from 'react';
import {UserContext} from '../Shared/context/User.context';

const UserProfile = () => {
    const [user] = useContext(UserContext);
    return (
        <div>
            <h1>Perfil</h1>
            <p className="lead">name: {user.name}
                {user.admin &&
                <span className="ml-2 badge badge-primary">eAdmin</span>}</p>
            <p className="lead">email: {user.email}</p>
        </div>
    );
};

export default UserProfile;