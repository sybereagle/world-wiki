export function initBackButton() {
  var backBtn = document.getElementById('back-home-button');
  var content = document.getElementById('content');

  if (!backBtn || !content) return;

  function show() {
    backBtn.classList.remove('hidden');
  }

  function hide() {
    backBtn.classList.add('hidden');
  }

  backBtn.addEventListener('click', function () {
    window.location.hash = '';
    hide();
  });

  window.addEventListener('hashchange', function () {
    if (window.location.hash) show();
    else hide();
  });
}
