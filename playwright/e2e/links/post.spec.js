import { test, expect } from '@playwright/test'

import { authService } from '../../support/services/auth'
import { linksService } from '../../support/services/links'
import { getUserWithLink } from '../../support/factories/user'

test.describe('POST /api/links', () => {

    const user = getUserWithLink()

    let auth
    let link
    let token


    test.beforeEach(async({request})=> {
        auth = authService(request)
        link = linksService(request)

        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    test('deve encurtar um novo link', async ({ request }) => {
        const response = await link.createLink(user.link, token)

        expect(response.status()).toBe(201)
        const {data, message} = await response.json()
        
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data).toHaveProperty('title', user.link.title)
        expect(data.short_code).toMatch(/^[A-Za-z0-9]{5}$/)
        expect(message).toBe('Link criado com sucesso')
    })
    
    test('não deve encurtar quando a url original não é informada', async ()=> {
        const response = await link.createLink({...user.link, original_url: ''}, token)
    
        expect(response.status()).toBe(400)
        const {message} = await response.json()

        expect(message).toBe('O campo \'OriginalURL\' é obrigatório')
    })
    
    test('não deve encurtar quando o título não é informado', async ()=> {
        const response = await link.createLink({...user.link, title: ''}, token)
        
        expect(response.status()).toBe(400)
        const {message} = await response.json()

        expect(message).toBe('O campo \'Title\' é obrigatório')
    })
    
    test('não deve encurtar quando a url original não é inválida', async ()=> {
        const response = await link.createLink({...user.link, original_url: 'teste@teste.com.br'}, token)
    
        expect(response.status()).toBe(400)
        const {message} = await response.json()

        expect(message).toBe('O campo \'OriginalURL\' deve ser uma URL válida')
    })
})