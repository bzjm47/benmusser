<script>
async function include(selector, url){
  const slot = document.querySelector(selector);
  if (!slot) return;
  try {
    const res = await fetch(url, {cache:"no-store"});
    if (!res.ok) throw new Error(res.status);
    slot.innerHTML = await res.text();
  } catch(e){
    console.warn("Include failed:", url, e);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  include("#site-header", "/partials/header.html");
  include("#site-footer", "/partials/footer.html");
  include("#contact-cta", "/partials/contact-cta.html");
});
</script>