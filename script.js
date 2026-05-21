const select = document.getElementById('car-select');
const info = document.getElementById('car-info');
const error = document.getElementById('error-msg');

let cars = [];

async function loadCars() {
  try {
    const res = await fetch('./cars.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    cars = (data.cars || []).map(c => ({
      brand: c.brand?.trim() || 'Без марки',
      model: c.model?.trim() || 'Без модели',
      price: Number(c.price) || 0
    }));

    select.innerHTML = `<option value="">Выберите автомобиль</option>` +
      cars.map((c, i) => `<option value="${i}">${c.brand} ${c.model}</option>`).join('');
  } catch (err) {
    error.textContent = `Ошибка: ${err.message}`;
    select.innerHTML = '<option value="">Недоступно</option>';
    console.error(err);
  }
}

select.addEventListener('change', e => {
  const car = cars[e.target.value];
  info.textContent = car
    ? `Марка: ${car.brand}\nМодель: ${car.model}\nЦена: ${car.price.toLocaleString('ru-RU')} ₽`
    : '';
});

loadCars();