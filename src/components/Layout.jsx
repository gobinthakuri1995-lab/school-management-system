import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavMenu from './NavMenu';
import { 
  Menu,
  Bell,
  GraduationCap,
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';

export default function Layout() {
    const { user, role, logout } = useAuth();
    const location = useLocation();

    const closeDrawer = () => {
        const drawerCheckbox = document.getElementById('app-drawer');
        if (drawerCheckbox) drawerCheckbox.checked = false;
    };

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-white">
            <input id="app-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* Drawer Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Titlebar */}
                <header className="navbar bg-white border-b border-slate-100 px-4 md:px-6 h-16 sticky top-0 z-40">
                    <div className="flex-none">
                        <label htmlFor="app-drawer" className="btn btn-ghost btn-square lg:hidden">
                            <Menu size={20} className="text-slate-500" />
                        </label>
                        {/* Hidden on mobile, button for desktop to toggle drawer if needed */}
                        <label htmlFor="app-drawer" className="btn btn-ghost btn-square hidden lg:flex">
                            <Menu size={20} className="text-slate-500" />
                        </label>
                    </div>
                    
                    <div className="flex-1">
                        {/* Empty center for minimalist feel */}
                    </div>

                    <div className="flex-none flex items-center gap-4">
                        <button className="btn btn-ghost btn-circle btn-sm relative">
                            <Bell size={18} className="text-slate-500" />
                            <span className="badge badge-primary badge-xs absolute top-1.5 right-1.5 border-2 border-white"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                             <div className="avatar">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                                    <User size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Workspace Area */}
                <main className="flex-1 bg-slate-50/50 p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Sidebar (Drawer Side) */}
            <div className="drawer-side z-50">
                <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="w-64 min-h-full bg-white border-r border-slate-100 flex flex-col shadow-sm">
                    {/* Sidebar Header */}
                    <div className="p-6 h-16 flex items-center gap-3 border-b border-slate-50">
                        <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                            <GraduationCap size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">SMS</span>
                    </div>

                    {/* Sidebar Body (File Tree) */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <NavMenu role={role} onLinkClick={closeDrawer} />
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-slate-50 bg-slate-50/30">
                        <div className="flex items-center gap-3 p-2 rounded-xl">
                            <div className="avatar online">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                    {user?.name?.[0]}
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{role}</p>
                            </div>
                            <button 
                                onClick={logout} 
                                className="btn btn-ghost btn-square btn-sm text-slate-400 hover:text-error hover:bg-error/5 transition-all"
                                title="Sign Out"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
