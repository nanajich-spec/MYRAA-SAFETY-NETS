(() => {
  const config = typeof BUSINESS_CONFIG !== 'undefined' ? BUSINESS_CONFIG : null;
  const ownerWhatsApp = config?.whatsappNumber || '919493948842';
  const notificationEmail = config?.email || 'myraa@myraasafetynets.com';
  const notificationEndpoint = `https://formsubmit.co/ajax/${notificationEmail}`;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const THEME_KEY = 'myraa-theme';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const updateThemeMeta = (theme) => {
    const metaTheme = $('meta[name="theme-color"]');
    if (!metaTheme) return;
    metaTheme.setAttribute('content', theme === 'dark' ? '#0d1726' : '#0a2f6b');
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeMeta(theme);

    const text = theme === 'dark' ? '☀️' : '🌙';
    const pressed = theme === 'dark';
    ['#themeToggle', '#themeToggleMobile'].forEach((selector) => {
      const btn = $(selector);
      if (!btn) return;
      btn.textContent = selector === '#themeToggleMobile'
        ? (theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme')
        : text;
      btn.setAttribute('aria-pressed', String(pressed));
    });
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = savedTheme || (themeMedia.matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    const handleToggle = () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    };

    ['#themeToggle', '#themeToggleMobile'].forEach((selector) => {
      const btn = $(selector);
      if (btn) btn.addEventListener('click', handleToggle);
    });

    themeMedia.addEventListener('change', (event) => {
      if (localStorage.getItem(THEME_KEY)) return;
      applyTheme(event.matches ? 'dark' : 'light');
    });
  };

  initTheme();

  const openWhatsApp = (payload) => {
    const msg = [
      'New Service Request - Myraa Safety Nets',
      `Name: ${payload.name || '-'}`,
      `Phone: ${payload.phone || '-'}`,
      `Email: ${payload.email || '-'}`,
      `City: ${payload.city || '-'}`,
      `Service: ${payload.service || '-'}`,
      `Message: ${payload.message || '-'}`
    ].join('\n');

    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  };

  const sendEmailNotification = async (payload, formType) => {
    const formData = new URLSearchParams();
    formData.append('_subject', `${formType} - ${config?.businessName || 'Myraa Safety Nets'}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('Form Type', formType);
    formData.append('Name', payload.name || '-');
    formData.append('Phone', payload.phone || '-');
    formData.append('Email', payload.email || '-');
    formData.append('City', payload.city || '-');
    formData.append('Service', payload.service || '-');
    formData.append('Message', payload.message || '-');
    formData.append('Source Page', window.location.href);
    formData.append('Submitted At', new Date().toLocaleString());

    try {
      const response = await fetch(notificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/json'
        },
        body: formData.toString()
      });
      return response.ok;
    } catch (_) {
      return false;
    }
  };

  const menuBtn = $('#menuBtn');
  const mobileNav = $('#mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      menuBtn.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  $$('.m-dd-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target || '');
      if (target) target.classList.toggle('open');
    });
  });

  $$('.m-link, .m-dd-list a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileNav?.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (menuBtn) menuBtn.textContent = '☰';
      }
    });
  });

  const desktopDropdowns = $$('.desktop-nav .nav-dd');
  if (desktopDropdowns.length) {
    const closeDesktopDropdowns = (except = null) => {
      desktopDropdowns.forEach((dd) => {
        if (dd !== except) dd.classList.remove('open');
      });
    };

    desktopDropdowns.forEach((dd) => {
      const trigger = $('button', dd);
      const menu = $('.dd-menu', dd);
      if (!trigger || !menu) return;

      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !dd.classList.contains('open');
        closeDesktopDropdowns(dd);
        dd.classList.toggle('open', willOpen);
      });

      $$('a', menu).forEach((menuLink) => {
        menuLink.addEventListener('click', () => closeDesktopDropdowns());
      });
    });

    document.addEventListener('click', (event) => {
      const clickedInsideDropdown = desktopDropdowns.some((dd) => dd.contains(event.target));
      if (!clickedInsideDropdown) closeDesktopDropdowns();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDesktopDropdowns();
    });
  }

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      const offset = $('#mainHeader')?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  const counters = $$('.counter');
  if (counters.length) {
    const animate = (el) => {
      const target = Number(el.dataset.target || '0');
      const duration = 1400;
      const step = Math.max(1, Math.ceil(target / (duration / 16)));
      let current = 0;
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target.toString();
        } else {
          el.textContent = current.toString();
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    };

    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: reducedMotion ? 0 : 0.5 });

    counters.forEach((c) => counterObs.observe(c));
  }

  const revealSections = $$('.reveal');
  if (revealSections.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealSections.forEach((section) => section.classList.add('in-view'));
    } else {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

      revealSections.forEach((section) => revealObserver.observe(section));
    }
  }

  const chips = $$('.chip');
  const cards = $$('.svc');
  const search = $('#serviceSearch');
  let activeFilter = 'all';

  const applyServiceFilter = () => {
    const query = (search?.value || '').trim().toLowerCase();
    cards.forEach((card) => {
      const cat = card.dataset.cat || '';
      const text = card.textContent.toLowerCase();
      const catMatch = activeFilter === 'all' || activeFilter === cat;
      const textMatch = !query || text.includes(query);
      card.style.display = catMatch && textMatch ? '' : 'none';
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter || 'all';
      applyServiceFilter();
    });
  });

  if (search) {
    search.addEventListener('input', applyServiceFilter);
  }

  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const videoExts = ['mp4', 'webm', 'ogg', 'mov'];
  const mediaState = {
    images: [],
    videos: [],
    filter: 'all'
  };

  const ensureUnique = (list) => Array.from(new Set(list));

  const getExtension = (value) => {
    const cleaned = value.split('?')[0].split('#')[0];
    const index = cleaned.lastIndexOf('.');
    return index >= 0 ? cleaned.slice(index + 1).toLowerCase() : '';
  };

  const normalizeMediaSrc = (src) => {
    const [basePath, query = ''] = src.split('?');
    const normalizedPath = basePath
      .split('/')
      .map((part) => {
        try {
          return encodeURIComponent(decodeURIComponent(part));
        } catch (_) {
          return encodeURIComponent(part);
        }
      })
      .join('/');

    return query ? `${normalizedPath}?${query}` : normalizedPath;
  };

  const buildMediaPath = (dir, fileName) => {
    const safeName = fileName
      .split('/')
      .map((part) => {
        try {
          return encodeURIComponent(decodeURIComponent(part));
        } catch (_) {
          return encodeURIComponent(part);
        }
      })
      .join('/');
    return `${dir}/${safeName}`;
  };

  const listFromDirectoryIndex = async (dir, allowedExts) => {
    try {
      const response = await fetch(`${dir}/`, { cache: 'no-store' });
      if (!response.ok) return [];

      const html = await response.text();
      if (!html || !html.includes('<a')) return [];

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const files = $$('a[href]', doc)
        .map((link) => link.getAttribute('href') || '')
        .map((href) => decodeURIComponent(href.split('?')[0].split('#')[0]))
        .map((href) => href.replace(/^\.\//, '').replace(/^\//, ''))
        .filter((href) => href && !href.endsWith('/'))
        .filter((href) => allowedExts.includes(getExtension(href)))
        .map((href) => href.split('/').pop())
        .filter(Boolean)
        .sort((a, b) => b.localeCompare(a));

      return ensureUnique(files).map((fileName) => buildMediaPath(dir, fileName));
    } catch (_) {
      return [];
    }
  };

  const listFromManifest = async () => {
    try {
      const response = await fetch(`js/media-manifest.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return { images: [], videos: [] };

      const manifest = await response.json();
      const images = Array.isArray(manifest.images) ? manifest.images : [];
      const videos = Array.isArray(manifest.videos) ? manifest.videos : [];

      return {
        images: images.filter((item) => imageExts.includes(getExtension(item))),
        videos: videos.filter((item) => videoExts.includes(getExtension(item)))
      };
    } catch (_) {
      return { images: [], videos: [] };
    }
  };

  const listFromConfig = () => {
    const images = Array.isArray(config?.media?.images) ? config.media.images : [];
    const videos = Array.isArray(config?.media?.videos) ? config.media.videos : [];
    return {
      images: images.filter((item) => imageExts.includes(getExtension(item))),
      videos: videos.filter((item) => videoExts.includes(getExtension(item)))
    };
  };

  const resolveMedia = async () => {
    const [folderImages, folderVideos, manifestMedia] = await Promise.all([
      listFromDirectoryIndex('images', imageExts),
      listFromDirectoryIndex('vedios', videoExts),
      listFromManifest()
    ]);
    const configuredMedia = listFromConfig();

    return {
      images: ensureUnique([...folderImages, ...manifestMedia.images, ...configuredMedia.images]),
      videos: ensureUnique([...folderVideos, ...manifestMedia.videos, ...configuredMedia.videos])
    };
  };

  const galleryTrack = $('#galleryTrack');
  const videoGrid = $('#videoGrid');
  const mediaCount = $('#mediaCount');
  const mediaChipGroup = $('#mediaChipGroup');
  const mediaRefresh = $('#mediaRefresh');
  const gallerySliderWrap = $('.gallery-slider-wrap');

  const renderImages = (items) => {
    if (!galleryTrack) return;
    if (!items.length) {
      galleryTrack.innerHTML = '<div class="media-empty">No images found in images folder.</div>';
      return;
    }

    galleryTrack.innerHTML = items
      .map((src, index) => {
        const safeSrc = normalizeMediaSrc(src);
        return `<img class="gallery-item" src="${safeSrc}" alt="Project image ${index + 1}" loading="lazy" decoding="async" fetchpriority="low">`;
      })
      .join('');
  };

  const getVideoMimeType = (src) => {
    const ext = getExtension(src);
    if (ext === 'mov') return 'video/quicktime';
    if (ext === 'ogg') return 'video/ogg';
    if (ext === 'webm') return 'video/webm';
    return 'video/mp4';
  };

  const renderVideos = (items) => {
    if (!videoGrid) return;
    if (!items.length) {
      videoGrid.innerHTML = '<div class="media-empty">No videos found in vedios folder.</div>';
      return;
    }

    videoGrid.innerHTML = items
      .map((src) => `
        <article class="video-card">
          <video controls preload="metadata" playsinline>
            <source src="${normalizeMediaSrc(src)}" type="${getVideoMimeType(src)}">
          </video>
        </article>`)
      .join('');
  };

  const applyMediaVisibility = () => {
    const showImages = mediaState.filter === 'all' || mediaState.filter === 'images';
    const showVideos = mediaState.filter === 'all' || mediaState.filter === 'videos';

    if (gallerySliderWrap) gallerySliderWrap.style.display = showImages ? '' : 'none';
    if (videoGrid) videoGrid.style.display = showVideos ? 'grid' : 'none';

    const message = `Showing ${showImages ? mediaState.images.length : 0} image(s) and ${showVideos ? mediaState.videos.length : 0} video(s).`;
    if (mediaCount) mediaCount.textContent = message;
  };

  const initMediaGallery = async () => {
    if (!galleryTrack || !videoGrid) return;

    if (mediaChipGroup) {
      $$('[data-media-filter]', mediaChipGroup).forEach((chip) => {
        chip.addEventListener('click', () => {
          $$('[data-media-filter]', mediaChipGroup).forEach((item) => item.classList.remove('active'));
          chip.classList.add('active');
          mediaState.filter = chip.dataset.mediaFilter || 'all';
          applyMediaVisibility();
        });
      });
    }

    const loadMedia = async () => {
      if (mediaCount) mediaCount.textContent = 'Refreshing gallery...';
      const media = await resolveMedia();
      mediaState.images = media.images;
      mediaState.videos = media.videos;
      renderImages(media.images);
      renderVideos(media.videos);
      applyMediaVisibility();
    };

    if (mediaRefresh) {
      mediaRefresh.addEventListener('click', loadMedia);
    }

    await loadMedia();
  };

  initMediaGallery();

  const galWrap = $('#galleryWrap');
  const galPrev = $('#galPrev');
  const galNext = $('#galNext');
  if (galWrap && galPrev && galNext) {
    const step = () => Math.max(220, Math.floor(galWrap.clientWidth * 0.75));
    galNext.addEventListener('click', () => galWrap.scrollBy({ left: step(), behavior: 'smooth' }));
    galPrev.addEventListener('click', () => galWrap.scrollBy({ left: -step(), behavior: 'smooth' }));
  }

  const reviews = $$('.review');
  const dotsWrap = $('#reviewDots');
  if (reviews.length && dotsWrap) {
    let idx = 0;
    dotsWrap.innerHTML = reviews.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}"></button>`).join('');
    const dots = $$('button', dotsWrap);

    const show = (i) => {
      reviews.forEach((r, ri) => r.classList.toggle('active', ri === i));
      dots.forEach((d, di) => d.classList.toggle('active', di === i));
      idx = i;
    };

    dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
    setInterval(() => show((idx + 1) % reviews.length), 4500);
  }

  const heroDynamicImage = $('#heroDynamicImage');
  const heroDynamicDots = $$('#heroDynamicDots span');
  if (heroDynamicImage && heroDynamicDots.length) {
    const heroImages = [
      'images/safetynet.jpg',
      'images/safetynet1.jpg',
      'images/safetynet3.jpg',
      'images/safetynet4.jpg',
      'images/safetynet5.jpg',
      'images/WhatsApp Image 2026-05-29 at 7.12.08 AM.jpeg'
    ];

    let heroImageIndex = 0;
    const updateHeroImage = (index) => {
      heroDynamicImage.src = heroImages[index];
      heroDynamicDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });
      heroImageIndex = index;
    };

    heroDynamicDots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateHeroImage(index));
    });

    setInterval(() => {
      const nextIndex = (heroImageIndex + 1) % heroImages.length;
      updateHeroImage(nextIndex);
    }, 2800);
  }

  const quickForm = $('#quickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: $('#qName')?.value.trim(),
        phone: $('#qPhone')?.value.trim(),
        city: $('#qCity')?.value,
        service: $('#qService')?.value,
        message: 'Submitted from quick enquiry form'
      };

      openWhatsApp(payload);
      const emailSent = await sendEmailNotification(payload, 'Quick Enquiry');
      quickForm.reset();
      alert(emailSent
        ? 'WhatsApp opened and email notification sent. Please tap Send in WhatsApp.'
        : 'WhatsApp opened. Please tap Send in WhatsApp. Email notification could not be sent this time.');
    });
  }

  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: $('#cName')?.value.trim(),
        phone: $('#cPhone')?.value.trim(),
        email: $('#cEmail')?.value.trim(),
        service: $('#cService')?.value,
        message: $('#cMsg')?.value.trim()
      };

      openWhatsApp(payload);
      const emailSent = await sendEmailNotification(payload, 'Detailed Request');
      contactForm.reset();
      alert(emailSent
        ? 'WhatsApp opened and email notification sent. Please tap Send in WhatsApp.'
        : 'WhatsApp opened. Please tap Send in WhatsApp. Email notification could not be sent this time.');
    });
  }
})();
