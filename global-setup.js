
const { cleanupTestData } = require('./playwright/support/database')

module.exports = async () => {
    console.log('Limpando os dados de testes antes da execução dos testes.')
    await cleanupTestData()
    console.log('Limpeza concluída com sucesso!')
}