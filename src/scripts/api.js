const token = "a45e6989-377b-425c-9ff7-1106b77e3945";
const cohortId = "wff-cohort-6";

// Функция для выполнения GET-запроса
const fetchData = (url) => {
  return fetch(url, {
    headers: {
      authorization: token,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//Для редактирование профиля
function updateProfile(name, about) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    });
}

// Функция для отправки POST-запроса для создания новой карточки
function addNewCard(name, link) {
  return new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((newCardData) => {
        resolve(newCardData); // Отправляем данные новой карточки в resolve
      })
      .catch((error) => {
        console.error("Ошибка при добавлении карточки:", error);
        reject(error); // Отправляем ошибку в reject
      });
  });
}

function deletedCard(cardId) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function updateAvatar(newAvatarLink) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ avatar: newAvatarLink }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    });
}

export {
  fetchData,
  updateProfile,
  addNewCard,
  token,
  cohortId,
  deletedCard,
  updateAvatar,
};
