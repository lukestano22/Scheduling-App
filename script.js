const timeSlots = [
  'hour-9',
  'hour-10',
  'hour-11',
  'hour-12',
  'hour-13',
  'hour-14',
  'hour-15',
  'hour-16',
  'hour-17'
];

function loadSchedule() {
  timeSlots.forEach((slot) => {
    const hourInput = document.getElementById(slot);
    const textarea = hourInput.querySelector('.description');

    // Load saved value from localStorage
    const savedValue = localStorage.getItem(slot);
    if (savedValue) {
      textarea.value = savedValue;
    }

    const saveButton = hourInput.querySelector('.saveBtn');
    saveButton.addEventListener('click', function () {
      schedule(textarea, slot);
      updateBackgroundColors(); // Update colors after saving
    });
  });
}

function schedule(textarea, slot) {
  // Save value to localStorage
  localStorage.setItem(slot, textarea.value);
}

function updateBackgroundColors() {
  const currentHour = dayjs().hour();

  timeSlots.forEach((slot) => {
    const hourInput = document.getElementById(slot);
    const hour = parseInt(slot.split('-')[1]);

    if (hour < currentHour) {
      hourInput.classList.remove('present', 'future');
      hourInput.classList.add('past');
    } else if (hour === currentHour) {
      hourInput.classList.remove('past', 'future');
      hourInput.classList.add('present');
    } else {
      hourInput.classList.remove('past', 'present');
      hourInput.classList.add('future');
    }
  });
}

window.onload = function () {
  loadSchedule();
  updateBackgroundColors();
};