// withAuth.tsx

import React from 'react';
import { redirect } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const withAuth = (WrappedComponent: React.FC) => {
    return () => {
        if (isAuthenticated()) {
            return <WrappedComponent />;
        } else {
            return redirect('login');
        }
    };
};

export default withAuth;
