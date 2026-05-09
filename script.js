class Employee {
  constructor(id, firstName, lastName, age, position) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.position = position;
    this.isVerified = true; // boolean
    this.tags = []; // array
  }

  get id() {
    return this._id;
  }
  set id(val) {
    this._id = Number(val);
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(val) {
    if (!val || !val.trim()) throw new Error("имя не может быть пустым");
    this._firstName = val.trim();
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(val) {
    if (!val || !val.trim()) throw new Error("фамилия не может быть пустой");
    this._lastName = val.trim();
  }

  get age() {
    return this._age;
  }
  set age(val) {
    let n = Number(val);
    if (isNaN(n) || n < 14 || n > 100)
      throw new Error("возраст должен быть от 14 до 100");
    this._age = n;
  }

  get position() {
    return this._position;
  }
  set position(val) {
    if (!val || !val.trim()) throw new Error("должность не может быть пустой");
    this._position = val.trim();
  }

  get isVerified() {
    return this._isVerified;
  }
  set isVerified(val) {
    this._isVerified = !!val;
  }

  get tags() {
    return this._tags;
  }
  set tags(val) {
    this._tags = Array.isArray(val) ? val : [];
  }

  getType() {
    return "сотрудник";
  }
  getExtraInfo() {
    return `меток: ${this.tags.length}`;
  }

  static deleteById(id) {
    const idx = employees.findIndex((emp) => emp.id === id);
    if (idx !== -1) {
      employees.splice(idx, 1);
      saveToLocalStorage();
      renderTable();
    }
  }
}

// +2 свойства (number, string)
class Mechanic extends Employee {
  constructor(id, firstName, lastName, age, position, grade, specialty) {
    super(id, firstName, lastName, age, position);
    this.grade = grade;
    this.specialty = specialty;
  }

  get grade() {
    return this._grade;
  }
  set grade(val) {
    let n = Number(val);
    if (isNaN(n) || n < 1 || n > 6)
      throw new Error("разряд должен быть от 1 до 6");
    this._grade = n;
  }

  get specialty() {
    return this._specialty;
  }
  set specialty(val) {
    this._specialty = val || "универсал";
  }

  getType() {
    return "слесарь";
  }
  getExtraInfo() {
    return `разряд: ${this.grade}, профиль: ${this.specialty}`;
  }
}

// +2 свойства (string, boolean)
class Driver extends Employee {
  constructor(
    id,
    firstName,
    lastName,
    age,
    position,
    licenseCategory,
    hasTrailer,
  ) {
    super(id, firstName, lastName, age, position);
    this.licenseCategory = licenseCategory;
    this.hasTrailer = hasTrailer;
  }

  get licenseCategory() {
    return this._licenseCategory;
  }
  set licenseCategory(val) {
    if (!val || !["B", "C", "D", "E"].includes(val.toUpperCase()))
      throw new Error("категория прав не выбрана");
    this._licenseCategory = val.toUpperCase();
  }

  get hasTrailer() {
    return this._hasTrailer;
  }
  set hasTrailer(val) {
    this._hasTrailer = !!val;
  }

  getType() {
    return "водитель";
  }
  getExtraInfo() {
    return `категория: ${this.licenseCategory}, прицеп: ${this.hasTrailer ? "да" : "нет"}`;
  }
}

let employees = [];

const saveToLocalStorage = () => {
  const data = employees.map((emp) => {
    if (emp instanceof Mechanic) {
      return {
        type: "mechanic",
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        age: emp.age,
        position: emp.position,
        grade: emp.grade,
        specialty: emp.specialty,
      };
    }
    return {
      type: "driver",
      id: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      age: emp.age,
      position: emp.position,
      licenseCategory: emp.licenseCategory,
      hasTrailer: emp.hasTrailer,
    };
  });
  localStorage.setItem("staff_db", JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const raw = localStorage.getItem("staff_db");
  if (!raw) return;
  const parsed = JSON.parse(raw);
  employees = parsed.map((item) => {
    if (item.type === "mechanic") {
      return new Mechanic(
        item.id,
        item.firstName,
        item.lastName,
        item.age,
        item.position,
        item.grade,
        item.specialty,
      );
    }
    return new Driver(
      item.id,
      item.firstName,
      item.lastName,
      item.age,
      item.position,
      item.licenseCategory,
      item.hasTrailer,
    );
  });
  renderTable();
};

const renderTable = () => {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";

  employees.forEach((emp) => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = emp.firstName;
    row.insertCell(1).textContent = emp.lastName;
    row.insertCell(2).textContent = emp.age;
    row.insertCell(3).textContent = emp.position;
    row.insertCell(4).textContent = emp.getType();
    row.insertCell(5).textContent = emp.getExtraInfo();

    const delCell = row.insertCell(6);
    const btn = document.createElement("button");
    btn.textContent = "удалить";
    btn.addEventListener("click", () => Employee.deleteById(emp.id));
    delCell.appendChild(btn);
  });
};

const getFormData = () => {
  const id = Date.now();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const position = document.getElementById("position").value;
  const type = document.getElementById("employeeType").value;

  if (!firstName || !lastName || !age || !position || !type) {
    alert("заполни все обязательные поля");
    return null;
  }

  try {
    if (type === "mechanic") {
      const grade = document.getElementById("grade").value;
      return new Mechanic(
        id,
        firstName,
        lastName,
        age,
        position,
        grade,
        position,
      );
    }
    if (type === "driver") {
      const license = document.getElementById("licenseCategory").value;
      return new Driver(id, firstName, lastName, age, position, license, false);
    }
  } catch (err) {
    alert(err.message);
    return null;
  }
  return null;
};

const addEmployee = () => {
  const emp = getFormData();
  if (emp) {
    employees.push(emp);
    saveToLocalStorage();
    renderTable();
    document.getElementById("employeeForm").reset();
    toggleFields();
  }
};

const toggleFields = () => {
  const val = document.getElementById("employeeType").value;
  const mechField = document.getElementById("mechanicField");
  const driverField = document.getElementById("driverField");
  const gradeInput = document.getElementById("grade");
  const licenseInput = document.getElementById("licenseCategory");

  mechField.style.display = val === "mechanic" ? "block" : "none";
  driverField.style.display = val === "driver" ? "block" : "none";

  gradeInput.required = val === "mechanic";
  licenseInput.required = val === "driver";
};

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  document.getElementById("employeeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addEmployee();
  });
  document
    .getElementById("employeeType")
    .addEventListener("change", toggleFields);
  toggleFields();
});
