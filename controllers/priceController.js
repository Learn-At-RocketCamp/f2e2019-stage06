import fecha from '../lib/fecha-4.2.1/lib/fecha.js';

// Custom formats
// console.log(fecha.format(new Date(2015, 10, 20), 'd'));
// console.log(fecha.format(new Date(2015, 10, 20), 'isoDate'));
// console.log(fecha.format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY'));

const addDaysToDate = (date, days) => {
  const res = new Date(date);
  res.setDate(res.getDate() + days);
  // #TODO: format
  return res.toISOString();
};

export const turnSelectedToArray = (pickString, nights) => {
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

  const weekendNights = pickedNights.filter((item) => item.isWeekend);
  console.log(weekendNights.length);
  const normalNights = nights - weekendNights.length;

  console.table(pickedNights);
  const pickedInfo = {
    checkIn: pickedStart,
    checkOut: pickedEnd,
    nights,
    weekendNights: weekendNights.length,
    normalNights,
  };

  return { pickedNights, pickedInfo };
};
