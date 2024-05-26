/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,vue,ts}'],
  theme: {
    fontFamily: {
      'ali-puhui': ['AlibabaPuHuiTiHei'],
      youshe: ['YouSheBiaoTiHei'],
    },
    colors: {
      main: '#FFA116',
      'borderColor-1': '#ececec',
      'borderColor-2': '#e2e2e2',
      'textColor-1': '#000',
      'textColor-2': '#4E5969',
      'textColor-3': '#86909C',
      'textColor-4': '#C9CDD4',
    },
    boxShadow: {
      '1xl': '0 0 20px 5px rgba(0,0,0,0.05)',
    },
    keyframes: {
      'rotational-wave': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(10deg)',
        },
        '50%': {
          transform: 'rotate(-10deg)',
        },
        '75%': {
          transform: 'rotate(10deg)',
        },
        '100%': {
          transform: 'rotate(0deg)',
        },
      },
    },
    animation: {
      'rotational-wave': 'rotational-wave 2s ease-in-out infinite',
    },
  },
};
