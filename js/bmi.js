let heightInput = document.getElementById('height');
let weightInput = document.getElementById('weight');
let btnCalc = document.getElementById('btnCalc');

let height, weight;
heightInput.addEventListener('input', ()=>{
    height = heightInput.value / 100;
});
weightInput.addEventListener('input', ()=>{
    weight = weightInput.value / 1;
});

let bmi;
let bmiResult = document.getElementById('bmiResult');
let status = document.getElementById('status');
let records = document.getElementById('records');


// 歷史紀錄
let arrRecords;
if(!localStorage['record']){
    arrRecords = [];
}else{
    arrRecords = JSON.parse(localStorage['record']);
    showRecords();
}
console.log(arrRecords);


btnCalc.addEventListener('click',()=>{
    if(heightInput.value != '' && weightInput.value != '' && bmiResult.innerText == '看結果'){
        console.log(height,weight);
        bmi = (weight / (height ** 2)).toFixed(2);
        console.log(bmi);

        btnCalc.classList.add('active');
        bmiResult.innerText = bmi;

        if(bmi>=80){
            status.innerText = '數值錯誤';
        }
        else if(bmi>=40){
            status.innerText = '重度肥胖';
        }
        else if(bmi>=35){
            status.innerText = '中度肥胖';
        }
        else if(bmi>=30){
            status.innerText = '輕度肥胖';
        }
        else if(bmi>=25){
            status.innerText = '過重';
        }
        else if(bmi>=18.5){
            status.innerText = '理想';
        }
        else if(bmi>=15){
            status.innerText = '過輕';
        }else{
            status.innerText = '數值錯誤';
        }

        switch (status.innerText) {
            case '理想':
                btnCalc.style.borderColor = '#86D73F';
                btnCalc.style.color = '#86D73F';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#86D73F';
                break;
            case '過輕':
                btnCalc.style.borderColor = '#31BAF9';
                btnCalc.style.color = '#31BAF9';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#31BAF9';
                break;
            case '過重':
                btnCalc.style.borderColor = '#FF982D';
                btnCalc.style.color = '#FF982D';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#FF982D';
                break;
            case '輕度肥胖':
                btnCalc.style.borderColor = '#FF6C03';
                btnCalc.style.color = '#FF6C03';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#FF6C03';
                break;
            case '中度肥胖':
                btnCalc.style.borderColor = '#FF6C03';
                btnCalc.style.color = '#FF6C03';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#FF6C03';
                break;
            case '重度肥胖':
                btnCalc.style.borderColor = '#FF1200';
                btnCalc.style.color = '#FF1200';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#FF1200';
                break;
            case '數值錯誤':
                btnCalc.style.borderColor = '#fff';
                btnCalc.style.color = '#fff';
                btnCalc.querySelector('.icon-loop').style.backgroundColor = '#fff';
                break;
        }

        // 存入 localstorage
        if(status.innerText != '數值錯誤'){
            setStorage();
        }

        function setStorage(){
            let d = new Date();
            let arrRec = [];

            if(!localStorage['record']){
                localStorage['record'] = '';
            }

            arrRec.push(status.innerText);
            arrRec.push(bmi);
            arrRec.push(weightInput.value);
            arrRec.push(heightInput.value);
            arrRec.push(`${d.getHours()}:${d.getMinutes()}-${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`);
            arrRecords.push(arrRec);
            // console.log('arrRec',arrRec);
            // console.log('arrRecords',arrRecords);
            // console.log(JSON.stringify(arrRecords));
            

            localStorage['record'] = JSON.stringify(arrRecords);
            showRecords();
        }

    }else if(bmiResult.innerText != '看結果'){
        bmiResult.innerText = '看結果';
        btnCalc.classList.remove('active');
        // heightInput.value = '';
        // weightInput.value = '';
        btnCalc.style.borderColor = '';
        btnCalc.style.color = '';
        btnCalc.querySelector('.icon-loop').style.backgroundColor = '';
    }else{
        alert('請填入資料');
    }
});


function showRecords(){
    let arrRecordsLen = arrRecords.length;
    let color;
    records.innerHTML = '';

    for(let i=arrRecordsLen - 1; i>=0; i--){
        switch (arrRecords[i][0]) {
            case '理想':
                color = '#86D73F';
                break;
            case '過輕':
                color = '#31BAF9';
                break;
            case '過重':
                color = '#FF982D';
                break;
            case '輕度肥胖':
                color = '#FF6C03';
                break;
            case '中度肥胖':
                color = '#FF6C03';
                break;
            case '重度肥胖':
                color = '#FF1200';
                break;
        }

        records.innerHTML += `
            <div class="record" style="border-color:${color};">
                <div class="status">${arrRecords[i][0]}</div>
                <div class="bmi">
                    <span class="fz-small">BMI</span>
                    <span>${arrRecords[i][1]}</span>
                </div>
                <div class="weight">
                    <span class="fz-small">weight</span>
                    <span>${arrRecords[i][2]}kg</span>
                </div>
                <div class="height">
                    <span class="fz-small">height</span>
                    <span>${arrRecords[i][3]}cm</span>
                </div>
                <div class="date fz-small">${arrRecords[i][4]}</div>
            </div>
        `;
    }
}