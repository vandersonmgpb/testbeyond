const { Pool } = require('pg');

require('dotenv').config();

// Configure sua conexão com o banco de dados
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT, // ou outro se necessário
});

async function cleanupTestData() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const query = `
      WITH usuarios_para_remover AS (
        SELECT id FROM users WHERE email LIKE '%@fulano.dev'
      ),
      remover_links AS (
        DELETE FROM links
        WHERE user_id IN (SELECT id FROM usuarios_para_remover)
      )
      DELETE FROM users
      WHERE id IN (SELECT id FROM usuarios_para_remover);
    `;

        await client.query(query);
        await client.query('COMMIT');
        console.log('Usuários e links de testes removidos com sucesso!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao remover dados de teste:', err);
    } finally {
        client.release();
    }
}

module.exports = { cleanupTestData }

// comando para executar: node playwright/support/database.js
