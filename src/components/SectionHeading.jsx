export default function SectionHeading({
  title,
  subtitle,
  badge,
  center = true,
  light = false,
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${
          light ? 'bg-white/10 text-white' : 'bg-primary-50 text-primary-600'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${light ? 'text-white' : 'text-slate-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-24 rounded-full bg-gradient-to-l from-primary-500 to-primary-400 mt-4 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

