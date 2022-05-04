# f2e2019-stage06

---

## Functions

### Section1-Home

1. print title of Rooms

  ```markdown
   - bind with their `{ id }`
  ```

2. Event-"click"

3. Go to their detail

### Section2-Detail

1. print detail with date range picker of click Room

---

## init

  ```sh
  npm init -y
  ```

  ```sh
  npm i axios --save
  ```

  ```sh
  npm i dotenv --save
  ```

### `dotenv`

- new folder `<config>` with:

  ```markdown
   .
   ├─ <config>
   │  ├── config.env
   │  └── example.env
  ```

- `example.env`

  ```sh
  BASE_URL='https://challenge.thef2e.com/api/thef2e2019/stage6'

  F2E_TOKEN=
  ```

#### `.gitignore`

- `#MUST`

  ```sh
  config.env
  ```
