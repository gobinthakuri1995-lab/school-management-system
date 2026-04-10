import { useAuth } from '../context/AuthContext';
import { Clock, LogOut, ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#0f172a]">
             {/* Animated Decorative Blobs */}
             <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>

            <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-12 text-center relative z-10 border-indigo-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="relative inline-block mb-10">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30 animate-pulse">
                        <Clock size={48} className="text-indigo-400" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-warning flex items-center justify-center border-4 border-[#0f172a] shadow-lg">
                        <ShieldAlert size={14} className="text-warning-content" />
                    </div>
                </div>

                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Access Pending</h1>
                <p className="text-lg font-medium text-slate-300">Welcome, <span className="text-indigo-400">{user?.name}</span></p>
                
                <div className="bg-slate-900/50 rounded-2xl p-6 mt-8 mb-10 border border-white/5 text-left space-y-4">
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        Your account has been successfully created via Google Auth, but you currently lack a system role.
                    </p>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-400/5 border border-indigo-500/10">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Waiting for Administrator Assignment</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="text-xs text-slate-500 italic mb-2">Please contact the school **Owner** to activate your account.</div>
                    <button 
                        className="btn btn-ghost hover:bg-white/5 rounded-2xl gap-3 text-slate-400 hover:text-white transition-all font-bold"
                        onClick={logout}
                    >
                        <LogOut size={18} /> Sign Out of Session
                    </button>
                </div>
            </div>

            <div className="absolute bottom-8 text-center text-[10px] uppercase tracking-[0.3em] font-black text-slate-600">
                SchoolWay Management Systems • 2026 PRO
            </div>
        </div>
    );
}
