import React from 'react';
import WebhookConfigForm from './WebhookConfigForm';

const CorporateSettings = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Corporate Settings</h1>
      <div className="grid grid-cols-1 gap-8">
        <WebhookConfigForm />
      </div>
    </div>
  );
};

export default CorporateSettings;
