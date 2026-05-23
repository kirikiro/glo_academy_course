export const validation = () => {
  const attachFilter = (elements, regexPattern) => {
    if (!elements) return;

    const targetNodes = NodeList.prototype.isPrototypeOf(elements)
      ? Array.from(elements)
      : [elements];

    const handleInput = (e) => {
      const field = e.target;
      field.value = field.value.replace(regexPattern, "");
    };

    for (const node of targetNodes) {
      if (node && node.nodeType === 1) {
        node.addEventListener("input", handleInput);
      }
    }
  };

  const personNames = document.querySelectorAll('input[name="fio"]');
  const phoneNumbers = document.querySelectorAll('input[name="phone"]');
  const calcDimension = document.getElementById("calc-input");

  const rules = {
    lettersOnly: /[^a-zA-Zа-яА-ЯёЁ\s]/g,
    phoneChars: /[^\d\s\+]/g,
    strictDigits: /\D/g,
  };

  if (personNames.length > 0) {
    attachFilter(personNames, rules.lettersOnly);
  }

  if (phoneNumbers.length > 0) {
    attachFilter(phoneNumbers, rules.phoneChars);
  }

  if (calcDimension) {
    attachFilter(calcDimension, rules.strictDigits);
  }
};
