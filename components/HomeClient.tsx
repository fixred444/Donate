"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Heart, Instagram, Menu, ShieldCheck, Sprout, Users, X } from "lucide-react";

const campaigns = [
  { id:"karhutla", tag:"DARURAT · SUMATERA", title:"Bantu warga terdampak karhutla", place:"Riau & Sumatera Selatan", raised:68450000, target:120000000, days:"12 hari lagi", image:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85", desc:"Dukung kebutuhan air bersih, masker, makanan siap saji, dan pemulihan keluarga yang terdampak asap." },
  { id:"banjir", tag:"PEMULIHAN", title:"Kembali pulih setelah banjir", place:"Kalimantan Selatan", raised:42750000, target:90000000, days:"18 hari lagi", image:"https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=85", desc:"Bantu keluarga membersihkan rumah, mendapatkan perlengkapan harian, dan memulai kembali aktivitas." },
  { id:"gempa", tag:"BANTUAN KELUARGA", title:"Hangatkan hari penyintas gempa", place:"Sulawesi Barat", raised:31200000, target:75000000, days:"23 hari lagi", image:"https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=85", desc:"Salurkan selimut, perlengkapan bayi, paket pangan, dan dukungan pemulihan untuk warga." }
];
const rupiah = (n:number) => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

export default function HomeClient(){
  const [modal,setModal]=useState(false), [selected,setSelected]=useState("karhutla"), [amount,setAmount]=useState(50000);
  const [name,setName]=useState(""), [notice,setNotice]=useState("");
  const [mobile,setMobile]=useState(false);
  const [showQr,setShowQr]=useState(false);


  async function donate(){
    if(!name.trim()){setNotice("Isi nama lengkap agar donasimu dapat dicatat.");return;}
    if(amount<10000){setNotice("Minimal donasi Rp10.000.");return;}
    setNotice("");
    setShowQr(true);
  }

  return <main>
    <div className="topline"><span><span className="live-dot"/> GERAKAN BAIK UNTUK INDONESIA</span><span>Transparan · Bersama · Berdampak</span></div>
    <nav className="nav wrap">
      <a className="brand" href="#"><span className="brand-mark"><Sprout size={20}/></span><span>nyala<span className="brand-light">bersama</span><small>KEBAIKAN YANG MENULAR</small></span></a>
      <div className={`nav-links ${mobile?"open":""}`}><a href="#aksi">Program bantuan</a><a href="#cerita">Cerita dampak</a><a href="#cara">Cara kerja</a><a href="#transparansi">Transparansi</a></div>
      <button className="nav-cta" onClick={()=>{setModal(true);setNotice("");}}><Heart size={16} fill="currentColor"/> Donasi sekarang</button>
      <button className="mobile-toggle" onClick={()=>setMobile(!mobile)} aria-label="Menu">{mobile?<X/>:<Menu/>}</button>
    </nav>

    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span/> SAATNYA KITA SALING MENJAGA</div>
        <h1>Di tengah bencana,<br/><em>kita bisa jadi</em><br/>harapan.</h1>
        <p className="hero-desc">Satu uluran tangan bisa berarti air bersih, tempat berlindung, dan awal baru. Mari hadir untuk saudara kita yang sedang berjuang.</p>
        <div className="hero-actions"><button className="button-primary" onClick={()=>{setModal(true);setNotice("");}}>Salurkan kebaikan <ArrowUpRight size={18}/></button><a className="text-link" href="#aksi">Lihat program <span>↘</span></a></div>
        <div className="trust-row"><div className="avatar-stack"><i>R</i><i>A</i><i>D</i><i>+</i></div><div><strong>Komunitas yang bergerak</strong><small>Setiap kontribusi punya arti.</small></div><div className="trust-seal"><ShieldCheck size={17}/><span>Donasi terpantau</span></div></div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo"><img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=90" alt="Hutan tropis Indonesia" /></div>
        <div className="photo-caption"><span>01 / 03</span><span>Menjaga bumi, menjaga sesama.</span></div>
        <div className="floating-note"><span className="note-icon"><Heart size={17} fill="currentColor"/></span><div><strong>Harapan tumbuh</strong><small>Dari kebaikan kecil kita.</small></div></div>
        <div className="hero-stamp">#GERAK<br/>BERSAMA</div>
      </div>
    </section>

    <section className="impact-band"><div className="wrap impact-inner"><div><small>BUKAN TENTANG SEBERAPA BESAR</small><strong>Yang penting, kita hadir.</strong></div><div className="impact-item"><Users/><span><b>Gotong royong</b><small>Kebaikan kolektif</small></span></div><div className="impact-item"><ShieldCheck/><span><b>Terbuka</b><small>Status bisa dipantau</small></span></div><div className="impact-item"><Sprout/><span><b>Berkelanjutan</b><small>Fokus pada pemulihan</small></span></div></div></section>

    <section className="section wrap" id="aksi">
      <div className="section-heading"><div><div className="eyebrow">ULURAN TANGANMU DIBUTUHKAN</div><h2>Ada yang bisa kita bantu hari ini.</h2></div><a className="text-link" href="#cara">Kenali gerakan ini <span>↗</span></a></div>
      <div className="campaign-grid">{campaigns.map((c,i)=><article className={`campaign-card ${i===0?"featured":""}`} key={c.id}>
        <div className="campaign-image"><img src={c.image} alt={c.title}/><span className="image-tag">{c.tag}</span><span className="image-number">0{i+1}</span></div>
        <div className="campaign-content"><div className="place">⌖ &nbsp;{c.place}</div><h3>{c.title}</h3><p>{c.desc}</p>
          <div className="progress-meta"><strong>{rupiah(c.raised)}</strong><span>terkumpul dari {rupiah(c.target)}</span></div><div className="progress"><i style={{width:`${Math.min(100,c.raised/c.target*100)}%`}}/></div>
          <div className="card-bottom"><span>{c.days}</span><button onClick={()=>{setSelected(c.id);setModal(true);setNotice("");}}>Bantu sekarang <ArrowUpRight size={16}/></button></div>
        </div>
      </article>)}</div>
      <p className="demo-note">Angka penggalangan pada tampilan awal ini adalah data contoh untuk pratinjau. Hubungkan database dan laporan penyaluran sebelum dipublikasikan.</p>
    </section>

    <section className="story-section" id="cerita"><div className="wrap story-layout"><div className="story-image"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85" alt="Relawan membantu masyarakat"/><div className="story-label">KEBAIKAN SELALU MENEMUKAN JALAN.</div></div><div className="story-copy"><div className="eyebrow">LEBIH DARI SEKADAR ANGKA</div><h2>Ketika kita bergerak bersama, beban terasa lebih ringan.</h2><p>Bencana mengubah banyak hal dalam sekejap. Tapi kepedulian mengingatkan kita bahwa tidak ada yang harus melewati masa sulit sendirian.</p><p>Nyala Bersama menghubungkan niat baik dengan kebutuhan nyata di lapangan—dengan informasi yang jelas dan proses yang bisa dipantau.</p><a href="#cara" className="text-link">Kenali cara kami bekerja <span>↗</span></a></div></div></section>

    <section className="section wrap steps" id="cara"><div className="eyebrow">MUDAH, AMAN, DAN TERBUKA</div><h2>Kebaikanmu sampai dengan jelas.</h2><div className="steps-grid"><div><b>01</b><Heart/><h3>Pilih kepedulianmu</h3><p>Tentukan program dan nominal donasi yang ingin kamu berikan.</p></div><div><b>02</b><ShieldCheck/><h3>Bayar dengan QRIS</h3><p>Pindai QRIS menggunakan DANA atau aplikasi pembayaran lain yang mendukung QRIS.</p></div><div><b>03</b><Check/><h3>Kirim bukti pembayaran</h3><p>Simpan bukti transaksi dan kirimkan kepada pengelola untuk verifikasi manual.</p></div></div></section>

    <section className="closing"><div className="wrap closing-inner"><div><div className="eyebrow">SEKECIL APA PUN, TETAP BERARTI</div><h2>Mari nyalakan harapan,<br/><em>satu aksi hari ini.</em></h2></div><button className="button-light" onClick={()=>{setModal(true);setNotice("");}}>Saya mau membantu <ArrowUpRight size={18}/></button></div></section>
    <footer className="footer wrap" id="transparansi"><a className="brand" href="#"><span className="brand-mark"><Sprout size={20}/></span><span>nyala<span className="brand-light">bersama</span><small>KEBAIKAN YANG MENULAR</small></span></a><p>Ruang untuk kepedulian, aksi, dan harapan.</p><div><a href="#aksi">Program</a><a href="#cara">Cara kerja</a><a href="mailto:halo@nyalabersama.id">Kontak</a><span>© 2026 Nyala Bersama</span></div></footer>

    {modal&&<div className="modal-backdrop" onClick={()=>setModal(false)}><div className="donation-modal" onClick={e=>e.stopPropagation()}>
      <button className="modal-close" onClick={()=>setModal(false)} aria-label="Tutup"><X/></button>
      <div className="modal-eyebrow">SATU KEBAIKAN, BANYAK HARAPAN</div>
      {showQr?<div className="success-state"><h2>Scan QRIS untuk berdonasi</h2><p>Masukkan nominal <strong>{rupiah(amount)}</strong> di aplikasi pembayaranmu jika diminta. QR ini terbaca atas nama merchant <strong>FEL STORE</strong> (Kab. Deli Serdang). Lanjutkan hanya jika nama tersebut memang milik pengelola donasi dan kamu mengenalinya.</p><img src="/qris-donasi.jpg" alt="QRIS donasi Nyala Bersama" style={{display:"block",width:"min(100%,320px)",height:"auto",margin:"18px auto",border:"1px solid #e5e1d8",borderRadius:12}}/><p style={{fontSize:13}}>Setelah membayar, simpan bukti transaksi dan kirimkan kepada pengelola untuk pencatatan. QRIS statis tidak mengirim notifikasi transaksi ke website, jadi status donasi tidak bisa berubah otomatis.</p><button className="button-primary full" onClick={()=>{setShowQr(false);setModal(false);}}>Selesai</button></div>:<>
      <h2>Yuk, jadi bagian dari harapan.</h2><p className="modal-sub">Pilih program dan nominal yang ingin kamu salurkan.</p>
      <label className="field-label">PROGRAM BANTUAN</label><select value={selected} onChange={e=>setSelected(e.target.value)}>{campaigns.map(c=><option value={c.id} key={c.id}>{c.title}</option>)}</select>
      <label className="field-label">NOMINAL DONASI</label><div className="amount-options">{[25000,50000,100000,250000].map(n=><button className={amount===n?"chosen":""} onClick={()=>setAmount(n)} key={n}>{rupiah(n)}</button>)}</div>
      <div className="custom-amount"><span>Rp</span><input type="number" min="10000" step="1000" value={amount} onChange={e=>setAmount(Number(e.target.value))}/></div>
      <label className="field-label">NAMA LENGKAP</label><input className="form-input" placeholder="Nama kamu" value={name} onChange={e=>setName(e.target.value)}/>
      {notice&&<div className="notice">{notice}</div>}
      <button className="button-primary full" disabled={amount<10000} onClick={donate}>{`Tampilkan QRIS ${rupiah(amount)}`} <ArrowUpRight size={17}/></button>
      <div className="secure-note"><ShieldCheck size={15}/> QRIS statis. Pastikan nama merchant dan nominal benar sebelum membayar.</div>
      </>}
    </div></div>}
  </main>;
}