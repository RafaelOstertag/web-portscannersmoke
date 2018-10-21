const webdriver = require('selenium-webdriver')
const environment = require('./environment')

webdriver.promise.USE_PROMISE_MANAGER = false

function hostInputElement (driver) {
  return driver.findElement(webdriver.By.css('input[name="host"]'))
}

function portInputElement (driver) {
  return driver.findElement(webdriver.By.css('input[name="ports"]'))
}

function submitButton (driver) {
  return driver.findElement(webdriver.By.css('input[type="submit"]'))
}

function setInputText (text, element) {
  return element.sendKeys(text)
}

function successSvgSelector () {
  return webdriver.By.css('svg[data-icon="check-circle"]')
}

async function fillPortscannerUi (driver) {
  await setInputText('www.google.ch', hostInputElement(driver))
  await setInputText('80', portInputElement(driver))
}

async function startScan (driver) {
  await submitButton(driver).click()
  await driver.wait(webdriver.until.elementLocated(successSvgSelector()), 5000)
}

async function startDriver () {
  return new webdriver.Builder().forBrowser(environment.browser).build()
}

async function quitDriver (driver) {
  await driver.quit()
}

exports.run = async function test () {
  const driver = await startDriver()
  try {
    await driver.get(environment.uiUrl)
    await fillPortscannerUi(driver)
    await startScan(driver)
  } finally {
    await quitDriver(driver)
  }
}
