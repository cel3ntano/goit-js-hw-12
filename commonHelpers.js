import{a as v,S as E,i as S}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();let h=15;async function f(t,r=1){const i="https://pixabay.com/",a="api/",{data:e}=await v.get(`${i}${a}`,{params:{key:"11118529-f58244b993118eb30b9529deb",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:r}});return e}function p(t){return t.map(({webformatURL:r,tags:i,likes:a,views:e,comments:s,downloads:l,largeImageURL:w})=>`<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${w}"><img src="${r}" alt="${i}" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${a}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Views</h2>
              <p class="image-details-value">${e}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Comments</h2>
              <p class="image-details-value">${s}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Downloads</h2>
              <p class="image-details-value">${l}</p>
            </li>
          </ul>
        </li>`).join("")}const d=(t,r)=>{t.classList.toggle("is-visible",r),t===o.moreBtn&&(t.disabled=!r)},y=()=>d(o.moreBtn,!0),m=()=>d(o.moreBtn,!1),L=()=>d(o.loader,!0),g=()=>d(o.loader,!1),$={color:"red",position:"topRight",timeout:3e3,progressBar:!1},n={show(t){S.show({...$,message:t})},emptyQueryError(){this.show("❌ Please enter a search query")},reachedLimitError(){this.show("❌ We're sorry, but you've reached the end of search results.")},noResultsError(){this.show("❌ Sorry, there are no images matching your search query. Please try again!")}},o={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),moreBtn:document.querySelector(".load-more-button")};o.form.addEventListener("submit",q);o.moreBtn.addEventListener("click",B);let u="",c;function q(t){if(t.preventDefault(),m(),c=1,u=t.target.elements["search-input"].value.trim().toLowerCase(),o.gallery.innerHTML="",!u){m(),n.emptyQueryError();return}o.form.reset(),L(),f(u,c).then(r=>{if(g(),!r.hits.length){n.noResultsError();return}o.gallery.insertAdjacentHTML("beforeend",p(r.hits)),r.totalHits>h&&y(),b.refresh()}).catch(r=>{n.show(`❌ ${r.message}`)})}const b=new E(".gallery-item-image a",{captionsData:"alt",captionDelay:250});function B(){c+=1,m(),L(),f(u,c).then(t=>{if(g(),o.gallery.insertAdjacentHTML("beforeend",p(t.hits)),t.totalHits>h*c){y();const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:i*2,behavior:"smooth"})}else n.reachedLimitError();b.refresh()}).catch(t=>{g(),n.show(`❌ ${t.message}`)})}
//# sourceMappingURL=commonHelpers.js.map
