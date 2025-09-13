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
