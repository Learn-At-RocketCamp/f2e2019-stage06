import fecha from '../lib/fecha-4.2.1/lib/fecha.js';

import HotelDatepicker from '../lib/hotel-datepicker-4.0.3/src/js/hotel-datepicker.js';

const { format } = fecha;

// // Custom formats
// // 'Friday November 20th, 2015'

console.log(fecha.format(new Date(2015, 10, 20), 'd'));
console.log(fecha.format(new Date(2015, 10, 20), 'isoDate'));
console.log(format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY'));
// // '1998-06-03 03:23:10.350 PM'
// format(new Date(1998, 5, 3, 15, 23, 10, 350), 'YYYY-MM-DD hh:mm:ss.SSS A');
// #XXX:
const today = new Date();
console.log('today:::', today);
console.log('today-getDate:::', today.getDate());

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log('tomorrow:::', tomorrow);

const afterTomorrow = new Date();
afterTomorrow.setDate(tomorrow.getDate() + 1);

const after90Days = new Date();
after90Days.setDate(today.getDate() + 90);
console.log(after90Days);

const roomFillsDate = [
  '2022-05-09',
  '2022-05-05',
  '2022-05-08',
  '2022-05-10',
  '2022-05-13',
  '2022-05-23',
];

const selectDays = [];

const turnSelectedToArray = (pickString, nights) => {
  console.log('value:::', pickString);
  console.log('nights:::', nights);

  // const regexDate = /^\d{4}-\d{2}-\d{2}/
  // const regexDate = /^(?<pickedStart>\d{4}-\d{2}-\d{2})(?<to>.-.)(?<pickedEnd>\d{4}-\d{2}-\d{2})$/
  // console.log(pickString.match(regexDate));

  /**
   * #REVIEW: eslint-plugin-regexp
   * use `/u`
   * use `exec` => to instead of `match`
   */
  const regexDate =
    /^(?<pickedStart>\d{4}-\d{2}-\d{2})(?<to>.-.)(?<pickedEnd>\d{4}-\d{2}-\d{2})$/u;

  console.log(pickString.match(regexDate));
  console.log(regexDate.exec(pickString));

  const { groups: regGroups } = regexDate.exec(pickString);

  const { pickedStart } = regGroups;
  console.log(pickedStart);

  console.log('----------');

  const pickedStartDate = new Date(pickedStart);
  pickedStartDate.setDate(pickedStartDate.getDate() + nights);
  console.log(pickedStartDate);
  console.log(fecha.format(pickedStartDate, 'YYYY-MM-DD'));

  const addDaysToDate = (date, days) => {
    const res = new Date(date);
    res.setDate(res.getDate() + days);
    // #TODO: format
    return res.toISOString();
  };

  const pickedNights = [];
  // const tmpDate = new Date('2022-05-10');
  const tmpDate = new Date(pickedStart);
  console.log(addDaysToDate(tmpDate, 1));

  // const nights = 6;

  for (let i = 0; i < nights; i++) {
    console.log('!');
    console.log(i);

    const tmpNight = new Date(addDaysToDate(tmpDate, i));

    const tmpNightFormat = fecha.format(tmpNight, 'isoDate');
    const tmpNightNumber = fecha.format(tmpNight, 'd');
    const tmpNightEng = fecha.format(tmpNight, 'ddd');

    let isWeekend = true;
    if (tmpNightNumber > 0 && tmpNightNumber < 5) {
      isWeekend = false;
    }
    console.log(isWeekend);

    pickedNights.push({
      date: tmpNightFormat,
      dayNumber: tmpNightNumber,
      dayEng: tmpNightEng,
      isWeekend: isWeekend,
    });
  }
  console.table(pickedNights);
};

export const rangePicker = () => {
  const input = document.getElementById('input-id');
  /**
   * #NOTE: golden-rule of value
   * 'YYYY-MM-DD' - 'YYYY-MM-DD'
   */

  input.value = `
    ${fecha.format(tomorrow, 'YYYY-MM-DD')}
  `;
  // input.value = `
  //   ${fecha.format(tomorrow, 'YYYY-MM-DD')} - ${fecha.format(afterTomorrow, 'YYYY-MM-DD')}
  // `;

  const datepicker = new HotelDatepicker(input, {
    // hoveringTooltip: function (nights, startTime, hoverTime) {
    //   // return nights;
    // },
    onOpenDatepicker: function () {
      console.log('Datepicker opened!');
    },
    onDayClick: function () {
      console.log('Day clicked!');
      console.log(datepicker.getValue());
      // selectDays.push(datepicker.getValue())
    },
    onSelectRange: function () {
      console.log('Date rage selected!!!');
      turnSelectedToArray(datepicker.getValue(), datepicker.getNights());
    },
    startDate: `${fecha.format(tomorrow, 'YYYY-MM-DD')}`,
    endDate: `${fecha.format(after90Days, 'YYYY-MM-DD')}`,
    disabledDates: roomFillsDate,

    autoClose: false,
    preventContainerClose: true,
    moveBothMonths: true,
    showTopbar: false,
    // showTopbar: true,
  });
  console.log(selectDays);

  // datepicker.openDatepicker();
  datepicker.open();
  console.log(datepicker.getDatePicker());
  // datepicker.clear()

  input.addEventListener(
    'afterClose',
    () => {
      console.log('Closed!');
      console.log(datepicker.start);
    },
    false
  );

  console.log(input.value);
  console.log(datepicker);
};
