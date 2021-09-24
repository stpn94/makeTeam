const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    /* `${}`(백틱=esc밑에있는거) 를 사용하면 "varName+":"+"var"+":"+"var" 일일이 ""를 +를 할 필요 없음 */
    clock.innerText = `${hours}:${minutes}:${seconds}`;

}

getClock();

setInterval(getClock, 1000);
/* setInterval (함수, 시간) = 함수를 시간마다 반복*/


/* String "01" 출력하면 1이 출력됨
String.padStart(Maxint,"fillString") 2개이상의 문자가 없을때 "String"을 출력
ex "hi".padStart(10,"A") == AAAAAAAAhi 10개의 문자가되기위해 "앞에" A로 채워줌(만약 padEnd함수면 문자 뒤에 채워줌)*/
