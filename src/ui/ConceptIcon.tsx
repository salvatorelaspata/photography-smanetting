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
    default:
      return (
        <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={24} cy={24} r={14} />
        </svg>
      );
  }
}
