import { Cross, User, Building2, Stethoscope, Activity, Cpu, Image } from 'lucide-react';

const config = {
  doctor: { icon: Stethoscope, bg: 'bg-gradient-to-br from-primary-100 to-primary-200', iconColor: 'text-primary-500' },
  admin: { icon: User, bg: 'bg-gradient-to-br from-accent-100 to-accent-200', iconColor: 'text-accent-500' },
  company: { icon: Building2, bg: 'bg-gradient-to-br from-slate-100 to-slate-200', iconColor: 'text-slate-500' },
  device: { icon: Cpu, bg: 'bg-gradient-to-br from-secondary-100 to-secondary-200', iconColor: 'text-secondary-500' },
  department: { icon: Activity, bg: 'bg-gradient-to-br from-primary-100 to-secondary-100', iconColor: 'text-primary-500' },
  patient: { icon: User, bg: 'bg-gradient-to-br from-warning-100 to-warning-200', iconColor: 'text-warning-500' },
  generic: { icon: Image, bg: 'bg-gradient-to-br from-slate-100 to-slate-200', iconColor: 'text-slate-400' },
};

export default function PlaceholderImage({
  type = 'generic',
  src,
  alt = '',
  className = '',
  rounded = 'rounded-2xl',
}) {
  const { icon: Icon, bg, iconColor } = config[type];

  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${rounded} ${bg} flex items-center justify-center ${className}`}>
      <Icon className={`w-1/3 h-1/3 ${iconColor} opacity-60`} strokeWidth={1.2} />
    </div>
  );
}

