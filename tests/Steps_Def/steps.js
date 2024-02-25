const {Given, When, Then} = require('@cucumber/cucumber')
const {expect} = require("@playwright/test");

Given('I Navigate to Playwright page',
    {timeout: 40 * 1000}, async function () {
        await this.page.goto('https://playwright.dev/')
        await expect(this.page).toHaveTitle(/Playwright/);
    })

When('I click on Get Started Link',
    {timeout: 40 * 1000}, async function () {
        await this.page.getByRole('link', { name: 'Get started' }).click();
    })

Then('I verify Get Started Link Page',
    {timeout: 40 * 1000}, async function () {
        await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    })
