import { expect, test } from '@playwright/test'

import { faker } from '@faker-js/faker'

test.describe('POST /auth/register', () => {

    test('deve cadastrar um novo usuário', async ({ request }) => {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const user = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: 'pwd123'
        }

        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })

        expect(response.status()).toBe(201)

        const responseBody = await response.json()

        expect(responseBody).toHaveProperty('message', 'Usuário cadastrado com sucesso!')
        expect(responseBody.user).toHaveProperty('id')
        expect(responseBody.user).toHaveProperty('name', user.name)
        expect(responseBody.user).toHaveProperty('email', user.email)
        expect(responseBody.user).not.toHaveProperty('password')
    })

    test('não deve cadastrar quando o email já estiver sendo usado', async ({ request }) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const user = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: 'pwd123'
        }

        const preCondition = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })

        expect(preCondition.status()).toBe(201)

        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })

        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Este e-mail já está em uso. Por favor, tente outro.')
    })

    test('não deve cadastrar quando o email é incorreto', async ({ request }) => {
        const user = {
            name: 'Fulano de tall',
            email: 'fulanodetall&com.br',
            password: 'pwd123'
        }
        
        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })
        
        expect(response.status()).toBe(400)
        
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' deve ser um email válido')
    })
    
    test('não deve cadastrar quando o nome não é informado', async ({ request }) => {
        const user = {
            email: 'fulanodetall&com.br',
            password: 'pwd123'
        }
        
        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })
        
        expect(response.status()).toBe(400)
        
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Name\' é obrigatório')
    })
    
    test('não deve cadastrar quando o email não é informado', async ({ request }) => {
        const user = {
            name: 'Fulano de tall',
            password: 'pwd123'
        }
        
        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })
        
        expect(response.status()).toBe(400)
        
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })
    
    test('não deve cadastrar quando o senha não é informada', async ({ request }) => {
        const user = {
            name: 'Fulano de tall',
            email: 'fulanodetall@com.br'
        }
        
        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })
        
        expect(response.status()).toBe(400)
        
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})
