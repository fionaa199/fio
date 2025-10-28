import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// ---------- Data hardcoded (galeri & paket) ----------
const GALLERY = [
  { id: 'g1', src: 'https://picsum.photos/id/1011/900/600', caption: 'Graduation - Studio Look' },
  { id: 'g2', src: 'https://picsum.photos/id/1012/900/600', caption: 'Personal Portrait - Minimalist' },
  { id: 'g3', src: 'https://picsum.photos/id/1013/900/600', caption: 'Friendship - Bestie' },
  { id: 'g4', src: 'https://picsum.photos/id/1015/900/600', caption: 'Prewedding - Romantic' },
  { id: 'g5', src: 'https://picsum.photos/id/1016/900/600', caption: 'Maternity - Soft Light' },
  { id: 'g6', src: 'https://picsum.photos/id/1021/900/600', caption: 'Family Time - Candid' },
  { id: 'g7', src: 'https://picsum.photos/id/1025/900/600', caption: 'Birthday Kids - Fun' },
  { id: 'g8', src: 'https://picsum.photos/id/1035/900/600', caption: 'Studio Set - Spotlights' }
];

const PACKAGES = {
  Graduation: [
    { id: 'g_hemat', title: 'Paket Graduation Hemat', price: 'Rp 150.000', img: 'https://picsum.photos/seed/graduation1/600/400', desc: 'Sesi 30 menit, 5 softcopy, editing dasar.' },
    { id: 'g_standar', title: 'Paket Graduation Standar', price: 'Rp 250.000', img: 'https://picsum.photos/seed/graduation2/600/400', desc: 'Sesi 45 menit, 10 softcopy, editing & retouch ringan.' },
    { id: 'g_minimalis', title: 'Paket Graduation Minimalis', price: 'Rp 200.000', img: 'https://picsum.photos/seed/graduation3/600/400', desc: 'Sesi 30 menit, 8 softcopy, background putih.' },
    { id: 'g_lux', title: 'Paket Graduation Luxury', price: 'Rp 500.000', img: 'https://picsum.photos/seed/graduation4/600/400', desc: 'Sesi 90 menit, full retouch, wardrobe & props.' },
    { id: 'g_single', title: 'Paket Graduation Single', price: 'Rp 180.000', img: 'https://picsum.photos/seed/graduation5/600/400', desc: 'Sesi single, cocok untuk pasfoto resmi.' },
    { id: 'g_couple', title: 'Paket Graduation Couple', price: 'Rp 330.000', img: 'https://picsum.photos/seed/graduation6/600/400', desc: 'Sesi untuk 2 orang, editing pasangan.' }
  ],
  'Personal Photo': [
    { id: 'p_min', title: 'Minimalis', price: 'Rp 120.000', img: 'https://picsum.photos/seed/personal1/600/400', desc: 'Sesi sederhana, cocok untuk portfolio.' },
    { id: 'p_lux', title: 'Luxury', price: 'Rp 350.000', img: 'https://picsum.photos/seed/personal2/600/400', desc: 'Sesi premium dengan lighting profesional.' }
  ],
  Friendship: [
    { id: 'f_super', title: 'Grup Super', price: 'Rp 300.000', img: 'https://picsum.photos/seed/friend1/600/400', desc: 'Sesi untuk grup besar.' },
    { id: 'f_simple', title: 'Grup Simple', price: 'Rp 200.000', img: 'https://picsum.photos/seed/friend2/600/400', desc: 'Sesi santai bersama teman.' },
    { id: 'f_bestie', title: 'Grup Bestie', price: 'Rp 220.000', img: 'https://picsum.photos/seed/friend3/600/400', desc: 'Paket bestie standar.' }
  ],
  Prewedding: [
    { id: 'pre_lux', title: 'Luxury', price: 'Rp 1.200.000', img: 'https://picsum.photos/seed/pre1/600/400', desc: 'Sesi prewedding lengkap.' },
    { id: 'pre_premium', title: 'Premium', price: 'Rp 900.000', img: 'https://picsum.photos/seed/pre2/600/400', desc: 'Paket premium untuk prewedding.' }
  ],
  Maternity: [
    { id: 'mat_min', title: 'Minimalis', price: 'Rp 250.000', img: 'https://picsum.photos/seed/mat1/600/400', desc: 'Sesi maternity sederhana.' },
    { id: 'mat_lux', title: 'Luxury', price: 'Rp 500.000', img: 'https://picsum.photos/seed/mat2/600/400', desc: 'Sesi maternity dengan props.' }
  ],
  'Family Time': [
    { id: 'fam_std', title: 'Standart', price: 'Rp 300.000', img: 'https://picsum.photos/seed/fam1/600/400', desc: 'Sesi keluarga standar.' },
    { id: 'fam_min', title: 'Minimalis', price: 'Rp 250.000', img: 'https://picsum.photos/seed/fam2/600/400', desc: 'Sesi keluarga minimalis.' }
  ],
  "B'day Kids / Fun Kids / Baby Smashcake": [
    { id: 'bd_std', title: 'Standart', price: 'Rp 200.000', img: 'https://picsum.photos/seed/kids1/600/400', desc: 'Sesi ulang tahun anak - standard.' },
    { id: 'bd_lux', title: 'Luxury', price: 'Rp 400.000', img: 'https://picsum.photos/seed/kids2/600/400', desc: 'Sesi lengkap dengan dekor dan props.' }
  ]
};

const LS_BOOKINGS = 'tt_demo_bookings';

// ---------- Helpers ----------
const timeSlots = () => { const out=[]; for(let h=9; h<=20; h++){ out.push(`${String(h).padStart(2,'0')}:00`); out.push(`${String(h).padStart(2,'0')}:20`); out.push(`${String(h).padStart(2,'0')}:40`); } return out; };

// ---------- App ----------
export default function App(){
  return (
    <Router>
      <div className="min-h-screen bg-[#f6efe8] text-[#1f2937]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// ---------- Header ----------
function Header(){
  return (
    <header className="bg-white/90 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo: taruh file logo di public/logo.png */}
          <img src="/logo.png" alt="Titik Tuju" className="h-10" />
          <nav className="hidden md:flex gap-6 text-gray-700">
            <NavLink to="/booking">Booking</NavLink>
            <NavLink to="/gallery">Galeri</NavLink>
            <NavLink to="/transactions">Transaksi Saya</NavLink>
          </nav>
        </div>
        <div>
          <a href="#" className="bg-[#b08a6b] text-white px-4 py-2 rounded">Tandatangan</a>
        </div>
      </div>
    </header>
  );
}
function NavLink({to, children}){ return <Link to={to} className="hover:underline">{children}</Link>; }

// ---------- Hero ----------
function Hero(){
  return (
    <section className="bg-transparent py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-600">Studio Foto dengan Konsep Aesthetic</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Titik Tuju</h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link to="/gallery" className="px-4 py-2 border rounded">Lihat Galeri</Link>
          <Link to="/booking" className="px-4 py-2 bg-[#b08a6b] text-white rounded">Booking Sekarang</Link>
        </div>
      </div>
    </section>
  );
}

// ---------- Booking Page ----------
function BookingPage(){
  const navigate = useNavigate();
  const defaultDate = new Date().toISOString().slice(0,10);
  const [category, setCategory] = useState('Graduation');
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES['Graduation'][0]);
  const [date, setDate] = useState(defaultDate);
  const [slot, setSlot] = useState(null);
  const [agree, setAgree] = useState(false);
  const [bookings, setBookings] = useState(()=> JSON.parse(localStorage.getItem(LS_BOOKINGS)||'[]'));

  useEffect(()=>{ setSelectedPackage(PACKAGES[category][0]); },[category]);
  useEffect(()=>{ localStorage.setItem(LS_BOOKINGS, JSON.stringify(bookings)); },[bookings]);

  const available = (s)=> !bookings.some(b=> b.date===date && b.slot===s && b.package.id===selectedPackage.id);

  const addBooking = ()=>{ 
    if(!slot) return alert('Silakan pilih jam yang tersedia.');
    if(!agree) return alert('Silakan setujui syarat & ketentuan.');
    const id = Date.now().toString(36);
    const newB = { id, category, package: selectedPackage, date, slot, createdAt: new Date().toISOString() };
    setBookings([newB, ...bookings]);
    alert('Booking berhasil (demo). Cek Transaksi Saya.');
    navigate('/transactions');
  };

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Pilih Kategori & Paket</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(PACKAGES).map(k=> (
              <button key={k} onClick={()=>setCategory(k)} className={`px-3 py-1 rounded-full border ${category===k? 'bg-[#b08a6b] text-white':'bg-white'}`}>{k}</button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold">Paket untuk {category}</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PACKAGES[category].map(pkg=> (
                <div key={pkg.id} className={`p-4 border rounded ${selectedPackage.id===pkg.id? 'border-[#b08a6b] shadow':''}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{pkg.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{pkg.desc}</p>
                      <div className="mt-3 flex gap-2 items-center">
                        <div className="text-sm text-gray-700 font-semibold">{pkg.price}</div>
                        <button onClick={()=>setSelectedPackage(pkg)} className="ml-auto px-3 py-1 bg-[#b08a6b] text-white rounded">Pilih</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Contoh Hasil Sesi</h4>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({length:8}).map((_,i)=> (
                  <div key={i} className="w-full h-28 bg-gray-100 rounded overflow-hidden">
                    <img src={`https://picsum.photos/seed/${selectedPackage.id}-${i}/400/300`} alt="sample" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Pilih Tanggal & Jam</h4>
              <div className="flex items-center gap-4 mt-3">
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2" />
                <div className="text-sm text-gray-500">Paket: <span className="font-semibold">{selectedPackage.title}</span></div>
              </div>

              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-auto pr-2">
                {timeSlots().map(s=> (
                  <button key={s} disabled={!available(s)} onClick={()=>setSlot(s)} className={`text-sm px-2 py-2 rounded-md shadow-sm ${slot===s? 'bg-[#b08a6b] text-white': available(s)? 'bg-white':'bg-gray-200 text-gray-400 line-through'}`}>{s}</button>
                ))}
              </div>

                <div className="mt-4 text-sm text-gray-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} /> Saya setuju dengan syarat & ketentuan
                  </label>
                </div>

                <div className="mt-4 flex gap-3">
                  <button onClick={addBooking} className="bg-[#b08a6b] text-white px-4 py-2 rounded">Booking</button>
                  <button onClick={()=>{ setSlot(null); setAgree(false); }} className="border px-4 py-2 rounded">Reset</button>
                </div>
              </div>
            </div>

            <aside className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Ringkasan</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Kategori:</strong> {category}</p>
                <p><strong>Paket:</strong> {selectedPackage.title}</p>
                <p><strong>Tanggal:</strong> {date}</p>
                <p><strong>Jam:</strong> {slot || 'Belum dipilih'}</p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">FYI</h4>
                <p className="text-sm text-gray-500">Demo frontend — data booking disimpan di browser (localStorage).</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
}

// ---------- Gallery Page ----------
function GalleryPage(){
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Galeri Pelanggan</h2>
      <p className="text-sm text-gray-500 mb-4">Contoh hasil sesi di Titik Tuju Studio.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {GALLERY.map(img=> (
          <div key={img.id} className="rounded overflow-hidden shadow-sm bg-white h-56">
            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            <div className="p-3 text-sm text-gray-700">{img.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Transactions Page ----------
function TransactionsPage(){
  const [bookings, setBookings] = useState(()=> JSON.parse(localStorage.getItem(LS_BOOKINGS)||'[]'));

  useEffect(()=>{ localStorage.setItem(LS_BOOKINGS, JSON.stringify(bookings)); },[bookings]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Transaksi Saya</h2>
      {bookings.length===0 ? <div className="text-gray-500">Belum ada booking.</div> : (
        <div className="space-y-4">
          {bookings.map(b=> (
            <div key={b.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
                <div className="font-semibold">{b.category} • {b.package.title}</div>
                <div className="text-sm text-gray-600">{b.date} — {b.slot}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>alert('Fitur pembayaran belum ada (demo).')} className="px-3 py-1 bg-green-500 text-white rounded">Bayar</button>
                <button onClick={()=>{
                  if(confirm('Hapus booking?')){
                    const remaining = bookings.filter(x=> x.id!==b.id); setBookings(remaining);
                  }
                }} className="px-3 py-1 border rounded">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Footer ----------
function Footer(){
  return (
    <footer className="mt-12 py-8">
      <div className="container mx-auto px-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} Titik Tuju Photo Studio</div>
    </footer>
  );
}

/* Put a logo image at public/logo.png before running dev server */
