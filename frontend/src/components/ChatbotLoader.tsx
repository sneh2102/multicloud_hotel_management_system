import React, { useEffect } from 'react';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import UserPool from '../utils/UserPool';

const ChatbotLoader: React.FC = () => {
    useEffect(() => {

        const currentUser: CognitoUser | null = UserPool.getCurrentUser();
        // console.log(currentUser);

        if (currentUser) {
            currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                // console.log(session);
                if (err) {
                    console.error('Session error:', err);
                    localStorage.setItem('isAuthenticated', 'false');
                } else if (session && session.isValid()) {
                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    localStorage.setItem('isAuthenticated', 'false');
                }
            });
        } else {
            localStorage.setItem('isAuthenticated', 'false');
        }
    }, []);

    return null;
};

export default ChatbotLoader;
