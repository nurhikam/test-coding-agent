import { query } from './db.js';

export const auditLogRepo = {
  log: async ({ entityType, entityId, action, changedBy, oldValue, newValue }) => {
    const res = await query(
      'INSERT INTO AuditLog (entity_type, entity_id, action, changed_by, old_value, new_value) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [entityType, entityId, action, changedBy, oldValue, newValue]
    );
    return res.rows[0];
  },
};
