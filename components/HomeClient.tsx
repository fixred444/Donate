"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, Flame, Heart, Leaf, Menu, ShieldCheck, Trees, Users, X } from "lucide-react";

const money = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function HomeClient() {
  const [modal, setModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [amount, setAmount] = useState(50000);
  const [custom, setCustom] = useState("");
  const [donor, setDonor] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function openDonation() {
    setModal(true); setShowQr(false); setError("");
  }

  function continueToQr() {
    const value = custom ? Number(custom.replace(/\D/g, "")) : amount;
    if (!donor.trim()) { setError("Masukkan nama agar donasimu bisa dicatat."); return; }
    if (!Number.isFinite(value) || value < 10000) { setError("Minimal donasi Rp10.000."); return; }
    setAmount(value); setError(""); setShowQr(true);
  }

  return <main>
    <div className="announcement"><span className="pulse-dot"/> GERAKAN PEDULI KARHUTLA <span className="announcement-sep">·</span> SUMATERA, INDONESIA</div>
    <header className="site-header wrap">
      <a className="logo" href="#home" aria-label="Nyala Bersama beranda"><span className="logo-symbol"><Flame size={24} fill="currentColor"/></span><span className="logo-words">NYALA<span>BERSAMA</span><small>BERBAGI HARI INI, MENJAGA ESOK</small></span></a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}>
        <a href="#misi" onClick={() => setMenuOpen(false)}>Misi kami</a><a href="#dampak" onClick={() => setMenuOpen(false)}>Kenapa penting</a><a href="#cara" onClick={() => setMenuOpen(false)}>Cara berdonasi</a>
      </nav>
      <button className="header-donate" onClick={openDonation}>Donasi <ArrowRight size={16}/></button>
      <button className="menu-toggle" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="home">
      <div className="hero-image" role="img" aria-label="Petugas berjuang memadamkan kebakaran hutan" />
      <div className="hero-shade"/>
      <div className="hero-content wrap">
        <div className="hero-kicker reveal"><span className="kicker-dot"/> SAATNYA BERGERAK BERSAMA</div>
        <h1 className="reveal delay-1">Hutan terbakar.<br/><em>Harapan jangan</em><br/>ikut padam.</h1>
        <p className="hero-lead reveal delay-2">Asap dan api mengancam ruang hidup. Mari bantu kebutuhan darurat warga terdampak dan dukung pemulihan lingkungan.</p>
        <div className="hero-buttons reveal delay-3"><button className="primary-button" onClick={openDonation}><Heart size={17} fill="currentColor"/> Donasi sekarang <ArrowRight size={17}/></button><a href="#misi" className="scroll-link">Kenali gerakannya <ArrowDown size={15}/></a></div>
        <div className="hero-footnote reveal delay-3"><ShieldCheck size={16}/> QRIS statis · Pembayaran diverifikasi manual</div>
      </div>
      <div className="hero-index"><span>01</span> / PEDULI HUTAN & SESAMA</div>
    </section>

    <section className="intro wrap reveal" id="misi">
      <div className="intro-label"><span>01</span><i/> TENTANG GERAKAN</div>
      <div className="intro-copy"><h2>Api bisa melahap pepohonan dalam hitungan jam. <em>Kepedulian bisa membantu membangun kembali.</em></h2><p>Nyala Bersama adalah ruang ajakan untuk saling membantu saat karhutla terjadi. Donasi ditujukan untuk mendukung kebutuhan darurat dan pemulihan—dengan penggunaan dana yang perlu dicatat dan dilaporkan secara terbuka oleh pengelola.</p></div>
    </section>

    <section className="feature wrap" id="dampak">
      <div className="feature-photo reveal"><img src="/karhutla-hero.jpg" alt="Suasana kebakaran hutan dan petugas pemadam"/><span className="photo-chip"><Flame size={14}/> DARURAT KARHUTLA</span></div>
      <div className="feature-copy reveal delay-1"><div className="section-kicker">02 / MENGAPA KITA PEDULI</div><h2>Yang terdampak bukan hanya hutan.</h2><p>Kebakaran hutan dan lahan membawa asap, mengganggu kesehatan, merusak habitat, dan membuat aktivitas warga terhenti. Bantuan kecil dapat ikut meringankan kebutuhan mereka.</p><div className="benefit-list"><div><span><Users size={19}/></span><p><b>Dukung warga terdampak</b><small>Bantu kebutuhan dasar sesuai kondisi lapangan.</small></p></div><div><span><Trees size={19}/></span><p><b>Jaga ruang hidup</b><small>Dukung upaya pemulihan lingkungan.</small></p></div><div><span><Leaf size={19}/></span><p><b>Rawat harapan jangka panjang</b><small>Bangun kepedulian yang berkelanjutan.</small></p></div></div><button className="text-button" onClick={openDonation}>Ikut membantu <ArrowRight size={16}/></button></div>
    </section>

    <section className="donation-section" id="cara"><div className="wrap donation-layout">
      <div className="donation-copy reveal"><div className="section-kicker">03 / SALURKAN BANTUAN</div><h2>Satu langkah kecil.<br/><em>Arti yang besar.</em></h2><p>Pindai QRIS menggunakan aplikasi pembayaran yang mendukung QRIS, termasuk DANA. Masukkan nominal donasi pada aplikasi jika diminta.</p><div className="steps-mini"><div><b>01</b><span>Pindai QRIS</span></div><div><b>02</b><span>Masukkan nominal</span></div><div><b>03</b><span>Simpan bukti bayar</span></div></div></div>
      <div className="qr-card reveal delay-1"><div className="qr-card-head"><div><span className="qr-overline">PEMBAYARAN QRIS</span><h3>Scan untuk berdonasi</h3></div><span className="qr-static">QRIS STATIS</span></div><div className="qr-frame"><img src="/qris-donasi.jpg" alt="QRIS pembayaran donasi"/></div><p className="qr-hint">Buka DANA atau aplikasi pembayaran pilihanmu, lalu pindai kode QR di atas.</p><button className="qr-button" onClick={openDonation}>Panduan donasi <ArrowRight size={16}/></button><div className="qr-warning"><ShieldCheck size={16}/> Periksa nama merchant sebelum membayar. Pembayaran perlu diverifikasi manual.</div></div>
    </div></section>

    <section className="closing wrap reveal"><div className="closing-mark"><Flame size={28} fill="currentColor"/></div><p>Hutan yang pulih dimulai dari kepedulian yang nyata.</p><h2>Jangan biarkan api<br/><em>memadamkan harapan.</em></h2><button className="primary-button" onClick={openDonation}>Saya ingin membantu <ArrowRight size={17}/></button></section>

    <footer className="site-footer"><div className="wrap footer-inner"><a className="logo footer-logo" href="#home"><span className="logo-symbol"><Flame size={22} fill="currentColor"/></span><span className="logo-words">NYALA<span>BERSAMA</span><small>BERBAGI HARI INI, MENJAGA ESOK</small></span></a><p>Gerakan kepedulian untuk warga terdampak karhutla dan pemulihan lingkungan.</p><span className="copyright">© 2026 NYALA BERSAMA</span></div></footer>

    {modal && <div className="modal-overlay" onClick={() => setModal(false)}><section className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={e => e.stopPropagation()}><button className="modal-x" aria-label="Tutup" onClick={() => setModal(false)}><X/></button>
      {!showQr ? <><div className="section-kicker">DONASI KARHUTLA</div><h2 id="donation-title">Setiap bantuan berarti.</h2><p className="modal-description">Isi nama dan pilih nominal. Setelah itu QRIS akan ditampilkan untuk dipindai.</p><label className="input-label" htmlFor="donor-name">NAMA DONATUR</label><input id="donor-name" className="donor-input" value={donor} onChange={e => setDonor(e.target.value)} placeholder="Nama kamu"/><span className="input-label">PILIH NOMINAL</span><div className="amount-grid">{[25000,50000,100000,200000].map(v => <button type="button" className={!custom && amount===v ? "amount-active" : ""} key={v} onClick={() => {setAmount(v);setCustom("");}}>{money(v)}</button>)}</div><label className="input-label" htmlFor="custom-amount">ATAU NOMINAL LAIN</label><input id="custom-amount" className="donor-input" inputMode="numeric" value={custom} onChange={e => setCustom(e.target.value.replace(/\D/g,""))} placeholder="Contoh: 75000"/>{error && <p className="form-error">{error}</p>}<button className="primary-button modal-submit" onClick={continueToQr}>Lanjut ke QRIS <ArrowRight size={17}/></button></> : <><div className="section-kicker">LANGKAH TERAKHIR</div><h2 id="donation-title">Terima kasih, {donor}.</h2><p className="modal-description">Nominal pilihanmu: <b>{money(amount)}</b>. Pindai QRIS ini dari aplikasi pembayaranmu. Jika aplikasi meminta nominal, masukkan sesuai pilihan.</p><img className="modal-qr" src="/qris-donasi.jpg" alt="QRIS donasi"/><p className="merchant-alert">Pastikan nama merchant yang muncul di aplikasi memang sesuai dengan pengelola donasi sebelum menyelesaikan pembayaran.</p><p className="manual-note">QRIS ini bersifat statis. Website tidak menerima notifikasi pembayaran otomatis. Simpan bukti transaksi dan hubungi pengelola untuk verifikasi manual.</p><button className="primary-button modal-submit" onClick={() => setModal(false)}>Selesai <Check size={17}/></button></>}
    </section></div>}
  </main>;
}
