const tmpForm = (tmpData) => {
  // #TODO: declutter
  console.log('tmpData:::', tmpData);
  console.table(tmpData);
  const { pickedData } = tmpData;
  const { regGroups } = pickedData;
  const { pickedStart, pickedEnd } = regGroups;

  console.log(pickedStart, pickedEnd);

  return `
    <div class="container my-5  ">

      <form action="" id="form-reservation"
        class="form flex flex-col items-center">

        <div class="user-info">
          <label class="w-full" for="">
            <p class="label-p">姓名</p>
            <input type="text" class="input-form" name="name" id=""
              placeholder="請輸入您的姓名" required minlength="2">

            <span class="validity"></span>
            <p class="label-p hint-msg"></p>
          </label>

          <label class="w-full" for="">
            <p class="label-p">手機號碼</p>
            <input type="tel" class="input-form" name="tel" id=""
              placeholder="請輸入您的手機號碼" required pattern="[0-9]{10}"
              maxlength="10">

            <span class="validity"></span>
            <p class="label-p hint-msg"></p>
          </label>
        </div>

        <div class="user-date">
          <label class="w-full" for="date-start">
            <p class="label-p">入住日期</p>

            <input type="date" name="room-start" id="date-start"
              value="${pickedStart}" min="2022-05-01" max="2022-12-31"
              class="input-form" placeholder="入住日期" required
              pattern="\d{4}-\d{2}-\d{2}">

            <span class=" validity"></span>
          </label>

          <label class="w-full" for="date-end">
            <p class="label-p">退房日期</p>

            <input type="date" name="room-exit" id="date-end" 
              value="${pickedEnd}" min="2022-05-01" max="2022-12-31"
              class="input-form" placeholder="退房日期" required
              pattern="\d{4}-\d{2}-\d{2}">

            <span class=" validity"></span>
          </label>

          <!-- <input type="reset"> -->
        </div>

        <a href="#" class="btn btn-primary my-3" id="js-post-reservation">
          確認送出
        </a>
      </form>

    </div>
  `;
};

export const printForm = (tmpData, htmlContent = '') => {
  // htmlContent = roomsTitle.map(templateRoomTitle).join('');
  // document.querySelector('.room-detail').innerHTML = htmlContent;
  document.getElementById('res').innerHTML = tmpForm(tmpData);
};

const tmpRoomDetail = (room) => {
  return `
    <div class="card">
      <input id="input-id" type="text">
    </div>

    <a href="#" class="btn btn-info my-3" id="js-btn-booking"
        data-id="${room.id}">
      Booking-CLICK-${room.id}
    </a>

    <div class="card mt-3">
      <div class="card-header">RoomDetail</div>

      <div class="card-body">
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
