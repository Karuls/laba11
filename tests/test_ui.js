const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');

describe('UI Tests', function() {
  this.timeout(10000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    const filePath = 'file://' + path.resolve('index.html');
    await driver.get(filePath);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('тест 1: заголовок страницы', async () => {
    const title = await driver.getTitle();
    assert(title.includes('Форма входа'));
  });

  it('тест 2: кнопка есть и текст "Войти"', async () => {
    const btn = await driver.findElement(By.id('submitBtn'));
    const text = await btn.getText();
    assert.strictEqual(text, 'Войти');
  });

  it('тест 3: поля ввода существуют', async () => {
    const username = await driver.findElement(By.id('username'));
    const password = await driver.findElement(By.id('password'));
    assert(await username.isDisplayed());
    assert(await password.isDisplayed());
  });
});