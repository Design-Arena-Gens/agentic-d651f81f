'use client';

import { useState } from 'react';

interface JobAlert {
  id: string;
  keywords: string;
  location: string;
  jobType: string;
  frequency: string;
  active: boolean;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  match: number;
}

export default function Home() {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [frequency, setFrequency] = useState('daily');
  const [activeTab, setActiveTab] = useState<'create' | 'alerts' | 'matches'>('create');

  const [mockJobs] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      posted: '2 days ago',
      match: 95
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $150k',
      posted: '1 day ago',
      match: 88
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'Digital Solutions Ltd',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $170k',
      posted: '3 days ago',
      match: 82
    }
  ]);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    const newAlert: JobAlert = {
      id: Date.now().toString(),
      keywords,
      location,
      jobType,
      frequency,
      active: true
    };

    setAlerts([...alerts, newAlert]);
    setKeywords('');
    setLocation('');
    setJobType('full-time');
    setFrequency('daily');
    setActiveTab('alerts');
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-3">Job Alerts Agent</h1>
          <p className="text-xl text-gray-700">Your intelligent job search assistant</p>
        </header>

        <div className="max-w-5xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'create'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Create Alert
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'alerts'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              My Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'matches'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Job Matches
            </button>
          </div>

          {/* Create Alert Form */}
          {activeTab === 'create' && (
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Job Alert</h2>
              <form onSubmit={handleCreateAlert} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Keywords *
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., React Developer, Frontend Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco, Remote"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Type
                    </label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alert Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  Create Alert
                </button>
              </form>
            </div>
          )}

          {/* My Alerts */}
          {activeTab === 'alerts' && (
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Job Alerts</h2>
              {alerts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No alerts created yet</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    Create your first alert
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{alert.keywords}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                alert.active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {alert.active ? 'Active' : 'Paused'}
                            </span>
                          </div>
                          <div className="space-y-1 text-gray-600">
                            <p>📍 Location: {alert.location || 'Any'}</p>
                            <p>💼 Type: {alert.jobType}</p>
                            <p>🔔 Frequency: {alert.frequency}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleAlert(alert.id)}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-semibold"
                          >
                            {alert.active ? 'Pause' : 'Activate'}
                          </button>
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Job Matches */}
          {activeTab === 'matches' && (
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Matches</h2>
              {alerts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg">Create an alert to see job matches</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                          <p className="text-lg text-gray-600">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
                            {job.match}% match
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div>📍 {job.location}</div>
                        <div>💼 {job.type}</div>
                        <div>💰 {job.salary}</div>
                        <div>🕐 {job.posted}</div>
                      </div>
                      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
