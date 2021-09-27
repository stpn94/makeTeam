const stdForm = document.getElementById("std-form");
const stdList = document.getElementById("std-list");
const stdInput = document.querySelector("#std-form input");
const mkTeam = document.querySelector("#mkTeam");
/* 2번이상 쓰일때는 변수를 만들어 쓰자!~ */
const STDS_KEY = "stds"

/* let == update한다. */
let stds = [];
/* stds 배열 안에 할일들을 넣고 로컬스토리지는에 저장해 보자.
 하지만 로컬스토리지는 텍스트만 넣을수 있다. 주의해라 */
/* 우리는 텍스트를 배열로 넣고싶다. 그러면
JSON.stringify 를 써라*/

let teamArr = [];

let student = [];
const nostd = "---"
const nostdObj = {
    text: nostd,
    id: Date.now()
};
stdForm.addEventListener("submit", handlestdSubmit);

function savestds() {
    localStorage.setItem(STDS_KEY, JSON.stringify(stds));
    console.log(stds);
}


mkTeam.addEventListener("click", team);

function makeTeam(teamArr) {
    //0~ 학생수 만큼 돌릴꺼야
    for (let i = 0; i < teamArr.length; i++) {
        //랜덤으로 인덱스 부여
        student[i] = parseInt((Math.random() * teamArr.length));
        //부여한 인덱스 번호가 또 나오면 안되니까
        for (let j = 0; j < i; j++) {
            //인덱스 번호가 나오면 다시 돌아가라
            if (student[i] == student[j]) {
                i--;
                break;
            }
        }
    }
    //모든 학생 인덱스번호가 생성됨
    
    // if(student.length%4==0){
    //     for(let l = 0; l<student.length%4;l++){
    //         teamArr.push(nostdObj);
    //     }
    // }
    /* 각사람별로 배열값 저장
     * 만약 인덱스를 부여받지 않는 사람이 6이면 */
    
    let htmls = '';
    let k = 0;
    
    const f = function() {

        if(k == student.length) {
            document.getElementById('team1-list').innerHTML = htmls;
            return;
        }

        if (k % 4 == 0) {
            htmls += newFunction_1(k);
        }

        htmls += newFunction(k++);

        setTimeout(f, 1000);
    }

    setTimeout(f, 1000);
}

function newFunction_1(k) {
    const data = (k / 4 + 1) + "조";
    const html = "<l1>======" + data + "=======</l1>"
    console.log("\n" + data);
    return html;
}

function newFunction(k) {
    data = "\t" + stds[(student[k])].text;
    const html = "<li>" + data + "</li>";

    console.log(data);
    return html;
}
function team() {
    /* const li = event.target.parentElement;
    // console.log(li.id); 리스트의 아이디를 출력 할수있다.
    stds = stds.filter(std => std.id != parseInt(li.id));
    console.log(stds); */
    // console.log(stds[0].text);

  
    // if(student.length%4==0){
    //     for(let l = 0; l<student.length%4;l++){
    //         stds.push(nostdObj);
    //     }
    // }
    if(stds.length%4!=0){
        for(let l = 0; l<stds.length%4;l++){
            stds.push(nostdObj);
        }
    }
    stds.forEach(function (item) {
        // console.log(item.text);
        teamArr.push(item.text);
    })
    makeTeam(teamArr)
}

/* form 안에 들어가는 것을 submmit 하면 새로고침 되기 때문에
event.preventDefault()를 사용하여 기능을 멈춘다. */
function handlestdSubmit(event) {
    event.preventDefault();
    const newstd = stdInput.value;
    stdInput.value = "";
    // stds.push(newstd);
    /* 그냥 String이 아닌 object 형식[{ID:01,value:good}] 으로 저장하고싶다*/
    const newstdObj = {
        text: newstd,
        id: Date.now()
    };
    stds.push(newstdObj);
    // paintstd(newstd);
    paintstd(newstdObj);
    savestds();
}

function printsstd(newstd) {
    /* 새로운 stdList안에 li안에 span안에 newstd를 넣으면 된다. */
    const li = document.createElement("li");
    li.id = newstd.id;
    const span = document.createElement("span");
    span.innerText = newstd.text;

    const button = document.createElement("button");
    button.innerText = "❌";

    button.addEventListener("click", deletestd);
    li.appendChild(span);
    li.appendChild(button);
    stdList.appendChild(li);
}

function paintstd(newstd) {
    /* 새로운 stdList안에 li안에 span안에 newstd를 넣으면 된다. */
    /* ❌ 버튼도 넣어주자 */
    const li = document.createElement("li");
    li.id = newstd.id;
    const span = document.createElement("span");
    span.innerText = newstd.text;

    const button = document.createElement("button");
    button.innerText = "❌";

    button.addEventListener("click", deletestd);
    li.appendChild(span);
    li.appendChild(button);
    stdList.appendChild(li);
}

function deletestd(event) {
    /* 버튼을 누르면  */

    /* 어떤것이 클릭됬는지 확인, 그것의 부모 확인, 그 리스트를 삭제하면됨.) */
    /* target = 클릭한 곳의 Element 이다. */
    // console.log(event.target.parentElement.innerText);
    /* 그 선택된 리스트를 삭제하기위해 변수 선언 */
    const li = event.target.parentElement;
    // console.log(li.id); 리스트의 아이디를 출력 할수있다.
    li.remove();
    stds = stds.filter(std => std.id != parseInt(li.id))
    savestds();
}

const savedstds = localStorage.getItem(STDS_KEY);
//savedstds가 null 일때가 있는걸 대비해서


if (savedstds !== null) {
    // javaScript가 이해할수 있는 살아있는 객체로 만들 수 있다.
    const parsedstds = JSON.parse(savedstds);
    stds = parsedstds;
    parsedstds.forEach(paintstd);
    /* 끝 인거 같지만 스토리지 않에 배열에 추가가 되는것이 아닌 덮어씌워지는 문제가 발생
    왜냐하면 배열stds[] 은 항상 시작할때 비워져 있기 떄문 */
}

/* filter 사용해보자
filter는 조건에 맞지않으면(fulse이면) 리턴해주지 않는 함수이다.*/
/* function sexyFilter(item){return item >2 }
 = arr.filter(item => item >2) */
