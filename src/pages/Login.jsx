import { useAuth } from '../context/AuthContext';
import { loginWithGoogle } from '../lib/appwrite';

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl border-t-8 border-primary">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-3xl font-bold mb-4">School System</h2>
                    <p className="mb-6 opacity-70">Please sign in with your Google account to access the school management system.</p>
                    <div className="card-actions">
                        <button 
                            className="btn btn-primary btn-lg flex gap-2"
                            onClick={loginWithGoogle}
                        >
                            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
