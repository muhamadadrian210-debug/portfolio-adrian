// simulate attack page — fake terminal, cuma animasi klien
(function () {
  'use strict';

  let totalRequests = 0;
  let totalBlocked = 0;
  let totalAllowed = 0;
  let isRunning = false;
  let simulationInterval = null;

  const terminalBody = document.getElementById('terminalBody');
  const reqCount = document.getElementById('reqCount');
  const blockedCount = document.getElementById('blockedCount');
  const allowedCount = document.getElementById('allowedCount');
  const systemStatus = document.getElementById('systemStatus');
  const simResult = document.getElementById('simResult');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const clearBtn = document.getElementById('clearLog');

  const attacks = {
    ddos: {
      name: 'DDoS Attack',
      ip: '192.168.1.100',
      totalRequests: 250,
      requestsPerBatch: 20,
      interval: 150,
      blockedAfter: 200,
      messages: [
        'GET /api/data HTTP/1.1',
        'GET /api/users HTTP/1.1',
        'POST /api/login HTTP/1.1',
        'GET /dashboard HTTP/1.1',
        'GET /api/projects HTTP/1.1',
      ],
      blockReason: 'RATE_LIMIT_EXCEEDED',
      blockDuration: '30 menit',
      resultTitle: '💥 DDoS Attack Berhasil Diblokir!',
      resultDesc: 'Setelah 200 request dalam 1 menit, IP 192.168.1.100 diblokir otomatis selama 30 menit. Sistem tetap berjalan normal.',
    },
    bruteforce: {
      name: 'Brute Force Attack',
      ip: '10.0.0.55',
      totalRequests: 8,
      requestsPerBatch: 1,
      interval: 400,
      blockedAfter: 5,
      messages: [
        'POST /api/auth/login — password: "admin123"',
        'POST /api/auth/login — password: "password"',
        'POST /api/auth/login — password: "123456"',
        'POST /api/auth/login — password: "qwerty"',
        'POST /api/auth/login — password: "letmein"',
        'POST /api/auth/login — password: "welcome"',
        'POST /api/auth/login — password: "monkey"',
        'POST /api/auth/login — password: "dragon"',
      ],
      blockReason: 'BRUTE_FORCE_DETECTED',
      blockDuration: '1 jam',
      resultTitle: '🔒 Brute Force Attack Diblokir!',
      resultDesc: 'Setelah 5 percobaan login gagal, IP 10.0.0.55 diblokir selama 1 jam. Akun pengguna tetap aman.',
    },
    aggressive: {
      name: 'Aggressive DDoS',
      ip: '172.16.0.200',
      totalRequests: 120,
      requestsPerBatch: 25,
      interval: 100,
      blockedAfter: 100,
      messages: [
        'GET / HTTP/1.1',
        'GET /api HTTP/1.1',
        'GET /static/main.js HTTP/1.1',
        'GET /favicon.ico HTTP/1.1',
        'GET /api/health HTTP/1.1',
      ],
      blockReason: 'AGGRESSIVE_DDOS_DETECTED',
      blockDuration: '2 jam',
      resultTitle: '⚡ Aggressive DDoS Diblokir!',
      resultDesc: 'Terdeteksi 100+ request dalam 5 detik dari IP 172.16.0.200. IP diblokir otomatis selama 2 jam.',
    },
    blacklist: {
      name: 'IP Blacklist Test',
      ip: '45.33.32.156',
      totalRequests: 3,
      requestsPerBatch: 1,
      interval: 800,
      blockedAfter: 0,
      messages: [
        'GET /api/users HTTP/1.1',
        'POST /api/login HTTP/1.1',
        'GET /admin HTTP/1.1',
      ],
      blockReason: 'BLACKLISTED',
      blockDuration: 'PERMANEN',
      resultTitle: '🚫 IP Terblokir Permanen!',
      resultDesc: 'IP 45.33.32.156 ada dalam daftar blacklist permanen. Semua request langsung ditolak dengan kode 429.',
    },
  };

  function getTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  function addLog(message, type = 'info') {
    const line = document.createElement('div');
    line.className = `sim-terminal__line sim-terminal__line--${type}`;
    line.innerHTML = `
      <span class="sim-terminal__time">${getTime()}</span>
      <span class="sim-terminal__msg">${message}</span>
    `;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function updateStats() {
    reqCount.textContent = totalRequests;
    blockedCount.textContent = totalBlocked;
    allowedCount.textContent = totalAllowed;
  }

  function setStatus(status) {
    systemStatus.textContent = status;
    systemStatus.className = 'sim-stat__number sim-stat__number--status';
    if (status === 'SERANGAN') {
      systemStatus.classList.add('sim-stat__number--danger');
    } else if (status === 'BLOKIR') {
      systemStatus.classList.add('sim-stat__number--blocked');
    } else {
      systemStatus.classList.add('sim-stat__number--safe');
    }
  }

  function showResult(attack, blocked) {
    simResult.hidden = false;
    if (blocked) {
      resultIcon.textContent = '🛡️';
      resultTitle.textContent = attack.resultTitle;
      resultDesc.textContent = attack.resultDesc;
      simResult.className = 'sim-result sim-result--success';
    }
  }

  function runSimulation(attackKey) {
    if (isRunning) return;

    const attack = attacks[attackKey];
    if (!attack) return;

    // Reset
    isRunning = true;
    totalRequests = 0;
    totalBlocked = 0;
    totalAllowed = 0;
    simResult.hidden = true;
    updateStats();
    setStatus('SERANGAN');

    // Highlight active button
    document.querySelectorAll('.sim-attack-btn').forEach(btn => {
      btn.classList.remove('sim-attack-btn--active');
      btn.setAttribute('aria-pressed', 'false');
    });
    const activeBtn = document.querySelector(`[data-attack="${attackKey}"]`);
    if (activeBtn) {
      activeBtn.classList.add('sim-attack-btn--active');
      activeBtn.setAttribute('aria-pressed', 'true');
    }

    addLog(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'divider');
    addLog(`🚨 SERANGAN TERDETEKSI: ${attack.name}`, 'danger');
    addLog(`📍 IP Penyerang: ${attack.ip}`, 'warning');
    addLog(`🔍 Firewall mulai menganalisis pola request...`, 'info');

    let sentCount = 0;
    let msgIndex = 0;
    let isBlocked = false;

    simulationInterval = setInterval(() => {
      if (isBlocked) {
        clearInterval(simulationInterval);
        isRunning = false;
        return;
      }

      const batchSize = Math.min(attack.requestsPerBatch, attack.totalRequests - sentCount);

      for (let i = 0; i < batchSize; i++) {
        sentCount++;
        totalRequests++;
        const msg = attack.messages[msgIndex % attack.messages.length];
        msgIndex++;

        if (attack.blockReason === 'BLACKLISTED' || sentCount > attack.blockedAfter) {
          // Blocked
          totalBlocked++;
          addLog(`🔴 BLOCKED [${attack.ip}] ${msg} → 429 ${attack.blockReason}`, 'danger');
        } else {
          // Allowed
          totalAllowed++;
          addLog(`🟡 [${attack.ip}] ${msg} → 200 OK (req #${sentCount})`, 'warning');
        }

        updateStats();
      }

      // Check if should block
      if (!isBlocked && (attack.blockReason === 'BLACKLISTED' || sentCount >= attack.blockedAfter)) {
        isBlocked = true;
        clearInterval(simulationInterval);

        setTimeout(() => {
          addLog(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'divider');
          addLog(`🛡️ FIREWALL AKTIF — Threshold terlampaui!`, 'success');
          addLog(`🚫 IP ${attack.ip} diblokir: ${attack.blockReason}`, 'success');
          addLog(`⏱️  Durasi blokir: ${attack.blockDuration}`, 'success');
          addLog(`✅ Sistem tetap berjalan normal. Pengguna lain tidak terdampak.`, 'success');
          addLog(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'divider');

          setStatus('BLOKIR');
          showResult(attack, true);
          isRunning = false;

          // Reset button state
          if (activeBtn) {
            activeBtn.classList.remove('sim-attack-btn--active');
            activeBtn.setAttribute('aria-pressed', 'false');
          }
        }, 500);
      }

      if (sentCount >= attack.totalRequests && !isBlocked) {
        clearInterval(simulationInterval);
        setStatus('AMAN');
        isRunning = false;
      }

    }, attack.interval);
  }

  // Event listeners
  document.querySelectorAll('.sim-attack-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isRunning) {
        const attackKey = btn.getAttribute('data-attack');
        runSimulation(attackKey);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(simulationInterval);
        isRunning = false;
      }
      terminalBody.innerHTML = `
        <div class="sim-terminal__line sim-terminal__line--info">
          <span class="sim-terminal__time">${getTime()}</span>
          <span class="sim-terminal__msg">🟢 Log dibersihkan. Firewall tetap aktif.</span>
        </div>
      `;
      totalRequests = 0;
      totalBlocked = 0;
      totalAllowed = 0;
      updateStats();
      setStatus('AMAN');
      simResult.hidden = true;
      document.querySelectorAll('.sim-attack-btn').forEach(b => {
        b.classList.remove('sim-attack-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
    });
  }

})();
