import React, { useState, useEffect } from 'react';
import { webhookService } from '../../services/webhookService';

const WebhookConfigForm = () => {
  const [config, setConfig] = useState({ url: '', secret: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await webhookService.getConfig();
        setConfig(data);
      } catch (err) {
        console.error('Failed to fetch webhook config', err);
      }
    };
    fetchConfig();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!config.url.startsWith('https://')) {
      newErrors.url = 'Webhook URL must use HTTPS';
    }
    if (config.secret.length < 32) {
      newErrors.secret = 'Secret Token must be at least 32 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    setLoading(true);
    try {
      await webhookService.updateConfig(config);
      setMessage('Configuration updated successfully!');
    } catch (err) {
      setMessage('Failed to update configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-6">Webhook Configuration (FRM-KYC-01)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
          <input
            type="url"
            className={`mt-1 block w-full p-2 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
            placeholder="https://your-endpoint.com/callback"
          />
          {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Secret Token</label>
          <input
            type="password"
            className={`mt-1 block w-full p-2 border ${errors.secret ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            value={config.secret}
            onChange={(e) => setConfig({ ...config, secret: e.target.value })}
            placeholder="Minimum 32 characters"
          />
          {errors.secret && <p className="text-red-500 text-xs mt-1">{errors.secret}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Saving...' : 'Save Configuration'}
        </button>
      </form>
      {message && <p className={`mt-4 text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
};

export default WebhookConfigForm;
