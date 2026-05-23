export const setupFormSubmissions = () => {
  const formWrappers = document.querySelectorAll(".rf");
  const validForms = [];

  for (const wrapper of formWrappers) {
    const formElement =
      wrapper.tagName === "FORM" ? wrapper : wrapper.querySelector("form");
    if (formElement) validForms.push(formElement);
  }

  if (!validForms.length) return;

  const replyDialog = document.getElementById("responseMessage");
  const closeReplyBtn = replyDialog
    ? replyDialog.querySelector(".fancyClose")
    : null;
  const globalBackdrop = document.querySelector(".overlay");

  const resetUI = () => {
    const activePopups = document.querySelectorAll(
      ".header-modal, .services-modal, .box-modal",
    );
    for (const popup of activePopups) {
      if (popup.id !== "responseMessage") {
        popup.style.display = "none";
      }
    }
    if (globalBackdrop) {
      globalBackdrop.style.display = "none";
    }
    document.body.classList.remove("no-scroll");
  };

  if (closeReplyBtn && replyDialog) {
    closeReplyBtn.addEventListener("click", (event) => {
      event.preventDefault();
      replyDialog.classList.remove("show");
      replyDialog.style.display = "none";
    });
  }

  const transmitData = async (event) => {
    event.preventDefault();

    const currentTarget = event.target;
    const fieldFio = currentTarget.querySelector('input[name="fio"]');
    const fieldPhone = currentTarget.querySelector('input[name="phone"]');
    const calculationNode = document.getElementById("calc-total");

    if (!fieldFio || !fieldPhone) return;

    const cleanPhone = fieldPhone.value.replace(/\D/g, "");
    if (cleanPhone.length < 7) return;

    const requestPayload = {
      name: fieldFio.value.trim(),
      phone: fieldPhone.value.trim(),
      orderPrice: 0,
    };

    if (calculationNode && calculationNode.textContent) {
      const extractedPrice = parseInt(calculationNode.textContent, 10);
      if (!isNaN(extractedPrice) && extractedPrice > 0) {
        requestPayload.orderPrice = extractedPrice;
      }
    }

    try {
      const apiResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(requestPayload),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        },
      );

      if (apiResponse.ok) {
        currentTarget.reset();
        resetUI();

        if (replyDialog) {
          replyDialog.style.display = "block";
          replyDialog.classList.add("show");
        }
      }
    } catch (error) {}
  };

  for (const formNode of validForms) {
    formNode.addEventListener("submit", transmitData);
  }
};
