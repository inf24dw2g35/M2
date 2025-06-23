const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para inicializar e testar a conexão
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;");
    await connection.query("SET CHARACTER SET utf8mb4;");
    connection.release();
    console.log('Database connection established with UTF-8 settings');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Exporta a pool diretamente (para compatibilidade)
module.exports = pool;

// Exporta também a função caso queira usar
module.exports.initializeDatabase = initializeDatabase;