"use client";

import { useState } from "react";

export function UmkmApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="siweb-card"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      style={{ display: "grid", gap: 18 }}
    >
      <div>
        <label className="siweb-card-title" htmlFor="ownerName" style={{ display: "block", fontSize: "0.95rem" }}>Nama Pemilik</label>
        <input id="ownerName" name="ownerName" type="text" required className="siweb-form-input" placeholder="Contoh: Rina" />
      </div>
      <div>
        <label className="siweb-card-title" htmlFor="businessName" style={{ display: "block", fontSize: "0.95rem" }}>Nama & Jenis Usaha</label>
        <input id="businessName" name="businessName" type="text" required className="siweb-form-input" placeholder="Contoh: Kopi Senja - Cafe" />
      </div>
      <div>
        <label className="siweb-card-title" htmlFor="whatsapp" style={{ display: "block", fontSize: "0.95rem" }}>Nomor WhatsApp</label>
        <input id="whatsapp" name="whatsapp" type="tel" required className="siweb-form-input" placeholder="Contoh: 0812..." />
      </div>
      <button type="submit" className="siweb-btn siweb-btn-primary" style={{ width: "100%", textAlign: "center" }}>
        AJUKAN SLOT GRATIS
      </button>
      {submitted ? (
        <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
          Pengajuan tercatat di halaman ini. Kirimkan juga lewat WhatsApp agar tim SiWeb bisa cek slot bulan ini lebih cepat.
        </p>
      ) : (
        <p style={{ color: "var(--color-body)", margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>
          Form ini untuk pengajuan awal. Tim SiWeb akan menilai kesiapan usaha dan ketersediaan kuota.
        </p>
      )}
    </form>
  );
}
