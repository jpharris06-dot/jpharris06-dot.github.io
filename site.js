(function(){
  const path = window.location.pathname;

  const navHTML = `
    <div class="nav">
      <a href="/" class="who" style="text-decoration:none;">JAMES HARRIS</a>
      <span class="links">
        <a href="/about-me/" data-nav="/about-me/">About</a>
        <a href="/case-studies/" data-nav="/case-studies/">Case Studies</a>
        <a href="https://www.linkedin.com/in/the-james-harris/" target="_blank" rel="noopener">LinkedIn Profile</a>
        <a href="#" id="nav-contact">Contact</a>
      </span>
    </div>`;

  const footerHTML = `
    <footer>
      <span>&copy; 2026 James Harris</span>
      <a href="#" id="footer-contact">jpharris06@gmail.com</a>
    </footer>`;

  const emailModalHTML = `
    <div class="email-modal-overlay" id="email-modal">
      <div class="email-modal-card">
        <div class="email-modal-head">
          <span>Reach James</span>
          <button class="email-modal-close" id="email-modal-close" aria-label="Close">&#10005;</button>
        </div>
        <div class="email-modal-options">
          <a class="email-option" href="https://mail.google.com/mail/?view=cm&fs=1&to=jpharris06@gmail.com" target="_blank" rel="noopener">
            <span class="email-option-icon">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#EA4335" d="M12 13.2 2.4 6.6V18a1.8 1.8 0 0 0 1.8 1.8h1.6V9.9l6.2 4.3 6.2-4.3v9.9h1.6A1.8 1.8 0 0 0 21.6 18V6.6L12 13.2Z"/><path fill="#4285F4" d="M19.8 4.8h-.4L12 10.1 4.6 4.8h-.4A1.8 1.8 0 0 0 2.4 6.6l9.6 6.6 9.6-6.6a1.8 1.8 0 0 0-1.8-1.8Z"/></svg>
            </span>
            <span>Open in Gmail</span>
          </a>
          <a class="email-option" href="https://outlook.office.com/mail/deeplink/compose?to=jpharris06@gmail.com" target="_blank" rel="noopener">
            <span class="email-option-icon">
              <svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="5" width="13" height="14" rx="1.5" fill="#0A2767"/><path fill="#28A8EA" d="M22 8.2v8.4c0 .6-.5 1-1 .8l-6-3.1V9.9l6-3.1c.5-.2 1 .2 1 .8Z"/><rect x="4" y="8" width="9" height="8" fill="#fff"/></svg>
            </span>
            <span>Open in Outlook</span>
          </a>
          <button class="email-option" id="copy-email-btn">
            <span class="email-option-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.6"/></svg>
            </span>
            <span id="copy-email-label">Copy email address</span>
          </button>
        </div>
      </div>
    </div>`;

  function initNavAndFooter(){
    const navSlot = document.getElementById('site-nav');
    const footerSlot = document.getElementById('site-footer');
    if (navSlot) navSlot.innerHTML = navHTML;
    if (footerSlot) footerSlot.innerHTML = footerHTML;

    document.querySelectorAll('.nav .links a[data-nav]').forEach((a) => {
      if (path === a.dataset.nav || (a.dataset.nav !== '/' && path.startsWith(a.dataset.nav))) {
        a.classList.add('active');
      }
    });
  }

  function initEmailModal(){
    document.body.insertAdjacentHTML('beforeend', emailModalHTML);
    const emailModal = document.getElementById('email-modal');

    function openEmailModal(e){ e.preventDefault(); emailModal.classList.add('show'); }
    function closeEmailModal(){ emailModal.classList.remove('show'); }

    document.getElementById('nav-contact')?.addEventListener('click', openEmailModal);
    document.getElementById('footer-contact')?.addEventListener('click', openEmailModal);
    document.getElementById('email-modal-close').addEventListener('click', closeEmailModal);
    emailModal.addEventListener('click', (e) => { if (e.target === emailModal) closeEmailModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeEmailModal(); });

    document.getElementById('copy-email-btn').addEventListener('click', async () => {
      const label = document.getElementById('copy-email-label');
      try {
        await navigator.clipboard.writeText('jpharris06@gmail.com');
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = 'Copy email address'; }, 1600);
      } catch (err) {
        label.textContent = 'jpharris06@gmail.com';
      }
    });
  }

  function initPhotoLightbox(){
    const profilePhoto = document.getElementById('profile-photo');
    if (!profilePhoto) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="photo-lightbox-overlay" id="photo-lightbox">
        <img src="/profile.jpg" alt="James Harris" class="photo-lightbox-img">
      </div>`);
    const lightbox = document.getElementById('photo-lightbox');

    profilePhoto.addEventListener('click', () => lightbox.classList.add('show'));
    lightbox.addEventListener('click', () => lightbox.classList.remove('show'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('show'); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavAndFooter();
    initEmailModal();
    initPhotoLightbox();
  });
})();
