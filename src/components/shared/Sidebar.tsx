import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  userType: 'client' | 'merchant' | 'driver';
  className?: string;
}

export function Sidebar({ items, userType, className }: SidebarProps) {
  const location = useLocation();

  const getThemeColors = () => {
    switch (userType) {
      case 'client':
        return {
          active: 'bg-primary/10 text-primary border-primary/20',
          hover: 'hover:bg-primary/5 hover:text-primary'
        };
      case 'merchant':
        return {
          active: 'bg-secondary/10 text-secondary border-secondary/20',
          hover: 'hover:bg-secondary/5 hover:text-secondary'
        };
      case 'driver':
        return {
          active: 'bg-accent/10 text-accent border-accent/20',
          hover: 'hover:bg-accent/5 hover:text-accent'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <nav className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn(
              "w-full justify-start transition-all",
              colors.hover,
              isActive && colors.active
            )}
          >
            <Link to={item.href} className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}