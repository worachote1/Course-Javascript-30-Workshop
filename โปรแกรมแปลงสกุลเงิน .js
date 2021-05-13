const currency_one = document.querySelector('#currency-one');
const currency_two = document.querySelector('#currency-two');

const amount_one = document.querySelector('#amount-one');
const amount_two = document.querySelector('#amount-two');

// ส่วนของ HTML ที่เกี่ยวข้องกับ อัตราแลกเปลี่ยน คือ div ที่มี id="rate" นั้น จะต้องนําข้อมูลจาก API มาแสดงผล

// ตัว rateText และ swap จะแสดงผลใน div class="swap-container"
const rateText = document.querySelector('#rate');
const swap = document.querySelector('#btn');

//กําหนด Event ให้  currency_one และ currency_two
currency_one.addEventListener('change',calculate); // เมื่อมีการเปลี่ยนตัวเลือก dropdown ใน currency_one ให้เรียกใช้ฟังก์ชั่น calulateMoney
currency_two.addEventListener('change',calculate); 

function calculate(){ //ฟังก์ชั่นนี้จะรับค่าข้อมูล ว่าผู้ใช้เลือกเงินสกุลอะไร
    const one = currency_one.value;
    const two =currency_two.value;

    console.log( `สกุลเงินต้นทาง : ${one}`);
    console.log( `สกุลเงินปลายทาง : ${two}`);

    amount_one.addEventListener('input',calculate);
    amount_two.addEventListener('input',calculate); 
    //เรียกใช้งาน API
    //ใช้ fetch จะ return เป็น Promise มาใช้งานเพื่อใช้ .then() จะเรียกใช้ได้เรื่อยๆ
    
    //ต้องต่อท้ายด้วยสกุลเงินต้นทาง เพื่อให้ได้สกุลปลายทางตอบกลับมาจากตัว api
    fetch(`https://v6.exchangerate-api.com/v6/bc7d4092838c632e9efa337c/latest/${one}`) 
    .then(res => res.json()).then(data =>{
        const rate = data.conversion_rates[two];   // response ได้ promise กลับมาแปลงให้เป็น Json เก็บไว้ใน data
        
        rateText.innerText = `1 ${one} = ${rate} ${two}` ;
        amount_two.value= (amount_one.value * rate).toFixed(2) ; // toFixed(2) คือเลือกว่าจะเอาทศนิยม 2 ตําแหน่ง
    })
}

swap.addEventListener('click',() =>{ //ปุ่มกดแล้วจะสลับ สกุลเงินต้นทาง กับ สกุลเงินปลายทาง
    const temp =currency_one.value ; //ตัวแปร temp เอาไว้เก็บค่าสกุลเงินต้นทาง ชั่วคราวว
    currency_one.value = currency_two.value;
    currency_two.value = temp ;

    calculate(); // สลับค่ากันเรียบร้อยแล้วก็เรียกใช้ calculate() ; มาคิดเงินใหม่
})

calculate(); //ให้แสดงผลไว้ก่อน ตั้งแต่เริ่ม

