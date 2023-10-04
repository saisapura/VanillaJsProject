const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const giveaway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');

  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  // let futureDate = new Date(2024, 9, 5, 2, 30, 0);
  const futureDate = new Date (tempYear, tempMonth, tempDay + 365, 1, 4, 0);

  // straight forward
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();

  // set up array with months to display text value
  let month =futureDate.getMonth();
  month = months[month]; 

  const date = futureDate.getDate();

  // set up array with weekdays to display text value
  const weekday = weekdays[futureDate.getDay()];
  // console.log(weekday); // will give the value 0-6 sun-sat
  
  
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    // console.log(t);
    // 1s = 1000ms
    // 1m = 60s
    // 1h = 60m
    // 1day = 24h
    
    // values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMin = 60*1000;

    // calculate all values    
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t%oneDay) / oneHour);    
    let minutes = Math.floor((t%oneHour) / oneMin);
    let seconds = Math.floor((t%oneMin) / 1000);    

    // set values array;
    const values = [days, hours, minutes, seconds];
    
    function format(item) {
        if (item < 10) {
            return (item = `0${item}`)
        }
        return item
    }

    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class='expired'>Sorry, this giveaway has expired</h4>`
    }
    
}
// countdown 
let countdown = setInterval(getRemainingTime, 1000);
 getRemainingTime();