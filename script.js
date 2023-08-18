
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const monthYearElement = document.getElementById("monthYear");
  const datesElement = document.getElementById("dates");
  const monthbtn=document.getElementById('month');
  const yearbtn=document.getElementById('year');

  let currentDate = new Date();



  
  function updateCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();
    const endingDay=lastDayOfMonth.getDay();
    const today = new Date();

    monthbtn.innerHTML= currentDate.toLocaleString('default', { month: 'long'});
    yearbtn.innerHTML = currentDate.toLocaleString('default', {year: 'numeric' });
    datesElement.innerHTML = "";

    for (let i = 0; i < startingDay; i++) {
      const emptyDateElement = document.createElement("div");
      emptyDateElement.classList.add("date");
      emptyDateElement.classList.add("notcurr");
      datesElement.appendChild(emptyDateElement);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateElement = document.createElement("div");
      dateElement.innerText = day;
      dateElement.classList.add("date");
      let d=`${day}-${monthbtn.innerHTML}-${yearbtn.innerHTML}`;
      dateElement.setAttribute("data-bs-toggle","modal");
      dateElement.setAttribute("data-bs-target","#exampleModal");
      dateElement.setAttribute("data-bs-whatever",d);
      
      if (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() && day === today.getDate()) {
        dateElement.classList.add("today");
      }
      let currdate=`${day}${monthbtn.innerHTML}${yearbtn.innerHTML}`
      let obj=JSON.parse(localStorage.getItem(currdate));
      if(obj){
        dateElement.innerText=`${day}\n ${obj[0]}:${obj[1]}`;
        dateElement.style.background="#94f8e0";
      }

      datesElement.appendChild(dateElement);
    }

    for (let i = endingDay; i <6; i++) {
      const emptyDateElement = document.createElement("div");
      emptyDateElement.classList.add("date");
      emptyDateElement.classList.add("notcurr");
      datesElement.appendChild(emptyDateElement);
    }

  }

  prevBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  nextBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });


function monthupdate(e){
  let mbtn=e.target;
  let data=mbtn.innerText;
  let obj={
    'January':0,'February':1,'March':2,'April':3,'May':4,'June':5,'July':6,'August':7,'September':8,'October':9,'November':10,'December':11
  }
  //let y=yearbtn.innerText;
  currentDate.setMonth(obj[data]);
  updateCalendar();
}

function yearupdate(e){
  let mbtn=e.target;
  let data=mbtn.innerText;
  currentDate.setFullYear(data);
  updateCalendar();
}


const exampleModal = document.getElementById('exampleModal');

exampleModal.addEventListener('show.bs.modal', function (event) {
  const clickeddate = event.relatedTarget;
  const recipient = clickeddate.getAttribute('data-bs-whatever');
  const modalTitle = exampleModal.querySelector('.modal-title');
  modalTitle.textContent = `Add Event for  ${recipient}`;

  let btnadd=document.getElementById('addevent');

  
  btnadd.onclick = function() {  
    let t=document.getElementById('title');
    let des=document.getElementById('desc');
    if(t.value.trim()=='' || des.value.trim()==''){
      alert("Enter Valid Data");
      return;
    }
    let date=clickeddate.innerText;
    clickeddate.innerText=`${date}\n${t.value}:${des.value}`;
    clickeddate.style.background="#94f8e0";
    const userArray = [t.value,des.value];
    let currdate=`${date}${monthbtn.innerHTML}${yearbtn.innerHTML}`;
    localStorage.setItem(currdate, JSON.stringify(userArray));
    
    t.value="";
    des.value="";


    document.getElementById('closebtn').click();
  }
});


  updateCalendar();
