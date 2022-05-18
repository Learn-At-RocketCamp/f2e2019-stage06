// import '../service/roomsHelper.js';
import { getRooms, readOneRoom, postRoom } from '../service/roomsHelper.js';
import { rangePicker } from './dateController.js';
import { turnSelectedToArray } from './priceController.js';
import { getInputsValue } from '../utility/getInputsValue.js';

import { printTitle, printDetail, printForm } from '../draft/devView.js';
console.log('This is [roomsController.js]');

const getPriceFromRoom = (
  { normalDayPrice, holidayPrice } = { normalDayPrice: 0, holidayPrice: 0 }
) => {
  // {z: z} = {z: 3}
  console.log('getPriceFromRoom:::', normalDayPrice);
  return { normalDayPrice, holidayPrice };
};
/* end of getPriceFromRoom() */

const goToggleForm = ({ target }) => {
  // if (target !== modalToggle) {
  //   return console.log('!!::', target);
  // }
  const btnBooking = document.querySelector('.js-toggle');

  // btnBooking.dataset.pickedStart;
  const { dataset } = btnBooking;
  const { id, pickedStart, pickedEnd, pickedValue, pickedNights } = dataset;
  const pickedData = turnSelectedToArray(pickedValue, pickedNights);
  const pickedArray = Array.from(pickedData.pickedNights, ({ date }) => date);
  pickedArray.push(pickedEnd);
  // console.log(Array.from([1, 2, 3], (x) => x + x));
  console.log(pickedArray);

  // toggleModal(modal);
  printForm({ id, pickedStart, pickedEnd });
  // printForm({ id, pickedData, datepicker });

  const input2 = document.querySelector('#input-id2');
  if (input2) {
    console.log('input2', input2);
    rangePicker(input2, { normalDayPrice, holidayPrice });
  }

  document.querySelector('#js-post-reservation').addEventListener(
    'click',
    () => {
      const btnPost = document.querySelector('#js-post-reservation');
      const inputs = [...document.querySelectorAll('.user-info .input-form')];

      console.log('id:::', id);
      const userData = getInputsValue(inputs);
      console.table(userData);
      const { name, tel } = userData;
      const { dataset } = btnPost;
      // const { id } = dataset;
      const data = {
        name,
        tel,
        date: pickedArray,
      };
      // postRoom({ id, data });
      postRoom({ id, data }).then((result) => {
        console.log(result);
      });
    },
    'false'
  );
};

const goRoomInfo = ({ target }) => {
  // const goRoomInfo = (e) => {
  // if (!target.closest('li')) {
  if (!target.closest('a')) {
    return console.log('NOT a!!!::', target);
  }
  console.log('goRoomInfo():::', target);

  // #TODO: move to view?
  document.querySelector('aside').innerHTML = 'hi';
  document.querySelector('.js-carousel').classList.add('opacity-20');
  // document.querySelector('.js-gallery').classList.add('hidden')

  const targetList = target.closest('li');
  const id = targetList.dataset.id;
  console.log('targetList-id:::', id);

  // #TODO: change fakeID to API
  readOneRoom({ id }).then(({ data }) => {
    if (!data.success) {
      return console.log('!!');
    }

    let roomFillDates = [
      '2022-05-09',
      '2022-05-05',
      '2022-05-08',
      '2022-05-10',
      '2022-05-13',
      '2022-05-23',
    ];

    const { room } = data;
    if (data.booking) {
      const { booking } = data;

      roomFillDates = Array.from(booking, ({ date }) => {
        return date;
      });
      console.log('roomFillDates:::', roomFillDates);
    }

    // console.log(...room);
    const { normalDayPrice, holidayPrice } = getPriceFromRoom(...room);
    printDetail(...room);

    console.log('/----------/');
    const input = document.querySelector('#input-id');
    rangePicker(input, { normalDayPrice, holidayPrice, roomFillDates });

    const modalToggle = document.querySelector('.js-toggle');
    modalToggle.dataset.id = id;
    modalToggle.addEventListener('click', goToggleForm, 'false');
  });
  /* end of readOneRoom({ id }) */
};

const init = () => {
  getRooms().then(({ data }) => {
    console.log('finally-result:::', data.items);

    const roomsTitle = Array.from(data.items, ({ name, id }) => {
      return { name, id };
    });
    // console.log('roomsTitle:::', roomsTitle);

    printTitle(roomsTitle);
    // showOutput(result);
  });
  /* end of GET() */
};

// Main
init();

document
  .querySelector('.js-gallery')
  .addEventListener('click', goRoomInfo, 'false');
