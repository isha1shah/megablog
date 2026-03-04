import { useState, useEffect } from 'react';
import { account } from '../lib/appwrite';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await account.get();
                setUser(userData);
            } catch (error) {
                console.log('No active session found.',error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    return { user, loading };
};