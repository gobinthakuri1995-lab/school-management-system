import { useAuth } from '../context/AuthContext';

export default function Unauthorized() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-[500px] bg-base-100 shadow-2xl">
                <div className="card-body items-center text-center py-12">
                    <div className="text-9xl mb-4">⏳</div>
                    <h2 className="card-title text-3xl font-bold text-warning">Access Pending</h2>
                    <p className="mt-4 text-lg">
                        Welcome, <span className="font-bold">{user?.name}</span>!
                    </p>
                    <p className="opacity-70 mt-2">
                        Your account has been created, but you don't have a role assigned yet. 
                        Please contact the school **Owner** to assign you a role (Admin, Teacher, or Accountant).
                    </p>
                    <div className="card-actions mt-8">
                        <button className="btn btn-outline" onClick={logout}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
