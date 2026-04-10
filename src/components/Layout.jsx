import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';

export default function Layout() {
    const { user, role, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/', roles: ['owner', 'admin', 'accountant', 'teacher'] },
        { icon: Users, label: 'Students', path: '/students', roles: ['owner', 'admin', 'teacher'] },
        { icon: CreditCard, label: 'Finance', path: '/finance', roles: ['owner', 'accountant'] },
        { icon: Settings, label: 'Admin', path: '/admin', roles: ['owner', 'admin'] },
    ];

    const filteredNav = navItems.filter(item => item.roles.includes(role));

    const closeDrawer = () => {
        const drawerCheckbox = document.getElementById('app-drawer');
        if (drawerCheckbox) drawerCheckbox.checked = false;
    };

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-[#0f172a] text-slate-200">
            <input id="app-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* Drawer Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <header className="navbar glass-effect sticky top-0 z-40 px-4 lg:px-8 border-b border-white/5">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="app-drawer" aria-label="open sidebar" className="btn btn-ghost btn-square">
                            <Menu size={24} />
                        </label>
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 lg:ml-0 ml-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">S</div>
                            <span className="text-xl font-bold tracking-tight text-white">SchoolWay</span>
                            <div className="badge badge-primary badge-outline text-[10px] font-black uppercase ml-2 hidden sm:inline-flex">{role}</div>
                        </div>
                    </div>

                    <div className="flex-none gap-2">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <Bell size={20} />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
                                <div className="bg-slate-800 text-white rounded-xl w-10 border border-white/10">
                                    <span className="text-sm font-bold">{user?.name?.[0]}</span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content glass-effect rounded-2xl w-52 border border-white/5">
                                <li><a className="font-medium p-3">Profile Settings</a></li>
                                <li><a onClick={logout} className="text-error font-bold p-3">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 pb-24 lg:pb-8 lg:p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>

                {/* Mobile Bottom Navigation (Optional but kept for thumb ergonomics) */}
                <div className="btm-nav btm-nav-md lg:hidden glass-effect border-t border-white/5 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    {filteredNav.slice(0, 4).map(item => (
                        <NavLink 
                            key={item.path} 
                            to={item.path}
                            className={({ isActive }) => `
                                flex flex-col items-center justify-center gap-1 transition-all
                                ${isActive ? 'text-indigo-400' : 'text-slate-500'}
                            `}
                        >
                            <item.icon size={22} className={location.pathname === item.path ? 'animate-bounce' : ''} />
                            <span className="btm-nav-label text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Drawer Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="w-72 min-h-full bg-[#0f172a] border-r border-white/10 flex flex-col glass-effect">
                    {/* Drawer Header (Mobile only) */}
                    <div className="lg:hidden p-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">S</div>
                            <span className="text-xl font-bold text-white">Menu</span>
                        </div>
                        <label htmlFor="app-drawer" className="btn btn-ghost btn-circle">
                            <X size={24} />
                        </label>
                    </div>

                    <div className="lg:p-8 p-0 hidden lg:block text-2xl font-black text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">S</div>
                            <span>School<span className="text-indigo-400">Way</span></span>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 lg:mt-6 mt-0 space-y-2">
                        {filteredNav.map(item => (
                            <NavLink 
                                key={item.path} 
                                to={item.path}
                                onClick={closeDrawer}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-semibold text-sm
                                    ${isActive 
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/5 hidden lg:block">
                        <div className="glass-card p-3 rounded-2xl flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className="bg-slate-800 text-white rounded-xl w-10">
                                    <span className="text-sm font-bold">{user?.name?.[0]}</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold truncate text-white">{user?.name}</p>
                                <p className="text-[10px] opacity-50 uppercase tracking-widest">{role}</p>
                            </div>
                            <button onClick={logout} className="hover:text-error transition-colors p-1">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
