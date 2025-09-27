import { test, expect } from '@playwright/test'

import { authService } from '../../support/services/auth'
import { linksService } from '../../support/services/links'
import { getUserWithLink } from '../../support/factories/user'

test.describe('POST /api/links', () => {

    test('deve criar um novo link', async ({ request }) => {

        const auth = authService(request)
        const link = linksService(request)

        const user = getUserWithLink()

        await auth.createUser(user)

        const token = await auth.getToken(user)
        const response = await link.createLink(user.link, token)

            expect(response.status()).toBe(201)

            const {data, message} = await response.json()

            expect(data).toHaveProperty('id')
            expect(data).toHaveProperty('original_url', user.link.original_url)
            expect(data).toHaveProperty('title', user.link.title)
            expect(data.short_code).toMatch(/^[A-Za-z0-9]{5}$/)
            expect(message).toBe('Link criado com sucesso')

    })
})