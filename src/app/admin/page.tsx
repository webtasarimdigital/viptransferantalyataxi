'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      localStorage.setItem('admin_token', 'authenticated');
      window.location.href = '/admin/dashboard';
    } else {
      setError('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-secondary border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-gold" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-2">Yönetim paneline giriş yapın</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Kullanıcı Adı:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adını girin"
              className="w-full bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Şifre:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Yönetici şifresini girin"
              className="w-full bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-lg transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
