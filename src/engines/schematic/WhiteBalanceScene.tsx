import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const PATCHES = ['#c94f4f', '#4f8fc9', '#5fb86b', '#d8c34a', '#b06fc0', '#e8e8e8'];

/** Scena del bilanciamento del bianco: la scena prende la dominante della luce alla temperatura scelta. */
export const WhiteBalanceScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const kelvin = params.kelvin;
  const [lr, lg, lb] = derived.whiteBalance?.rgb ?? [255, 255, 255];

  const tint = (hex: string): string => {
    const r = (parseInt(hex.slice(1, 3), 16) * lr) / 255;
    const g = (parseInt(hex.slice(3, 5), 16) * lg) / 255;
    const b = (parseInt(hex.slice(5, 7), 16) * lb) / 255;
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  };

  const warmKey = kelvin < 4500 ? 'wb.warm' : kelvin > 6500 ? 'wb.cool' : 'wb.neutral';

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.wb.title')}>
      <Backdrop grid={false} />

      {/* colore della luce */}
      <rect x={0} y={0} width={SCENE_W} height={70} fill={`rgb(${lr},${lg},${lb})`} />
      <text x={SCENE_W / 2} y={44} textAnchor="middle" className="scene__tick" style={{ fill: '#10141a' }}>
        {t('scene.wb.light')}
      </text>

      {/* scena neutra che prende la dominante */}
      <rect x={0} y={70} width={SCENE_W} height={SCENE_H - 70} fill={tint('#9aa3b0')} />

      {/* cartoncino bianco di riferimento */}
      <rect x={40} y={110} width={150} height={150} rx={8} fill={tint('#f2f2f2')} stroke="#0c1015" strokeWidth={2} />
      <text x={115} y={285} textAnchor="middle" className="scene__tick">
        {t('scene.wb.whiteCard')}
      </text>

      {/* patch colore */}
      {PATCHES.map((c, i) => (
        <rect key={i} x={250 + i * 62} y={150} width={52} height={52} rx={6} fill={tint(c)} />
      ))}

      <text x={20} y={48} className="scene__label" style={{ fill: '#10141a' }}>
        {kelvin} K
      </text>
      <text x={SCENE_W - 20} y={SCENE_H - 22} textAnchor="end" className="scene__label-sm">
        {t(warmKey)}
      </text>
    </svg>
  );
};
