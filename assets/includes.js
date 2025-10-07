<script>
async function tryFetch(url){
  try{
    const r = await fetch(url, {cache:"no-store"});
    if(!r.ok) throw new Error(r.status);
    return await r.text();
  }catch(e){ return null; }
}

async function include(selector, candidates, fallbackHTML){
  const slot = document.querySelector(selector);
  if(!slot) return;
  for(const url of candidates){
    const html = await tryFetch(url);
    if(html){ slot.innerHTML = html; return; }
  }
  // Fallback (e.g., file:// preview)
  if(fallbackHTML) slot.innerHTML = fallbackHTML;
}

window.addEventListener("DOMContentLoaded", () => {
  const headerCandidates = ["/partials/header.html","../partials/header.html","../../partials/header.html"];
  const footerCandidates = ["/partials/footer.html","../partials/footer.html","../../partials/footer.html"];
  const ctaCandidates    = ["/partials/contact-cta.html","../partials/contact-cta.html","../../partials/contact-cta.html"];

  const footerFallback = `
    <footer role="contentinfo" style="border-top:1px solid rgba(255,255,255,.08); margin-top:.75rem">
      <div class="footwrap" style="max-width:1100px;margin:0 auto;padding:1rem 1rem 1.25rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;justify-content:center;color:#cfcfcf">
        <a href="/blog/">Author’s Notes</a> •
        <span>© 2025 Ben Musser, LLC</span>
      </div>
    </footer>`;

  include("#site-header", headerCandidates, "");          // header has no fallback
  include("#site-footer", footerCandidates, footerFallback);
  include("#contact-cta", ctaCandidates, "");            // only appears on pages that have the slot
});
</script>
