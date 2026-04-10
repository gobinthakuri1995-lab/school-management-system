import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { teams } from '../lib/appwrite';
import { 
  UserCog, 
  Search,
  Plus,
  MoreVertical,
  ShieldCheck,
  Filter
} from 'lucide-react';

export default function AdminPanel() {
    const { logout } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const roles = ['admin', 'accountant', 'teacher'];

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await teams.list();
                setMembers(response.teams);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mobile Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-6 md:p-8 rounded-[2rem]">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
                        <UserCog size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Access Control</h1>
                        <p className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Management Hub</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 opacity-30" size={16} />
                        <input type="text" placeholder="Search members..." className="bg-slate-900/50 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm w-full md:w-64 focus:outline-none" />
                    </div>
                    <button className="btn btn-primary btn-square rounded-xl shadow-lg shadow-indigo-600/20">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Role Stat Chips - Horizontal Scroll on Mobile */}
            <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
                {roles.map(r => (
                    <div key={r} className="glass-card flex items-center gap-3 px-6 py-3 rounded-full border-white/5 whitespace-nowrap active:scale-95 transition-all">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{r}s</span>
                        <span className="text-sm font-black text-white ml-2">--</span>
                    </div>
                ))}
            </div>

            {/* Mobile-First List / Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <UserCard 
                    name="Gobin Thakuri" 
                    email="gobinthakuri1995@gmail.com" 
                    role="Owner" 
                    initial="G"
                    isOwner
                />
                <UserCard 
                    name="Test Registration" 
                    email="new@example.com" 
                    role="Pending" 
                    initial="?"
                    isPending
                />
                {[1, 2, 3].map(i => (
                    <UserCard 
                        key={i}
                        name={`Staff Member ${i}`} 
                        email={`staff${i}@school.edu`} 
                        role={roles[i-1] || 'Teacher'} 
                        initial="S"
                    />
                ))}
            </div>
            
            <div className="p-10 text-center opacity-20 hidden md:block">
                <ShieldCheck size={120} className="mx-auto" />
                <p className="text-xs uppercase font-black tracking-[0.4em] mt-4">Administrative Core</p>
            </div>
        </div>
    );
}

const UserCard = ({ name, email, role, initial, isOwner = false, isPending = false }) => (
    <div className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-indigo-500/20 active:scale-[0.98] transition-all group relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
                <div className={`rounded-2xl w-12 h-12 shadow-lg font-black flex items-center justify-center ${isOwner ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {initial}
                </div>
                <div>
                    <h3 className="font-black text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
                    <p className="text-[10px] opacity-40 font-bold truncate max-w-[150px]">{email}</p>
                </div>
            </div>
            <button className="btn btn-ghost btn-circle btn-sm opacity-40 hover:opacity-100">
                <MoreVertical size={16} />
            </button>
        </div>

        <div className="mt-8 flex items-center justify-between relative z-10">
            <div className={`badge badge-lg py-4 px-5 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] border-none shadow-inner ${
                isOwner ? 'bg-indigo-600/20 text-indigo-400' : isPending ? 'bg-warning/10 text-warning' : 'bg-white/5 text-slate-400'
            }`}>
                {isPending && <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse mr-2"></span>}
                {role}
            </div>
            {!isOwner && (
                <button className="btn btn-ghost btn-sm text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-400/10">
                    Change Role
                </button>
            )}
        </div>

        {/* Decorative background icon */}
        <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
            <ShieldCheck size={80} />
        </div>
    </div>
);
