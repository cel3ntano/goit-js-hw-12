import{a as v,i as c,S as w}from"./assets/vendor-c493984e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();let g=15;async function h(r,i=1){const t="https://pixabay.com/",o="api/",{data:e}=await v.get(`${t}${o}`,{params:{key:"11118529-f58244b993118eb30b9529deb",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g,page:i}});return e}function f(r){return r.map(({webformatURL:i,tags:t,likes:o,views:e,comments:s,downloads:l,largeImageURL:L})=>`<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${L}"><img src="${i}" alt="${t}" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${o}</p>
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
        </li>`).join("")}const d=()=>{a.moreBtn.classList.add("is-visible"),a.moreBtn.disabled=!1},m=()=>{a.moreBtn.classList.remove("is-visible"),a.moreBtn.disabled=!0},p=()=>{a.loader.classList.add("is-visible")},u=()=>{a.loader.classList.remove("is-visible")},a={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),moreBtn:document.querySelector(".load-more-button")};a.form.addEventListener("submit",B);a.moreBtn.addEventListener("click",S);let y="",n;function B(r){n=1,r.preventDefault(),a.gallery.innerHTML="";const i=r.target.elements["search-input"].value.trim().toLowerCase();y=i,i?(a.form.reset(),p(),h(i,n).then(t=>{if(!t.hits.length)u(),c.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight",timeout:2e3,progressBar:!1});else{if(u(),a.gallery.insertAdjacentHTML("beforeend",f(t.hits)),t.totalHits<=g)return;d()}b.refresh()}).catch(t=>{alert(t.message)})):(m(),c.show({message:"❌ Please enter a search query",color:"red",position:"topRight",timeout:2e3,progressBar:!1}))}const b=new w(".gallery-item-image a",{captionsData:"alt",captionDelay:250});function S(){n+=1,m(),p(),h(y,n).then(r=>{if(a.gallery.insertAdjacentHTML("beforeend",f(r.hits)),d(),u(),r.totalHits>=g*n){d();const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:t*2,behavior:"smooth"}),b.refresh();return}m(),c.show({message:"❌ We're sorry, but you've reached the end of search results.",color:"red",position:"topRight",timeout:2e3,progressBar:!1})}).catch(r=>{alert(r.message)})}
//# sourceMappingURL=commonHelpers.js.map
