import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';

export default function Dashboard() {
    const { user, role, logout } = useAuth();

    const stats = [
        { label: 'Total Students', value: '1,240', icon: Users, color: 'text-primary' },
        { label: 'Classes Today', value: '42', icon: BookOpen, color: 'text-secondary' },
        { label: 'Pending Fees', value: '$3,200', icon: CreditCard, color: 'text-accent' },
    ];

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar */}
            <aside className="w-64 bg-base-100 shadow-xl hidden md:flex flex-col">
                <div className="p-6 text-2xl font-bold text-primary flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center">S</div>
                    SchoolWay
                </div>
                
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-content font-medium">
                        <LayoutDashboard size={20} /> Dashboard
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors">
                        <Users size={20} /> Students
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors">
                        <BookOpen size={20} /> Academics
                    </a>
                    {role === 'owner' || role === 'admin' ? (
                        <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors">
                            <Settings size={20} /> Administration
                        </a>
                    ) : null}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-base-200">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span>{user?.name?.[0]}</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.name}</p>
                            <p className="text-xs opacity-60 uppercase">{role}</p>
                        </div>
                        <button onClick={logout} className="p-1 hover:text-error transition-colors">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="navbar bg-base-100 shadow-sm px-6">
                    <div className="flex-1">
                        <div className="form-control hidden sm:block">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 opacity-40" size={18} />
                                <input type="text" placeholder="Search anything..." className="input input-bordered pl-10 h-10 w-64" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-none gap-4">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <Bell size={20} />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black">Hello, {user?.name.split(' ')[0]} 👋</h1>
                        <p className="opacity-60 mt-2">Here is what's happening in your school today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="card bg-base-100 shadow-sm border border-base-300">
                                <div className="card-body flex-row items-center gap-6">
                                    <div className={`p-4 rounded-2xl bg-base-200 ${stat.color}`}>
                                        <stat.icon size={32} />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-60 font-medium">{stat.label}</p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Placeholder for Recent Activity */}
                        <div className="card bg-base-100 shadow-sm border border-base-300">
                            <div className="card-body">
                                <h3 className="text-lg font-bold mb-4">Recent Registrations</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-base-200">
                                            <div className="avatar placeholder">
                                                <div className="bg-primary text-primary-content rounded-lg w-10">
                                                    <span>S</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold">Student Name {i}</p>
                                                <p className="text-xs opacity-60">Grade {10+i} • Applied 2h ago</p>
                                            </div>
                                            <div className="badge badge-ghost">Pending</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card bg-primary text-primary-content shadow-lg">
                            <div className="card-body">
                                <h3 className="text-lg font-bold">Quick Actions</h3>
                                <p className="opacity-80">Frequently used administrative tasks.</p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <button className="btn btn-neutral btn-sm">Add Student</button>
                                    <button className="btn btn-neutral btn-sm">Take Attendance</button>
                                    <button className="btn btn-neutral btn-sm">Generate Report</button>
                                    <button className="btn btn-neutral btn-sm">Mark Fee Paid</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
