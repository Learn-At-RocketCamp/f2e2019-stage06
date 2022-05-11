// import '../service/roomsHelper.js';
import { getRooms, readOneRoom } from '../service/roomsHelper.js';
import { rangePicker } from './dateController.js';

import { printTitle, printDetail } from '../draft/devView.js';
console.log('This is [roomsController.js]');

const getPrice = ({ normalDayPrice, holidayPrice }) => {
  return { normalDayPrice, holidayPrice };
};

const goRoomInfo = (e) => {
  if (!e.target.closest('li')) {
    return console.log('!');
  }
  const targetList = e.target.closest('li');
  const id = targetList.dataset.id;
  console.log(id);

  // #TODO: chang fakeID to API
  readOneRoom({ id }).then(({ data }) => {
    if (!data.success) {
      return console.log('!!');
    }

    const { room } = data;
    console.log(...room);

    const { normalDayPrice, holidayPrice } = getPrice(...room);
    console.log(normalDayPrice);
    printDetail(...room);

    rangePicker({ normalDayPrice, holidayPrice });

    if (data.booking) {
      const { booking } = data;
      const roomFillDates = Array.from(booking, ({ date }) => {
        return date;
      });
      console.log('roomFillDates:::', roomFillDates);
    }
  });
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

init();

document
  .querySelector('.rooms-block')
  .addEventListener('click', goRoomInfo, 'false');
