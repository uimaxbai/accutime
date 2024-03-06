# accutime

Accurate time for the browser.

## Use me

### Browser

```js
<script src="https://cdn.jsdelivr.net/npm/accutime@latest/dist/accutime.min.js"></script>
```

### CommonJS

```shell
npm i accutime
```

```js
const accutime = require('accutime');
```

### ESM

```shell
npm i accutime
```

```js
import accutime from 'accutime';
```

## Usage

### getTime

```js
accutime.getTime();
```

Get the time.

Returns a promise that resolves to:

```js
{
    "datetime": "2024-02-01T11:33:36.841Z",
    "timezone": "Europe/London",
    "utc_offset": "+00:00",
    "unix": 1706787216841
}
```

### ntpJS

```js
accutime.ntpJS(timezone: string)
```

Parameters:

- Timezone: *(optional)* A timezone. See full list [here](https://worldtimeapi.org/timezones).

Get the time from [https://use.ntpjs.org/v1/time.json](https://use.ntpjs.org/v1/time.json).

Returns a promise that resolves to:

```js
[
    {
        "now": 1706787368.862806,
        "backoff": 375,
        "__server": "lhrlhr"
    },
    62
]
```

The first value in the array is the response from the server.

The second value in the array is the amount of time it took to make the request.

### worldTimeApi

```js
accutime.worldTimeApi(append: string)
```

Parameters:

- append: (required) A appendix to the URL `https://worldtimeapi.org/api/`. In practise, you can append a timezone or `ip` for time at your IP. See the [World Time API website](https://worldtimeapi.org/) for details.

## Todo

- [x] Fix requests for the server.
- [ ] Add real NTP for server clients.
