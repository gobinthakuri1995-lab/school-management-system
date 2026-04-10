import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginWithGoogle } from '../lib/appwrite';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Login() {
    const [searchParams] = useSearchParams();
    const rawError = searchParams.get('error');
    
    let errorMessage = '';
    if (rawError) {
        try {
            const errorObj = JSON.parse(rawError);
            errorMessage = errorObj.message || 'Authentication failed.';
        } catch (e) {
            errorMessage = 'An unknown authentication error occurred.';
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 bg-[#0f172a]">
            {/* Immersive background - mobile-centric */}
            <div className="absolute top-[10%] left-[-20%] w-[100%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-20%] w-[100%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-sm mb-12 text-center relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-600/40 border border-white/20">
                    <ShieldCheck size={40} className="text-white" />
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                    School<span className="text-indigo-400">Way</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Management Excellence</p>
            </div>

            <div className="glass-card w-full max-w-md rounded-[2.5rem] p-8 md:p-10 relative z-10 animate-in zoom-in-95 duration-700">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 text-sm font-medium mb-10">Access your school dashboard via Google.</p>
                    
                    {errorMessage && (
                        <div className="bg-error/10 border border-error/20 text-error-content text-[11px] p-5 rounded-2xl mb-8 flex items-start gap-3 text-left w-full backdrop-blur-sm animate-in shake-in-from-left duration-300">
                            <AlertTriangle size={20} className="shrink-0 text-error" />
                            <span>
                                <strong className="block text-error uppercase font-black tracking-widest mb-1">Auth Error</strong>
                                <span className="opacity-90 font-semibold">{errorMessage}</span>
                            </span>
                        </div>
                    )}

                    <div className="w-full space-y-4">
                        <button 
                            className="btn btn-primary btn-lg w-full rounded-2xl flex gap-4 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all py-8"
                            onClick={loginWithGoogle}
                        >
                            <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                            <span className="font-black text-sm uppercase tracking-widest">Sign in with Google</span>
                        </button>
                        
                        <p className="text-[10px] text-slate-500 mt-10 px-6 font-bold uppercase tracking-wider leading-relaxed">
                            Secured by Google Identity. <br/>
                            Private & Encrypted Session.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center text-[9px] uppercase tracking-[0.5em] font-black text-slate-700 z-10 px-10">
                © 2026 Admin Management Pro • Infrastructure by Appwrite
            </div>
        </div>
    );
}
