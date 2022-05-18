// import axios from 'axios';
// const axios = require('axios').default;
// console.log('axios:::', axios);

/**
 * axios.<method> will now provide autocomplete and parameter typings
 *
 * #doc:
 * https://github.com/axios/axios
 */

/**
 * #REVIEW:-#XXX
 * axios-config-default-JSON?
 */
// const config = {
//   method: 'get',
//   url: `${BASE_URL}/check`,
//   headers: {
//     Authorization: TOKEN,
//   },
//   // Sleeping: 6s
//   timeout: 9000,
// };
// axios
//   .post('<URI>', {}, config)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.log(error.response.data);
//   });

/**
 * #REVIEW:-#XXX
 *
 */
// const dotenv = require('dotenv').config({
//   path: './config/config.env',
//   debug: true,
// });
// if (dotenv.error) {
//   throw dotenv.error;
// }

// dotenv.config({
//   path: './config/config.env',
//   debug: true,
// });
// console.log(dotenv);

/**
 * #REVIEW:-#XXX
 * which one?
 * `dotenv.parsed` VS `process.env`, docchi?
 */
// console.log(dotenv.parsed);
// const { BASE_URL, F2E_TOKEN } = dotenv.parsed;
// console.log(BASE_URL);
/* end of env */

// const BASE_URL = process.env.BASE_URL;
// const TOKEN = `Bearer ${process.env.F2E_TOKEN}`;

const BASE_URL = 'https://challenge.thef2e.com/api/thef2e2019/stage6';
const F2E_TOKEN =
  'gTHEd8A2WY0WEUN8x5K7B26trCSNbhD13QeL5MxiIq5EfErYgC2LUsWFZ4s7';
const TOKEN = `Bearer ${F2E_TOKEN}`;

const roomsReq = axios.create({
  baseURL: `${BASE_URL}/rooms`,
  headers: {
    Authorization: TOKEN,
  },
});
/* end of definition */

roomsReq.interceptors.request.use(
  (config) => {
    console.log(`
      ${config.method.toUpperCase()} request sent to
        [${config.baseURL}]
      ( at ${new Date()} ).
    `);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

roomsReq.interceptors.response.use(
  (response) => {
    /**
     * Any status code that lie within
     *  the range of [2xx] cause this function to trigger
     */
    const { status, config } = response;
    console.log(`
      [${status}] ${config.method.toUpperCase()} request sent to
        [${config.baseURL}]
      ( at ${new Date()} ).
    `);

    // init();

    return response;
  },
  (error) => {
    /**
     * Any status codes that falls outside
     *  the range of [2xx] cause this function to trigger
     */
    return Promise.reject(error);
  }
);
/* end of axios-roomsReq-interceptors */

// export
/**
 * #REVIEW: merge them
 */
export const apiRoomsGet = () => {
  return roomsReq.get();
};

export const apiRoomsKill = () => {
  return roomsReq.delete();
};

export const apiRoomReadOne = ({ id }) => {
  return roomsReq.get(`${BASE_URL}/room/${id}`);
};

export const apiRoomPost = ({ id, data }) => {
  return roomsReq.post(`${BASE_URL}/room/${id}`, data);
};
