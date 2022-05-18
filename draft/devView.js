export const printPriceMsg = (payment) => {
  document.querySelector(
    '.payment-msg'
  ).innerHTML = `帳單：${payment}、晚平日、晚假日`;
};

const tmpForm = ({ id, pickedStart, pickedEnd }) => {
  const isoToday = new Date().toISOString().split('T')[0];
  // #TODO: declutter

  // <div class="card">
  //   <input id="input-id2" type="text">
  // </div>
  return `
                  <form action="" id="form-reservation" class="">

                    <div class="user-info ">
                      <label class="w-full " for="">
                        <p class="label-p pt-4 pb-2 text-white">姓名</p>
                        <input type="text" class="input-form w-full p-1"
                          name="name" id="" placeholder="請填寫您的姓名" required
                          minlength="2">

                        <span class="validity"></span>
                        <p class="label-p hint-msg"></p>
                      </label>

                      <label class="w-full" for="">
                        <p class="label-p pt-4 pb-2 text-white">手機號碼</p>
                        <input type="tel" class="input-form w-full p-1"
                          name="tel" id="" placeholder="請填寫您的手機號碼" required
                          pattern="[0-9]{10}" maxlength="10">

                        <span class="validity"></span>
                        <p class="label-p hint-msg"></p>
                      </label>
                    </div>


                    <div class="user-date relative">

                      <label class="w-full " for="date-start">
                        <p class="label-p pt-4 pb-2 text-white">入住日期</p>

                        <input type="date" class="input-form w-full p-1"
                          name="room-start" id="date-start"
                          value="${pickedStart}"
                          min="${isoToday}" max="2022-12-31" placeholder="入住日期"
                          required pattern="\d{4}-\d{2}-\d{2}">
                      </label>

                      <div
                        class="flex absolute bottom-1 right-1 items-center pl-3 pointer-events-none text-[#38470B]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <label class="w-full " for="date-end">
                        <p class="label-p pt-4 pb-2 text-white">退房日期</p>

                        <input type="date" class="input-form w-full p-1 "
                          name="room-exit" id="date-end"
                          value="${pickedEnd}" max="2022-12-31"
                          placeholder="退房日期" required
                          pattern="\d{4}-\d{2}-\d{2}">

                      </label>
                      <!-- <input type="reset"> -->
                    </div>

                    <div class="picked-hint py-2 ">
                      <p class="picked-txt py-1 text-[#949C7C]">
                        2 天，1 晚平日
                      </p>
                      <hr>

                      <div
                        class="picked-hint flex flex-col items-end py-1 text-white">
                        <p class="">總計</p>
                        <p class="text-2xl font-bold">$1,380</p>
                      </div>

                    </div>

                    <footer class="flex flex-col justify-between py-1">
                      <a href="#" data-id="${id}"
                                  class="btn
                                  block py-2.5
                                  text-center text-white
                                  bg-[#949C7C] hover:bg-[#949C7C]/75
                                  hover:text-lime-100 hover:scale-105
                                  focus:ring-4 focus:outline-none
                                  focus:ring-lime-800
                                  active:scale-100
                                  transition ease-in-out
                                  sm:w-auto" id="js-post-reservation">
                        確認送出
                      </a>
                      <small class="block pt-4 text-center text-white">
                        此預約系統僅預約功能，並不會對您進行收費
                      </small>
                    </footer>
                  </form>
  `;
};

const modalTemplate = ({ id, pickedStart, pickedEnd }) => {
  return `
  <div class="js-modal relative z-10 " role="dialog" aria-modal="true">
      <!--
            Background backdrop, show/hide based on modal state.
          -->
      <div
        class="hidden fixed inset-0  bg-opacity-75 transition-opacity md:block">
      </div>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <!--
                lightbox bg
                bg-sky-50
              -->
        <div class="flex min-h-screen
                text-center
                md:block style=" font-size: 0">
          <!--
                  This element is to trick the browser into centering the modal contents.
                -->
          <span class="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true">&#8203;</span>

          <!--
                  #NOTE:
                  Modal panel, show/hide based on modal state.
              -->
          <div
            class="w-full
                    flex text-base text-left transform transition
                    md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
            <div
              class="w-full relative flex items-center  overflow-hidden shadow-2xl  ">

              <button type="button"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 z-50">

                <span class="sr-only">Close</span>
                <!-- Heroicon name: outline/x -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- #NOTE: Modal-Body -->
              <div class="container  js-modal bg-white
                          flex items-start border border-[#38470B] z-40
              ">
                <div class="relative  bg-[#38470B]
                  w-2/5 px-8 py-6 
                  flex flex-col justify-between items-center
                ">
                  ${tmpForm({ id, pickedStart, pickedEnd })}
                </div>

                <section class="relative 
                                w-3/5 px-8 pt-10 
                                flex flex-col justify-between text-[#38470B] 
                ">
                  <h5 class="text-2xl font-bold">Single Room</h5>
                  <ul class="pt-2 pb-7">
                    <li>1 人・ 單人床・ 附早餐・衛浴 1 間・18 平方公尺</li>
                    <li>平日（一～四）價格：1,380 / 假日（五〜日）價格：1,500</li>
                  </ul>

                  <ul class="relative text-xs flex flex-wrap space-between  ">

                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>

                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>
                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>
                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>

                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>

                    <li class="relative flex pb-4 pr-7">
                      <div class="relative flex flex-col justify-between">
                        <img src="./src/images/property-icons/breakfast.svg"
                          alt="Breakfast" class="pr-1 pb-2">
                        <p class="mx-auto">早餐</p>
                      </div>
                    </li>
                  </ul>

                  <section class="">
                    <h6 class="text-xl font-bold">訂房資訊</h6>

                    <ul class="m-6 text-xs leading-loose list-disc">
                      <li class="">
                        入住時間：最早 15:00，最晚 21:00；退房時間：10:00，請自行確認行程安排。
                      </li>
                      <li class="">
                        平日定義週一至週四；假日定義週五至週日及國定假日。
                      </li>
                      <li class="">
                        好室旅店全面禁止吸菸。
                      </li>
                      <li class="">
                        若您有任何問題，歡迎撥打 <a href="tel:+886038321155"
                          class="text-lime-700 hover:text-teal-700 hover:text-sm hover:font-bold">03-8321155</a>（服務時間：週一至週六
                        10:00
                        - 18:00）。
                      </li>
                    </ul>
                  </section>

                  <section class="">
                    <h6 class="text-xl font-bold">預約流程</h6>

                    <ul class="w-full flex justify-between text-center text-xs">
                      <li class="w-1/3">
                        <p>送出線上預約單</p>
                      </li>

                      <li class="w-1/3">
                        <ul class="">
                          <li>系統立即回覆是否預訂成功</li>
                          <li>並以簡訊發送訂房通知</li>
                          <li>（若未收到簡訊請來電確認）</li>
                        </ul>
                      </li>

                      <li class="w-1/3 ">
                        <ul>
                          <li>入住當日憑訂房通知</li>
                          <li>以現金或刷卡付款即可</li>
                          <li>（僅接受 VISA、JCB、銀聯卡）</li>
                        </ul>
                      </li>
                    </ul>
                  </section>


                </section>
                <!-- end of Modal-Body -->

              </div>
            </div>
          </div>
          <!-- end of Modal-Panel -->
        </div>
      </div>
      <!-- end of Modal-dialog -->
  `;
};

export const printForm = ({ pickedStart, pickedEnd }, htmlContent = '') => {
  // htmlContent = roomsTitle.map(templateRoomTitle).join('');
  // document.querySelector('.room-detail').innerHTML = htmlContent;
  // document.getElementById('res').innerHTML = tmpForm(tmpData);
  // document.querySelector('.js-modal').innerHTML = tmpForm(tmpData);
  // document.querySelector('.js-modal').innerHTML = tmpForm(tmpData);
  // const { datepicker } = tmpData;
  // datepicker.open();
  // const formsDate = datepicker.getDatePicker();
  // console.log(formsDate);

  document.querySelector('main').innerHTML = modalTemplate({
    pickedStart,
    pickedEnd,
  });
};

const detailTemplate = () => {
  return `
        <section class="details relative
                        pt-14 pr-16 pb-32 pl-6
                        flex flex-col bg-white overflow-y-scroll
                        ">
          <header class="flex justify-between items-end pb-8">
            <h3 class="text-3xl">Single Room</h3>
            <small class="">1 人・ 單人床・ 附早餐・衛浴 1 間・18 平方公尺</small>
          </header>

          <div class="">
            <ul>
              <li>平日（一～四）價格：1,380 / 假日（五〜日）價格：1,500</li>
              <li>入住時間：15:00（最早） / 21:00（最晚）</li>
              <li>退房時間：10:00</li>
            </ul>
            <ul class="py-8">
              <li>單人間僅供 1 位客人使用。</li>
              <li>臥室配有單人床和私人浴室。</li>
              <li>您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。</li>
              <li>房間裡有 AC，當然還有 WiFi。</li>
            </ul>

            <ul class="relative text-xs flex flex-wrap space-between  ">

              <li class="relative w-1/6 flex pb-4">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/breakfast.svg"
                    alt="Breakfast" class="pr-1 pb-2">
                  <p class="mx-auto">早餐</p>
                </div>
                <img src="./src/images/property-icons/icons8-ok.svg" alt="Have"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>

              <li class="relative w-1/6 flex pb-4 opacity-20">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/poolside_bar.svg"
                    alt="MiniBar" class="pr-1 pb-2">
                  <small class="mx-auto">Mini Bar</small>
                </div>

                <img src="./src/images/property-icons/icons8-cancel.svg" alt="Not"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>
              <li class="relative w-1/6 flex pb-4">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/breakfast.svg"
                    alt="Breakfast" class="pr-1 pb-2">
                  <p class="mx-auto">早餐</p>
                </div>
                <img src="./src/images/property-icons/icons8-ok.svg" alt="Have"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>

              <li class="relative w-1/6 flex pb-4 opacity-20">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/poolside_bar.svg"
                    alt="MiniBar" class="pr-1 pb-2">
                  <small class="mx-auto">Mini Bar</small>
                </div>

                <img src="./src/images/property-icons/icons8-cancel.svg" alt="Not"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>
              <li class="relative w-1/6 flex pb-4">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/breakfast.svg"
                    alt="Breakfast" class="pr-1 pb-2">
                  <p class="mx-auto">早餐</p>
                </div>
                <img src="./src/images/property-icons/icons8-ok.svg" alt="Have"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>

              <li class="relative w-1/6 flex pb-4 opacity-20">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/poolside_bar.svg"
                    alt="MiniBar" class="pr-1 pb-2">
                  <small class="mx-auto">Mini Bar</small>
                </div>

                <img src="./src/images/property-icons/icons8-cancel.svg" alt="Not"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>
              <li class="relative w-1/6 flex pb-4">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/breakfast.svg"
                    alt="Breakfast" class="pr-1 pb-2">
                  <p class="mx-auto">早餐</p>
                </div>
                <img src="./src/images/property-icons/icons8-ok.svg" alt="Have"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>

              <li class="relative w-1/6 flex pb-4 opacity-20">
                <div class="relative flex flex-col justify-between">
                  <img src="./src/images/property-icons/poolside_bar.svg"
                    alt="MiniBar" class="pr-1 pb-2">
                  <small class="mx-auto">Mini Bar</small>
                </div>

                <img src="./src/images/property-icons/icons8-cancel.svg" alt="Not"
                  class="absolute w-4 h-4 top-1 left-12 ">
              </li>

            </ul>

            <section class="check-date">
              <h2>空房狀態查詢</h2>
              <input id="input-id" type="text">
            </section>
          </div>

        </section>
      `;
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
  // document.getElementById('res').innerHTML = tmpRoomDetail(room);

  document.querySelector('main').innerHTML = detailTemplate();
  document.querySelector('.container-xl').classList.remove('py-12');
  document.querySelector('.container-xl').classList.remove('px-16');

  // document.querySelector('main').classList.add('-mt-12');
  document.querySelector('main').classList.add('h-screen');
  document.querySelector('main').classList.add('-mr-16');
  // document.querySelector('main').classList.add('overflow-y-auto');

  // <div class="photos
  //             w-2/5 px-16 py-11
  //             flex flex-col justify-between
  // ">
  // </div>
  document.querySelector('aside').innerHTML = `
    <p>PHOTOS</p>

    <div class="mx-auto relative
                flex flex-col py-24 justify-between
    ">
      <p class="mx-auto py-2.5 payment-msg">
        $1,380 / 1 晚
      </p>

      <a href="#" class="btn px-7 py-2  js-toggle 
          text-white bg-[#38470B] hover:bg-teal-600      
      ">
        Booking NOW
      </a>
    </div>
  `;

  const toggleModal = (element) => {
    console.log('display-Before:::', element.style.display);
    const isClose = element.style.display === 'none';

    // element.style.display = isClose ? 'flex' : 'none';
    console.log('display-After:::', element.style.display);

    element.classList.toggle('hidden');
    alert('hidden', element.classList.contains('hidden'));
  };

  // const modal = document.querySelector('.js-modal');
  // modal.addEventListener(
  //   'click',
  //   ({ target }) => {
  //     const isClosest = target.closest('svg') || target.closest('path');
  //     if (!isClosest) {
  //       return console.log('!::', target);
  //     }

  //     // toggleModal(modal);
  //   },
  //   'false'
  // );
};

// hover:after:content-[" room"]="" "="">

const templateRoomTitle = (room) => {
  const replaceName = room.name.replace(/ /g, '_');
  const afterContent = `hover:after:content-['${replaceName}']`;
  console.log(afterContent);
  return `
    <li class="w-1/3 h-1/2" data-id="${room.id}">
      <a href="#" class="js-toggle btn-toggle  text-white
                    relative block pt-[100%]  

                    after:absolute after:w-full after:h-full
                    after:top-0
                    after:flex after:justify-center after:items-center
                    after:text-white
                    after:transition after:ease-in-out after:duration-150

                    hover:after:duration-500
                    hover:after:bg-[#38470B]
                    hover:after:bg-opacity-60
                    ${afterContent}
      ">
        <img src="./src/images/photo-room1.png" alt="${room.name}" 
          class="absolute block h-full w-full top-0 left-0
        ">
        
      </a>
    </li>
  `;
};
// <li data-id='${room.id}'>
//   <p>${room.name}</p>
// </li>

export const printTitle = (roomsTitle, htmlContent = '') => {
  htmlContent = roomsTitle.map(templateRoomTitle).join('');
  document.querySelector('.js-gallery').innerHTML = htmlContent;
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
