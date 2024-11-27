document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("calendar");
  const monthYearDisplay = document.getElementById("month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const dateInput = document.getElementById("completion-date");
  
  let currentDate = new Date();
  
  // Function to render the calendar for a given month and year
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Display the month and year
    monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    // Get the number of days in the month
    const totalDays = lastDay.getDate();
    
    // Clear the calendar days before adding new ones
    const calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";
    
    // Add empty cells for days before the start of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyCell = document.createElement("div");
      calendarDays.appendChild(emptyCell);
    }
    
    // Add the days of the month to the calendar
    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-day");
      dayCell.textContent = day;
      
      // Add event listener for selecting a day
      dayCell.addEventListener("click", function () {
        dateInput.value = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        calendar.style.display = "none"; // Hide calendar after selecting a date
      });
      
      calendarDays.appendChild(dayCell);
    }
  }
  
  // Navigate to previous month
  prevMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
  
  // Navigate to next month
  nextMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
  
  // Toggle calendar visibility when date input is clicked
  dateInput.addEventListener("click", function () {
    calendar.style.display = (calendar.style.display === "none" || !calendar.style.display) ? "block" : "none";
  });
  
  // Initial render
  renderCalendar();
});

//display today's date
     // Get today's date and format it
     const today = new Date();
     const options = { year: 'numeric', month: 'long', day: 'numeric' };
     const todayString = today.toLocaleDateString('en-US', options);

     // Display today's date in the #today-date element
     document.getElementById('today-date').innerText = todayString;