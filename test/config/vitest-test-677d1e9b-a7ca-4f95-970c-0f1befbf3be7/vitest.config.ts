
      export default {
        test: {
          reporters: [
            {
              onInit(vitest) {
                const browser = vitest.config.browser
                const workspace = (p) => ({
                  name: p.name,
                  headless: p.config.browser.headless,
                  browser: p.config.browser.enabled,
                  ui: p.config.browser.ui,
                })
                console.log(JSON.stringify({
                  browser: {
                    headless: browser.headless,
                    browser: browser.enabled,
                    ui: browser.ui,
                  },
                  workspace: vitest.projects.map(p => {
                    return {
                      ...workspace(p),
                      parent: p._parent ? workspace(p._parent) : null,
                    }
                  })
                }))
                // throw an error to avoid running tests
                throw new Error('stop')
              },
            },
          ],
          ...{"projects":[{"test":{"name":"unit"}},{"test":{"name":"browser","browser":{"enabled":true,"headless":true,"provider":{"name":"playwright","supportedBrowser":["firefox","webkit","chromium"],"_cli":true},"instances":[{"browser":"chromium"}]}}}]}
        }
      }
    