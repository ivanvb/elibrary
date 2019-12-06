import React from 'react';

const UserProfile = ({user}) => {
    return (
        <div>
            <h1>Perfil</h1>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
        </div>
    );
};

export default UserProfile;