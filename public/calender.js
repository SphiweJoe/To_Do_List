const dateInput = document.getElementById('date-input');
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const calendarDays = document.getElementById('calendar-days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();
let selectedDate = null;

// Function to update the calendar
function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set the month-year header
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startingDay = firstDay.getDay();

  // Clear previous days
  calendarDays.innerHTML = '';

  // Add empty cells for the days before the 1st of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement('div');
    calendarDays.appendChild(emptyCell);
  }

  // Add the days of the month
  for (let day = 1; day <= lastDate; day++) {
    const dayCell = document.createElement('div');
    dayCell.textContent = day;
    dayCell.classList.add('calendar-day');
    dayCell.addEventListener('click', () => selectDate(day));
    calendarDays.appendChild(dayCell);
  }
}

// Function to select a date
function selectDate(day) {
  selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  dateInput.value = selectedDate.toLocaleDateString();
  calendar.style.display = 'none';
}

// Show calendar when the input is clicked
dateInput.addEventListener('click', () => {
  calendar.style.display = 'block';
  updateCalendar();
});

// Hide calendar if clicked outside
document.addEventListener('click', (e) => {
  if (!calendar.contains(e.target) && e.target !== dateInput) {
    calendar.style.display = 'none';
  }
});

// Navigate to the previous month
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

// Navigate to the next month
nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});
