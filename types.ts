import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface DashboardCardProps {
  title: string;
  imageUrl: string;
  isLocked?: boolean;
  lockMessage?: string;
  onClick?: () => void;
}
