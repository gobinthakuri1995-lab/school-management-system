import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
    const { user, role } = useAuth();

    const stats = [
        { label: 'Total Students', value: '1,240', icon: Users, color: 'text-indigo-400', trend: '+12%' },
        { label: 'Classes Today', value: '42', icon: BookOpen, color: 'text-purple-400', trend: '+5%' },
        { label: 'Collection', value: '$12.4k', icon: CreditCard, color: 'text-emerald-400', trend: '+8%' },
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mobile-Friendly Hero Section */}
            <div className="mb-2">
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Hello, <span className="text-gradient">{user?.name?.split(' ')[0]}</span> 👋
                </h1>
                <p className="text-slate-400 mt-2 font-semibold">Ready for today's session?</p>
            </div>

            {/* Horizontal Scroll Stats for Mobile, Grid for Desktop */}
            <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3 md:overflow-visible no-scrollbar">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass-card min-w-[280px] md:min-w-0 p-6 rounded-3xl group border-white/5 hover:border-indigo-500/30 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} shadow-inner`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase">
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                        <div className="flex items-end gap-2 mt-1">
                            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                            <TrendingUp size={16} className="text-emerald-400 mb-2" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Mobile-First Activity List */}
                <div className="xl:col-span-2 glass-card rounded-[2rem] p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                        <button className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">See All</button>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex items-center gap-4 md:gap-6 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/5 transition-all group border border-transparent hover:border-white/5 active:scale-95">
                                <div className="avatar placeholder">
                                    <div className="bg-slate-800 text-indigo-400 rounded-xl w-12 h-12 shadow-inner font-bold">
                                        {i % 2 === 0 ? 'S' : 'T'}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white truncate text-sm md:text-base group-hover:text-indigo-400 transition-colors">Transaction #{1024 + i}</h4>
                                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase truncate">Monthly Fees Paid • 15m ago</p>
                                </div>
                                <div className="text-right whitespace-nowrap">
                                    <p className="font-black text-white text-sm">+$250</p>
                                    <p className="text-[9px] text-emerald-400 font-black uppercase">Paid</p>
                                </div>
                                <ChevronRight className="text-slate-600 hidden sm:block group-hover:translate-x-1 transition-transform" size={18} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Quick Action Buttons (Large) */}
                <div className="space-y-6">
                    <div className="glass-card rounded-[2.5rem] p-8 bg-gradient-to-br from-indigo-600/10 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-2">Quick Actions</h3>
                        <p className="text-xs text-slate-400 mb-8 font-medium italic">Easily manage daily records.</p>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <MobileActionBtn label="Add Student" />
                            <MobileActionBtn label="Mark Attendance" />
                            <MobileActionBtn label="Check Finances" />
                            <MobileActionBtn label="Message Staff" variant="outline" />
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-indigo-600 shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="badge badge-sm bg-white/20 text-white font-black border-none mb-2">NEW</div>
                            <h4 className="text-xl font-black text-white leading-tight">Smart Grading<br/>Assistant</h4>
                            <p className="text-indigo-100/60 text-xs mt-2 font-medium">Explore AI-driven tools.</p>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform">
                            <BookOpen size={140} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MobileActionBtn = ({ label, variant = "solid" }) => (
    <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
        variant === "solid" 
        ? "bg-slate-800 hover:bg-slate-700 text-white shadow-xl" 
        : "border-2 border-slate-800 text-slate-400"
    }`}>
        {label}
    </button>
);
