import { createContext, useContext, useEffect, useState } from 'react';
import { account, teams } from '../lib/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        try {
            const session = await account.get();
            setUser(session);
            
            // Fetch teams to determine role
            const userTeams = await teams.list();
            // Expected team names: owner, admin, accountant, teacher
            const availableRoles = ['owner', 'admin', 'accountant', 'teacher'];
            const assignedRole = userTeams.teams.find(t => availableRoles.includes(t.name))?.name;
            
            setRole(assignedRole || 'unauthorized');
        } catch (error) {
            setUser(null);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const logout = async () => {
        await account.deleteSession('current');
        setUser(null);
        setRole(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
