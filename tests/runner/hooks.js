const {Before, After, Status} = require("@cucumber/cucumber")
const fs = require('fs')
const {firefox, webkit, chromium, devices} = require("@playwright/test");


Before({timeout: 100 * 1000}, async function (scenario) {

    const browserOptions = {
        headless: true,
        args: [`--headless=new`]
    }

    switch (process.env.BROWSER) {

        case 'firefox':
            this.browser = await firefox.launch({
                headless: true,
                args: [`-headless`]
            })
            this.context = await this.browser.newContext()
            break;

        case 'webkit':
            this.browser = await webkit.launch(browserOptions)
            this.context = await this.browser.newContext()
            break;

        case 'chrome_mobile':
            this.browser = await chromium.launch(browserOptions)
            this.context = await this.browser.newContext({
                hasTouch: true,
                ...devices['Pixel 5']
            })
            break;

        case 'safari_mobile':
            this.browser = await chromium.launch(browserOptions)
            this.context = await this.browser.newContext({
                hasTouch: true,
                ...devices['iPhone 12']
            })
            break;

        default:
            this.browser = await chromium.launch(browserOptions)
            this.context = await this.browser.newContext()
            break;
    }

    this.page = await this.context.newPage()

})

After({timeout: 100 * 1000}, async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            path: 'reports/screenshots/' + scenario.pickle.name + '.png',
            fullPage: false
        })
        this.attach(screenshot, 'image/png')

        console.log('[ FAILED ] Scenario : ' + scenario.pickle.name)
        await this.page.waitForTimeout(2000)

    }
    await this.page.close()
    await this.context.close()
    await this.browser.close()
})


