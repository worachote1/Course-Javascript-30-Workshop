const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');

form.addEventListener('submit',(e) =>{
    e.preventDefault(); // เมื่อกด submit จะไม่ให้มีการดําเนินการใดๆ เช่น การกระพริบหน้าจอ หรือ ล้างข้อมูลใน form
    if (username.value === ''){
        showError(username,'กรุณาป้อนชื่อผู้ใช้งาน');
        
    }
    else{
        showSuccess(username);

    }

    if (email.value === ''){
        showError(email,'กรุณาป้อนอีเมล');
        
    }
    else if(!validateEmail(email.value)){
        showError(email,'อีเมลไม่ถูกต้อง ');
    }
    else{
        showSuccess(email);

    }

    if (password1.value === ''){
        showError(password1,'กรุณาป้อนรหัสผ่าน');
        
    }
    else{
        showSuccess(password1);

    }

    if (password2.value === ''){
        showError(password2,'กรุณายืนยันรหัสผ่าน');
        
    }
    else{
        showSuccess(password2);

    }

    checkPassword(password1,password2); // เช็คว่า password ทั้ง 2 ช่อง ตรงกันไหม
    
    checkInputLength(username,5,15); //username ป้อนได้แค่ 5-10 ตัวอักษร

    checkInputLength(password1,8,20) // password ป้อนได้ตั้งแต่ 8-20 ตัวอักษร
});

//ฟังก์ชั่น แสดงสถานะของสี ใน text field (ช่อง input)
function showError(input,message){
    const formControl = input.parentElement; //ย้ายจาก tag inputที่มี id ไปทํางานใน elementตัวแม่ที่คลอบ inputที่มี id เอาไว้อยู่ คือ tag divที่มีclass form-control ทําให้เราเพิ่ม class error หรือ success เองได้
    formControl.className = 'form-control error' ; //เพิ่ม class error ลงไป เมื่อเราลืมใส่คําในช่อง input กรอบจะเป็นสีแดง
    const small = formControl.querySelector('small');
    small.innerText = message; // ขึ้นข้อความด้านล่าง เมื่อลืมใส่คํา

}

function showSuccess(input){
    const formControl = input.parentElement; 
    formControl.className = 'form-control  success' ; //กรอบจะเป็นสีเขียว 

}

function validateEmail(email) { //เช็คว่าได้เขียนในรูปแบบของ email รึเปล่า coppy มาจาก stackoverflow
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



//ฟังก์ชั่นนี้ เช็ครหัสผ่าน ทั้ง 2 ช่องว่าเหมือนกันไหม
function checkPassword(password1,password2){
    if (password1.value !== password2.value){
        showError(password2,"รหัสผ่านไม่ตรงกัน");
    }
    else{
        
    }
}

//ฟังก์ชั่นนี้ สําหรับcheck ความยาวของ input
function checkInputLength(input,min,max){
    if(input.value.length < min ){
        showError(input,`ต้องป้อน ${input.id} ตั้งแต่ ${min} ถึง ${max} ตัวอักษรเท่านั้น` );
    }
    else if(input.value.length > max){
        showError(input,`ต้องป้อน ${input.id} ตั้งแต่ ${min} ถึง ${max} ตัวอักษรเท่านั้น` );
    }
    else{
        showSuccess(input);
    }
}  