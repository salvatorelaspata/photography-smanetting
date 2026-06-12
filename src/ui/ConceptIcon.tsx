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
    default:
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={14} />
        </svg>
      );
  }
}
