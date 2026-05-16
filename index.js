import { getData, sendData } from './api.js';
document.addEventListener('DOMContentLoaded', function() {
  
  const dbFile = './db.json';
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
  getData(dbFile)
    .then(function(dataFromJson) {
      console.log('чета из файла:', dataFromJson);
      
      const postData = {
        title: 'Пользователь: ' + dataFromJson.user,
        body: 'Возраст: ' + dataFromJson.age + ', Роль: ' + dataFromJson.role,
        userId: dataFromJson.age
      };

      return sendData(apiUrl, postData);
    })
    .then(function(serverResponse) {
      console.log('сервер ответил:', serverResponse);
      alert('данные отправлены');
    })
    .catch(function(error) {
      console.error('что-то пошло не так:', error);
      alert('Ошибка какая-то, смотри консоль.');
    });
  
});