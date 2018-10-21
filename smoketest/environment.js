const env = require('process')

exports.uiUrl = env['PORTSCANNER_UI_URL'] || 'https://portscanner.guengel.ch'
exports.browser = env['PORTSCANNER_UI_BROWSER'] || 'chrome'
