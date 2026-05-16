const sendForm = ({ formId, someElem = [] }) => {
  const form = document.getElementById(formId);
  if (!form) return;

  const successText = "Спасибо, наш менеджер с вами свяжется";
  const statusBlock = document.createElement('div');
  const loadText = 'Загрузка...';
  const errorText = 'Ошибка';

  const validate = (formElements) => {
    let success = true;

    formElements.forEach((input) => {
      const name = input.name;
      const value = input.value.trim();

      if (!value && input.hasAttribute('required')) {
        success = false;
        input.classList.add('invalid');
        return;
      }

      input.classList.remove('invalid');

      if (name === 'user_phone') {
        const phoneRegex = /^[0-9+\()\-\s]*$/;
        if (value && !phoneRegex.test(value)) {
          success = false;
          input.classList.add('invalid');
        }
      }

      if (name === 'user_name') {
        const nameRegex = /^[а-яА-ЯёЁ\s]*$/;
        if (value && !nameRegex.test(value)) {
          success = false;
          input.classList.add('invalid');
        }
      }

      if (name === 'user_message') {
        const messageRegex = /^[а-яА-ЯёЁ0-9\s.,!?;:\-\(\)"]*$/;
        if (value && !messageRegex.test(value)) {
          success = false;
          input.classList.add('invalid');
        }
      }
    });

    return success;
  };

  const attachInputMasks = () => {
    form.querySelectorAll('input[name="user_phone"]').forEach((input) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9+\()\-\s]/g, '');
      });
    });

    form.querySelectorAll('input[name="user_name"]').forEach((input) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
      });
    });

    form.querySelectorAll('input[name="user_message"], textarea[name="user_message"]').forEach((input) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^а-яА-ЯёЁ0-9\s.,!?;:\-\(\)"]/g, '');
      });
    });
  };

  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  attachInputMasks();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formElements = form.querySelectorAll("input, textarea");
    const formData = new FormData(form);
    const formBody = {};

    statusBlock.textContent = '';
    statusBlock.className = 'form-status';
    const existingStatus = form.querySelector('.form-status');
    if (existingStatus) existingStatus.remove();
    form.append(statusBlock);

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    someElem.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (elem.type === "block") {
        formBody[elem.id] = element?.textContent || '';
      } else if (elem.type === "input") {
        formBody[elem.id] = element?.value || '';
      }
    });

    if (validate(formElements)) {
      statusBlock.textContent = loadText;
      
      sendData(formBody)
        .then((data) => {
          statusBlock.textContent = successText;
          form.reset();
          formElements.forEach((input) => {
            input.classList.remove('invalid');
          });
        })
        .catch((error) => {
          statusBlock.textContent = errorText;
        });
    } else {
      statusBlock.textContent = 'проверьте правильность заполнения полей';
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  sendForm({
    formId: "form1",
    someElem: [
      { type: "block", id: "total" },
    ],
  });

  sendForm({
    formId: "form2",
    someElem: [],
  });

  sendForm({
    formId: "form3",
    someElem: [],
  });
});