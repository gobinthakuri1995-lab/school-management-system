import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { teams, account } from '../lib/appwrite';
import { Users, ShieldCheck, UserCog, LogOut } from 'lucide-react';

export default function AdminPanel() {
    const { logout } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const roles = ['admin', 'accountant', 'teacher'];

    const fetchMembers = async () => {
        try {
            // In a real app, we'd list all users. 
            // For now, let's list the memberships of the 'owner' team as a placeholder or list teams.
            const response = await teams.list();
            setMembers(response.teams);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="navbar bg-base-100 shadow-md px-8">
                <div className="flex-1">
                    <a className="text-xl font-bold flex gap-2 items-center">
                        <ShieldCheck className="text-primary" /> Admin Panel
                    </a>
                </div>
                <div className="flex-none">
                    <button className="btn btn-ghost btn-circle" onClick={logout}>
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 p-10 bg-base-200 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="stat bg-base-100 rounded-box shadow">
                            <div className="stat-title">System Status</div>
                            <div className="stat-value text-success text-2xl">Healthy</div>
                            <div className="stat-desc">All services online</div>
                        </div>
                        {roles.map(r => (
                            <div key={r} className="stat bg-base-100 rounded-box shadow">
                                <div className="stat-title uppercase">{r}s</div>
                                <div className="stat-value text-2xl">--</div>
                                <div className="stat-desc">Active members</div>
                            </div>
                        ))}
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-6 flex gap-2">
                                <UserCog className="text-primary" /> Manage User Roles
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Current Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>User Registration Simulation</td>
                                            <td>newuser@example.com</td>
                                            <td><div className="badge badge-warning">Pending</div></td>
                                            <td>
                                                <select className="select select-bordered select-sm w-full max-w-xs" defaultValue="">
                                                    <option disabled value="">Assign Role</option>
                                                    {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
