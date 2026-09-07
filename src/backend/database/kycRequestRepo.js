import { query } from './db.js';

export const kycRequestRepo = {
  create: async ({ clientId, nik, status }) => {
    const res = await query(
      'INSERT INTO KYCRequest (client_id, nik, status) VALUES ($1, $2, $3) RETURNING *',
      [clientId, nik, status]
    );
    return res.rows[0];
  },
  updateStatus: async (requestId, status) => {
    const res = await query(
      'UPDATE KYCRequest SET status = $1 WHERE request_id = $2 RETURNING *',
      [status, requestId]
    );
    return res.rows[0];
  },
  findById: async (id) => {
    const res = await query('SELECT * FROM KYCRequest WHERE request_id = $1', [id]);
    return res.rows[0];
  },
};
