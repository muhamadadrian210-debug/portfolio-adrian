export const homeMainHtml = `

      <!-- HERO SECTION -->
      <section class="hero" id="hero" style="min-height: 100vh; display: flex; align-items: center; position: relative; z-index: 10; padding-top: 110px;">
        <div class="hero__container container">
          <div class="hero__content animate-on-scroll">
            <div class="hero__overhead" style="margin-bottom: 1.5rem;">
              <span class="hero__brand" style="margin:0;">SIVILIZE CORP</span>
            </div>
            <p style="font-size: 0.95rem; letter-spacing: 3px; color: #cbd5e1; text-transform: uppercase; margin-bottom: 1.25rem;">Enterprise Solution / Business Ecosystem / Retail Division</p>
            <h1 class="hero__title" style="line-height: 1; color: #fff !important; cursor: default; text-shadow: 0 0 30px rgba(79, 70, 229, 0.2);">
              ARSITEKTUR DIGITAL <br /> UNTUK EFISIENSI <br /> INDUSTRI & BISNIS.
            </h1>
            <p class="hero__description" style="max-width: 900px; margin-top: 2rem; font-size: 1.1rem; color: var(--color-body); line-height: 1.8; letter-spacing: 0.5px; font-weight: 300;">
              <strong style="color: #fff;">Sivilize Corp</strong> adalah pusat ekosistem teknologi yang membangun infrastruktur digital kustom, platform manajemen proyek, dan solusi operasional modern terintegrasi.
            </p>
            <div class="hero__cta-group mt-16" style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2.5rem;">
              <a href="#ecosystem" class="btn btn--primary" style="padding: 22px 40px; font-size: 1rem; letter-spacing: 3px; background: var(--color-primary); color: #fff; font-weight: 700; text-decoration: none; border-radius: 2px; transition: all 0.4s ease;">LIHAT EKOSISTEM</a>
              <a href="#contact" class="btn btn--outline-on-dark" style="padding: 22px 40px; font-size: 1rem; letter-spacing: 3px; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 700; background: transparent; text-decoration: none; border-radius: 2px; transition: all 0.4s ease;">KONSULTASI</a>
            </div>
            <div class="siweb-highlight" style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 2rem;">
              <span style="padding: 10px 16px; border: 1px solid rgba(79, 70, 229, 0.35); background: rgba(79, 70, 229, 0.1); color: #fff; font-size: 0.9rem; letter-spacing: 1px;">Sivilize Hub Pro</span>
              <span style="padding: 10px 16px; border: 1px solid rgba(79, 70, 229, 0.35); background: rgba(79, 70, 229, 0.1); color: #fff; font-size: 0.9rem; letter-spacing: 1px;">SiKasir & Dine</span>
              <span style="padding: 10px 16px; border: 1px solid rgba(79, 70, 229, 0.35); background: rgba(79, 70, 229, 0.1); color: #fff; font-size: 0.9rem; letter-spacing: 1px;">SiWeb Production</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ECOSYSTEM -->
      <section class="section" id="ecosystem" style="background: #080808; border-top: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: left; max-width: 980px; margin-bottom: 3rem;">
            <span class="section__label" style="color: var(--color-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">3 Pilar Ekosistem Sivilize Corp</span>
            <h2 class="section__title" style="font-size: clamp(2.2rem, 4vw, 3rem); color: #fff !important; margin-top: 1rem;">Satu brand, tiga jalur solusi digital.</h2>
          </div>

          <div class="siweb-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;">
            <div class="service-card animate-on-scroll stagger-1" style="background: rgba(255,255,255,0.01); padding: 32px; border: 1px solid rgba(255,255,255,0.05); min-height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 12px;">Enterprise Solution</p>
                <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 12px;">Sivilize Hub Pro</h3>
                <p style="color: var(--color-body); line-height: 1.8;">
                  Sistem blueprint kustom untuk estimasi proyek, manajemen kontraktor, dan efisiensi korporat skala besar.
                </p>
              </div>
              <a href="#contact" style="display: inline-block; margin-top: 20px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Solusi Enterprise -></a>
            </div>
            <div class="service-card animate-on-scroll stagger-2" style="background: rgba(255,255,255,0.01); padding: 32px; border: 1px solid rgba(255,255,255,0.05); min-height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 12px;">Business Ecosystem</p>
                <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 12px;">SiKasir & Dine</h3>
                <p style="color: var(--color-body); line-height: 1.8;">
                  Modul manajemen kasir, inventaris, dan operasional internal yang siap diintegrasikan ke sistem bisnis Anda.
                </p>
              </div>
              <a href="#products" style="display: inline-block; margin-top: 20px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Pelajari Modul -></a>
            </div>
            <div class="service-card animate-on-scroll stagger-3" style="background: rgba(255,255,255,0.01); padding: 32px; border: 1px solid rgba(255,255,255,0.05); min-height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 12px;">Retail Division</p>
                <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 12px;">SiWeb Production</h3>
                <p style="color: var(--color-body); line-height: 1.8;">
                  Layanan digitalisasi kilat dan pembuatan website instan khusus untuk pelaku usaha lokal dan UMKM.
                </p>
              </div>
              <a href="/siweb" style="display: inline-block; margin-top: 20px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Kunjungi SiWeb -></a>
            </div>
          </div>
        </div>
      </section>

      <!-- BRAND VOICE -->
      <section class="section" id="brand-voice" style="background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));">
        <div class="container">
          <div style="display: grid; grid-template-columns: 360px 1fr; gap: 32px; align-items: center;">
            <div aria-hidden="true">
              <!-- Simple abstract SVG illustration to imply product ecosystem -->
              <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                <rect x="0" y="0" width="320" height="220" rx="12" fill="url(#g)" opacity="0.06"/>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#4f46e5" stop-opacity="0.25"/>
                    <stop offset="1" stop-color="#0ea5e9" stop-opacity="0.08"/>
                  </linearGradient>
                </defs>
                <g transform="translate(24,24)" opacity="0.95">
                  <circle cx="60" cy="40" r="28" fill="#0ea5e9" opacity="0.12"/>
                  <rect x="120" y="20" width="120" height="80" rx="8" fill="#4f46e5" opacity="0.06"/>
                  <path d="M20 140 C60 120, 160 120, 200 140" stroke="#7dd3fc" stroke-width="2" fill="none" opacity="0.08"/>
                </g>
              </svg>
            </div>
            <div>
              <h2 class="section__title" style="color: #fff !important; font-size: clamp(1.6rem, 3.6vw, 2.4rem);">Sivilize Corp — Perusahaan Produk & Solusi</h2>
              <p style="color: var(--color-body); margin-top: 1rem; font-size: 1.05rem; line-height: 1.8;">
                Sivilize Corp membangun produk digital yang nyata dan layanan pendukung yang membantu bisnis beroperasi dan berkembang. Produk unggulan kami — <strong>Sivilize Hub Pro</strong> dan <strong>SiKasir</strong> — menunjukkan kemampuan teknis dan komitmen kami terhadap solusi yang berkelanjutan.
              </p>
              <p style="color: var(--color-body); margin-top: 1rem; font-size: 1rem; line-height: 1.6;">
                Layanan website dan solusi custom tersedia sebagai bagian dari ekosistem yang mendukung operasi, pemasaran, dan pertumbuhan klien — bukan sekadar layanan lepas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- WHY SIVILIZE -->
      <section class="section" id="why-sivilize" style="background: #050505;">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: left; max-width: 980px; margin-bottom: 3rem;">
            <span class="section__label" style="color: var(--color-primary); text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">Kenapa Sivilize</span>
            <h2 class="section__title" style="font-size: clamp(2.2rem, 4vw, 3rem); color: #fff !important; margin-top: 1rem;">Mengapa banyak bisnis memilih Sivilize dibanding kompetitor.</h2>
          </div>

          <div class="why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <div class="service-card animate-on-scroll stagger-1" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 10px;">Fokus pada bisnis, bukan hanya tampilan</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Kami tidak hanya membuat website, kami merancang sistem yang membantu bisnis memperoleh trust, leads, dan konversi.</p>
            </div>
            <div class="service-card animate-on-scroll stagger-2" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 10px;">Transparan dan to the point</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Proses kerja jelas, harga masuk akal, dan kamu tahu apa yang didapat tanpa dibombardir jargon teknis.</p>
            </div>
            <div class="service-card animate-on-scroll stagger-3" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 10px;">Lebih dari website</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Kami bisa mengembangkan website menjadi produk digital yang lebih lengkap, seperti dashboard, kasir, atau solusi bisnis lain.</p>
            </div>
            <div class="service-card animate-on-scroll stagger-4" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 10px;">Bersaing dengan solusi nyata</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Banyak kompetitor hanya menawarkan desain. Kami menawarkan hasil yang bisa dipakai untuk bisnis, marketing, dan operasional.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES -->
      <section class="section" id="services" style="background: #080808;">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: left; max-width: 980px; margin-bottom: 3rem;">
            <span class="section__label" style="color: var(--color-primary); text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">Layanan Digital Sivilize</span>
            <h2 class="section__title" style="font-size: clamp(2.2rem, 4vw, 3rem); color: #fff !important; margin-top: 1rem;">Layanan yang mendukung pertumbuhan bisnis secara menyeluruh.</h2>
            <p class="section__subtitle" style="font-size: 1.1rem; color: var(--color-body); line-height: 1.8; text-align: left; max-width: 100%; margin-top: 1.2rem;">
              Website, landing page, dan solusi custom bukan pusat cerita kami — melainkan bagian dari ekosistem digital untuk mendukung periklanan, penjualan, serta operasional bisnis.
            </p>
          </div>

          <div class="package-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <div class="service-card animate-on-scroll stagger-1" style="background: linear-gradient(180deg, rgba(79, 70, 229, 0.12), rgba(255,255,255,0.01)); padding: 28px; border: 1px solid rgba(79, 70, 229, 0.35);">
              <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem;">Layanan 1</p>
              <h3 style="color: #fff; font-size: 1.35rem; margin: 12px 0;">Website & company profile</h3>
              <p style="font-size: 1.9rem; font-weight: 800; color: #fff; margin-bottom: 12px;">Opsional</p>
              <p style="color: var(--color-body); line-height: 1.8;">Website perusahaan, landing page, dan solusi digital penunjang yang membantu bisnis tampil profesional dan menarik pelanggan.</p>
            </div>
            <div class="service-card animate-on-scroll stagger-2" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem;">Layanan 2</p>
              <h3 style="color: #fff; font-size: 1.35rem; margin: 12px 0;">Produk digital internal</h3>
              <p style="font-size: 1.9rem; font-weight: 800; color: #fff; margin-bottom: 12px;">Kustom</p>
              <p style="color: var(--color-body); line-height: 1.8;">Solusi custom yang terintegrasi dengan kebutuhan bisnis, termasuk dashboard, sistem transaksi, dan alat operasional.</p>
            </div>
            <div class="service-card animate-on-scroll stagger-3" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #cbd5e1; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem;">Layanan 3</p>
              <h3 style="color: #fff; font-size: 1.35rem; margin: 12px 0;">Strategi dan growth digital</h3>
              <p style="font-size: 1.9rem; font-weight: 800; color: #fff; margin-bottom: 12px;">Pendamping</p>
              <p style="color: var(--color-body); line-height: 1.8;">Bantuan untuk menyelaraskan digital presence, pesan brand, dan proses bisnis agar lebih efektif untuk pertumbuhan.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PRODUCTS -->
      <section class="section" id="products" style="background: #050505;">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: left; max-width: 980px; margin-bottom: 3rem;">
            <span class="section__label" style="color: var(--color-primary); text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">Produk Pendukung</span>
            <h2 class="section__title" style="font-size: clamp(2.2rem, 4vw, 3rem); color: #fff !important; margin-top: 1rem;">Sivilize Hub Pro & SiKasir sebagai bukti kapasitas kami.</h2>
            <p class="section__subtitle" style="font-size: 1.1rem; color: var(--color-body); line-height: 1.8; text-align: left; max-width: 100%; margin-top: 1.2rem;">
              Kamu tidak hanya mendapatkan website. Kamu bisa bekerja dengan tim yang sudah membangun produk digital nyata untuk bisnis, kontraktor, dan UMKM.
            </p>
          </div>

          <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div class="service-card animate-on-scroll stagger-1" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Sivilize Hub Pro</p>
              <h3 style="color: #fff; font-size: 1.3rem; margin: 12px 0;">Sistem digital untuk kontraktor & tim proyek</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Membantu tim mengelola biaya, analisis proyek, dan laporan secara lebih terstruktur.</p>
              <a href="https://sivilize-hub-pro.vercel.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 16px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Lihat Sivilize Hub Pro →</a>
            </div>
            <div class="service-card animate-on-scroll stagger-2" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">SiKasir</p>
              <h3 style="color: #fff; font-size: 1.3rem; margin: 12px 0;">Solusi kasir modern untuk UMKM</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Dirancang untuk transaksi cepat, laporan sederhana, dan kemudahan penggunaan di berbagai perangkat.</p>
              <a href="https://sikasir-production.up.railway.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 16px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Lihat SiKasir →</a>
            </div>
            <div class="service-card animate-on-scroll stagger-3" style="background: rgba(255,255,255,0.01); padding: 28px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">SiWeb Production</p>
              <h3 style="color: #fff; font-size: 1.3rem; margin: 12px 0;">Website profesional & produksi konten</h3>
              <p style="color: var(--color-body); line-height: 1.8;">Paket pembuatan website yang fokus pada business-ready deliverables: landing page, profil perusahaan, hingga toko online terintegrasi.</p>
              <div style="display:flex; gap:12px; align-items:center; margin-top:12px;">
                <!-- gambar kedua — ilustrasi sederhana -->
                <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="1" y="6" width="70" height="40" rx="6" fill="#0ea5e9" opacity="0.12"/>
                  <rect x="8" y="14" width="24" height="6" rx="2" fill="#4f46e5" opacity="0.14"/>
                  <rect x="8" y="24" width="48" height="4" rx="2" fill="#4f46e5" opacity="0.08"/>
                </svg>
                <div style="font-size:0.95rem; color: var(--color-body);">Mulai dari <strong style="color:#fff;">Rp 800.000</strong> untuk paket standar (landing page / company profile).</div>
              </div>
              <a href="#pricing" style="display: inline-block; margin-top: 14px; color: var(--color-primary); font-weight: 800; text-decoration: none;">Lihat Paket & Harga →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section class="section" id="pricing" style="background: linear-gradient(180deg, rgba(0,0,0,0.02), transparent);">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: left; max-width: 980px; margin-bottom: 2rem;">
            <span class="section__label" style="color: var(--color-primary); text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">Harga & Paket</span>
            <h2 class="section__title" style="font-size: clamp(1.6rem, 3vw, 2.4rem); color: #fff !important; margin-top: 1rem;">Harga mulai — transparan, wajar, dan bergantung scope.</h2>
            <p style="color: var(--color-body); margin-top: 0.8rem;">Harga di bawah adalah indikasi mulai dari (estimasi). Harga final tergantung scope, fitur, dan kebutuhan integrasi. Hubungi kami untuk estimasi gratis dan proposal.</p>
          </div>

          <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
            <div class="service-card" style="padding:20px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04);">
              <h4 style="color:#fff; margin-bottom:6px;">Paket Standar</h4>
              <div style="font-size:1.25rem; font-weight:800; color:#fff;">Rp 800.000</div>
              <div style="color:var(--color-body); margin-top:8px;">Landing page / Company profile sederhana. Cocok untuk profil usaha dan informasi dasar.</div>
            </div>
            <div class="service-card" style="padding:20px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04);">
              <h4 style="color:#fff; margin-bottom:6px;">Landing Page</h4>
              <div style="font-size:1.25rem; font-weight:800; color:#fff;">Mulai Rp 1.200.000</div>
              <div style="color:var(--color-body); margin-top:8px;">Landing page dengan desain konversi, form, dan integrasi dasar analytics.</div>
            </div>
            <div class="service-card" style="padding:20px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04);">
              <h4 style="color:#fff; margin-bottom:6px;">E-commerce</h4>
              <div style="font-size:1.25rem; font-weight:800; color:#fff;">Mulai Rp 3.500.000</div>
              <div style="color:var(--color-body); margin-top:8px;">Toko online dasar, katalog produk, checkout, dan metode pembayaran standar.</div>
            </div>
            <div class="service-card" style="padding:20px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04);">
              <h4 style="color:#fff; margin-bottom:6px;">Custom Website</h4>
              <div style="font-size:1.25rem; font-weight:800; color:#fff;">Mulai Rp 4.500.000</div>
              <div style="color:var(--color-body); margin-top:8px;">Solusi kustom dengan integrasi, dashboard atau sistem internal sesuai scope bisnis.</div>
            </div>
            <div class="service-card" style="padding:20px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04);">
              <h4 style="color:#fff; margin-bottom:6px;">SaaS / Produk</h4>
              <div style="font-size:1.25rem; font-weight:800; color:#fff;">Mulai Rp 10.000.000</div>
              <div style="color:var(--color-body); margin-top:8px;">Pengembangan produk berskala (SaaS) termasuk arsitektur, keamanan, dan operasi jangka panjang.</div>
            </div>
          </div>

          <p style="color: var(--color-body); margin-top: 16px; font-size: 0.95rem;">Catatan: harga adalah titik awal. Kami selalu menyesuaikan dengan kebutuhan dan anggaran — hubungi melalui formulir kontak atau WhatsApp untuk diskusi lebih lanjut.</p>
        </div>
      </section>
      <!-- TESTIMONIALS -->
      <section class="testimonials section" id="testimonials">
        <div class="container">
          <div class="section__header" style="text-align: center; margin-bottom: 2rem;">
            <span class="section__label" style="color: var(--color-primary);">SUARA KLIEN</span>
            <h2 class="section__title">Testimoni untuk Sivilize Corp dan Produk Utama</h2>
          </div>
          <div class="testimonials__grid">
            <div class="testimonial-card">
              <p class="testimonial-quote">"Kerja sama dengan Sivilize Corp membuat semua usaha digital kami lebih terarah. Mulai dari strategi sampai implementasi, mereka memberi hasil yang langsung terasa untuk brand kami."</p>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Sivilize Corp</div>
              <div class="testimonial-meta">— Dwi Prasetyo, CEO PT. Solusi Maju</div>
            </div>
            <div class="testimonial-card">
              <p class="testimonial-quote">"Sivilize Hub Pro buat manajemen proyek kami lebih efektif. Laporan real-time dan kolaborasi tim jadi jauh lebih mudah, apalagi untuk pekerjaan lapangan."</p>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Sivilize Hub Pro</div>
              <div class="testimonial-meta">— Anita Wicaksono, Project Lead, CV. Bangun Sentosa</div>
            </div>
            <div class="testimonial-card">
              <p class="testimonial-quote">"SiKasir membantu toko kami bertransaksi lebih cepat dan laporan harian jadi otomatis. Supportnya juga tanggap ketika kami perlu bantuan setup."</p>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">SiKasir</div>
              <div class="testimonial-meta">— Rian Setiawan, Pemilik Kedai Kopi Lokal</div>
            </div>
            <div class="testimonial-card">
              <p class="testimonial-quote">"SiWeb Production dapatkan website profesional dengan proses yang jelas. Harga transparan, revisi teratur, dan hasilnya benar-benar siap dipakai untuk marketing."</p>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">SiWeb Production</div>
              <div class="testimonial-meta">— Maya Nurlela, Founder Studio Kreatif</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq section" id="faq" style="background: transparent;">
        <div class="container">
          <div class="section__header" style="text-align: left; margin-bottom: 1.5rem;">
            <span class="section__label" style="color: var(--color-primary);">PERTANYAAN UMUM</span>
            <h2 class="section__title">Pertanyaan yang sering diajukan</h2>
          </div>
          <div class="faq__list">
            <div class="faq__item">
              <div class="faq__q">Apa fokus utama Sivilize Corp?<span>+</span></div>
              <div class="faq__a">Sivilize Corp fokus membangun produk digital (Sivilize Hub Pro, SiKasir) dan menyediakan layanan digital pendukung untuk klien yang membutuhkan solusi terintegrasi.</div>
            </div>
            <div class="faq__item">
              <div class="faq__q">Apakah Sivilize menyediakan layanan pembuatan website?<span>+</span></div>
              <div class="faq__a">Ya, layanan website hadir sebagai bagian dari ekosistem untuk klien yang membutuhkan profil perusahaan, landing page, atau solusi kustom.</div>
            </div>
            <div class="faq__item">
              <div class="faq__q">Bagaimana cara memulai kerja sama?<span>+</span></div>
              <div class="faq__a">Gunakan formulir kontak atau hubungi melalui WhatsApp; kami akan mengirimkan panduan singkat dan estimasi awal.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section class="contact section" id="contact" style="background: #000; padding-block: 140px;">
        <div class="container">
          <div class="section__header animate-on-scroll" style="text-align: center; margin-bottom: 60px;">
            <span class="section__label" style="color: var(--color-primary); text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem;">Konsultasi gratis</span>
            <h2 class="section__title" style="font-size: clamp(2.2rem, 4vw, 3rem); color: #fff !important; margin-top: 1rem;">Mulai dengan kebutuhan bisnis kamu sekarang.</h2>
            <p style="max-width: 760px; margin: 1rem auto 0; color: var(--color-body); line-height: 1.8;">Ceritakan tipe bisnis, target customer, dan tujuan website kamu. Kami akan bantu menyusun rekomendasi paket yang paling sesuai.</p>
          </div>

          <div class="contact__content animate-on-scroll" style="max-width: 760px; margin-inline: auto;">
            <form action="https://formspree.io/f/xpznvkgk" method="POST" class="contact-form">
              <div style="display: grid; gap: 28px; background: transparent; padding: 0;">
                <div class="form-group">
                  <input type="text" name="name" placeholder="NAMA LENGKAP / NAMA PERUSAHAAN" required style="width: 100%; padding: 20px 0; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 2px; transition: all 0.3s ease;" />
                </div>
                <div class="form-group">
                  <input type="email" name="email" placeholder="ALAMAT EMAIL PROFESIONAL" required style="width: 100%; padding: 20px 0; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 2px; transition: all 0.3s ease;" />
                </div>
                <div class="form-group">
                  <textarea name="message" rows="4" placeholder="CERITAKAN KEBUTUHAN WEBSITE ATAU PAKET YANG INGIN DIAMBIL" required style="width: 100%; padding: 20px 0; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 2px; transition: all 0.3s ease; resize: none;"></textarea>
                </div>
                <button type="submit" class="btn btn--primary" style="padding: 26px 24px; font-weight: 700; background: var(--color-primary); color: #fff; border: none; letter-spacing: 4px; cursor: pointer; margin-top: 8px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">KIRIM PESAN</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    `;
