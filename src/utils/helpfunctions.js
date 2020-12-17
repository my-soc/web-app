import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export function formattedToday(expression) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10)
    {
        dd=`0${dd}`;
    }

    if(mm<10)
    {
        mm=`0${mm}`;
    }
    switch (expression){
        case "Month dd":
            return `${months[today.getMonth()]} ${dd}`
        default:
            return `${yyyy}-${mm}-${dd}`
    }
}

export function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        return d;
    };
}

export function getSampleData() {
    const parseDate = timeParse("%Y-%m-%d");
    const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
    return promiseMSFT;
}