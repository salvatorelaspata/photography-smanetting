/** Icone schematiche per le card dei concetti (usano currentColor). */
export function ConceptIcon({ id }: { id: string }) {
  switch (id) {
    case 'shutter':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={16} />
          <path d="M24 9 L31 22 M39 26 L25 28 M22 39 L18 25 M9 22 L23 20" />
        </svg>
      );
    case 'aperture':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={16} />
          <polygon points="24,10 36,18 32,33 16,33 12,18" />
        </svg>
      );
    case 'iso':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="currentColor" stroke="none">
          {[14, 24, 34].map((y) =>
            [14, 24, 34].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} />),
          )}
        </svg>
      );
    case 'focal':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M11 24 L38 13 M11 24 L38 35" />
          <circle cx={11} cy={24} r={3} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'triangle':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="24,10 38,36 10,36" />
        </svg>
      );
    case 'whiteBalance':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <line x1={20} y1={10} x2={20} y2={31} />
          <circle cx={20} cy={36} r={6} fill="currentColor" stroke="none" />
          <line x1={27} y1={14} x2={35} y2={14} />
          <line x1={27} y1={20} x2={33} y2={20} />
          <line x1={27} y1={26} x2={35} y2={26} />
        </svg>
      );
    case 'histogram':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="currentColor" stroke="none">
          <rect x={11} y={28} width={5} height={10} />
          <rect x={19} y={20} width={5} height={18} />
          <rect x={27} y={13} width={5} height={25} />
          <rect x={35} y={24} width={5} height={14} />
        </svg>
      );
    case 'panning':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={31} cy={24} r={7} fill="currentColor" stroke="none" />
          <line x1={8} y1={18} x2={21} y2={18} />
          <line x1={6} y1={24} x2={19} y2={24} />
          <line x1={8} y1={30} x2={21} y2={30} />
        </svg>
      );
    case 'crop':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={10} y={13} width={28} height={22} rx={2} />
          <rect x={18} y={19} width={12} height={10} rx={1} />
        </svg>
      );
    case 'diffraction':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 36 Q24 9 39 36" />
          <circle cx={24} cy={15} r={2.6} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'portrait':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={21} r={12} />
          <circle cx={24} cy={23} r={3.2} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'hyperfocal':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <line x1={7} y1={31} x2={42} y2={31} />
          <rect x={18} y={22} width={24} height={9} rx={2} fill="currentColor" stroke="none" opacity={0.5} />
          <line x1={18} y1={18} x2={18} y2={34} />
        </svg>
      );
    case 'metering':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={9} y={12} width={30} height={24} rx={2} />
          <circle cx={24} cy={24} r={4.5} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'stabilization':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={7} fill="currentColor" stroke="none" />
          <path d="M9 16 Q24 8 39 16" />
          <path d="M9 32 Q24 40 39 32" />
        </svg>
      );
    case 'flash':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="currentColor" stroke="none">
          <polygon points="27,7 15,27 23,27 20,41 33,20 25,20" />
        </svg>
      );
    case 'bracketing':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={9} y={13} width={22} height={17} rx={2} />
          <rect x={14} y={18} width={22} height={17} rx={2} />
        </svg>
      );
    case 'filters':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={15} />
          <path d="M13 24 a11 11 0 0 1 22 0" fill="currentColor" stroke="none" opacity={0.4} />
          <line x1={9} y1={24} x2={39} y2={24} />
        </svg>
      );
    case 'modes':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={15} />
          <line x1={24} y1={24} x2={24} y2={11} />
          <circle cx={24} cy={24} r={2.4} fill="currentColor" stroke="none" />
          {[0, 1, 2, 3].map((i) => {
            const a = (-Math.PI / 2) + (i * Math.PI) / 2;
            return <circle key={i} cx={24 + Math.cos(a) * 15} cy={24 + Math.sin(a) * 15} r={1.8} fill="currentColor" stroke="none" />;
          })}
        </svg>
      );
    case 'raw':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={9} y={13} width={30} height={22} rx={2} />
          <path d="M9 24 h30" />
          <path d="M14 30 h6 M24 30 h4 M31 30 h4" />
        </svg>
      );
    case 'dynamic':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={11} y={11} width={26} height={26} rx={2} />
          <path d="M11 37 L37 11" fill="none" />
          <path d="M11 37 L37 37 L37 11 Z" fill="currentColor" stroke="none" opacity={0.25} />
        </svg>
      );
    case 'composition':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x={8} y={12} width={32} height={24} rx={2} />
          <line x1={18.7} y1={12} x2={18.7} y2={36} strokeWidth={1.2} />
          <line x1={29.3} y1={12} x2={29.3} y2={36} strokeWidth={1.2} />
          <line x1={8} y1={20} x2={40} y2={20} strokeWidth={1.2} />
          <line x1={8} y1={28} x2={40} y2={28} strokeWidth={1.2} />
          <circle cx={29.3} cy={20} r={3} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'colorSpace':
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="24,8 40,34 8,34" />
          <polygon points="18,16 38,30 12,30" opacity={0.55} />
          <circle cx={24} cy={26} r={2.4} fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={14} />
        </svg>
      );
  }
}
