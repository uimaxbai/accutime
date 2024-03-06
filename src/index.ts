import axios from 'axios';

export async function _makeRequest(url: string) {
    const begin = new Date();
    let data;
    let response = await axios.get(url);
    if (response.status !== 200) throw new Error("Bad response from server");
    data = response.data;
    return [data, (new Date().getTime() - begin.getTime())];
}

// BEGIN different time sources
export async function worldTimeApi(append: string) { // no private methods below ES6
    return _makeRequest("https://worldtimeapi.org/api/"+append);
}
export function ntpJS() {
    // https://use.ntpjs.org/v1/time.json
    return _makeRequest("https://use.ntpjs.org/v1/time.json");
}


export function average(arr: Array<number>) {
    return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length; // function average
}

export async function getTime(timezone: string = "") {
    let worldTimeAPI;
    let ntpJS1;
    let worldTimeAPIDate;
    let meanTime;

    if (timezone === "" || timezone === undefined) {
        // console.log("No timezone provided, using IP location")
        worldTimeAPI = await worldTimeApi("ip");
        ntpJS1 = await ntpJS(); // {"now":1706718224.761073,"backoff":320,"__server":"lhrlhr"}
        worldTimeAPIDate = new Date(Date.parse(worldTimeAPI[0].datetime));
        meanTime = average([worldTimeAPIDate.getTime(), Math.floor(ntpJS1[0].now*1000)]);
    }
    else {
        // TODO: get NTPJS timezone
        worldTimeAPI = await worldTimeApi("timezone/"+timezone);
        worldTimeAPIDate = new Date(Date.parse(worldTimeAPI[0].datetime));
        meanTime = worldTimeAPIDate.getTime();
    }

    worldTimeAPIDate.setMilliseconds(worldTimeAPIDate.getMilliseconds() - worldTimeAPI[1]);
    
    let date = new Date(meanTime);

    return {
        datetime: date.toISOString(),
        timezone: worldTimeAPI[0].timezone,
        utc_offset: worldTimeAPI[0].utc_offset,
        unix: date.getTime(),
    };
}