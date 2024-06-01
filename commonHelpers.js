import{a as p,i as c,S as y}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();let m=15;async function d(a,r=1){const s="https://pixabay.com/",l="api/",{data:e}=await p.get(`${s}${l}`,{params:{key:"11118529-f58244b993118eb30b9529deb",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:r}});return e}function u(a){return a.map(({webformatURL:r,tags:s,likes:l,views:e,comments:i,downloads:o,largeImageURL:h})=>`<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${h}"><img src="${r}" alt="${s}" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${l}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Views</h2>
              <p class="image-details-value">${e}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Comments</h2>
              <p class="image-details-value">${i}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Downloads</h2>
              <p class="image-details-value">${o}</p>
            </li>
          </ul>
        </li>`).join("")}const t={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),moreBtn:document.querySelector(".load-more-button")};t.form.addEventListener("submit",v);t.moreBtn.addEventListener("click",b);let g="",n;function v(a){n=1,a.preventDefault(),t.gallery.innerHTML="";const r=a.target.elements["search-input"].value.trim().toLowerCase();g=r,r?(t.form.reset(),t.loader.classList.add("is-visible"),d(r,n).then(s=>{if(!s.hits.length)t.loader.classList.remove("is-visible"),c.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight",timeout:2e3,progressBar:!1});else{if(t.loader.classList.remove("is-visible"),t.gallery.insertAdjacentHTML("beforeend",u(s.hits)),s.totalHits<=m)return;t.moreBtn.classList.add("is-visible")}f.refresh()}).catch(s=>{alert(s.message)})):(t.moreBtn.classList.remove("is-visible"),c.show({message:"❌ Please enter a search query",color:"red",position:"topRight",timeout:2e3,progressBar:!1}))}function b(){n+=1,t.moreBtn.disabled=!0,t.moreBtn.classList.remove("is-visible"),t.loader.classList.add("is-visible"),d(g,n).then(a=>{if(t.gallery.insertAdjacentHTML("beforeend",u(a.hits)),t.moreBtn.disabled=!1,t.moreBtn.classList.add("is-visible"),t.loader.classList.remove("is-visible"),a.totalHits>=m*n){t.moreBtn.classList.add("is-visible");const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:s*2,behavior:"smooth"});return}t.moreBtn.classList.remove("is-visible"),c.show({message:"❌ We're sorry, but you've reached the end of search results.",color:"red",position:"topRight",timeout:2e3,progressBar:!1}),f.refresh()})}const f=new y(".gallery-item-image a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
