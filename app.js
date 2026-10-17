/**
 * ProMail.lk — Business email, made personal
 * High-Converting Frontend Application Engine
 * Powered by Peek Hosting (Pvt) Ltd, Sri Lanka
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Mark JS enabled for progressive enhancement
  document.body.classList.add('js');

  // Trigger entrance animations after slight paint delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add('is-loaded');
    }, 60);
  });

  /* -------------------------------------------------------------------------
   * Global State
   * ----------------------------------------------------------------------- */
  const state = {
    currency: 'LKR',
    cycle: '1', // '1' = 1-Year, '2' = 2-Year (Save 15%)
    user: 'kasun',
    domain: 'ceyloncraft',
    tld: '.lk',
    name: 'Kasun Perera',
    role: 'Managing Director',
    selectedPlan: 'Business .LK',
    mailboxCount: 5
  };

  /* -------------------------------------------------------------------------
   * DOM Elements Cache
   * ----------------------------------------------------------------------- */
  // Header & Navigation
  const header = document.getElementById('header');
  const progressBar = document.getElementById('progressBar');
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Interactive Composer
  const composerForm = document.getElementById('composerForm');
  const cUser = document.getElementById('cUser');
  const cDomain = document.getElementById('cDomain');
  const cTld = document.getElementById('cTld');
  const composerHint = document.getElementById('composerHint');
  const sampleChips = document.querySelectorAll('.chip');

  // Live Mail Client Preview
  const copyLiveEmailBtn = document.getElementById('copyLiveEmailBtn');
  const liveAvatar = document.getElementById('liveAvatar');
  const liveSenderName = document.getElementById('liveSenderName');
  const liveSenderEmail = document.getElementById('liveSenderEmail');
  const liveBodyCompany = document.getElementById('liveBodyCompany');
  const livePdfName = document.getElementById('livePdfName');
  const liveSigMark = document.getElementById('liveSigMark');
  const liveSigName = document.getElementById('liveSigName');
  const liveSigMeta = document.getElementById('liveSigMeta');

  // Automated Provisioning Simulator
  const liveSetupDomain = document.getElementById('liveSetupDomain');
  const setupStatusBadge = document.getElementById('setupStatusBadge');
  const setupProgressBar = document.getElementById('setupProgressBar');
  const stepDns = document.getElementById('stepDns');
  const stepSpf = document.getElementById('stepSpf');
  const stepDkim = document.getElementById('stepDkim');
  const stepDmarc = document.getElementById('stepDmarc');

  // Step Previews
  const step1DomainPreview = document.getElementById('step1DomainPreview');
  const step2CompanyPreview = document.getElementById('step2CompanyPreview');
  const step3EmailPreview = document.getElementById('step3EmailPreview');
  const stepsContainer = document.getElementById('stepsContainer');

  // Bento Grid Previews
  const bentoRegistrantPreview = document.getElementById('bentoRegistrantPreview');
  const trilingualGreet = document.getElementById('trilingualGreet');
  const bentoInvoiceLkr = document.getElementById('bentoInvoiceLkr');
  const bentoMigrateFrom = document.getElementById('bentoMigrateFrom');
  const bentoMigrateTo = document.getElementById('bentoMigrateTo');

  // Calculator
  const calcSlider = document.getElementById('calcSlider');
  const calcMailboxCount = document.getElementById('calcMailboxCount');
  const calcSavingsDisplay = document.getElementById('calcSavingsDisplay');
  const calcTierBadge = document.getElementById('calcTierBadge');
  const calcPromailPrice = document.getElementById('calcPromailPrice');
  const calcPromailPerMo = document.getElementById('calcPromailPerMo');
  const calcGooglePrice = document.getElementById('calcGooglePrice');
  const calcMsftPrice = document.getElementById('calcMsftPrice');

  // Segmented Controls
  const currencyToggleTop = document.getElementById('currencyToggleTop');
  const billingCycleToggle = document.getElementById('billingCycleToggle');
  const dynamicPriceNums = document.querySelectorAll('.price__num');

  // CTA Section
  const ctaAddressPreview = document.getElementById('ctaAddressPreview');
  const ctaCopyBtn = document.getElementById('ctaCopyBtn');

  // Slide-over Order Drawer
  const orderDrawer = document.getElementById('orderDrawer');
  const drawerScrim = document.getElementById('drawerScrim');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerForm = document.getElementById('drawerForm');
  const drawerDoneBtn = document.getElementById('drawerDoneBtn');
  const drawerAddressDisplay = document.getElementById('drawerAddressDisplay');
  const drawerDomainDisplay = document.getElementById('drawerDomainDisplay');
  const drawerPlanPriceDisplay = document.getElementById('drawerPlanPriceDisplay');
  const drawerPlanSelect = document.getElementById('drawerPlanSelect');
  const drawerName = document.getElementById('drawerName');
  const drawerPhone = document.getElementById('drawerPhone');
  const fieldNameWrap = document.getElementById('fieldNameWrap');
  const fieldPhoneWrap = document.getElementById('fieldPhoneWrap');
  const confirmedEmailText = document.getElementById('confirmedEmailText');
  const openDrawerButtons = document.querySelectorAll('.open-drawer');

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq__item');

  // Toast
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  /* -------------------------------------------------------------------------
   * Utilities
   * ----------------------------------------------------------------------- */
  function sanitizeUser(val) {
    if (!val) return 'kasun';
    const cleaned = val.toLowerCase().replace(/[^a-z0-9._-]/g, '').replace(/^\.+|\.+$/g, '');
    return cleaned || 'info';
  }

  function sanitizeDomain(val) {
    if (!val) return 'ceyloncraft';
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
    return cleaned || 'yourbrand';
  }

  function formatCompanyName(slug) {
    if (!slug) return 'Ceylon Craft';
    return slug
      .split(/[-_]+/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Ceylon Craft';
  }

  function getInitials(nameStr) {
    if (!nameStr) return 'KP';
    const parts = nameStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'LK';
  }

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('is-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-show');
    }, 2600);
  }

  /* -------------------------------------------------------------------------
   * Multi-Node Reactive Sync
   * ----------------------------------------------------------------------- */
  function syncAll() {
    const user = sanitizeUser(cUser ? cUser.value : state.user);
    const domain = sanitizeDomain(cDomain ? cDomain.value : state.domain);
    const tld = cTld ? cTld.value : state.tld;

    state.user = user;
    state.domain = domain;
    state.tld = tld;

    const fullDomain = `${domain}${tld}`;
    const fullEmail = `${user}@${fullDomain}`;
    const companyTitle = formatCompanyName(domain);
    const personInitials = getInitials(state.name);
    const companyInitials = getInitials(companyTitle);

    // 1. Composer Hint
    if (composerHint) {
      composerHint.innerHTML = `<strong>${fullDomain}</strong> is available for instant registration under your NIC or BR.`;
    }

    // 2. Client Inbox Preview
    if (liveAvatar) liveAvatar.textContent = personInitials;
    if (liveSenderName) liveSenderName.textContent = state.name;
    if (liveSenderEmail) liveSenderEmail.textContent = `<${fullEmail}>`;
    if (liveBodyCompany) liveBodyCompany.textContent = companyTitle;
    if (livePdfName) {
      const cleanCompanySlug = companyTitle.replace(/[^a-zA-Z0-9]/g, '');
      livePdfName.textContent = `Commercial_Invoice_${cleanCompanySlug || 'Quote'}.pdf`;
    }
    if (liveSigMark) liveSigMark.textContent = companyInitials || 'LK';
    if (liveSigName) liveSigName.textContent = `${state.name} — ${state.role}`;
    if (liveSigMeta) liveSigMeta.textContent = `${fullEmail} • www.${fullDomain}`;

    // 3. Automated Provisioning Simulator Head
    if (liveSetupDomain) liveSetupDomain.textContent = fullDomain;

    // 4. How It Works Steps
    if (step1DomainPreview) step1DomainPreview.textContent = fullDomain;
    if (step2CompanyPreview) step2CompanyPreview.textContent = companyTitle;
    if (step3EmailPreview) step3EmailPreview.textContent = fullEmail;

    // 5. Bento Grid Cards
    if (bentoRegistrantPreview) {
      bentoRegistrantPreview.textContent = `${companyTitle} (Pvt) Ltd`;
    }
    if (bentoMigrateFrom) {
      bentoMigrateFrom.textContent = `${domain}@gmail.com`;
    }
    if (bentoMigrateTo) {
      bentoMigrateTo.textContent = fullEmail;
    }

    // 6. Bottom CTA Box
    if (ctaAddressPreview) {
      ctaAddressPreview.textContent = fullEmail;
    }

    // 7. Drawer Display
    if (drawerAddressDisplay) {
      drawerAddressDisplay.textContent = fullEmail;
    }
    if (drawerDomainDisplay) {
      drawerDomainDisplay.textContent = fullDomain;
    }
    if (confirmedEmailText) {
      confirmedEmailText.textContent = fullEmail;
    }
    if (drawerName) {
      drawerName.placeholder = `e.g. ${state.name} — ${companyTitle} (Pvt) Ltd`;
    }

    updateDrawerPlanPriceSummary();
  }

  /* -------------------------------------------------------------------------
   * Provisioning Verification Animation Simulator
   * ----------------------------------------------------------------------- */
  let simTimeout = null;

  function runProvisioningSimulation() {
    if (!setupStatusBadge || !setupProgressBar) return;

    if (simTimeout) clearTimeout(simTimeout);

    // Set state: busy
    setupStatusBadge.textContent = 'Verifying DNS...';
    setupStatusBadge.setAttribute('data-state', 'busy');

    const steps = [stepDns, stepSpf, stepDkim, stepDmarc].filter(Boolean);
    steps.forEach(step => {
      step.classList.remove('is-done');
      step.classList.remove('is-active');
    });

    setupProgressBar.style.width = '0%';

    // Step 1: DNS
    setTimeout(() => {
      setupProgressBar.style.width = '25%';
      if (stepDns) {
        stepDns.classList.add('is-active');
        stepDns.classList.add('is-done');
      }
    }, 140);

    // Step 2: SPF
    setTimeout(() => {
      setupProgressBar.style.width = '55%';
      if (stepSpf) {
        stepSpf.classList.add('is-active');
        stepSpf.classList.add('is-done');
      }
    }, 320);

    // Step 3: DKIM
    setTimeout(() => {
      setupProgressBar.style.width = '80%';
      if (stepDkim) {
        stepDkim.classList.add('is-active');
        stepDkim.classList.add('is-done');
      }
    }, 500);

    // Step 4: DMARC & Done
    simTimeout = setTimeout(() => {
      setupProgressBar.style.width = '100%';
      if (stepDmarc) {
        stepDmarc.classList.add('is-active');
        stepDmarc.classList.add('is-done');
      }
      setupStatusBadge.textContent = 'Active';
      setupStatusBadge.setAttribute('data-state', 'ok');
    }, 720);
  }

  /* -------------------------------------------------------------------------
   * Composer Event Listeners
   * ----------------------------------------------------------------------- */
  if (cUser) {
    cUser.addEventListener('input', () => {
      sampleChips.forEach(chip => chip.classList.remove('is-active'));
      const val = sanitizeUser(cUser.value);
      state.name = val ? (val.charAt(0).toUpperCase() + val.slice(1) + ' Perera') : 'Kasun Perera';
      syncAll();
    });
  }

  if (cDomain) {
    cDomain.addEventListener('input', () => {
      sampleChips.forEach(chip => chip.classList.remove('is-active'));
      syncAll();
      runProvisioningSimulation();
    });
  }

  if (cTld) {
    cTld.addEventListener('change', () => {
      syncAll();
      runProvisioningSimulation();
    });
  }

  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sampleChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      if (cUser) cUser.value = chip.dataset.user || 'kasun';
      if (cDomain) cDomain.value = chip.dataset.domain || 'ceyloncraft';
      if (cTld) cTld.value = chip.dataset.tld || '.lk';

      state.name = chip.dataset.name || 'Kasun Perera';
      state.role = chip.dataset.role || 'Managing Director';

      syncAll();
      runProvisioningSimulation();
    });
  });

  if (composerForm) {
    composerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runProvisioningSimulation();
      showToast(`Verified! ${state.domain}${state.tld} is ready for reservation.`);
      setTimeout(() => {
        openDrawer(state.selectedPlan || 'Business .LK');
      }, 500);
    });
  }

  /* -------------------------------------------------------------------------
   * Trilingual Greeting Rotating Loop
   * ----------------------------------------------------------------------- */
  if (trilingualGreet) {
    const greets = trilingualGreet.querySelectorAll('span');
    if (greets.length > 1) {
      let greetIndex = 0;
      setInterval(() => {
        const currentSpan = greets[greetIndex];
        currentSpan.classList.add('is-leaving');
        currentSpan.classList.remove('is-current');

        greetIndex = (greetIndex + 1) % greets.length;
        const nextSpan = greets[greetIndex];
        nextSpan.classList.remove('is-leaving');
        nextSpan.classList.add('is-current');

        setTimeout(() => {
          currentSpan.classList.remove('is-leaving');
        }, 650);
      }, 3600);
    }
  }

  /* -------------------------------------------------------------------------
   * Interactive Savings Calculator
   * ----------------------------------------------------------------------- */
  function updateCalculator() {
    if (!calcSlider) return;

    const count = parseInt(calcSlider.value, 10) || 5;
    state.mailboxCount = count;

    if (calcMailboxCount) {
      calcMailboxCount.textContent = `${count} ${count === 1 ? 'Mailbox' : 'Mailboxes'}`;
    }

    // Determine tier & pricing
    let promailLkr = 14900;
    let promailUsd = 49;
    let tierTitle = 'Recommended: Business .LK Bundle';

    if (count <= 2) {
      promailLkr = 6900;
      promailUsd = 23;
      tierTitle = 'Recommended: Starter .LK Bundle (2 Mailboxes)';
    } else if (count > 10) {
      promailLkr = 29900;
      promailUsd = 99;
      tierTitle = 'Recommended: Organization .LK Bundle (50 Mailboxes)';
    } else {
      tierTitle = 'Recommended: Business .LK Bundle (10 Mailboxes)';
    }

    if (calcTierBadge) {
      calcTierBadge.textContent = tierTitle;
    }

    // Benchmark figures
    // Google: $7.20 / user / mo + separate .LK domain (Rs. 5,500 / $18)
    const googleLkr = Math.round(count * 7.2 * 305 * 12 + 5500);
    const googleUsd = Math.round(count * 7.2 * 12 + 18);

    // Microsoft: $6.00 / user / mo + separate .LK domain
    const msftLkr = Math.round(count * 6.0 * 305 * 12 + 5500);
    const msftUsd = Math.round(count * 6.0 * 12 + 18);

    const savedLkr = googleLkr - promailLkr;
    const savedUsd = googleUsd - promailUsd;

    const perUserMoLkr = Math.round(promailLkr / 12 / count);
    const perUserMoUsd = (promailUsd / 12 / count).toFixed(2);

    if (state.currency === 'LKR') {
      if (calcSavingsDisplay) {
        calcSavingsDisplay.textContent = `Rs. ${savedLkr.toLocaleString()} / yr`;
      }
      if (calcPromailPrice) {
        calcPromailPrice.innerHTML = `Rs. ${promailLkr.toLocaleString()} <small>/ yr total</small>`;
      }
      if (calcPromailPerMo) {
        calcPromailPerMo.textContent = `Equivalent to Rs. ${perUserMoLkr.toLocaleString()} / month per mailbox`;
      }
      if (calcGooglePrice) {
        calcGooglePrice.innerHTML = `Rs. ${googleLkr.toLocaleString()} <small>/ yr total</small>`;
      }
      if (calcMsftPrice) {
        calcMsftPrice.innerHTML = `Rs. ${msftLkr.toLocaleString()} <small>/ yr total</small>`;
      }
    } else {
      if (calcSavingsDisplay) {
        calcSavingsDisplay.textContent = `$${savedUsd.toLocaleString()} / yr`;
      }
      if (calcPromailPrice) {
        calcPromailPrice.innerHTML = `$${promailUsd} <small>/ yr total</small>`;
      }
      if (calcPromailPerMo) {
        calcPromailPerMo.textContent = `Equivalent to $${perUserMoUsd} / month per mailbox`;
      }
      if (calcGooglePrice) {
        calcGooglePrice.innerHTML = `$${googleUsd.toLocaleString()} <small>/ yr total</small>`;
      }
      if (calcMsftPrice) {
        calcMsftPrice.innerHTML = `$${msftUsd.toLocaleString()} <small>/ yr total</small>`;
      }
    }
  }

  if (calcSlider) {
    calcSlider.addEventListener('input', updateCalculator);
  }

  /* -------------------------------------------------------------------------
   * Segmented Controls (Currency & Billing Cycle)
   * ----------------------------------------------------------------------- */
  function updateSegThumb(seg) {
    if (!seg) return;
    const activeBtn = seg.querySelector('.seg__btn.is-active');
    const thumb = seg.querySelector('.seg__thumb');
    if (!activeBtn || !thumb) return;

    const offsetLeft = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;

    thumb.style.transform = `translateX(${offsetLeft}px)`;
    thumb.style.width = `${width}px`;

    seg.classList.add('is-ready');
  }

  function initSegControl(seg, onSelect) {
    if (!seg) return;
    const buttons = seg.querySelectorAll('.seg__btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        updateSegThumb(seg);
        if (typeof onSelect === 'function') {
          onSelect(btn);
        }
      });
    });

    updateSegThumb(seg);
  }

  // Currency Toggle Top
  initSegControl(currencyToggleTop, (activeBtn) => {
    state.currency = activeBtn.getAttribute('data-currency') || 'LKR';
    updateAllPricingDisplays();
  });

  // Billing Cycle Toggle
  initSegControl(billingCycleToggle, (activeBtn) => {
    state.cycle = activeBtn.getAttribute('data-cycle') || '1';
    updateAllPricingDisplays();
  });

  function updateAllPricingDisplays() {
    // 1. Pricing Tier Numbers
    const priceAttr = `data-price-${state.currency.toLowerCase()}-${state.cycle}`;
    dynamicPriceNums.forEach(numEl => {
      const formattedPrice = numEl.getAttribute(priceAttr);
      if (formattedPrice) {
        numEl.textContent = formattedPrice;
      }
    });

    // 2. Bento Card Rupee Invoice
    if (bentoInvoiceLkr) {
      if (state.currency === 'LKR') {
        bentoInvoiceLkr.textContent = state.cycle === '2' ? 'Rs. 12,650 / yr' : 'Rs. 14,900 / yr';
      } else {
        bentoInvoiceLkr.textContent = state.cycle === '2' ? '$42 / yr' : '$49 / yr';
      }
    }

    // 3. Calculator Sync
    updateCalculator();

    // 4. Drawer Summary Sync
    updateDrawerPlanPriceSummary();
  }

  function updateDrawerPlanPriceSummary() {
    if (!drawerPlanPriceDisplay) return;

    const plan = state.selectedPlan || 'Business .LK';
    let priceText = '';

    if (plan.includes('Starter')) {
      if (state.currency === 'LKR') {
        priceText = state.cycle === '2' ? 'Starter .LK (Rs. 5,850 / yr billed 2 yrs)' : 'Starter .LK (Rs. 6,900 / yr)';
      } else {
        priceText = state.cycle === '2' ? 'Starter .LK ($19 / yr billed 2 yrs)' : 'Starter .LK ($23 / yr)';
      }
    } else if (plan.includes('Organization')) {
      if (state.currency === 'LKR') {
        priceText = state.cycle === '2' ? 'Organization .LK (Rs. 25,400 / yr billed 2 yrs)' : 'Organization .LK (Rs. 29,900 / yr)';
      } else {
        priceText = state.cycle === '2' ? 'Organization .LK ($84 / yr billed 2 yrs)' : 'Organization .LK ($99 / yr)';
      }
    } else {
      // Business .LK default
      if (state.currency === 'LKR') {
        priceText = state.cycle === '2' ? 'Business .LK (Rs. 12,650 / yr billed 2 yrs)' : 'Business .LK (Rs. 14,900 / yr)';
      } else {
        priceText = state.cycle === '2' ? 'Business .LK ($42 / yr billed 2 yrs)' : 'Business .LK ($49 / yr)';
      }
    }

    drawerPlanPriceDisplay.textContent = priceText;
  }

  // Recalculate thumbs on resize
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      updateSegThumb(currencyToggleTop);
      updateSegThumb(billingCycleToggle);
    });
  });

  /* -------------------------------------------------------------------------
   * Reading Progress Bar & Header Scroll Behavior
   * ----------------------------------------------------------------------- */
  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress Bar
    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }

    // Sticky Header Scroll Styles
    if (header) {
      if (currentScrollY > 60) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Hide header on deep scroll down, reveal on scroll up
      if (currentScrollY > 260 && currentScrollY > lastScrollY && !mobileMenu?.classList.contains('is-open')) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* -------------------------------------------------------------------------
   * IntersectionObserver for Scroll Reveal & Active Navigation
   * ----------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Steps line animation trigger
    if (stepsContainer) {
      const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            stepsContainer.classList.add('is-in');
            stepsObserver.unobserve(stepsContainer);
          }
        });
      }, { threshold: 0.2 });
      stepsObserver.observe(stepsContainer);
    }

    // Scrollspy for navigation links
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));
  } else {
    // Fallback if IntersectionObserver unsupported
    revealElements.forEach(el => el.classList.add('is-in'));
    if (stepsContainer) stepsContainer.classList.add('is-in');
  }

  /* -------------------------------------------------------------------------
   * Mobile Menu Drawer
   * ----------------------------------------------------------------------- */
  function toggleMobileMenu(open) {
    if (!mobileMenu || !burgerBtn) return;
    const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('is-open');

    if (shouldOpen) {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    } else {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
  }

  // Close mobile menu on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && mobileMenu?.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  /* -------------------------------------------------------------------------
   * FAQ Accordion
   * ----------------------------------------------------------------------- */
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq__q');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* -------------------------------------------------------------------------
   * Slide-Over Reservation Drawer
   * ----------------------------------------------------------------------- */
  function openDrawer(planName) {
    if (!orderDrawer) return;

    if (planName) {
      state.selectedPlan = planName;
      if (drawerPlanSelect) {
        for (let i = 0; i < drawerPlanSelect.options.length; i++) {
          if (drawerPlanSelect.options[i].value.includes(planName) || planName.includes(drawerPlanSelect.options[i].value)) {
            drawerPlanSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    syncAll();

    // Reset validation & view
    orderDrawer.classList.remove('is-done');
    if (fieldNameWrap) fieldNameWrap.classList.remove('is-error');
    if (fieldPhoneWrap) fieldPhoneWrap.classList.remove('is-error');

    orderDrawer.classList.add('is-open');
    orderDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    // Auto-focus input
    setTimeout(() => {
      if (drawerName) drawerName.focus();
    }, 200);
  }

  function closeDrawer() {
    if (!orderDrawer) return;
    orderDrawer.classList.remove('is-open');
    orderDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  openDrawerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || 'Business .LK';
      openDrawer(plan);
    });
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerScrim) drawerScrim.addEventListener('click', closeDrawer);
  if (drawerDoneBtn) drawerDoneBtn.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderDrawer?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  if (drawerPlanSelect) {
    drawerPlanSelect.addEventListener('change', () => {
      state.selectedPlan = drawerPlanSelect.value;
      updateDrawerPlanPriceSummary();
    });
  }

  // Drawer Form Submission & Client-Side Validation
  if (drawerForm) {
    drawerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Validate Name
      const nameVal = drawerName ? drawerName.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        if (fieldNameWrap) fieldNameWrap.classList.add('is-error');
        hasError = true;
      } else {
        if (fieldNameWrap) fieldNameWrap.classList.remove('is-error');
      }

      // Validate Phone (Sri Lankan phone pattern: ~9-12 digits)
      const phoneVal = drawerPhone ? drawerPhone.value.trim().replace(/[\s-]/g, '') : '';
      const phoneRegex = /^(?:\+94|0)?7[0-9]{8}$/;
      if (!phoneVal || !phoneRegex.test(phoneVal)) {
        if (fieldPhoneWrap) fieldPhoneWrap.classList.add('is-error');
        hasError = true;
      } else {
        if (fieldPhoneWrap) fieldPhoneWrap.classList.remove('is-error');
      }

      if (hasError) {
        if (fieldNameWrap?.classList.contains('is-error')) {
          drawerName?.focus();
        } else if (fieldPhoneWrap?.classList.contains('is-error')) {
          drawerPhone?.focus();
        }
        return;
      }

      // Update confirmed text
      const fullDomain = `${state.domain}${state.tld}`;
      const fullEmail = `${state.user}@${fullDomain}`;
      if (confirmedEmailText) {
        confirmedEmailText.textContent = fullEmail;
      }

      // Transition to success state
      orderDrawer.classList.add('is-done');
      showToast(`Reserved! Activation details queued for ${phoneVal}`);
    });
  }

  /* -------------------------------------------------------------------------
   * Copy to Clipboard Actions
   * ----------------------------------------------------------------------- */
  function copyTextToClipboard(text, buttonEl, successMsg) {
    if (!text) return;
    const cleanText = text.replace(/[<>]/g, '').trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanText).then(() => {
        handleCopySuccess(buttonEl, successMsg);
      }).catch(() => {
        fallbackCopy(cleanText, buttonEl, successMsg);
      });
    } else {
      fallbackCopy(cleanText, buttonEl, successMsg);
    }
  }

  function fallbackCopy(text, buttonEl, successMsg) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      handleCopySuccess(buttonEl, successMsg);
    } catch {
      showToast('Could not copy automatically');
    }
    document.body.removeChild(tempInput);
  }

  function handleCopySuccess(buttonEl, msg) {
    showToast(msg || 'Copied to clipboard');
    if (buttonEl) {
      const origHtml = buttonEl.innerHTML;
      const textSpan = buttonEl.querySelector('span');
      if (textSpan) textSpan.textContent = 'Copied!';
      setTimeout(() => {
        buttonEl.innerHTML = origHtml;
      }, 1600);
    }
  }

  if (copyLiveEmailBtn) {
    copyLiveEmailBtn.addEventListener('click', () => {
      const addr = liveSenderEmail ? liveSenderEmail.textContent : '';
      copyTextToClipboard(addr, copyLiveEmailBtn, 'Sender email copied to clipboard');
    });
  }

  if (ctaCopyBtn) {
    ctaCopyBtn.addEventListener('click', () => {
      const addr = ctaAddressPreview ? ctaAddressPreview.textContent : '';
      copyTextToClipboard(addr, ctaCopyBtn, 'Address copied to clipboard');
    });
  }

  /* -------------------------------------------------------------------------
   * Initial Mount
   * ----------------------------------------------------------------------- */
  syncAll();
  updateCalculator();
  updateAllPricingDisplays();
  runProvisioningSimulation();

  // Initial scroll tick
  onScroll();
});
