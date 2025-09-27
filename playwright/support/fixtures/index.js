import { test as baseTest, expect } from '@playwright/test'

import { authService } from '../services/auth'
import { linksService } from '../services/links'

const test = baseTest.extend({

    auth: async ({ request }, use) => {
        const auth = authService(request)
        await use(auth)
    },
    links: async({ request}, use) => {
        const links = linksService(request)
        await use(links)
    }

})

export { test, expect }

