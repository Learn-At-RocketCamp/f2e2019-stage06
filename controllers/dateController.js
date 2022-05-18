import fecha from '../lib/fecha-4.2.1/lib/fecha.js';
import HotelDatepicker from '../lib/hotel-datepicker-4.0.3/src/js/hotel-datepicker.js';

import { turnSelectedToArray } from './priceController.js';
import { printForm, printPriceMsg } from '../draft/devView.js';

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

export const rangePicker = (
  input,
  { normalDayPrice, holidayPrice, roomFillDates }
) => {
  // const input = document.querySelector('#input-id');

  const btnBooking = document.querySelector('.js-toggle');
  // const btnBooking = document.querySelector('#js-btn-booking');
  // console.dir(btnBooking);

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
      // #NOTE: if is NULL
      btnBooking.dataset.pickedNights = datepicker.getNights();
      btnBooking.dataset.pickedValue = datepicker.getValue();
      console.log('btn-picked:::', btnBooking.dataset.pickedNights);
      console.log(btnBooking.dataset.pickedValue);

      // #NOTE:
      const pickedData = turnSelectedToArray(
        datepicker.getValue(),
        datepicker.getNights()
      );

      console.log(pickedData);
      // console.table(pickedData);
      const { pickedInfo } = pickedData;
      const { weekendNights, normalNights, checkIn, checkOut } = pickedInfo;
      btnBooking.dataset.pickedStart = checkIn;
      btnBooking.dataset.pickedEnd = checkOut;

      const sumHoliday = Number(holidayPrice) * weekendNights;
      const sumNormal = Number(normalDayPrice) * normalNights;
      console.log('holidayPrice:::', holidayPrice);
      console.log('normalDayPrice:::', normalDayPrice);

      const payment = Number(sumHoliday + sumNormal);
      console.log(payment);
      printPriceMsg(payment);
    },
    startDate: `${fecha.format(tomorrow, 'YYYY-MM-DD')}`,
    endDate: `${fecha.format(after90Days, 'YYYY-MM-DD')}`,
    disabledDates: roomFillDates,

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

  // btnBooking.addEventListener(
  //   'click',
  //   () => {
  //     console.log('Go to Form!!!');
  //     const pickedData = turnSelectedToArray(
  //       datepicker.getValue(),
  //       datepicker.getNights()
  //     );
  //     console.log(pickedData);

  //     datepicker.close();
  //   },
  //   'false'
  // );

  // input.addEventListener(
  //   'afterClose',
  //   () => {
  //     console.log('Closed!');
  //     console.log('date-start?:::', datepicker.start);

  //     const id = btnBooking.dataset.id;
  //     console.log('id:::', id);

  //     const pickedData = turnSelectedToArray(
  //       datepicker.getValue(),
  //       datepicker.getNights()
  //     );

  //     // console.log('pickedData:::', pickedData);

  //     // printForm({ id, pickedData, datepicker });
  //     return { id, pickedData, datepicker };
  //   },
  //   false
  // );

  // console.log(input.value);
  // console.log(datepicker);

  // return pickedData;
};
