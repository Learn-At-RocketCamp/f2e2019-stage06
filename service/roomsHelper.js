import { apiRoomsGet } from '../config/apis.js';
import { apiRoomsKill } from '../config/apis.js';
import { apiRoomReadOne } from '../config/apis.js';
import { apiRoomPost } from '../config/apis.js';

import { showOutput } from '../draft/devView.js';
console.log('This is [storeHelper.js].');

/**
 * @const { String } id
 */
// const id = 'RA8NhExaXXZB7EODVALSDvFFQzj1JP0a4C1pwZ1acPaieRBwiWoCb0FE0KUbXaxg';

/**
 * #REVIEW: checkJs fails
 * @const { Object } data
 * @property { String } [date]
 * @example
 * 'YYYY-MM-DD'
 * data.date = ['2022-05-01', '2022-05-02', '2022-05-03']
 *
 * @property { String } name
 * @property { String } tel
 */
// const data = {
//   name: 'g2',
//   // tel: 0,
//   tel: '1',
//   date: ['2022-05-03', '2022-05-04', '2022-05-05'],
// };
// /* end of tmp-const */

export const getRooms = async () => {
  // #NOTE: res.data.items[] => { name, id }
  const sample = await fetch('./draft/sample.json').catch((error) => {
    return error;
  });
  const res = await sample.json().catch((error) => {
    return error;
  });
  // console.log(data.items);

  // const res = await apiRoomsGet().catch(
  //   (err) =>
  //     // console.error('await-catch:::', err);
  //     err.response
  // );

  return res;
};

export const deleteRooms = async () => {
  const res = await apiRoomsKill().catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });

  return res;
};

export const readOneRoom = async ({ id }) => {
  // #NOTE: res.data.booking[] => { date }
  const sampleOne = await fetch('./draft/sample-One.json').catch((error) => {
    return error;
  });
  const res = await sampleOne.json().catch((error) => {
    return error;
  });

  // const res = await apiRoomReadOne({ id }).catch((err) => {
  //   // console.error('await-catch:::', err);
  //   return err.response;
  // });

  return res;
};

export const postRoom = async ({ id, data }) => {
  const res = await apiRoomPost({ id, data }).catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });

  return res;
};
/* end of export */

// document.getElementById('get').addEventListener('click', () => {
//   getRooms().then((result) => {
//     console.log('finally-result:::', result);

//     const isOK = result.status === 200;
//     console.log('isOK:::', isOK);

//     if (result.status === 401) {
//       console.log('goHome:::');
//       // goHome()
//     }

//     showOutput(result);
//     // showTodoListItem(result.data.todos);
//   });
// });
// /* end of GET() */

// document.getElementById('delete').addEventListener('click', () => {
//   deleteRooms().then((result) => {
//     console.log('finally-result:::', result);

//     const isOK = result.status === 200;
//     console.log('isOK:::', isOK);

//     if (result.status === 401) {
//       console.log('goHome:::');
//       // goHome()
//     }

//     showOutput(result);
//     // showTodoListItem(result.data.todos);
//   });
// });
// /* end of DELETE() */

// document.getElementById('toggle').addEventListener('click', () => {
//   readOneRoom({ id }).then((result) => {
//     console.log('finally-result:::', result);

//     const isOK = result.status === 200;
//     console.log('isOK:::', isOK);

//     if (result.status === 401) {
//       console.log('goHome:::');
//       // goHome()
//     }

//     showOutput(result);
//     // showTodoListItem(result.data.todos);
//   });
// });
// /* end of GET()-one */

// document.getElementById('post').addEventListener('click', () => {
//   postRoom({ id, data }).then((result) => {
//     console.log(data);
//     console.log('finally-result:::', result);

//     const isOK = result.status === 200;
//     console.log('isOK:::', isOK);

//     if (result.status === 401) {
//       console.log('goHome:::');
//       // goHome()
//     }

//     showOutput(result);
//     // showTodoListItem(result.data.todos);
//   });
// });
// /* end of POST() */
// /* end of tmp-EventListener */
