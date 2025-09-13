// Keyboard nav across hotspots
const hs = Array.from(document.querySelectorAll('.hotspot'));
hs.forEach((el, i) => {
  el.tabIndex = 0;
  el.addEventListener('keydown', (e) => {
    const n = hs.length;
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      hs[(i+1)%n].focus();
    } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      hs[(i-1+n)%n].focus();
    }
  });
});

// Debug overlay if ?debug=1
const params = new URLSearchParams(location.search);
if (params.get('debug') === '1') document.body.classList.add('debug');

// ?links=off disables all links; ?links=toes disables only toe links
(function () {
  const p = new URLSearchParams(location.search).get('links');
  if (p === 'off') document.body.classList.add('links-off');
  if (p === 'toes') document.body.classList.add('links-off-toes');

  // optional keyboard guard when fully off
  if (p === 'off') {
    document.querySelectorAll('.hotspot').forEach(el => {
      el.addEventListener('click', e => e.preventDefault(), true);
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
      }, true);
    });
  }
})();
