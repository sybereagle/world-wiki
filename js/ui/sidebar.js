// ./ui/sidebar.js
export function initSidebar() {
  // Grab essential elements
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  // Exit early if elements are missing
  if (!toggleBtn || !sidebar || !overlay) {
    console.error('Sidebar init failed: missing required elements.');
    return;
  }

  // ----- Mobile functions -----
  function openMobileSidebar() {
    sidebar.classList.add('visible');
    overlay.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.textContent = '✕';
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('visible');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.textContent = '☰';
  }

  // ----- Desktop toggle -----
  function toggleDesktopSidebar() {
    const isHidden = sidebar.classList.contains('hidden');

    if (isHidden) {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('visible');
      toggleBtn.classList.add('desktop-active');
    } else {
      sidebar.classList.remove('visible');
      sidebar.classList.add('hidden');
      toggleBtn.classList.remove('desktop-active');
    }
  }

  // ----- Main toggle handler -----
  function handleToggle() {
    if (window.innerWidth <= 900) {
      sidebar.classList.contains('visible') ? closeMobileSidebar() : openMobileSidebar();
    } else {
      toggleDesktopSidebar();
    }
  }

  // ----- Event listeners -----
  toggleBtn.addEventListener('click', handleToggle);

  overlay.addEventListener('click', () => {
    if (window.innerWidth <= 900) closeMobileSidebar();
  });

  sidebar.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 900) closeMobileSidebar();
  });

  // ----- Reset sidebar on window resize -----
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      // Ensure desktop state
      sidebar.classList.remove('hidden');
      sidebar.classList.add('visible');
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.textContent = '☰';
    } else {
      // Mobile: hide overlay
      overlay.classList.remove('active');
    }
  });
}

