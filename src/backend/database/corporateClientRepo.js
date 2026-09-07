import { query } from './db.js';

export const corporateClientRepo = {
  create: async (name) => {
    const res = await query(
      'INSERT INTO CorporateClient (client_name) VALUES ($1) RETURNING *',
      [name]
    );
    return res.rows[0];
  },
  findById: async (id) => {
    const res = await query('SELECT * FROM CorporateClient WHERE client_id = $1', [id]);
    return res.rows[0];
  },
};
