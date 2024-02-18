(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{xS:()=>q});var t="wff-cohort-6",n={baseUrl:"https://nomoreparties.co/v1",headers:{authorization:"a45e6989-377b-425c-9ff7-1106b77e3945","Content-Type":"application/json"}};function r(e,r,c){var u="".concat(n.baseUrl,"/").concat(t,"/").concat(e);return fetch(u,{method:r,headers:n.headers,body:JSON.stringify(c)}).then(o).catch((function(e){console.error("Ошибка при выполнении запроса:",e)}))}function o(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()}function c(e,t){var n=t.classList.contains("card__like-button_is-active")?"DELETE":"PUT";return r("cards/likes/".concat(e),n)}var u=document.querySelector("#card-template").content,a=document.querySelector(".places__list");function i(e,t,n,o,c){var a=e._id,i=e.name,l=e.link,p=e.owner,s=e.likes,d=u.querySelector(".card").cloneNode(!0),_=d.querySelector(".card__image"),f=d.querySelector(".card__title"),y=d.querySelector(".card__delete-button"),m=d.querySelector(".card__like-button"),v=d.querySelector(".card__likes-count");return _.src=l,_.alt="Карточка ".concat(i),f.innerText=i,v.textContent=s.length,s.some((function(e){return e._id===q}))&&m.classList.add("card__like-button_is-active"),p._id===c?y.style.display="block":y.style.display="none",y.addEventListener("click",(function(){var e;(e=a,r("cards/".concat(e),"DELETE")).then((function(){t(d)})).catch((function(e){console.error("Ошибка при удаление карточки:",e)}))})),_.addEventListener("click",o),m.addEventListener("click",(function(){n(a,m).then((function(e){v.textContent=e.likes.length,m.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при поставления лайка:",e)}))})),d}function l(e){e.remove()}function p(e,t){e.addEventListener("click",(function(n){(n.target.classList.contains("popup")||n.target.classList.contains("popup__close"))&&t(e)}))}function s(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",_)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",_)}function _(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&d(t)}}var f=function(e,t){var n=e.querySelector(".".concat(t.name,"_error-message"));t.classList.remove("popup__input_type_error"),n.classList.remove("error_msg_visible"),n.textContent=""},y=function(e,t){var n=t.dataset.errorMessage;t.validity.patternMismatch?t.setCustomValidity(n):t.setCustomValidity(""),t.validity.valid?f(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.name,"_error-message"));t.classList.add("popup__input_type_error"),r.textContent=n||t.validationMessage,r.classList.add("error_msg_visible")}(e,t,t.validationMessage)};function m(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("popup__button_disabled"),t.disabled=!1):(t.classList.add("popup__button_disabled"),t.disabled=!0)}var v=function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");t.forEach((function(t){f(e,t)})),m(t,n)};function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b,q,h,k,E,g,L=document.querySelector(".new-place_button"),C=(document.querySelector(".avatar-save_button"),document.querySelector(".popup_type_new-card")),x=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_image"),A=document.querySelector(".profile__add-button"),T=document.querySelector(".profile__edit-button"),j=document.querySelector(".popup_type_avatar-edit"),O=j.querySelector(".popup__content").querySelector(".popup__form"),P=document.querySelector(".profile__image"),D=(O.querySelector(".popup__input_type_avatarka"),document.querySelector(".popup_type_edit").querySelector(".popup__content").querySelector(".popup__form")),I=document.querySelector(".popup__input_type_name"),M=document.querySelector(".popup__input_type_description"),U=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),G=document.querySelector(".popup_type_new-card").querySelector(".popup__content"),H=G.querySelector(".popup__form"),N=G.querySelector(".popup__input_type_card-name"),V=G.querySelector(".popup__input_type_url"),z=document.querySelector(".popup__image"),J=document.querySelector(".popup__caption");function $(e){var t=e.name,n=e.link;J.textContent=t,z.src=n,z.alt="Карточка ".concat(t),s(w)}T.addEventListener("click",(function(){I.value=U.textContent,M.value=B.textContent,v(document.querySelector(".popup_type_edit form")),s(x)})),p(x,d),A.addEventListener("click",(function(){v(document.querySelector(".popup_type_new-card form")),N.value="",V.value="",s(C)})),p(C,d),p(w,d),D.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=M.value,c=I.value;e.submitter.textContent="Сохранение...",(t=c,n=o,r("users/me","PATCH",{name:t,about:n})).then((function(){B.textContent=o,U.textContent=c,d(x)})).catch((function(e){console.error("Ошибка при обновление информации о профиле:",e)})).finally((function(){e.submitter.textContent="Сохранить"}))})),Promise.all([r("users/me","GET"),r("cards","GET")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],u=r[1];U.textContent=o.name,B.textContent=o.about,b=u,q=o._id,u.forEach((function(e){var t=i(e,l,c,(function(){$(e)}),o._id);a.append(t)})),P.style.backgroundImage="url(".concat(o.avatar,")")})).catch((function(e){console.error("Ошибка при рендеринга карточек:",e)})),H.addEventListener("submit",(function(e){var t,n;e.preventDefault(),e.submitter.textContent="Сохранение...",(t=N.value,n=V.value,r("cards","POST",{name:t,link:n})).then((function(t){var n={_id:t._id,name:t.name,link:t.link,likes:t.likes,owner:t.owner};b.unshift(t);var r=i(n,l,c,(function(){$(n)}),q);a.prepend(r),e.target.reset(),d(C),L.disabled=!0})).catch((function(e){console.error("Ошибка при создания карточки:",e)})).finally((function(){e.submitter.textContent="Сохранить"}))})),k=(h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button"}).formSelector,E=h.inputSelector,g=h.submitButtonSelector,Array.from(document.querySelectorAll(k)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=Array.from(e.querySelectorAll(E)),n=e.querySelector(g);m(t,n),t.forEach((function(r){r.addEventListener("input",(function(){y(e,r),m(t,n)}))})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");m(t,n),t.forEach((function(r){r.addEventListener("input",(function(){y(e,r),m(t,n)}))}))}(e)})),P.addEventListener("click",(function(){O.elements["avatar-link"].value="",v(document.querySelector(".popup_type_avatar-edit form")),s(j)})),p(j,d),O.addEventListener("submit",(function(e){e.preventDefault();var t,n=O.elements["avatar-link"].value;e.submitter.textContent="Сохранение...",(t=n,r("users/me/avatar","PATCH",{avatar:t})).then((function(){P.style.backgroundImage="url(".concat(n,")"),d(j)})).catch((function(e){console.error("Ошибка при изменения аватарки:",e)})).finally((function(){e.submitter.textContent="Сохранить"}))}))})();