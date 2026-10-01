import { Chart as ChartJS, Tooltip } from 'chart.js'

export const palette = {
  navy: '#475480',
  rust: '#7F3B25',
  gold: '#B57056',
  citron: '#A7993C',
  cream: '#DCCD8B',
  mauve: '#DCCD8B',
  ink: '#303956',
  goldSoft: 'rgba(181, 112, 86, 0.14)',
  navySoft: 'rgba(71, 84, 128, 0.12)',
  line: 'rgba(71, 84, 128, 0.2)',
}

export const chartColors = [palette.gold, palette.navy, palette.citron, palette.rust, palette.mauve]

ChartJS.defaults.color = palette.navy
ChartJS.defaults.borderColor = palette.line
ChartJS.register(Tooltip)
Object.assign(ChartJS.defaults.plugins.tooltip, {
  backgroundColor: palette.cream,
  titleColor: palette.navy,
  bodyColor: palette.navy,
  borderColor: palette.mauve,
  borderWidth: 1,
})
