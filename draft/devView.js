const tmpRoomDetail = (room) => {
  return `
    <div class='card '>
      <input id="input-id" type="text">
    </div>

    <button class="btn btn-info my-3" id=""  data-id="${room.id}">
      Booking-${room.id}
    </button>

    <div class='card mt-3'>
      <div class='card-header'>RoomDetail</div>

      <div class='card-body'>
        <pre>${JSON.stringify(room, null, 2)}</pre>
      </div>
    </div>
  `;
};

export const printDetail = (room, htmlContent = '') => {
  // htmlContent = roomsTitle.map(templateRoomTitle).join('');
  // document.querySelector('.room-detail').innerHTML = htmlContent;
  document.getElementById('res').innerHTML = tmpRoomDetail(room);
};

const templateRoomTitle = (room) => {
  return `
    <li data-id='${room.id}'>
      <p>${room.name}</p>
    </li>
  `;
};

export const printTitle = (roomsTitle, htmlContent = '') => {
  htmlContent = roomsTitle.map(templateRoomTitle).join('');
  document.querySelector('.rooms-block').innerHTML = htmlContent;
};

export const showOutput = (res) => {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
      <p>StatusText: ${res.statusText}</p>
      
      <div class="card-body">
        <h6>Msg: ${res.data.message ? res.data.message : ''}</h6>
        <p>Error: ${res.data.error ? res.data.error : ''}</p>

        <p>Success: ${res.data.success}</p>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>

      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>

      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
};
