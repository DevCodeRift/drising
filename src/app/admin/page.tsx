'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DashboardData {
  authenticated: boolean;
  stats?: {
    weapons: number;
    armor: number;
    mods: number;
    artifacts: number;
    activities: number;
    lastUpdated: string;
  };
  currentSeason?: {
    id: string;
    name: string;
    number: number;
    active: boolean;
  } | null;
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const fetchDashboardData = async (key?: string) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (key) {
        headers['x-api-key'] = key;
      }

      const response = await fetch('/api/admin/dashboard', { headers });
      const result: ApiResponse<DashboardData> = await response.json();

      if (result.success) {
        setDashboardData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to load dashboard');
      }
    } catch (err) {
      setError('Failed to connect to API');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setLoading(true);
      fetchDashboardData(apiKey.trim());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-destiny-dark">
        <Header />
        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-destiny-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-destiny-dark">
        <Header />
        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
              <p className="text-red-300">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchDashboardData();
                }}
                className="mt-4 px-4 py-2 bg-destiny-primary hover:bg-destiny-primary-hover rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!dashboardData?.authenticated) {
    return (
      <div className="min-h-screen bg-destiny-dark">
        <Header />
        <main className="pt-24 pb-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-destiny-gray-800 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-destiny-gray-300 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-4 py-2 bg-destiny-gray-700 border border-destiny-gray-600 rounded-lg text-white focus:ring-2 focus:ring-destiny-primary focus:border-destiny-primary"
                      placeholder="Enter admin API key"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-destiny-gray-400 hover:text-destiny-gray-300"
                    >
                      {showApiKey ? '👁️' : '🔒'}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-destiny-primary hover:bg-destiny-primary-hover rounded-lg text-white font-medium transition-colors"
                >
                  Access Dashboard
                </button>
              </form>
              {dashboardData?.message && (
                <p className="mt-4 text-sm text-destiny-gray-400 text-center">
                  {dashboardData.message}
                </p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = dashboardData.stats!;

  return (
    <div className="min-h-screen bg-destiny-dark">
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white font-display">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-destiny-gray-400 mt-2">
              Manage Destiny 2 game data, weapons, mods, and seasonal content
            </p>
          </div>

          {/* Current Season */}
          {dashboardData.currentSeason && (
            <div className="mb-8">
              <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Current Season</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg text-destiny-primary font-medium">
                      {dashboardData.currentSeason.name}
                    </h3>
                    <p className="text-destiny-gray-400">
                      Season {dashboardData.currentSeason.number} • {dashboardData.currentSeason.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      dashboardData.currentSeason.active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {dashboardData.currentSeason.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <div className="text-2xl font-bold text-destiny-accent-arc mb-2">
                {stats.weapons}
              </div>
              <div className="text-destiny-gray-400">Weapons</div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <div className="text-2xl font-bold text-destiny-accent-solar mb-2">
                {stats.armor}
              </div>
              <div className="text-destiny-gray-400">Armor Pieces</div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <div className="text-2xl font-bold text-destiny-accent-void mb-2">
                {stats.mods}
              </div>
              <div className="text-destiny-gray-400">Mods</div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <div className="text-2xl font-bold text-destiny-accent-stasis mb-2">
                {stats.artifacts}
              </div>
              <div className="text-destiny-gray-400">Artifacts</div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <div className="text-2xl font-bold text-destiny-accent-strand mb-2">
                {stats.activities}
              </div>
              <div className="text-destiny-gray-400">Activities</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Weapons</h3>
              <p className="text-destiny-gray-400 mb-4">
                Manage weapon database, stats, and metadata
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-destiny-primary hover:bg-destiny-primary-hover rounded-lg text-white text-sm transition-colors">
                  View Weapons
                </button>
                <button className="w-full px-4 py-2 bg-destiny-gray-700 hover:bg-destiny-gray-600 rounded-lg text-white text-sm transition-colors">
                  Add Weapon
                </button>
              </div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Mods</h3>
              <p className="text-destiny-gray-400 mb-4">
                Update armor mods, artifact mods, and seasonal content
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-destiny-primary hover:bg-destiny-primary-hover rounded-lg text-white text-sm transition-colors">
                  View Mods
                </button>
                <button className="w-full px-4 py-2 bg-destiny-gray-700 hover:bg-destiny-gray-600 rounded-lg text-white text-sm transition-colors">
                  Add Mod
                </button>
              </div>
            </div>

            <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Season</h3>
              <p className="text-destiny-gray-400 mb-4">
                Update current season data and artifact information
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-destiny-primary hover:bg-destiny-primary-hover rounded-lg text-white text-sm transition-colors">
                  Update Season
                </button>
                <button className="w-full px-4 py-2 bg-destiny-gray-700 hover:bg-destiny-gray-600 rounded-lg text-white text-sm transition-colors">
                  Manage Artifact
                </button>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-destiny-gray-800 rounded-lg p-6 border border-destiny-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-destiny-gray-400">Last Updated:</span>
                <span className="text-white ml-2">{formatDate(stats.lastUpdated)}</span>
              </div>
              <div>
                <span className="text-destiny-gray-400">API Status:</span>
                <span className="text-green-400 ml-2">Online</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}