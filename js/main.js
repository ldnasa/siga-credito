/* ============================================================
   Siga Crédito - main.js
   Vanilla JS for: reveal, accordion, mobile menu, dropdown,
   counter, year stamp, form honeypot.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Scroll reveal — single pattern (opacity + translateY).
     Respects prefers-reduced-motion (CSS already neutralizes).
     ---------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target.closest('[data-reveal-group]');
        const siblings = group ? Array.from(group.querySelectorAll('.reveal')) : [entry.target];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx, 6) * 100}ms`;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----------------------------------------------------------
     FAQ accordion (one-open-at-a-time per .faq group)
     ---------------------------------------------------------- */
  document.querySelectorAll('.faq').forEach((faq) => {
    faq.querySelectorAll('.faq-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('is-open');
        faq.querySelectorAll('.faq-item.is-open').forEach((i) => {
          i.classList.remove('is-open');
          const t = i.querySelector('.faq-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ----------------------------------------------------------
     Mobile menu toggle
     ---------------------------------------------------------- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuClose = document.querySelector('[data-menu-close]');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    menuToggle && menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle && menuToggle.addEventListener('click', openMobileMenu);
  menuClose && menuClose.addEventListener('click', closeMobileMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ----------------------------------------------------------
     Desktop dropdown (Produtos)
     ---------------------------------------------------------- */
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.getAttribute('aria-expanded') === 'true';
      dropdown.setAttribute('aria-expanded', String(!isOpen));
    });
    dropdown.addEventListener('mouseenter', () => dropdown.setAttribute('aria-expanded', 'true'));
    dropdown.addEventListener('mouseleave', () => dropdown.setAttribute('aria-expanded', 'false'));
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-dropdown[aria-expanded="true"]').forEach((d) => {
      if (!d.contains(e.target)) d.setAttribute('aria-expanded', 'false');
    });
  });

  /* ----------------------------------------------------------
     Counter animation (DESIGN.md sec. 14.3 exception)
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1200;
    const start = performance.now();
    const fmt = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = prefix + fmt.format(value) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ----------------------------------------------------------
     Hero micro-interactions — floating card entrance, bar reveal,
     and value count-up. Keeps static content intact without JS.
     ---------------------------------------------------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function splitHeroValue(text) {
    const match = text.trim().match(/^(.*?)(\d[\d.,]*)(.*)$/);
    if (!match) return null;
    return {
      prefix: match[1],
      target: Number(match[2].replace(/\./g, '').replace(',', '.')),
      suffix: match[3],
      decimals: match[2].includes(',') ? match[2].split(',')[1].length : 0,
    };
  }

  function animateHeroValue(el) {
    if (el.dataset.heroCounted === 'true') return;
    const parsed = splitHeroValue(el.dataset.heroFinal || el.textContent);
    if (!parsed || Number.isNaN(parsed.target)) return;

    el.dataset.heroCounted = 'true';
    const duration = 1500;
    const start = Date.now();
    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals,
    });

    el.textContent = parsed.prefix + formatter.format(0) + parsed.suffix;
    const interval = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = parsed.target * eased;
      el.textContent = parsed.prefix + formatter.format(value) + parsed.suffix;
      if (t >= 1) window.clearInterval(interval);
    }, 32);
  }

  const heroBlocks = document.querySelectorAll('.hero-photo-block');
  if (heroBlocks.length) {
    heroBlocks.forEach((block) => {
      const value = block.querySelector('.hero-v3-data-value');
      if (value) value.dataset.heroFinal = value.textContent.trim();

      if (reduceMotion) {
        block.classList.add('is-animated');
        return;
      }

      block.classList.add('hero-motion-ready');
    });

    // Hero is always above-the-fold — kick off animation right after first paint
    // (IntersectionObserver fallback only for blocks below the fold, if any)
    const runHeroAnim = (block, delay) => {
      const start = () => {
        block.classList.add('is-animated');
        const value = block.querySelector('.hero-v3-data-value');
        if (value && !reduceMotion) window.setTimeout(() => animateHeroValue(value), 380);
        // Force bar heights via inline style with staggered setTimeout (CSS transition
        // still handles the smooth growth; this guarantees the height target lands
        // even if compositor frames are throttled).
        if (!reduceMotion) {
          const bars = block.querySelectorAll('.hero-v3-data-bars span');
          bars.forEach((bar, i) => {
            const targetH = getComputedStyle(bar).getPropertyValue('--bar-height').trim() || '100%';
            window.setTimeout(() => { bar.style.height = targetH; }, 620 + i * 140);
          });
        }
      };
      window.setTimeout(start, delay);
    };

    heroBlocks.forEach((block) => {
      // Hero is above-the-fold on all pages — kick off animation shortly after JS runs.
      // setTimeout (not rAF) so it fires even in throttled/hidden tabs.
      runHeroAnim(block, 180);
    });
  }

  /* ----------------------------------------------------------
     Team carousel arrow navigation
     ---------------------------------------------------------- */
  const teamTrack = document.querySelector('[data-team-track]');
  const teamPrev = document.querySelector('[data-team-prev]');
  const teamNext = document.querySelector('[data-team-next]');
  if (teamTrack && teamPrev && teamNext) {
    function teamStep() {
      const firstCard = teamTrack.querySelector('.team-card');
      if (!firstCard) return 320;
      const cardW = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(teamTrack).columnGap || getComputedStyle(teamTrack).gap || '0');
      return cardW + gap;
    }
    function updateTeamNavState() {
      const max = teamTrack.scrollWidth - teamTrack.clientWidth - 1;
      teamPrev.toggleAttribute('disabled', teamTrack.scrollLeft <= 1);
      teamNext.toggleAttribute('disabled', teamTrack.scrollLeft >= max);
    }
    teamPrev.addEventListener('click', () => teamTrack.scrollBy({ left: -teamStep(), behavior: 'smooth' }));
    teamNext.addEventListener('click', () => teamTrack.scrollBy({ left: teamStep(), behavior: 'smooth' }));
    teamTrack.addEventListener('scroll', updateTeamNavState, { passive: true });
    window.addEventListener('resize', updateTeamNavState);
    updateTeamNavState();
  }

  /* ----------------------------------------------------------
     Share buttons — wire WhatsApp / Facebook / LinkedIn share intents
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-share] [data-share-net]').forEach((btn) => {
    const net = btn.dataset.shareNet;
    const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
    const title = document.title;
    const url = encodeURIComponent(canonical);
    const text = encodeURIComponent(title);
    let href = '#';
    if (net === 'whatsapp') href = `https://wa.me/?text=${text}%20${url}`;
    else if (net === 'facebook') href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    else if (net === 'linkedin') href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    btn.setAttribute('href', href);
  });

  /* ----------------------------------------------------------
     Year stamp on footer
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ----------------------------------------------------------
     Form honeypot + basic submit feedback
     ---------------------------------------------------------- */
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const honey = form.querySelector('input[name="website"]');
      if (honey && honey.value) return;
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.hidden = false;
        status.textContent = 'Recebemos. A gente te chama no WhatsApp com a proposta.';
        status.setAttribute('role', 'status');
      }
      form.reset();
    });
  });

  /* ----------------------------------------------------------
     Contact modal — injected into every page via JS.
     Wired to: .site-header .header-actions .btn-primary ("Simular")
               + every a.btn-ghost whose text contains "Quero ser contatado"
               + any element with [data-open-modal]
     Pre-selects loan type if body has data-loan-type="..." attribute.
     ---------------------------------------------------------- */
  const LOAN_LABELS = {
    'conta-de-luz': 'Empréstimo na conta de luz',
    'bolsa-familia': 'Empréstimo Bolsa Família',
    'clt': 'Consignado CLT',
    'fgts': 'FGTS Saque-Aniversário',
  };

  // WhatsApp dedicado por produto (fallback = conta de luz, número principal)
  const LOAN_NUMBERS = {
    'conta-de-luz': '5543988014727',
    'bolsa-familia': '5543988075957',
    'clt': '5543967250239',
    'fgts': '5543955482629',
  };
  const DEFAULT_WA = '5543988014727';

  const ENERGY_COMPANIES = ['Celpe', 'Coelba', 'Copel', 'Cosern', 'CPFL Paulista', 'CPFL Piratininga', 'CPFL Santa Cruz', 'Elektro', 'Enel CE', 'Enel RJ', 'Enel SP', 'RGE', 'Outra'];

  function buildContactModal() {
    if (document.getElementById('contactModal')) return document.getElementById('contactModal');
    const modal = document.createElement('div');
    modal.id = 'contactModal';
    modal.className = 'contact-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'contactModalTitle');
    modal.hidden = true;
    modal.innerHTML = `
      <div class="contact-modal-backdrop" data-modal-close></div>
      <div class="contact-modal-card" role="document">
        <button class="contact-modal-close" data-modal-close aria-label="Fechar formulário" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="contact-modal-head">
          <span class="contact-modal-eyebrow">Receba uma proposta no WhatsApp</span>
          <h2 class="contact-modal-title" id="contactModalTitle">Solicite uma simulação agora</h2>
          <p class="contact-modal-lead">Preenche os dados que a gente te chama com a proposta. Sem compromisso, sem letra miúda.</p>
        </div>
        <form class="contact-modal-form" novalidate>
          <div class="form-field" data-field="loan-type">
            <div class="contact-modal-loan-row">
              <label for="modal-loan-type" class="input-label">Qual empréstimo te interessa?</label>
              <span class="contact-modal-loan-chip" data-loan-chip hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                <span data-loan-chip-label></span>
              </span>
            </div>
            <select id="modal-loan-type" class="input" name="loan_type" required>
              <option value="">Selecione o produto</option>
              <option value="conta-de-luz">Empréstimo na conta de luz</option>
              <option value="bolsa-familia">Empréstimo Bolsa Família</option>
              <option value="clt">Consignado CLT</option>
              <option value="fgts">FGTS Saque-Aniversário</option>
            </select>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label for="modal-name" class="input-label">Nome completo</label>
              <input id="modal-name" class="input" type="text" name="name" placeholder="Seu nome completo" required autocomplete="name">
            </div>
            <div class="form-field">
              <label for="modal-cpf" class="input-label">CPF</label>
              <input id="modal-cpf" class="input" type="text" name="cpf" placeholder="000.000.000-00" inputmode="numeric" required>
            </div>
            <div class="form-field">
              <label for="modal-birth" class="input-label">Data de nascimento</label>
              <input id="modal-birth" class="input" type="date" name="birth" required autocomplete="bday">
            </div>
            <div class="form-field">
              <label for="modal-phone" class="input-label">WhatsApp</label>
              <input id="modal-phone" class="input" type="tel" name="phone" placeholder="(43) 99999-0000" required autocomplete="tel-national">
            </div>
            <div class="form-field">
              <label for="modal-email" class="input-label">E-mail</label>
              <input id="modal-email" class="input" type="email" name="email" placeholder="seu@email.com" autocomplete="email">
            </div>
            <div class="form-field" data-field="energy" hidden>
              <label for="modal-energy" class="input-label">Qual é a sua empresa de energia?</label>
              <select id="modal-energy" class="input" name="energy">
                <option value="">Selecione</option>
                ${ENERGY_COMPANIES.map((c) => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <input type="text" name="website" tabindex="-1" aria-hidden="true" autocomplete="off" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
          <p class="contact-modal-trust">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            A Siga nunca pede pagamento adiantado. Seus dados não são compartilhados.
          </p>
          <button type="submit" class="btn btn-primary btn-lg contact-modal-submit">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Enviar e ser contatado
          </button>
        </form>
        <div class="contact-modal-success" hidden>
          <div class="contact-modal-success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Recebido. A gente te chama no WhatsApp.</h3>
          <p>A proposta vem direto no WhatsApp do número que você informou.</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function setupContactModal() {
    const modal = buildContactModal();
    const card = modal.querySelector('.contact-modal-card');
    const select = modal.querySelector('#modal-loan-type');
    const chip = modal.querySelector('[data-loan-chip]');
    const chipLabel = modal.querySelector('[data-loan-chip-label]');
    const loanField = modal.querySelector('[data-field="loan-type"] .input-label');
    const energyField = modal.querySelector('[data-field="energy"]');
    const energySelect = modal.querySelector('#modal-energy');
    const form = modal.querySelector('.contact-modal-form');
    const success = modal.querySelector('.contact-modal-success');

    function syncChip() {
      const v = select.value;
      if (v && LOAN_LABELS[v]) {
        chipLabel.textContent = LOAN_LABELS[v];
        chip.hidden = false;
      } else {
        chip.hidden = true;
      }
      // Campo "empresa de energia" só aparece (e é obrigatório) no produto conta de luz
      if (energyField) {
        const isLuz = v === 'conta-de-luz';
        energyField.hidden = !isLuz;
        if (energySelect) energySelect.required = isLuz;
        if (!isLuz && energySelect) energySelect.value = '';
      }
    }

    const pageLoanType = document.body.dataset.loanType;
    if (pageLoanType && LOAN_LABELS[pageLoanType]) {
      select.value = pageLoanType;
      select.hidden = true;
    }
    syncChip();
    select.addEventListener('change', syncChip);

    function openModal() {
      modal.hidden = false;
      modal.classList.add('is-open');
      document.body.classList.add('has-modal-open');
      setTimeout(() => {
        const focusEl = modal.querySelector('select:not([hidden]), input[type="text"]');
        if (focusEl) focusEl.focus();
      }, 60);
    }
    function closeModal() {
      modal.classList.remove('is-open');
      modal.hidden = true;
      document.body.classList.remove('has-modal-open');
      // Reset to form view if success was shown
      form.hidden = false;
      success.hidden = true;
    }

    modal.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    // Wire triggers — header Simular + every "Quero ser contatado" + explicit [data-open-modal]
    function wireTriggers() {
      const triggers = new Set();
      document.querySelectorAll('.site-header .header-actions .btn-primary').forEach((b) => triggers.add(b));
      document.querySelectorAll('a.btn-ghost, button.btn-ghost').forEach((b) => {
        if (b.textContent.trim().toLowerCase().startsWith('quero ser contatado')) triggers.add(b);
      });
      document.querySelectorAll('[data-open-modal]').forEach((b) => triggers.add(b));
      triggers.forEach((btn) => {
        if (btn.dataset.modalWired === '1') return;
        btn.dataset.modalWired = '1';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      });
    }
    wireTriggers();

    // Submit handler — honeypot + redirect to WhatsApp with composed message
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if ((data.get('website') || '').trim() !== '') return; // honeypot
      const loanValue = data.get('loan_type');
      const loanLabel = LOAN_LABELS[loanValue] || 'Empréstimo';
      let msg = `Oi! Quero simular: ${loanLabel}.\n\n` +
        `Nome: ${data.get('name')}\n` +
        `CPF: ${data.get('cpf')}\n` +
        `Nascimento: ${data.get('birth') || '-'}\n` +
        `WhatsApp: ${data.get('phone')}\n` +
        `E-mail: ${data.get('email') || '-'}`;
      if (loanValue === 'conta-de-luz' && data.get('energy')) {
        msg += `\nEmpresa de energia: ${data.get('energy')}`;
      }
      const waNumber = LOAN_NUMBERS[loanValue] || DEFAULT_WA;
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener');
      form.hidden = true;
      success.hidden = false;
    });
  }
  setupContactModal();

  /* ----------------------------------------------------------
     Active nav state by current path
     ---------------------------------------------------------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-key]').forEach((link) => {
    const key = link.dataset.navKey;
    if (
      (key === 'home' && (path === '' || path === 'index.html' || path === '/')) ||
      (key !== 'home' && path.startsWith(key))
    ) {
      link.classList.add('is-active');
    }
    // produtos group
    if (key === 'produtos' &&
        ['conta-de-luz.html', 'bolsa-familia.html', 'clt.html', 'fgts.html'].includes(path)) {
      link.classList.add('is-active');
    }
  });
})();
