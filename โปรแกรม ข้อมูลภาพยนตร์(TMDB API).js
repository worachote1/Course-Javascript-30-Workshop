

// ดึงข้อมูลหนัง แล้วให้ ่javascript ทํางาน จะมีการดึงข้อมูลของหนังไป แสดงผลบนหน้าเว็บ

const apiKey = '00dc6c88ded32758896d3e23da49714f' ;
let years = "2021";

const content = document.querySelector('#content');
const urlPoster =  `https://image.tmdb.org/t/p/w500/` ;
const dropdown = document.querySelector('#years'); //สร้างตัวแปรมาเก็บ ปี ที่เราเลือกไว้ใน dropdown

//url ที่ทําการส่ง request เพื่อข้อเข้าถึง resource ข้อมูลหนัง
const url =`
https://api.themoviedb.org/3/discover/movie?api_key=00dc6c88ded32758896d3e23da49714f&language=en-US&sort_by=popularity.desc&page=1&year=${years}&with_watch_monetization_types=flatrate
`;

// ส่ง request ไปยัง url โดยใช้ fetch()

// สร้างฟังก์ชั่นสําหรับ ดึงข้อมูล และ render ข้อมูลมา
// แต่ตอนส่ง request เพื่อเข้าถึงข้อมูลหนัง เราจะต้องรอให้ดึงข้อมูลให้เสร็จก่อนถึงจะทํางานอย่างอื่นได้ ก็คือดึงข้อมูลหนังมาให้ครบก่อนแล้วค่อยแสดงผล
// เลยต้องทําให้ฟังก์ชั่น เป็นในรูปแบบของ async await

// เป็นการบอกว่าตอนเรียกใช้งาน ฟังก์ชั่น displayMovies() เราจะส่ง request ไปยัง url ผ่าน fetch() เพื่อไปดึงข้อมูลของหนังมา โดยจะต้องรอให้ดึงมาครบก่อนจึงจะไปทํางานอย่างอื่นได้
// เก็บข้อมูลที่ดึงมาไว้ในตัวแปร response

async function displayMovies(url) {
 	const response = await fetch(url);  
	const movies =  await response.json(); //ตัวแปร movie เก็บหนังทั้งหมดเอาไว้
	
	/*ถ้าอยากได้ของมูลหนังของ ปี ที่เพิ่งเลือกใน dropdown จะต้องลบข้อมูลหนังของปีที่เลือกก่อนนหน้านี้ออกก่อน ไม่งั้นหนังปีที่เราเลือกจะลงไปต่อ ข้างล่างของหนังที่เลือกปีเดิม*/
	/* ถ้าเจอ moive อยู่ในตัว content ก็ให้ลบออกไป*/
	while(content.firstChild){
		content.removeChild(content.firstChild);
	}

	/* loop เอาข้อมูลที่ได้จาก API มาแสดง*/
	movies.results.forEach(data =>{
		const moviesElement = document.createElement('div');
		moviesElement.classList.add('movie');

		const title = document.createElement('h2');
		const poster = document.createElement('img');

		title.innerHTML =  `${data.title.substring(0,28)}`; //เนื่องจากหนังบางเรื่องมีชื่อยาวมาก มันจะะไปกินพื้นที่ส่วนอื่น เราจะใช้วิธ๊กําหนนดความ string ที่แสดงชื่อเรื่องหนัง โดยใช้ .sunstring(0,28) คือต้องการเพียงแค่ 0 ถึง 28 คํา 
		poster.src = `${urlPoster}${data.poster_path}` ; 
		
		moviesElement.appendChild(title);
		moviesElement.appendChild(poster);

		content.appendChild(moviesElement);
	});
	
}

dropdown.addEventListener('change',()=>{
	
	years = dropdown.value ;
	//เมื่อเปลี่ยน ปี ที่เลือกแล้วให้ส่ง request ไปยัง url ของตัวแปรตัวใหม่
	const updateUrl =`
https://api.themoviedb.org/3/discover/movie?api_key=00dc6c88ded32758896d3e23da49714f&language=en-US&sort_by=popularity.desc&page=1&year=${years}&with_watch_monetization_types=flatrate
`;
	displayMovies(updateUrl);

});
displayMovies(url);