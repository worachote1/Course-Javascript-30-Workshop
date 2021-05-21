const toggle = document.querySelector('#toggle');

const open = document.querySelector('#open');

const modal = document.querySelector('#modal');

const close = document.querySelector('#close');

toggle.addEventListener('click',() =>{
    document.body.classList.toggle('show-nav'); // กดแล้วจะเพิ่ม class ชื่อ show-nav ลงไปใน tag body แต่เมื่อกดอีกครั้งจะลบ class show-nav ออก
});

open.addEventListener('click',()=>{ //กดปุ่มสร้างบัญชีแล้จะมี หน้ากรอกแบบ Form เด้งขึ้นมา
    modal.classList.add('show-modal');
});

close.addEventListener('click',()=>{ //กดปุ่มกากกบาท แล้วจะปิดแบบ Form
    modal.classList.remove('show-modal');
});

//นอกจากจะกดกากบาทเพื่อปิดแบบ Form แล้วสามารถกดที่พื้นที่ว่างเพื่อปิดได้ด้วย

window.addEventListener('click',e =>  
    e.target === modal ? modal.classList.remove('show-modal') :false); //เมื่อมีการคลิกที่หน้าจอ จะตรวจเช็คว่าถ้าไม่ได้คลิกบริเวณตัวmodal จะให้ปิดตัว Form ลงไป 