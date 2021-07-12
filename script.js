export default function () {
  'use strict'
  window.onthemechange = function (settings) {
    const fallback = localStorage.settings && JSON.parse(localStorage.settings).darkMode.type
    const darkOpt = settings !== undefined ? settings.darkMode.type : fallback
    const secondaryColorId = settings && settings.theme && settings.theme.secondary ? settings.theme.secondary : '3'
    const monoFont = settings && settings.theme && settings.theme.fallbackMonoFont
    const monoFontClass = monoFont ? 'fallback' : 'mono'
    let themeClass = 'auto'
    if (darkOpt === undefined || darkOpt === 'user-preference') {
      // themeClass = 'auto'
    } else {
      themeClass = darkOpt === 'always-on' ? 'dark' : 'light'
    }
    const docEl = document.querySelector('html')

    docEl.dataset.theme = themeClass
    docEl.dataset.secondaryColor = secondaryColorId
    docEl.dataset.monofont = monoFontClass
  }

  window.onthemechange()
}
