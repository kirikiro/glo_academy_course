function getData(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("ошибка: " + response.status);
      }
      return response.json();
    })
    .catch(function (error) {
      console.error("не удалось получить данные:", error);
      throw error;
    });
}

function sendData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("ошибка отправки: " + response.status);
      }
      return response.json();
    })
    .catch(function (error) {
      console.error("не удалось отправить данные:", error);
      throw error;
    });
}

export { getData, sendData };
