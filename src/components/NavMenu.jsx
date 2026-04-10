import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  PieChart,
  CalendarCheck,
  GraduationCap
} from 'lucide-react';

export default function NavMenu({ horizontal = false, onLinkClick, role }) {
    const menuClasses = `menu ${horizontal ? 'menu-horizontal p-0' : 'menu-compact p-0 w-full'}`;
    
    const hasRole = (roles) => roles.includes(role);

    const Item = ({ to, icon: Icon, label, danger = false }) => (
        <li>
            <NavLink 
                to={to} 
                onClick={onLinkClick}
                className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold
                    ${isActive 
                        ? 'bg-primary/10 text-primary border-r-4 border-primary rounded-r-none' 
                        : 'text-slate-500 hover:bg-slate-100'
                    }
                    ${danger ? 'hover:text-error' : ''}
                `}
            >
                <Icon size={18} />
                <span>{label}</span>
            </NavLink>
        </li>
    );

    return (
        <ul className={menuClasses}>
            <Item to="/" icon={LayoutDashboard} label="Dashboard" />

            {hasRole(['owner', 'admin', 'teacher']) && (
                <li className="mt-2">
                    <details open>
                        <summary className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-transparent cursor-default">
                            Academics
                        </summary>
                        <ul className="pl-0 space-y-1 mt-1">
                            <Item to="/students" icon={Users} label="Students" />
                            <Item to="/attendance" icon={CalendarCheck} label="Attendance" />
                        </ul>
                    </details>
                </li>
            )}

            {hasRole(['owner', 'accountant']) && (
                <li className="mt-2">
                    <details open>
                        <summary className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-transparent cursor-default">
                            Management
                        </summary>
                        <ul className="pl-0 space-y-1 mt-1">
                            <Item to="/finance" icon={PieChart} label="Financials" />
                            <Item to="/fees" icon={CreditCard} label="Fee System" />
                        </ul>
                    </details>
                </li>
            )}

            {hasRole(['owner', 'admin']) && (
                <li className="mt-2">
                    <details open>
                        <summary className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-transparent cursor-default">
                            Administration
                        </summary>
                        <ul className="pl-0 space-y-1 mt-1">
                            <Item to="/admin" icon={Settings} label="User Roles" />
                        </ul>
                    </details>
                </li>
            )}
        </ul>
    );
}
