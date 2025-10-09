<script>
async function tryFetch(url){
  try{
    const r = await fetch(url, {cache:"no-store"});
    if(!r.ok) throw new Error(r.status);
    return await r.text();
  }catch(_){ return null; }
}

function norm(p){ return p.endsWith("/") ? p : p + "/"; }

function buildCandidates(base, leaf){
  // Current page directory (e.g., /benmusser/technology/)
  const pageDir = location.pathname.replace(/[^/]*$/, "");
  // Repo base (first segment), e.g., /benmusser/
  const parts = location.pathname.split("/").filter(Boolean);
  const repoBase = parts.length ? "/" + parts[0] + "/" : "/";

  const bases = Array.from(new Set([
    base,           // explicit base (data-base)
    "/benmusser/",  // DEFAULT for your GH Pages project
    repoBase,       // inferred fallback (handles subpaths)
    "/",            // custom domain fallback
    pageDir,        // current directory
    "../", "../../" // relative fallbacks (local previews)
  ].filter(Boolean).map(norm)));

  return bases.map(b => b + leaf.replace(/^\/+/, ""));
}

async function include(selector, leaf, fallbackHTML){
  const slot = document.querySelector(selector);
  if(!slot) return;
  const fromTag = (document.currentScript && document.currentScript.getAttribute("data-base")) || "/benmusser/";
  const candidates = buildCandidates(fromTag, leaf);
  for(const url of candidates){
    const html = await tryFetch(url);
    if(html){ slot.innerHTML = html; return; }
  }
  if(fallbackHTML) slot.innerHTML = fallbackHTML;
}

window.addEventListener("DOMContentLoaded", () => {
  const footerFallback = `
    <footer role="contentinfo" style="border-top:1px solid rgba(255,255,255,.08); margin-top:.75rem">
      <div class="footwrap" style="max-width:1100px;margin:0 auto;padding:1rem 1rem 1.25rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;justify-content:center;color:#cfcfcf">
        <a href="/benmusser/blog/">Author’s Notes</a> •
        <span>© 2025 Ben Musser, LLC</span>
      </div>
    </footer>`;

  include("#site-header", "partials/header.html", "");
  include("#site-footer", "partials/footer.html", footerFallback);
  include("#contact-cta", "partials/contact-cta.html", "");
});
</script>
