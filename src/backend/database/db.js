import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ekyc_db',
});

export const query = (text, params) => pool.query(text, params);
export default pool;
