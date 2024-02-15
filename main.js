(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{eb:()=>$,sR:()=>L,mH:()=>F,bj:()=>U,O9:()=>J,fo:()=>E,XC:()=>B});var t=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],n="a45e6989-377b-425c-9ff7-1106b77e3945",o="wff-cohort-6",r=function(e){return fetch(e,{headers:{authorization:n}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()}))},c=document.querySelector("#card-template").content,a=document.querySelector(".places__list");function u(e,t,r,a,u){var i=e._id,s=e.name,l=e.link,p=e.owner,d=e.likes,f=c.querySelector(".card").cloneNode(!0),m=f.querySelector(".card__image"),v=f.querySelector(".card__title"),y=f.querySelector(".card__delete-button"),_=f.querySelector(".card__like-button"),h=f.querySelector(".card__likes-count");return m.src=l,m.alt="Карточка ".concat(s),v.innerText=s,h.textContent=d.length,d.some((function(e){return"b77843909fb6288163bb8892"===e._id}))&&_.classList.add("card__like-button_is-active"),p._id===u?y.style.display="block":y.style.display="none",y.addEventListener("click",(function(){var e;t(f,i),e=i,fetch("https://nomoreparties.co/v1/".concat(o,"/cards/").concat(e),{method:"DELETE",headers:{authorization:n}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status))})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))})),m.addEventListener("click",a),_.addEventListener("click",(function(e){r(e,i,_,h)})),f}function i(e){e.remove()}function s(e,t,r,c){var a=r.classList.contains("card__like-button_is-active");fetch("https://nomoreparties.co/v1/".concat(o,"/cards/likes/").concat(t),{method:a?"DELETE":"PUT",headers:{authorization:n,"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(e){c.textContent=e.likes.length,r.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при постановке лайка",e)}))}function l(e,t){e.addEventListener("click",(function(n){(n.target.classList.contains("popup")||n.target.classList.contains("popup__close"))&&t(e)}))}function p(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",f)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",f)}function f(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&d(t)}}var m=document.querySelector(".popup__button"),v=document.querySelector(".name_error-message"),y=document.querySelector(".job_erorr-message"),_=document.querySelector(".sity-erorr-message"),h=document.querySelector(".image-error_message"),b=document.querySelector(".avatar-error-message"),S=function(){var e,t=(e=J.value.length,J.value.trim()?e<2?(v.textContent="Минимальное количество символов: 2. Длина текста сейчас ".concat(e," символ"),!1):e>40?(v.textContent="Максимальное количество символов: 40. Длина текста сейчас ".concat(e," символов"),!1):/^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/.test(J.value)?(v.textContent="",!0):(v.textContent="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",!1):(v.textContent="Вы пропустили это поле",!1)),n=function(){var e=U.value.length;return U.value.trim()?e<2?(y.textContent="Минимальное количество символов: 2. Длина текста сейчас ".concat(e," символ"),!1):e>200?(y.textContent="Максимальное количество символов: 200. Длина текста сейчас ".concat(e," символов"),!1):/^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/.test(U.value)?(y.textContent="",!0):(y.textContent="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",!1):(y.textContent="Вы пропустили это поле",!1)}();m.disabled=!(t&&n)},k=function(e){try{return new URL(e),!0}catch(e){return!1}},q=function(){var e,t=(e=B.value.length,B.value.trim()?e<2?(_.textContent="Минимальное количество символов: 2. Длина текста сейчас ".concat(e," символ"),!1):e>30?(_.textContent="Максимальное количество символов: 30. Длина текста сейчас ".concat(e," символов"),!1):/^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/.test(B.value)?(_.textContent="",!0):(_.textContent="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",!1):(_.textContent="Вы пропустили это поле",!1)),n=F.value.trim()?k(F.value)?(h.textContent="",!0):(h.textContent="Введите адрес сайта.",!1):(h.textContent="Вы пропустили это поле",!1);E.disabled=!(t&&n)};function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var C,g,E=document.querySelector(".new-place_button"),L=document.querySelector(".avatar-save_button"),w=document.querySelector(".profile-save_button"),j=document.querySelector(".popup_type_new-card"),O=document.querySelector(".popup_type_edit"),T=document.querySelector(".popup_type_image"),A=document.querySelector(".profile__add-button"),z=document.querySelector(".profile__edit-button"),P=O.querySelector(".popup__close"),D=document.querySelector(".popup_type_avatar-edit"),I=D.querySelector(".popup__content").querySelector(".popup__form"),N=document.querySelector(".profile__image"),$=I.querySelector(".popup__input_type_avatarka"),H=document.querySelector(".popup_type_edit").querySelector(".popup__content").querySelector(".popup__form"),J=document.querySelector(".popup__input_type_name"),U=document.querySelector(".popup__input_type_description"),Z=document.querySelector(".profile__title"),R=document.querySelector(".profile__description"),M=document.querySelector(".popup_type_new-card").querySelector(".popup__content"),X=M.querySelector(".popup__form"),B=M.querySelector(".popup__input_type_card-name"),F=M.querySelector(".popup__input_type_url"),G=document.querySelector(".popup__image"),K=document.querySelector(".popup__caption");function Q(e){var t=e.name,n=e.link;K.textContent=t,G.src=n,G.alt="Карточка ".concat(t),p(T)}z.addEventListener("click",(function(){J.value=Z.textContent,U.value=R.textContent,p(O)})),l(O,d),P.addEventListener("click",(function(){d(O)})),A.addEventListener("click",(function(){p(j),h.textContent="",_.textContent="",F.value="",B.value="",E.disabled=!0})),l(j,d),l(T,d),H.addEventListener("submit",(function(e){e.preventDefault();var t,r,c=U.value,a=J.value;w.textContent="Сохранение...",t=a,r=c,fetch("https://nomoreparties.co/v1/".concat(o,"/users/me"),{method:"PATCH",headers:{authorization:n,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:r})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})),R.textContent=c,Z.textContent=a,d(O)})),Promise.all([r("https://nomoreparties.co/v1/".concat(o,"/users/me")),r("https://nomoreparties.co/v1/".concat(o,"/cards"))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];Z.textContent=r.name,R.textContent=r.about,C=r._id,g=c,c.forEach((function(e){var t=u(e,i,s,(function(){Q(e)}),r._id);a.append(t)})),N.style.backgroundImage="url(".concat(r.avatar,")")})).catch((function(){t.forEach((function(e){var t=u(e,i,s,(function(){Q(e)}));a.append(t)}))})),X.addEventListener("submit",(function(e){var t,r;e.preventDefault(),E.textContent="Сохранение...",(t=B.value,r=F.value,new Promise((function(e,c){fetch("https://nomoreparties.co/v1/".concat(o,"/cards"),{method:"POST",headers:{authorization:n,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:r})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(t){e(t)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),c(e)}))}))).then((function(e){var t={_id:e._id,name:e.name,link:e.link,likes:e.likes,owner:e.owner};g.unshift(t);var n=u(t,i,s,(function(){Q(t)}),C);a.prepend(n),F.value="",B.value="",d(j),E.disabled=!0}))})),J.addEventListener("input",S),U.addEventListener("input",S),B.addEventListener("input",q),F.addEventListener("input",q),$.addEventListener("input",(function(){var e=$.value.trim()?k($.value)?(b.textContent="",!0):(b.textContent="Введите ссылку на картинку.",!1):(b.textContent="Вы пропустили это поле",!1);L.disabled=!e})),N.addEventListener("click",(function(){p(D),L.disabled=!0})),P.addEventListener("click",(function(){d(D)})),l(D,d),I.addEventListener("submit",(function(e){e.preventDefault();var t,r=I.elements["avatar-link"].value;L.textContent="Сохранение...",t=r,fetch("https://nomoreparties.co/v1/".concat(o,"/users/me/avatar"),{method:"PATCH",headers:{"Content-Type":"application/json",authorization:n},body:JSON.stringify({avatar:t})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status))})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})),N.style.backgroundImage="url(".concat(r,")"),d(D)}))})();