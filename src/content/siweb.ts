export const siwebMainHtml = `
      <!-- HERO SECTION -->
      <section class="siweb-hero">
        <div class="container siweb-content">
          <div style="text-align: left;">
            <!-- SiWeb Logo -->
            <img src="/assets/images/siweb-logo.svg" alt="SiWeb Production Logo" class="siweb-logo-img" style="margin-bottom: 2rem; width: 240px; max-width: 100%; background: rgba(255,255,255,0.04); padding: 18px 22px; border-radius: 12px;" />
            
            <h1 class="siweb-title">
              Website yang Dirancang untuk Pertumbuhan Bisnis.
            </h1>
            <p class="siweb-subtitle">
              SiWeb Production dari Sivilize Corp membuat website profesional, landing page, dan toko online dengan harga transparan. Kami fokus pada hasil bisnis, bukan hanya desain.
            </p>
            
            <div class="siweb-features">
              <span class="siweb-feature-tag">Landing Page Konversi</span>
              <span class="siweb-feature-tag">E-commerce Siap Jual</span>
              <span class="siweb-feature-tag">Custom Web Development</span>
              <span class="siweb-feature-tag">Harga Transparan</span>
            </div>

            <div class="siweb-cta-group">
              <a href="#pricing" class="siweb-btn siweb-btn-primary">LIHAT PAKET & HARGA</a>
              <a href="#contact" class="siweb-btn siweb-btn-outline">KONSULTASI GRATIS</a>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT IS SIWEB -->
      <section class="siweb-section" id="about" style="background: #050505;">
        <div class="container">
          <span class="siweb-section-label">Tentang SiWeb</span>
          <h2 class="siweb-section-title">Apa itu SiWeb Production?</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 2rem; align-items: start;">
            <div>
              <p style="color: var(--color-body); font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;">
                SiWeb Production adalah layanan pembuatan website dari Sivilize Corp yang menawarkan solusi digital untuk bisnis segala ukuran — dari UMKM hingga perusahaan enterprise.
              </p>
              <p style="color: var(--color-body); font-size: 1.05rem; line-height: 1.8;">
                Kami tidak hanya membuat website yang bagus. Kami membuat website yang bekerja untuk bisnis: meningkatkan trust, menghasilkan leads, dan mendorong penjualan.
              </p>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 32px; border: 1px solid rgba(255,255,255,0.04); border-radius: 4px;">
              <h3 style="color: #fff; margin-bottom: 16px;">Yang Kami Tawarkan:</h3>
              <ul style="display: flex; flex-direction: column; gap: 12px; list-style: none; padding: 0; margin: 0;">
                <li style="color: var(--color-body); display: flex; align-items: start; gap: 12px;">
                  <span style="color: var(--color-primary); font-weight: 800;">✓</span>
                  <span>Desain responsif & mobile-first</span>
                </li>
                <li style="color: var(--color-body); display: flex; align-items: start; gap: 12px;">
                  <span style="color: var(--color-primary); font-weight: 800;">✓</span>
                  <span>Optimasi SEO & performance</span>
                </li>
                <li style="color: var(--color-body); display: flex; align-items: start; gap: 12px;">
                  <span style="color: var(--color-primary); font-weight: 800;">✓</span>
                  <span>Integrasi pembayaran & CMS</span>
                </li>
                <li style="color: var(--color-body); display: flex; align-items: start; gap: 12px;">
                  <span style="color: var(--color-primary); font-weight: 800;">✓</span>
                  <span>Support & maintenance purna jual</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section class="siweb-section" id="pricing" style="background: #080808;">
        <div class="container">
          <span class="siweb-section-label">Paket & Harga</span>
          <h2 class="siweb-section-title">Pilih Paket yang Sesuai Kebutuhan Bisnis Anda</h2>
          <p style="color: var(--color-body); margin-top: 0.8rem; max-width: 800px;">
            Semua paket included konsultasi awal, proses transparan, dan support teknis dasar. Harga final dapat disesuaikan berdasarkan scope dan integrasi tambahan.
          </p>

          <div class="siweb-grid" style="margin-top: 3rem;">
            <!-- PAKET STANDAR -->
            <div class="siweb-card">
              <div class="siweb-card-title">Paket Standar</div>
              <div class="siweb-card-price">Rp 800.000</div>
              <p class="siweb-card-desc">Landing page atau halaman profil perusahaan sederhana.</p>
              
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">FITUR UTAMA:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">1 halaman statis (landing/profile)</div>
                  <div class="siweb-card-item">Form kontak dasar</div>
                  <div class="siweb-card-item">Design responsif (mobile-first)</div>
                  <div class="siweb-card-item">Setup domain (1 tahun)</div>
                  <div class="siweb-card-item">Hosting gratis (1 tahun)</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">TEKNOLOGI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">HTML5, CSS3, JavaScript</div>
                  <div class="siweb-card-item">SSL/HTTPS included</div>
                  <div class="siweb-card-item">Backup otomatis</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">SUPPORT & REVISI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Revisi gratis: 2x</div>
                  <div class="siweb-card-item">Email support (14 hari)</div>
                  <div class="siweb-card-item">Timeline: 2 minggu</div>
                </div>
              </div>
            </div>

            <!-- PAKET LANDING PAGE -->
            <div class="siweb-card">
              <div class="siweb-card-title">Landing Page</div>
              <div class="siweb-card-price">Rp 1.200.000</div>
              <p class="siweb-card-desc">Landing page dengan optimasi konversi untuk campaign marketing.</p>
              
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">FITUR UTAMA:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">3–5 halaman (hero, fitur, CTA, FAQ)</div>
                  <div class="siweb-card-item">Form lead capture optimized</div>
                  <div class="siweb-card-item">Analytics setup (Google Analytics 4)</div>
                  <div class="siweb-card-item">Pixel tracking (Facebook, Google)</div>
                  <div class="siweb-card-item">SEO on-page optimization</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">TEKNOLOGI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">HTML5, CSS3, JavaScript ES6+</div>
                  <div class="siweb-card-item">SSL/HTTPS included</div>
                  <div class="siweb-card-item">CDN & optimasi performa</div>
                  <div class="siweb-card-item">Backup & security updates</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">SUPPORT & REVISI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Revisi gratis: unlimited (30 hari)</div>
                  <div class="siweb-card-item">Email & WhatsApp support (1 bulan)</div>
                  <div class="siweb-card-item">Timeline: 2–3 minggu</div>
                </div>
              </div>
            </div>

            <!-- PAKET TOKO ONLINE -->
            <div class="siweb-card">
              <div class="siweb-card-title">Toko Online</div>
              <div class="siweb-card-price">Rp 3.500.000</div>
              <p class="siweb-card-desc">E-commerce dengan katalog produk dan sistem pembayaran.</p>
              
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">FITUR UTAMA:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Katalog produk unlimited</div>
                  <div class="siweb-card-item">Metode pembayaran (Stripe, manual transfer)</div>
                  <div class="siweb-card-item">Sistem order management dashboard</div>
                  <div class="siweb-card-item">Email notifikasi order & status</div>
                  <div class="siweb-card-item">SEO per produk & category</div>
                  <div class="siweb-card-item">Analytics & sales reporting</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">TEKNOLOGI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Node.js / React frontend</div>
                  <div class="siweb-card-item">Database (MongoDB / PostgreSQL)</div>
                  <div class="siweb-card-item">SSL/HTTPS + PCI compliance</div>
                  <div class="siweb-card-item">Backup harian & disaster recovery</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">SUPPORT & REVISI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Revisi gratis: unlimited (60 hari)</div>
                  <div class="siweb-card-item">Email & WhatsApp support (3 bulan)</div>
                  <div class="siweb-card-item">Training penggunaan admin panel</div>
                  <div class="siweb-card-item">Timeline: 4–6 minggu</div>
                </div>
              </div>
            </div>

            <!-- PAKET CUSTOM WEB -->
            <div class="siweb-card">
              <div class="siweb-card-title">Custom Web / SaaS</div>
              <div class="siweb-card-price">Rp 4.500.000+</div>
              <p class="siweb-card-desc">Solusi custom dengan features, integrasi, & teknologi sesuai kebutuhan bisnis.</p>
              
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">FITUR UTAMA:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Custom features sesuai requirements</div>
                  <div class="siweb-card-item">API integration (payment, CRM, inventory)</div>
                  <div class="siweb-card-item">Dashboard admin lengkap</div>
                  <div class="siweb-card-item">User management & permissions</div>
                  <div class="siweb-card-item">Real-time reporting & analytics</div>
                  <div class="siweb-card-item">Multi-user & collaboration tools</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">TEKNOLOGI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Full-stack (React/Vue/Next.js)</div>
                  <div class="siweb-card-item">Backend (Node.js / Python / Go)</div>
                  <div class="siweb-card-item">Database scalable (PostgreSQL / MongoDB)</div>
                  <div class="siweb-card-item">SSL/HTTPS + encryption</div>
                  <div class="siweb-card-item">CDN & infrastructure optimization</div>
                  <div class="siweb-card-item">Automated backup & monitoring</div>
                </div>
              </div>

              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">SUPPORT & REVISI:</div>
                <div class="siweb-card-list">
                  <div class="siweb-card-item">Revisi gratis: unlimited (development cycle)</div>
                  <div class="siweb-card-item">Email & WhatsApp + call support (6 bulan)</div>
                  <div class="siweb-card-item">Documentation & technical handover</div>
                  <div class="siweb-card-item">Post-launch optimization & consulting</div>
                  <div class="siweb-card-item">Timeline: 8–12 minggu (tergantung scope)</div>
                </div>
              </div>
            </div>
          </div>

          <p style="color: var(--color-body); margin-top: 2rem; font-size: 0.95rem;">
            💡 <strong style="color: #fff;">Catatan:</strong> Harga di atas adalah starting point. Untuk scope lebih kompleks atau integrasi khusus, hubungi kami untuk diskusi dan proposal custom.
          </p>
        </div>
      </section>

      <!-- PROCESS -->
      <section class="siweb-section" id="process" style="background: #050505;">
        <div class="container">
          <span class="siweb-section-label">Proses Kerja</span>
          <h2 class="siweb-section-title">Bagaimana Kami Bekerja</h2>

          <div class="siweb-process">
            <div class="siweb-step">
              <div class="siweb-step-num">1</div>
              <div class="siweb-step-title">Konsultasi & Discovery</div>
              <div class="siweb-step-desc">Kami mendengarkan kebutuhan, target, dan visi bisnis Anda. Tidak ada desain sampai kami paham bisnis Anda.</div>
            </div>
            <div class="siweb-step">
              <div class="siweb-step-num">2</div>
              <div class="siweb-step-title">Rancang & Proposal</div>
              <div class="siweb-step-desc">Kami buat proposal scope, timeline, dan estimasi final. Semua jelas sebelum pekerjaan dimulai.</div>
            </div>
            <div class="siweb-step">
              <div class="siweb-step-num">3</div>
              <div class="siweb-step-title">Development & Review</div>
              <div class="siweb-step-desc">Build website dengan feedback loop Anda. Revisi unlimited sampai memuaskan.</div>
            </div>
            <div class="siweb-step">
              <div class="siweb-step-num">4</div>
              <div class="siweb-step-title">Launch & Support</div>
              <div class="siweb-step-desc">Deploy live, training user, dan support teknis sesuai paket pilihan.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="siweb-section" id="faq" style="background: #080808;">
        <div class="container">
          <span class="siweb-section-label">Pertanyaan Umum</span>
          <h2 class="siweb-section-title">FAQ</h2>

          <div class="siweb-faq">
            <div class="siweb-faq-item">
              <div class="siweb-faq-q">
                <span>Berapa lama proses pembuatan website?</span>
                <span style="font-size: 1.4rem;">+</span>
              </div>
              <div class="siweb-faq-a">
                Untuk paket Standar & Landing Page: 2–3 minggu. E-commerce & Custom Web: 4–8 minggu tergantung kompleksitas. Kami akan inform timeline akurat saat proposal.
              </div>
            </div>

            <div class="siweb-faq-item">
              <div class="siweb-faq-q">
                <span>Apakah bisa integrasi dengan sistem existing saya?</span>
                <span style="font-size: 1.4rem;">+</span>
              </div>
              <div class="siweb-faq-a">
                Bisa. Kami bisa integrate dengan API existing, pembayaran, inventory system, atau tools bisnis lain. Diskusikan di tahap konsultasi untuk estimate scope & budget.
              </div>
            </div>

            <div class="siweb-faq-item">
              <div class="siweb-faq-q">
                <span>Apa yang termasuk dalam support purna jual?</span>
                <span style="font-size: 1.4rem;">+</span>
              </div>
              <div class="siweb-faq-a">
                Tergantung paket. Semua paket include support teknis dasar (bug fix, hosting issue). Paket lebih tinggi termasuk maintenance berkala, update content, dan optimization.
              </div>
            </div>

            <div class="siweb-faq-item">
              <div class="siweb-faq-q">
                <span>Saya sudah punya website, bisa upgrade?</span>
                <span style="font-size: 1.4rem;">+</span>
              </div>
              <div class="siweb-faq-a">
                Bisa. Kami audit website existing Anda, suggest improvement, dan buat roadmap upgrade. Hubungi kami untuk konsultasi teknis gratis.
              </div>
            </div>

            <div class="siweb-faq-item">
              <div class="siweb-faq-q">
                <span>Domain & hosting included atau tidak?</span>
                <span style="font-size: 1.4rem;">+</span>
              </div>
              <div class="siweb-faq-a">
                Paket Standar include domain (1 tahun) & hosting dasar gratis tahun pertama. Paket lainnya, kami urus setup, tapi biaya hosting adalah tanggung jawab klien (kami recommend penyedia terpercaya).
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="siweb-section" id="testimonials" style="background: #080808;">
        <div class="container">
          <span class="siweb-section-label">Klien SiWeb</span>
          <h2 class="siweb-section-title">Apa Kata Klien Tentang SiWeb</h2>
          
          <div class="siweb-grid" style="margin-top: 2.5rem;">
            <div class="siweb-card">
              <p class="siweb-card-desc" style="font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.9); margin: 0;">
                "Kami butuh landing page untuk campaign promosi bulan ini. Tim SiWeb deliver dalam 2 minggu dengan design yang clean dan conversion-focused. Hasilnya, engagement rate kami naik 35%."</p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">Eka Putri</div>
                <div style="color: var(--color-body); font-size: 0.85rem;">Marketing Manager, PT. Fashion Indonesia</div>
              </div>
            </div>
            
            <div class="siweb-card">
              <p class="siweb-card-desc" style="font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.9); margin: 0;">
                "Toko online kami di-build oleh SiWeb dan hasilnya sangat professional. Fitur checkout smooth, admin panel mudah digunakan, dan support mereka always ada ketika butuh. Penjualan online naik 60% sejak launch."</p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">Hendra Kusuma</div>
                <div style="color: var(--color-body); font-size: 0.85rem;">Founder & CEO, Toko Aksesori Online</div>
              </div>
            </div>
            
            <div class="siweb-card">
              <p class="siweb-card-desc" style="font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.9); margin: 0;">
                "Proses bersama SiWeb sangat transparan. Mereka jelasin apa yang kami dapat, harga sudah pasti ga ada biaya tersembunyi, dan revisi unlimited sampai puas. Web kami sekarang jadi asset marketing yang powerful."</p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">Dewi Santika</div>
                <div style="color: var(--color-body); font-size: 0.85rem;">Owner, Studio Desain Grafis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS END -->
      <section class="siweb-section" id="contact" style="background: linear-gradient(180deg, rgba(79, 70, 229, 0.05), transparent); padding: 60px 0;">
        <div class="container" style="text-align: center;">
          <h3 style="color: #fff; font-size: 1.6rem; margin-bottom: 1.5rem;">Siap membuat website yang bekerja untuk bisnis Anda?</h3>
          <p style="color: var(--color-body); margin-bottom: 2rem; max-width: 760px; margin-left: auto; margin-right: auto;">
            Hubungi kami untuk konsultasi gratis. Ceritakan bisnis, target, dan kebutuhan Anda — kami akan recommend paket terbaik.
          </p>
        </div>

        <div class="container" style="margin-top: 40px;">
          <div class="siweb-contact-form">
            <form action="https://formspree.io/f/xpznvkgk" method="POST">
              <div class="siweb-form-group">
                <input type="text" name="name" placeholder="NAMA LENGKAP / NAMA BISNIS" required class="siweb-form-input" />
                <input type="email" name="email" placeholder="EMAIL BISNIS" required class="siweb-form-input" />
                <input type="tel" name="phone" placeholder="NOMOR WHATSAPP (OPTIONAL)" class="siweb-form-input" />
                <textarea name="message" rows="4" placeholder="CERITAKAN KEBUTUHAN WEBSITE ANDA" required class="siweb-form-input" style="resize: none;"></textarea>
                <button type="submit" class="siweb-btn siweb-btn-primary" style="width: 100%; text-align: center;">KIRIM PESAN</button>
              </div>
            </form>
          </div>

          <div style="text-align: center; margin-top: 3rem;">
            <p style="color: var(--color-body); margin-bottom: 1rem;">Atau hubungi langsung:</p>
            <a href="https://wa.me/6281338219957" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 32px; background: #25D366; color: #fff; text-decoration: none; font-weight: 700; border-radius: 4px; transition: all 0.3s ease;">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    `;
