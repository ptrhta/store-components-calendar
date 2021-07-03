import PropTypes from 'prop-types';
import './App.css';

function Calendar(props) {
  const data = props.now;
  console.log(data);

  Date.prototype.weekDayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  
  Date.prototype.getWeekDayName = function() {
    return this.weekDayNames[this.getDay()];
  }

  Date.prototype.monthNames = [
    "Января", "Февраля", "Марта",
    "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября",
    "Октября", "Ноября", "Декабря"
];

  Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
  }

  const date = new Date();
  const weekDayNow = date.getWeekDayName;
  const weekdayNumberNow = date.getDay();
  const dayNow = date.getDate();
  const monthNameDeclinationNow = date.getMonthName();
  const monthNameNow = date.toLocaleString('ru', { month: 'long' });
  const yearNow = date.getFullYear();

  const firstDay = new Date(yearNow, date.getMonth(), 1);
  const firstWeekDay = firstDay.getDay();
  const lessDays = firstWeekDay == 0 ? 6 : firstWeekDay - 1;
  const weekDayStart = new Date(new Date(firstDay).setDate(firstDay.getDate()- lessDays))

  let visibleDates = [];
  for (let i = 0; i < 7 * 5; i++) {
    const currentDate = new Date(yearNow, date.getMonth() - 1, weekDayStart.getDate() + i);
    const dateShow = currentDate.getDate();

    visibleDates.push({
      date: dateShow,
      isOtherMonth: currentDate.getDay() !==  weekdayNumberNow,
      isCurrentDate: currentDate.toString() === new Date(yearNow, date.getMonth(), date.getDate()).toString()
    })
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{weekDayNow}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{dayNow}</div>
          <div className="ui-datepicker-material-month">{monthNameDeclinationNow}</div>
          <div className="ui-datepicker-material-year">{yearNow}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthNameNow}</span>&nbsp;<span className="ui-datepicker-year">{yearNow}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
        {
            new Array(5).fill(0).map((week, weekI) => (
              <tr key={weekI}>
                  {
                    visibleDates.slice(weekI * 7, weekI * 7 + 7)
                      .map((day, dayI) => (
                        <td 
                          key={dayI} 
                          className={day.isOtherMonth ? 'ui-datepicker-other-month' : day.isCurrentDate ? 'ui-datepicker-today': null}>
                            {day.date}
                        </td>
                      ))
                  }
              </tr>)
            )
          }
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const now = new Date(2017, 2, 8);

  return (
    <Calendar date={now} />
  );
}

Calendar.propTypes = {
  date: PropTypes.object.isRequired,
}

export default App;
