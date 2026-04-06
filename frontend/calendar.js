const div = document.getElementById("cells")
const prevBtn = document.getElementById("prev-month")
const nextBtn = document.getElementById("next-month")
const monthYearSpan = document.getElementById("month-year")

let currentDate = new Date() // Текущая дата

// Настройка Grid
div.style.display = 'grid'
div.style.gridTemplateColumns = 'repeat(7, 1fr)'
div.style.gap = '2px'

// Названия месяцев
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

// Функция для получения количества дней в месяце
function getDaysInMonth(date) {
    const month = date.getMonth()
    const year = date.getFullYear()
    
    if (month == 1) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ? 29 : 28
    }
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31
    }
    return 30
}

// Функция для получения индекса первого дня (0 = понедельник, 6 = воскресенье)
function getFirstDayOffset(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    let dayIndex = firstDay.getDay()
    return dayIndex === 0 ? 6 : dayIndex - 1
}

// Функция рендера календаря
function renderCalendar() {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // Обновляем заголовок
    if (monthYearSpan) {
        monthYearSpan.textContent = `${months[month]} ${year}`
    }
    
    const daysInMonth = getDaysInMonth(currentDate)
    const startOffset = getFirstDayOffset(currentDate)
    
    console.log(`Месяц: ${months[month]}, дней: ${daysInMonth}, отступ: ${startOffset}`)
    
    // Очищаем контейнер
    div.innerHTML = ''
    
    // Добавляем пустые ячейки перед первым днём
    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement("div")
        emptyCell.className = "empty-cell"
        div.appendChild(emptyCell)
    }
    
    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const element = document.createElement("div")
        element.className = "numbers-cells"
        element.innerHTML = `${day}`
        element.style.cursor = 'pointer'
        
        // Проверяем, прошлая ли дата
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const cellDate = new Date(year, month, day)
        
        if (cellDate < today) {
            element.classList.add('past')
        }
        
        div.appendChild(element)
    }
}

// Функция для переключения на предыдущий месяц
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar()
}

// Функция для переключения на следующий месяц
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar()
}

// Добавляем обработчики для стрелок
if (prevBtn) {
    prevBtn.addEventListener('click', prevMonth)
}
if (nextBtn) {
    nextBtn.addEventListener('click', nextMonth)
}

// Обработчик клика по ячейкам (делегирование)
div.addEventListener("click", (event) => {
    const cell = event.target.closest('.numbers-cells')
    if (cell && !cell.classList.contains('past')) {
        const dayNumber = cell.textContent
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        
        console.log(`Выбрана дата: ${year}-${month}-${dayNumber}`)
        
        async function getting_date() {
            try {
                const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
                const response = await fetch(`http://localhost:8000/View_available_slots?date=${formattedDate}`)
                const data = await response.json()
                console.log('Доступные слоты:', data)
            } catch (error) {
                console.error('Error fetching available slots:', error)
            }
        }
        getting_date()
        
        // Визуальное выделение выбранной даты
        document.querySelectorAll('.numbers-cells').forEach(c => c.classList.remove('selected'))
        cell.classList.add('selected')
    }
})

// Инициализация календаря
renderCalendar()