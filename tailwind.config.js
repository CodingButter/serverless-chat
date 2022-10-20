const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--text-base'),
          muted: withOpacity('--text-muted'),
          inverted: withOpacity('--text-inverted'),
          alert: withOpacity('--text-alert'),
          'alert-muted': withOpacity('--text-alert-muted')
        }
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--bg-base'),
          muted: withOpacity('--bg-muted'),
          surface: withOpacity('--bg-surface'),
          notification: withOpacity('--bg-notification')
        }
      }
    }
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: []
}
