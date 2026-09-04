import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter, Search, Eye } from 'lucide-react';
import reviewQueueApi from '../../services/reviewQueueService';

const ReviewQueue = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('PENDING_MANUAL_REVIEW');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, [page, filter]);

  const loadCases = async () => {
    setLoading(true);
    try {
      const response = await reviewQueueApi.fetchPendingCases(page, filter);
      setCases(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load cases', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = cases.filter(c => 
    c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.nik.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
          <p className="text-slate-500">Manage cases awaiting manual verification</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search NIK or Name..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            >
              <option value="PENDING_MANUAL_REVIEW">Pending Review</option>
              <option value="REJECTED">Rejected</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Request ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Customer Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">NIK</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Match Score</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Submitted</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-500">Loading cases...</td>
              </tr>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.customerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{c.nik}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">
                      {c.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(c.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/case/${c.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Review Case"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-500">No cases found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-slate-300 rounded bg-white disabled:opacity-50 hover:bg-slate-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-slate-300 rounded bg-white disabled:opacity-50 hover:bg-slate-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueue;
