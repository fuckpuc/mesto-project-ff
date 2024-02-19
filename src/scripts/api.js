const token = "a45e6989-377b-425c-9ff7-1106b77e3945";
const cohortId = "wff-cohort-6";

const config = {
  baseUrl: 'https://nomoreparties.co/v1',
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  }
};

function request(endpoint, method, body) {
  const url = `${config.baseUrl}/${cohortId}/${endpoint}`;
  
  return fetch(url, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(body)
  })
  .then(checkResponse)
}

// Функция проверки ответа
function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response.json();
}

//Для редактирование профиля
function updateProfile(name, about) {
  return request('users/me', 'PATCH', { name, about });
}

// Функция для отправки POST-запроса для создания новой карточки
function addNewCard(name, link) {
  return request('cards', 'POST', { name, link });
}

function deletedCard(cardId) {
  return request(`cards/${cardId}`, 'DELETE');
}

function updateAvatar(newAvatarLink) {
  return request('users/me/avatar', 'PATCH', { avatar: newAvatarLink });
}

function cardLike(cardId, likeButton) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";
  return request(`cards/likes/${cardId}`, method)
}

export {
  cardLike,
  request,
  updateProfile,
  addNewCard,
  token,
  cohortId,
  deletedCard,
  updateAvatar,
};
