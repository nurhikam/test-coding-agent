import { query } from './db.js';

export const verificationResultRepo = {
  create: async ({ requestId, stage, score, success, resultData }) => {
    const res = await query(
      'INSERT INTO VerificationResult (request_id, stage, score, success, result_data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [requestId, stage, score, success, resultData]
    );
    return res.rows[0];
  },
  findByRequestId: async (requestId) => {
    const res = await query('SELECT * FROM VerificationResult WHERE request_id = $1', [requestId]);
    return res.rows;
  },
};
