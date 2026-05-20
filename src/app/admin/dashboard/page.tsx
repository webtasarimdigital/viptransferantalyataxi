'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings, Route, Image as ImageIcon, LogOut, Plus, Trash2, Save, Phone, Mail, Upload, Edit2, X } from 'lucide-react';

type Tab = 'settings' | 'routes' | 'gallery' | 'extras';

interface RoutePrice {
  id: number;
  from: string;
  to: string;
  price: number;
  price_vito?: number | null;
  price_maybach?: number | null;
  price_minibus?: number | null;
  currency: string;
}

interface ExtraService {
  id: number;
  name: string;
  image: string;
  price: number;
  currency: string;
  is_active: boolean;
}

interface GalleryItem {
  id: number;
  url: string;
  type: string;
}

const ADMIN_LOCATIONS = [
  'Antalya Havalimanı', 'Antalya Merkez', 'Lara', 'Kundu', 'Kaleiçi', 'Konyaaltı',
  'Belek', 'Boğazkent', 'Denizyaka',
  'Kumköy', 'Gündoğdu', 'Çolaklı',
  'Evrenseki', 'Side', 'Sorgun',
  'Manavgat', 'Titreyengöl', 'Kızılot',
  'Kızılağaç', 'Okurcalar', 'Avsallar',
  'İncekum', 'Çenger', 'Konaklı',
  'Türkler', 'Alanya', 'Mahmutlar',
  'Kargıcak', 'Kestel',
  'Beldibi', 'Göynük', 'Kemer',
  'Çamyuva', 'Kiriş', 'Tekirova',
  'Olimpos', 'Adrasan'
];

const DEFAULT_ROUTES: Record<string, number> = {
  'Antalya Merkez': 40, 'Lara': 40, 'Kundu': 40, 'Kaleiçi': 40, 'Konyaaltı': 40,
  'Belek': 45, 'Boğazkent': 45, 'Denizyaka': 50, 'Kumköy': 50, 'Gündoğdu': 50,
  'Çolaklı': 50, 'Evrenseki': 50, 'Side': 50, 'Sorgun': 50, 'Manavgat': 50,
  'Titreyengöl': 50, 'Kızılot': 60, 'Kızılağaç': 60, 'Okurcalar': 70,
  'Avsallar': 75, 'İncekum': 70, 'Çenger': 70, 'Konaklı': 75, 'Türkler': 75,
  'Alanya': 75, 'Mahmutlar': 90, 'Kargıcak': 90, 'Kestel': 90,
  'Beldibi': 50, 'Göynük': 50, 'Kemer': 50, 'Çamyuva': 55, 'Kiriş': 55,
  'Tekirova': 60, 'Olimpos': 85, 'Adrasan': 95,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Settings
  const [phone, setPhone] = useState('+90 542 7434648');
  const [email, setEmail] = useState('info@viptransferantalyataksi.com');

  // Routes
  const [routes, setRoutes] = useState<RoutePrice[]>([]);
  const [newRoute, setNewRoute] = useState({ 
    from: 'Antalya Havalimanı', 
    to: '', 
    price: 0, 
    price_vito: null as number | null, 
    price_maybach: null as number | null, 
    price_minibus: null as number | null, 
    currency: 'EUR' 
  });
  const [editingRoute, setEditingRoute] = useState<RoutePrice | null>(null);
  const [isManualRoute, setIsManualRoute] = useState(false);

  // Gallery
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newGallery, setNewGallery] = useState({ url: '', type: 'image' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extras
  const [extras, setExtras] = useState<ExtraService[]>([]);
  const [newExtra, setNewExtra] = useState({ name: '', image: '', price: 0, currency: 'EUR', is_active: true });
  const [editingExtra, setEditingExtra] = useState<ExtraService | null>(null);

  // Auth check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin';
      }
    }
  }, []);

  // Load data
  useEffect(() => {
    fetchSettings();
    fetchRoutes();
    fetchGallery();
    fetchExtras();
  }, []);

  // Check if selected route exists and auto-fill prices
  useEffect(() => {
    if (!newRoute.from || !newRoute.to) return;
    const existing = routes.find(r => 
      (r.from.trim().toLowerCase() === newRoute.from.trim().toLowerCase() && r.to.trim().toLowerCase() === newRoute.to.trim().toLowerCase()) ||
      (r.from.trim().toLowerCase() === newRoute.to.trim().toLowerCase() && r.to.trim().toLowerCase() === newRoute.from.trim().toLowerCase())
    );
    if (existing) {
      setNewRoute(prev => {
        if (
          prev.price === existing.price &&
          prev.price_vito === existing.price_vito &&
          prev.price_maybach === existing.price_maybach &&
          prev.price_minibus === existing.price_minibus &&
          prev.currency === existing.currency
        ) {
          return prev;
        }
        return {
          ...prev,
          price: existing.price,
          price_vito: existing.price_vito ?? null,
          price_maybach: existing.price_maybach ?? null,
          price_minibus: existing.price_minibus ?? null,
          currency: existing.currency
        };
      });
    } else {
      setNewRoute(prev => {
        if (
          prev.price === 0 &&
          prev.price_vito === null &&
          prev.price_maybach === null &&
          prev.price_minibus === null
        ) {
          return prev;
        }
        return {
          ...prev,
          price: 0,
          price_vito: null,
          price_maybach: null,
          price_minibus: null
        };
      });
    }
  }, [newRoute.from, newRoute.to, routes]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Settings
  const fetchSettings = async () => {
    const res = await fetch('/api/admin/settings');
    const data = await res.json();
    if (data.phone) setPhone(data.phone);
    if (data.email) setEmail(data.email);
  };

  const saveSettings = async () => {
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, email }),
    });
    setLoading(false);
    showMessage('Ayarlar kaydedildi!');
  };

  // Routes
  const fetchRoutes = async () => {
    const res = await fetch('/api/admin/routes');
    const data = await res.json();
    if (Array.isArray(data)) setRoutes(data);
  };

  const addRoute = async () => {
    if (!newRoute.from || !newRoute.to || newRoute.price < 0) {
      alert('Lütfen Nereden, Nereye alanlarını ve geçerli bir fiyat giriniz.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute),
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Ekleme hatası: ' + (data.error || 'Bilinmeyen hata'));
      } else {
        setNewRoute({ 
          from: 'Antalya Havalimanı', 
          to: '', 
          price: 0, 
          price_vito: null, 
          price_maybach: null, 
          price_minibus: null, 
          currency: 'EUR' 
        });
        await fetchRoutes();
        showMessage('Rota eklendi!');
      }
    } catch (e: any) {
      alert('Sistem hatası: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTopRoute = async (routeId: number) => {
    if (!newRoute.from || !newRoute.to || newRoute.price < 0) {
      alert('Lütfen geçerli fiyat bilgisi giriniz.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/routes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: routeId,
          from: newRoute.from,
          to: newRoute.to,
          price: newRoute.price,
          price_vito: newRoute.price_vito,
          price_maybach: newRoute.price_maybach,
          price_minibus: newRoute.price_minibus,
          currency: newRoute.currency
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Güncelleme hatası: ' + (data.error || 'Bilinmeyen hata'));
      } else {
        await fetchRoutes();
        showMessage('Mevcut Rota Başarıyla Güncellendi!');
      }
    } catch (e: any) {
      alert('Sistem hatası: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveEditedRoute = async () => {
    if (!editingRoute) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/routes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRoute),
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Güncelleme hatası: ' + (data.error || 'Bilinmeyen hata'));
      } else {
        setEditingRoute(null);
        await fetchRoutes();
        showMessage('Rota güncellendi!');
      }
    } catch (e: any) {
      alert('Sistem hatası: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoute = async (id: number) => {
    if (!confirm('Bu rotayı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/routes?id=${id}`, { method: 'DELETE' });
    await fetchRoutes();
    showMessage('Rota silindi!');
  };

  const loadDefaultRoutes = async () => {
    if (!confirm('36 adet varsayılan rotayı yüklemek istediğinize emin misiniz? (Mevcut olanlar güncellenir)')) return;
    setLoading(true);
    for (const [to, price] of Object.entries(DEFAULT_ROUTES)) {
      await fetch('/api/admin/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Antalya Havalimanı', to, price, currency: 'EUR' }),
      });
    }
    await fetchRoutes();
    setLoading(false);
    showMessage('Varsayılan rotalar yüklendi!');
  };

  // Gallery
  const fetchGallery = async () => {
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    if (Array.isArray(data)) setGalleryItems(data);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan büyük olamaz!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        setNewGallery({ ...newGallery, url: data.url });
        showMessage('Dosya başarıyla yüklendi, şimdi galeriye ekleyebilirsiniz.');
      } else {
        alert(data.error || 'Yükleme hatası');
      }
    } catch (err) {
      alert('Yükleme sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const addGallery = async () => {
    if (!newGallery.url) return;
    setLoading(true);
    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGallery),
    });
    setNewGallery({ url: '', type: 'image' });
    if (fileInputRef.current) fileInputRef.current.value = '';
    await fetchGallery();
    setLoading(false);
    showMessage('Galeri öğesi eklendi!');
  };

  const deleteGallery = async (id: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    await fetchGallery();
    showMessage('Galeri öğesi silindi!');
  };

  // Extras
  const fetchExtras = async () => {
    const res = await fetch('/api/admin/extras');
    const data = await res.json();
    if (Array.isArray(data)) setExtras(data);
  };

  const addExtra = async () => {
    if (!newExtra.name || newExtra.price < 0) return;
    setLoading(true);
    await fetch('/api/admin/extras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExtra),
    });
    setNewExtra({ name: '', image: '', price: 0, currency: 'EUR', is_active: true });
    await fetchExtras();
    setLoading(false);
    showMessage('Ekstra hizmet eklendi!');
  };

  const deleteExtra = async (id: number) => {
    if (!confirm('Bu ekstra hizmeti silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/extras?id=${id}`, { method: 'DELETE' });
    await fetchExtras();
    showMessage('Ekstra hizmet silindi!');
  };

  const saveEditedExtra = async () => {
    if (!editingExtra) return;
    setLoading(true);
    await fetch('/api/admin/extras', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingExtra),
    });
    setEditingExtra(null);
    await fetchExtras();
    setLoading(false);
    showMessage('Ekstra güncellendi!');
  };

  const toggleExtra = async (extra: ExtraService) => {
    setLoading(true);
    await fetch('/api/admin/extras', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...extra, is_active: !extra.is_active }),
    });
    await fetchExtras();
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  const tabs = [
    { id: 'settings' as Tab, label: 'İletişim Ayarları', icon: Settings },
    { id: 'routes' as Tab, label: 'Fiyat / Rotalar', icon: Route },
    { id: 'extras' as Tab, label: 'Ekstralar', icon: Plus },
    { id: 'gallery' as Tab, label: 'Galeri Yönetimi', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Bar */}
      <div className="bg-primary border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Vip Transfer Antalya Taksi <span className="text-gold">VIP</span> Admin
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Çıkış</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-900/40 border border-green-700 text-green-400 px-6 py-3 text-sm text-center">
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-primary border-r border-gray-800 p-4">
          <nav className="flex md:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                  activeTab === tab.id
                    ? 'bg-gold/10 text-gold border border-gold/30'
                    : 'text-gray-400 hover:text-white hover:bg-secondary'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-white mb-6">İletişim Ayarları</h2>
              <p className="text-gray-400 text-sm mb-8">Bu bilgiler sitenin tamamında görüntülenir ve WhatsApp yönlendirmelerinde kullanılır.</p>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Phone size={14} /> Telefon Numarası (WhatsApp):
                  </label>
                  <input
                    type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <p className="text-xs text-gray-500 mt-1">Örn: +90 542 7434648 veya +9+90 542 7434648</p>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Mail size={14} /> E-posta Adresi:
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Fiyat Listesi / Rotalar</h2>
                <button 
                  onClick={loadDefaultRoutes} 
                  disabled={loading}
                  className="mt-4 md:mt-0 text-sm bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded transition flex items-center gap-2"
                >
                  <Plus size={16} /> Varsayılan 36 Rotayı Yükle
                </button>
              </div>

              {/* Add or Edit Route Panel */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                {(() => {
                  const matchedRoute = routes.find(r => 
                    r.from && r.to && newRoute.from && newRoute.to && (
                      (r.from.trim().toLowerCase() === newRoute.from.trim().toLowerCase() && r.to.trim().toLowerCase() === newRoute.to.trim().toLowerCase()) ||
                      (r.from.trim().toLowerCase() === newRoute.to.trim().toLowerCase() && r.to.trim().toLowerCase() === newRoute.from.trim().toLowerCase())
                    )
                  );

                  return (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">
                            {matchedRoute ? 'Rota Fiyatlarını Güncelle' : 'Yeni Rota Ekle'}
                          </h3>
                          {matchedRoute ? (
                            <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-2.5 py-1 rounded-full font-semibold animate-pulse">
                              🔄 Sistemde Kayıtlı Rota (Düzenleniyor)
                            </span>
                          ) : (
                            <span className="bg-gold/10 border border-gold/30 text-gold text-xs px-2.5 py-1 rounded-full font-semibold">
                              ➕ Yeni Rota Girişi
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsManualRoute(!isManualRoute);
                            setNewRoute(prev => ({ ...prev, from: isManualRoute ? 'Antalya Havalimanı' : '', to: '' }));
                          }}
                          className={`text-xs py-1.5 px-3 rounded-lg font-semibold transition-all ${
                            isManualRoute ? 'bg-zinc-800 text-gray-400 hover:text-white' : 'bg-gold text-black'
                          }`}
                        >
                          {isManualRoute ? '📋 Listeden Seç (Kolay)' : '✍️ Kendim Yazacağım (Manuel)'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {isManualRoute ? (
                          <>
                            <input
                              type="text" value={newRoute.from} onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                              placeholder="Nereden (Örn: Kumköy)"
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-full"
                            />
                            <input
                              type="text" value={newRoute.to} onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                              placeholder="Nereye (Örn: Belek)"
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-full"
                            />
                          </>
                        ) : (
                          <>
                            <select
                              value={newRoute.from} onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-full"
                            >
                              <option value="" disabled>Nereden</option>
                              {ADMIN_LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <select
                              value={newRoute.to} onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-full"
                            >
                              <option value="" disabled>Nereye</option>
                              {ADMIN_LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                          </>
                        )}
                        
                        <select
                          value={newRoute.currency} onChange={(e) => setNewRoute({ ...newRoute, currency: e.target.value })}
                          className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-full"
                        >
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="TRY">TRY (₺)</option>
                        </select>

                        {matchedRoute ? (
                          <button
                            onClick={() => updateTopRoute(matchedRoute.id)} disabled={loading}
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded-lg transition-colors py-3 md:py-0 w-full"
                          >
                            <Save size={18} /> Kaydet ve Güncelle
                          </button>
                        ) : (
                          <button
                            onClick={addRoute} disabled={loading}
                            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-extrabold rounded-lg transition-colors py-3 md:py-0 w-full"
                          >
                            <Plus size={18} /> Yeni Rota Olarak Ekle
                          </button>
                        )}
                      </div>

                      {/* 4 Vehicle Prices Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-gray-400 font-semibold">Sedan Fiyatı</span>
                          <input
                            type="number" 
                            value={newRoute.price || ''} 
                            onChange={(e) => setNewRoute({ ...newRoute, price: parseFloat(e.target.value) || 0 })}
                            placeholder="Sedan Fiyatı"
                            className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-gray-400 font-semibold">Vito (Boşsa Sedan + 5)</span>
                          <input
                            type="number" 
                            value={newRoute.price_vito !== undefined && newRoute.price_vito !== null ? newRoute.price_vito : ''} 
                            onChange={(e) => setNewRoute({ ...newRoute, price_vito: e.target.value === '' ? null : parseFloat(e.target.value) })}
                            placeholder="Otomatik (+5)"
                            className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-gray-400 font-semibold">Maybach (Boşsa Sedan + 10)</span>
                          <input
                            type="number" 
                            value={newRoute.price_maybach !== undefined && newRoute.price_maybach !== null ? newRoute.price_maybach : ''} 
                            onChange={(e) => setNewRoute({ ...newRoute, price_maybach: e.target.value === '' ? null : parseFloat(e.target.value) })}
                            placeholder="Otomatik (+10)"
                            className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-gray-400 font-semibold">Minibus (Boşsa Sedan + 20)</span>
                          <input
                            type="number" 
                            value={newRoute.price_minibus !== undefined && newRoute.price_minibus !== null ? newRoute.price_minibus : ''} 
                            onChange={(e) => setNewRoute({ ...newRoute, price_minibus: e.target.value === '' ? null : parseFloat(e.target.value) })}
                            placeholder="Otomatik (+20)"
                            className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold text-sm"
                          />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Route List */}
              <div className="space-y-3">
                {routes.length === 0 && (
                  <p className="text-gray-500 text-center py-8 bg-secondary border border-gray-800 rounded-lg">Henüz rota eklenmemiş. Yukarıdan "Varsayılan 36 Rotayı Yükle" butonuna tıklayabilirsiniz.</p>
                )}
                {routes.map((r) => (
                  <div key={r.id} className="bg-secondary border border-gray-800 rounded-lg p-4 flex flex-col items-center gap-4">
                    {editingRoute?.id === r.id ? (
                      // Inline Edit Mode
                      <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-3">
                          <div className="flex flex-col gap-1 w-full md:flex-1">
                            <span className="text-xs text-gray-500 font-medium">Nereden</span>
                            <input
                              type="text" value={editingRoute.from} onChange={(e) => setEditingRoute({ ...editingRoute, from: e.target.value })}
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2.5 outline-none focus:border-gold w-full text-sm"
                            />
                          </div>
                          <span className="hidden md:inline text-gold self-end mb-3">→</span>
                          <div className="flex flex-col gap-1 w-full md:flex-1">
                            <span className="text-xs text-gray-500 font-medium">Nereye</span>
                            <input
                              type="text" value={editingRoute.to} onChange={(e) => setEditingRoute({ ...editingRoute, to: e.target.value })}
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2.5 outline-none focus:border-gold w-full text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full md:w-32">
                            <span className="text-xs text-gray-500 font-medium">Para Birimi</span>
                            <select
                              value={editingRoute.currency} onChange={(e) => setEditingRoute({ ...editingRoute, currency: e.target.value })}
                              className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2.5 outline-none focus:border-gold w-full text-sm"
                            >
                              <option value="EUR">EUR (€)</option>
                              <option value="USD">USD ($)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="TRY">TRY (₺)</option>
                            </select>
                          </div>
                        </div>

                        {/* Vehicle specific prices */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 w-full">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 font-semibold">Sedan Fiyatı</span>
                            <input
                              type="number" 
                              value={editingRoute.price || ''} 
                              onChange={(e) => setEditingRoute({ ...editingRoute, price: parseFloat(e.target.value) || 0 })}
                              placeholder="Fiyat"
                              className="bg-secondary border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 font-semibold">Vito (Boşsa Sedan + 5)</span>
                            <input
                              type="number" 
                              value={editingRoute.price_vito !== undefined && editingRoute.price_vito !== null ? editingRoute.price_vito : ''} 
                              onChange={(e) => setEditingRoute({ ...editingRoute, price_vito: e.target.value === '' ? null : parseFloat(e.target.value) })}
                              placeholder="Otomatik (+5)"
                              className="bg-secondary border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 font-semibold">Maybach (Boşsa Sedan + 10)</span>
                            <input
                              type="number" 
                              value={editingRoute.price_maybach !== undefined && editingRoute.price_maybach !== null ? editingRoute.price_maybach : ''} 
                              onChange={(e) => setEditingRoute({ ...editingRoute, price_maybach: e.target.value === '' ? null : parseFloat(e.target.value) })}
                              placeholder="Otomatik (+10)"
                              className="bg-secondary border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 font-semibold">Minibus (Boşsa Sedan + 20)</span>
                            <input
                              type="number" 
                              value={editingRoute.price_minibus !== undefined && editingRoute.price_minibus !== null ? editingRoute.price_minibus : ''} 
                              onChange={(e) => setEditingRoute({ ...editingRoute, price_minibus: e.target.value === '' ? null : parseFloat(e.target.value) })}
                              placeholder="Otomatik (+20)"
                              className="bg-secondary border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end w-full mt-1">
                          <button onClick={saveEditedRoute} disabled={loading} className="flex items-center gap-1.5 text-green-400 hover:text-green-300 py-2 px-4 bg-green-400/10 rounded text-sm font-semibold transition-all">
                            <Save size={16} /> Kaydet
                          </button>
                          <button onClick={() => setEditingRoute(null)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 py-2 px-4 bg-gray-800 rounded text-sm transition-all">
                            <X size={16} /> İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm font-medium">{r.from}</span>
                            <span className="text-gold">→</span>
                            <span className="text-white font-bold text-base">{r.to}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs bg-zinc-900 border border-zinc-800 text-gray-400 px-2 py-1 rounded">Sedan: <strong className="text-gold font-bold">{r.price} €</strong></span>
                            <span className="text-xs bg-zinc-900 border border-zinc-800 text-gray-400 px-2 py-1 rounded">Vito: <strong className="text-gold font-bold">{r.price_vito !== undefined && r.price_vito !== null ? r.price_vito : r.price + 5} €</strong></span>
                            <span className="text-xs bg-zinc-900 border border-zinc-800 text-gray-400 px-2 py-1 rounded">Maybach: <strong className="text-gold font-bold">{r.price_maybach !== undefined && r.price_maybach !== null ? r.price_maybach : r.price + 10} €</strong></span>
                            <span className="text-xs bg-zinc-900 border border-zinc-800 text-gray-400 px-2 py-1 rounded">Minibüs: <strong className="text-gold font-bold">{r.price_minibus !== undefined && r.price_minibus !== null ? r.price_minibus : r.price + 20} €</strong></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 w-full md:w-auto shrink-0">
                          <button onClick={() => setEditingRoute(r)} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-400/5 rounded hover:bg-blue-400/10 transition-all">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => deleteRoute(r.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/5 rounded hover:bg-red-400/10 transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Galeri Yönetimi</h2>

              {/* Add new */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Yeni Görsel Ekle</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Option 1: File Upload */}
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <ImageIcon size={32} className="text-gray-500 mb-3" />
                    <p className="text-sm text-gray-400 mb-4">Bilgisayardan bir görsel seçin (Maks 5MB)</p>
                    <input 
                      type="file" 
                      accept="image/*,video/mp4" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded transition flex items-center gap-2"
                    >
                      <Upload size={16} /> Dosya Seç ve Yükle
                    </button>
                  </div>

                  {/* Option 2: URL Input */}
                  <div className="flex flex-col gap-3 justify-center">
                    <p className="text-sm text-gray-400 text-center mb-1">Veya direkt URL girin (Yüklenen dosya URL'si buraya gelecektir)</p>
                    <input
                      type="url" value={newGallery.url} onChange={(e) => setNewGallery({ ...newGallery, url: e.target.value })}
                      placeholder="https://... görsel URL'si"
                      className="w-full bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newGallery.type} onChange={(e) => setNewGallery({ ...newGallery, type: e.target.value })}
                        className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-1/3"
                      >
                        <option value="image">Resim</option>
                        <option value="video">Video</option>
                      </select>
                      <button
                        onClick={addGallery} disabled={loading || !newGallery.url}
                        className={`flex-1 flex items-center justify-center gap-2 font-bold rounded-lg transition-colors py-3 ${newGallery.url ? 'bg-gold hover:bg-gold-light text-black' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                      >
                        <Plus size={18} /> Galeriye Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryItems.length === 0 && (
                  <p className="text-gray-500 text-center py-8 col-span-3">Henüz galeri öğesi eklenmemiş.</p>
                )}
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-secondary border border-gray-800 rounded-xl overflow-hidden group relative">
                    {item.type === 'image' ? (
                      <img src={item.url} alt="" className="w-full h-48 object-cover" />
                    ) : (
                      <video src={item.url} className="w-full h-48 object-cover" controls preload="metadata" />
                    )}
                    <div className="p-3 flex items-center justify-between bg-zinc-900">
                      <span className="text-xs text-gray-400 truncate flex-1">{item.url.split('/').pop()}</span>
                      <button onClick={() => deleteGallery(item.id)} className="text-red-400 hover:text-red-300 ml-2 bg-red-400/10 p-1.5 rounded transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extras Tab */}
          {activeTab === 'extras' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Ekstra Hizmetler (Kutlama, Çiçek, Viski vb.)</h2>

              {/* Add new */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Yeni Ekstra Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text" value={newExtra.name} onChange={(e) => setNewExtra({ ...newExtra, name: e.target.value })}
                    placeholder="Adı (Örn: Çiçek, Şampanya)"
                    className="col-span-1 md:col-span-2 bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <input
                    type="number" value={newExtra.price} onChange={(e) => setNewExtra({ ...newExtra, price: parseFloat(e.target.value) })}
                    placeholder="Fiyat"
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <select
                    value={newExtra.currency} onChange={(e) => setNewExtra({ ...newExtra, currency: e.target.value })}
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                  <button
                    onClick={addExtra} disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold rounded-lg transition-colors py-3 md:py-0"
                  >
                    <Plus size={18} /> Ekle
                  </button>
                </div>
              </div>

              {/* Extra List */}
              <div className="space-y-3">
                {extras.length === 0 && (
                  <p className="text-gray-500 text-center py-8 bg-secondary border border-gray-800 rounded-lg">Ekstralar yükleniyor veya henüz eklenmemiş...</p>
                )}
                {extras.map((ex) => (
                  <div key={ex.id} className={`bg-secondary border rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 justify-between ${ex.is_active ? 'border-gray-800' : 'border-red-900/50 opacity-50'}`}>
                    {editingExtra?.id === ex.id ? (
                      // Inline Edit Mode
                      <div className="w-full flex flex-col md:flex-row items-center gap-3">
                        <input
                          type="text" value={editingExtra.name} onChange={(e) => setEditingExtra({ ...editingExtra, name: e.target.value })}
                          className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold flex-1 w-full"
                          placeholder="Ekstra adı"
                        />
                        <input
                          type="number" value={editingExtra.price} onChange={(e) => setEditingExtra({ ...editingExtra, price: parseFloat(e.target.value) })}
                          className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold w-full md:w-28"
                        />
                        <select
                          value={editingExtra.currency} onChange={(e) => setEditingExtra({ ...editingExtra, currency: e.target.value })}
                          className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-2 outline-none focus:border-gold w-full md:w-auto"
                        >
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="TRY">TRY (₺)</option>
                        </select>
                        <div className="flex gap-2 w-full md:w-auto justify-end">
                          <button onClick={saveEditedExtra} disabled={loading} className="text-green-400 hover:text-green-300 p-2 bg-green-400/10 rounded">
                            <Save size={18} />
                          </button>
                          <button onClick={() => setEditingExtra(null)} className="text-gray-400 hover:text-gray-300 p-2 bg-gray-800 rounded">
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex-1 flex items-center gap-4 w-full">
                          <h4 className="text-white font-medium flex-1">{ex.name}</h4>
                          <span className="text-gold font-bold text-lg bg-gold/10 px-3 py-1 rounded">
                            {ex.price} {ex.currency === 'EUR' ? '€' : ex.currency === 'USD' ? '$' : ex.currency === 'GBP' ? '£' : '₺'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExtra(ex)}
                            className={`text-xs px-2 py-1 rounded ${ex.is_active ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}
                          >
                            {ex.is_active ? 'Aktif' : 'Pasif'}
                          </button>
                          <button onClick={() => setEditingExtra(ex)} className="text-blue-400 hover:text-blue-300 p-2">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteExtra(ex.id)} className="text-red-400 hover:text-red-300 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
