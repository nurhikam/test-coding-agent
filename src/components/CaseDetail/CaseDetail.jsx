import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import reviewQueueApi from '../../services/reviewQueueService';

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCase = async () => {
      setLoading(true);
      try {
        const response = await reviewQueueApi.fetchCaseDetails(id);
        setCaseData(response.data);
      } catch (err) {
        setError('Failed to load case details');
      } finally {
        setLoading(false);
      }
    };
    loadCase();
  }, [id]);

  const handleAction = async (action, payload = {}) => {
    try {
      let result;
      if (action === 'approve') result = await reviewQueueApi.approveCase(id);
      else if (action === 'reject') result = await reviewQueueApi.rejectCase(id, payload.reason);
      else if (action === 'reupload') result = await reviewQueueApi.requestReupload(id, payload.field);
      
      if (result.success) {
        alert(`Case ${action}ed successfully`);
        navigate('/review-queue');
      }
    } catch (err) {
      alert('Action failed');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-slate-500">
      Loading case details...
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/review-queue')}
          className="flex items-center text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Queue</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Case Detail: {caseData.id}</h1>
              <p className="text-slate-500">Reviewing identity verification for {caseData.customerName}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-slate-500 block">Match Score</span>
              <span className="text-2xl font-bold text-blue-600">{caseData.score}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-slate-200">
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">KTP Photo</h3>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img 
                  src={caseData.ktpImageUrl} 
                  alt="KTP" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400 block">Extracted Name</span>
                  <span className="font-medium text-slate-900">{caseData.extractedData.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Extracted NIK</span>
                  <span className="font-medium text-slate-900">{caseData.extractedData.nik}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Selfie Photo</h3>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img 
                  src={caseData.selfieImageUrl} 
                  alt="Selfie" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 text-sm">
                <span className="text-slate-400 block">Verification Status</span>
                <span className="font-medium text-amber-600">Pending Manual Review</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center gap-4">
            <button 
              onClick={() => handleAction('reject', { reason: 'Blurry image' })}
              className="flex items-center gap-2 px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <XCircle size={18} />
              Reject
            </button>
            <button 
              onClick={() => handleAction('reupload', { field: 'ktp' })}
              className="flex items-center gap-2 px-6 py-2 border border-slate-300 text-slate-600 hover:bg-white rounded-lg transition-colors font-medium"
            >
              <RefreshCcw size={18} />
              Request Re-upload
            </button>
            <button 
              onClick={() => handleAction('approve')}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm"
            >
              <CheckCircle size={18} />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
