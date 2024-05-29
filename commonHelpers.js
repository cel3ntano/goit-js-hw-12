import{i as n,S as m}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function u(o){const s="https://pixabay.com/",r="api/",i={},e=new URLSearchParams({key:"11118529-f58244b993118eb30b9529deb",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:21}),t=`${s}${r}?${e}`;return fetch(t,{headers:i}).then(a=>{if(!a.ok)throw new Error(a.status);return a.json()})}function d(o){return o.map(({webformatURL:s,tags:r,likes:i,views:e,comments:t,downloads:a,largeImageURL:c})=>`<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${c}"><img src="${s}" alt="${r}" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${i}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Views</h2>
              <p class="image-details-value">${e}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Comments</h2>
              <p class="image-details-value">${t}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Downloads</h2>
              <p class="image-details-value">${a}</p>
            </li>
          </ul>
        </li>`).join("")}const l={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};l.form.addEventListener("submit",g);function g(o){o.preventDefault(),l.gallery.innerHTML="";const s=o.target.elements["search-input"].value.trim().toLowerCase();s?(l.form.reset(),l.loader.classList.add("is-open"),u(s).then(r=>{if(!r.hits.length)l.loader.classList.remove("is-open"),n.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight",timeout:2e3,progressBar:!1});else{l.loader.classList.remove("is-open");const i=d(r.hits),e=new m(".gallery-item-image a",{captionsData:"alt",captionDelay:250});l.gallery.insertAdjacentHTML("beforeend",i),e.refresh()}}).catch(r=>{console.log(r)})):n.show({message:"❌ Please enter a search query",color:"red",position:"topRight",timeout:2e3,progressBar:!1})}
//# sourceMappingURL=commonHelpers.js.map
