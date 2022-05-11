import fecha from '../lib/fecha-4.2.1/lib/fecha.js';
import HotelDatepicker from '../lib/hotel-datepicker-4.0.3/src/js/hotel-datepicker.js';

import { printForm } from '../draft/devView.js';

// Custom formats
// console.log(fecha.format(new Date(2015, 10, 20), 'd'));
// console.log(fecha.format(new Date(2015, 10, 20), 'isoDate'));
// console.log(fecha.format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY'));

const roomFillsDate = [
  '2022-05-09',
  '2022-05-05',
  '2022-05-08',
  '2022-05-10',
  '2022-05-13',
  '2022-05-23',
];

// #XXX: addDaysToDate(date, days)
const today = new Date();
// console.log('today:::', today);
// console.log('today-getDate:::', today.getDate());

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log('tomorrow:::', tomorrow);

// const afterTomorrow = new Date();
// afterTomorrow.setDate(tomorrow.getDate() + 1);

const after90Days = new Date();
after90Days.setDate(today.getDate() + 90);
console.log(after90Days);

const addDaysToDate = (date, days) => {
  const res = new Date(date);
  res.setDate(res.getDate() + days);
  // #TODO: format
  return res.toISOString();
};

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
  // console.log(pickString.match(regexDate));
  // console.log(regexDate.exec(pickString));

  // #TODO: if(!pickString) return
  const { groups: regGroups } = regexDate.exec(pickString);

  const { pickedStart, pickedEnd } = regGroups;
  // console.log(pickedStart);

  console.log('----------');

  // const pickedStartDate = new Date(pickedStart);
  // pickedStartDate.setDate(pickedStartDate.getDate() + nights);
  // console.log(pickedStartDate);
  // console.log(fecha.format(pickedStartDate, 'YYYY-MM-DD'));

  const pickedNights = [];
  const tmpDate = new Date(pickedStart);
  // console.log(addDaysToDate(tmpDate, 1));

  for (let i = 0; i < nights; i++) {
    // console.log(i);

    const tmpNight = new Date(addDaysToDate(tmpDate, i));

    const tmpNightFormat = fecha.format(tmpNight, 'isoDate');
    const tmpNightNumber = fecha.format(tmpNight, 'd');
    const tmpNightEng = fecha.format(tmpNight, 'ddd');

    let isWeekend = true;

    if (tmpNightNumber > 0 && tmpNightNumber < 5) {
      isWeekend = false;
    }
    // console.log(isWeekend);

    pickedNights.push({
      date: tmpNightFormat,
      dayNumber: tmpNightNumber,
      dayEng: tmpNightEng,
      isWeekend: isWeekend,
    });
  }
  console.table(pickedNights);

  return { pickedNights, pickedStart, pickedEnd };
};

export const rangePicker = ({ normalDayPrice, holidayPrice }) => {
  const input = document.querySelector('#input-id');

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

  // #NOTE: onDayClick() ==> NG
  // const selectDays = [];
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
      // #NOTE:
      const pickedData = turnSelectedToArray(
        datepicker.getValue(),
        datepicker.getNights()
      );
      console.log(pickedData);
      const { pickedNights } = pickedData;
      const weekendNights = pickedNights.filter((item) => item.isWeekend);
      console.log(weekendNights.length);
      const normalNight = datepicker.getNights() - weekendNights.length;
      const sumHoliday = Number(holidayPrice) * weekendNights.length;
      const sumNormal = Number(normalDayPrice) * normalNight;
      console.log('holidayPrice:::', holidayPrice);
      console.log('normalDayPrice:::', normalDayPrice);
      const payment = Number(sumHoliday + sumNormal);
      console.log(payment);
      document.querySelector('#payment').innerHTML = `帳單：${payment}`;
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
  // console.log(selectDays);

  // datepicker.openDatepicker();
  datepicker.open();
  console.log(datepicker.getDatePicker());
  // datepicker.clear()

  const btnBooking = document.querySelector('#js-btn-booking');

  btnBooking.addEventListener(
    'click',
    () => {
      console.log('Go to Form!!!');
      datepicker.close();
    },
    'false'
  );

  input.addEventListener(
    'afterClose',
    () => {
      console.log('Closed!');
      console.log('date-start?:::', datepicker.start);

      const id = btnBooking.dataset.id;
      console.log('id:::', id);

      const pickedData = turnSelectedToArray(
        datepicker.getValue(),
        datepicker.getNights()
      );

      // console.log('pickedData:::', pickedData);

      printForm({ id, pickedData, datepicker });
    },
    false
  );

  // console.log(input.value);
  // console.log(datepicker);
};
