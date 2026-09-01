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
        <span
          className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold mb-4 border ${
            light
              ? 'bg-white/10 text-white border-white/20 backdrop-blur-md'
              : 'bg-primary-50 text-primary-700 border-primary-100'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold mb-4 ${
          light ? 'text-white' : 'text-slate-800'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${
            light ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`h-1.5 w-24 rounded-full bg-gradient-to-l from-primary-500 via-primary-400 to-accent-500 mt-4 shadow-[0_8px_20px_rgba(25,119,134,0.25)] ${
          center ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}

