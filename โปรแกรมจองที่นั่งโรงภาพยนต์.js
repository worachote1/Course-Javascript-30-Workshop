const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //ใช้เป็น querySelectorAll เพราะเรามีที่นั่งหลายที่ ให้เอาส่วนของตัวแถว class row และ seat ที่ไม่ใช่ occupied

const count = document.querySelector('#count');
const total = document.querySelector('#total');

const movieSelect = document.querySelector('#movie');

let price = +movieSelect.value ; // ใส่เครื่องหมาย + ข้างหน้าเพื่อแปลงให้เป็น integer จะได้ตัวเลขราคาเก็บลงไปที่ price เอาไว้คํานวณราคา

container.addEventListener('click',e =>{
    //เช็คว่าตัว container ที่เราไปคลิกโดนตรงที่นั่ง หรือ คลิกโดน class seat ไหม แล้วที่นั่งที่คลิก เป็น occupied ไหม
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){ 
        //ให้ที่นั่งที่เราคลิกเลือกเปลี่ยน class เป็น selected ซึ่งใช้ .toggle แล้วเราจะสามารถคลิกที่นั่งซํ้าเพื่อเอา class selected ออกได้ 
        e.target.classList.toggle('selected'); 
        upDateSelected();
    }
})

//เมื่อมีการเปลี่ยน เรื่องภาพยนตร์ ค่า price ก็จะเปลี่ยนตาม
movieSelect.addEventListener('change',e =>{
    price =+ e.target.value
    upDateSelected();
})


//ฟังก์ชั่นคํานวณ ราคาตามจํานวนที่นั่งที่เราเลือก
function upDateSelected(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // เข้าไปที่แถวแต่ละแถว แล้วเลือกเอาเฉพาะที่นั่งที่เราเลือกทั้งหมด
    const countSeats = selectedSeats.length //เก็บจํานวนที่นั่งที่เลือกทั้งหมด

    count.innerText = countSeats ;
    total.innerText =  countSeats * price;
}