import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

interface DataPoint {
  readonly date: string;
  readonly value: number;
}

const RAW_DATA: readonly DataPoint[] = [
  { date: '2021-01', value: 70_000 },
  { date: '2021-02', value: 70_000 },
  { date: '2021-03', value: 70_000 },
  { date: '2021-04', value: 70_000 },
  { date: '2021-05', value: 80_000 },
  { date: '2021-06', value: 80_000 },
  { date: '2021-07', value: 80_000 },
  { date: '2021-08', value: 80_000 },
  { date: '2021-09', value: 80_000 },
  { date: '2021-10', value: 80_000 },
  { date: '2021-11', value: 90_000 },
  { date: '2021-12', value: 90_000 },
  { date: '2022-01', value: 90_000 },
  { date: '2022-02', value: 90_000 },
  { date: '2022-03', value: 90_000 },
  { date: '2022-04', value: 90_000 },
  { date: '2022-05', value: 100_000 },
  { date: '2022-06', value: 100_000 },
  { date: '2022-07', value: 100_000 },
  { date: '2022-08', value: 100_000 },
  { date: '2022-09', value: 100_000 },
  { date: '2022-10', value: 110_000 },
  { date: '2022-11', value: 110_000 },
  { date: '2022-12', value: 110_000 },
  { date: '2023-01', value: 120_000 },
  { date: '2023-02', value: 120_000 },
  { date: '2023-03', value: 120_000 },
  { date: '2023-04', value: 130_000 },
  { date: '2023-05', value: 130_000 },
  { date: '2023-06', value: 130_000 },
  { date: '2023-07', value: 140_000 },
  { date: '2023-08', value: 150_000 },
  { date: '2023-09', value: 160_000 },
  { date: '2023-10', value: 160_000 },
  { date: '2023-11', value: 170_000 },
  { date: '2023-12', value: 170_000 },
  { date: '2024-01', value: 180_000 },
  { date: '2024-02', value: 180_000 },
  { date: '2024-03', value: 190_000 },
  { date: '2024-04', value: 190_000 },
  { date: '2024-05', value: 200_000 },
  { date: '2024-06', value: 210_000 },
  { date: '2024-07', value: 220_000 },
  { date: '2024-08', value: 230_000 },
  { date: '2024-09', value: 240_000 },
  { date: '2024-10', value: 240_000 },
  { date: '2024-11', value: 250_000 },
  { date: '2024-12', value: 250_000 },
  { date: '2025-01', value: 260_000 },
  { date: '2025-02', value: 260_000 },
  { date: '2025-03', value: 270_000 },
  { date: '2025-04', value: 280_000 },
  { date: '2025-05', value: 290_000 },
  { date: '2025-06', value: 310_000 },
  { date: '2025-07', value: 320_000 },
  { date: '2025-08', value: 340_000 },
  { date: '2025-09', value: 350_000 },
  { date: '2025-10', value: 360_000 },
  { date: '2025-11', value: 490_000 },
  { date: '2025-12', value: 490_000 },
  { date: '2026-01', value: 500_000 },
  { date: '2026-02', value: 510_000 },
  { date: '2026-03', value: 530_000 },
  { date: '2026-04', value: 540_000 },
  { date: '2026-05', value: 550_000 },
];

const WIDTH = 480;
const HEIGHT = 180;
const PAD_TOP = 22;
const PAD_RIGHT = 14;
const PAD_BOTTOM = 26;
const PAD_LEFT = 14;
const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;
const BASELINE_Y = PAD_TOP + PLOT_H;

const VALUES = RAW_DATA.map((d) => d.value);
const MIN_Y = Math.min(...VALUES);
const MAX_Y = Math.max(...VALUES);

interface RenderedPoint {
  readonly x: number;
  readonly y: number;
  readonly value: number;
  readonly year: number;
  readonly month: number;
}

const POINTS: readonly RenderedPoint[] = RAW_DATA.map((d, i) => {
  const [yearStr, monthStr] = d.date.split('-');
  const x = PAD_LEFT + (i / (RAW_DATA.length - 1)) * PLOT_W;
  const y = PAD_TOP + (1 - (d.value - MIN_Y) / (MAX_Y - MIN_Y)) * PLOT_H;
  return { x, y, value: d.value, year: Number(yearStr), month: Number(monthStr) };
});

const FIRST = POINTS[0]!;
const LAST = POINTS[POINTS.length - 1]!;
const JOIN = POINTS.find((p) => p.year === 2022 && p.month === 10)!;
const JOIN_LABEL_Y = 42;
const JOIN_LINE_TOP_Y = JOIN_LABEL_Y + 6;
const JOIN_LINE_BOTTOM_Y = JOIN.y - 6;

const f = (n: number): string => n.toFixed(2);

const LINE_PATH = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${f(p.x)},${f(p.y)}`).join(' ');
const AREA_PATH = `${LINE_PATH} L${f(LAST.x)},${f(BASELINE_Y)} L${f(FIRST.x)},${f(BASELINE_Y)} Z`;

interface YearTick {
  readonly x: number;
  readonly label: string;
}

const YEAR_TICKS: readonly YearTick[] = POINTS.reduce<YearTick[]>((acc, p) => {
  if (p.month === 1 && !acc.some((tick) => tick.label === String(p.year))) {
    acc.push({ x: p.x, label: String(p.year) });
  }
  return acc;
}, []);

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

@Component({
  selector: 'app-user-growth-chart',
  standalone: true,
  templateUrl: './user-growth-chart.html',
  styleUrl: './user-growth-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGrowthChartComponent {
  protected readonly i18n = inject(LanguageService);

  protected readonly viewBox = `0 0 ${WIDTH} ${HEIGHT}`;
  protected readonly padLeft = PAD_LEFT;
  protected readonly plotRight = WIDTH - PAD_RIGHT;
  protected readonly baselineY = BASELINE_Y;
  protected readonly linePath = LINE_PATH;
  protected readonly areaPath = AREA_PATH;
  protected readonly yearTicks = YEAR_TICKS;
  protected readonly first = FIRST;
  protected readonly last = LAST;
  protected readonly join = JOIN;
  protected readonly joinLineTopY = JOIN_LINE_TOP_Y;
  protected readonly joinLineBottomY = JOIN_LINE_BOTTOM_Y;
  protected readonly joinLabelY = JOIN_LABEL_Y;
  protected readonly startLabel = formatK(FIRST.value);
  protected readonly endLabel = formatK(LAST.value);

  protected readonly ariaLabel = computed(() => {
    const t = this.i18n.t().cv.userGrowth;
    return t.ariaLabel
      .replace('{start}', this.startLabel)
      .replace('{end}', this.endLabel);
  });
}
