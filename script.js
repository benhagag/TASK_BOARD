var arr = [];
var id = 0;
// put value to input date

// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
// today = yyyy+'-'+mm+'-'+dd;
// document.getElementById("date").setAttribute("value", today);

// deleteALL function

document.getElementById("deleteALL").addEventListener('click', function() {

    if (localStorage.getItem("mission") && confirm("Are You Sure Want To Delete All ?")==true) {
     localStorage.clear();
     location.reload();
     alert("Your Board Is Clean!");
     localStorage.clear();
  }
    else if( localStorage.getItem("mission")== null){
            alert("Your Board Is Allready Clean!");
     }
});




// for take data from loclstorage make them back to array and display them by parts on the html.....

function loadnotes() {
  var text = "";
  var time = "";
  var watch = "";
// for bring thr value of today to date value

  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth()+1; //January is 0!
  // var yyyy = today.getFullYear();
  // today = yyyy+'-'+mm+'-'+dd;
  // document.getElementById("date").setAttribute("value", today);


  //this if for there is no arr in the local if the html is empty so it says if !arr than do one !! ...
  arr = JSON.parse(localStorage.getItem("mission"));
  if (!arr) {
    arr = [];
  }

  for (var i = 0; i < arr.length; i++) {

    //those are the keys!!

    text = arr[i].text;
    time = arr[i].date;
    watch = arr[i].hour;
    // id = i;
    // console.log(arr[i]);
    createbox(text, time, id, watch);
  }
}


//for showtime local time

var myVar = setInterval(function() {
  showtime()
}, 10);

function showtime() {
  d = new Date();
  hour = d.getHours();
  min = d.getMinutes();
  sec = d.getSeconds();

  if (min < 10) {
    min = "0" + min
  }
  if (sec < 10) {
    sec = "0" + sec
  }
  document.getElementById("timezone").innerText = d;
}

// for prevent submit , and valid the textinput and date input

document.getElementById("nosubmit").addEventListener("submit", function(e) {
  e.preventDefault()
  //console.log(e);
  valid();

});

function valid() {
  var text = document.getElementById("miss").value;
  var time = document.getElementById("date").value;
  var watch = document.getElementById("localhour").value;
//regexp on textarea to not allow whitespace before word
   var patt = /^\S/;
   var res = patt.test(text);

  if (text == ""|| res == false) {
    alert("Please Insert Text Mission correctly!!");
    document.getElementById("eror").innerHTML = "Please Insert Text Mission correctly!!";
    document.getElementById("eror").style.color = "red";
  }
  //today is a scope viriable means the date of today
    // else if (time < today){
    // alert("The Date must be Bigger or Equal to today date");
    // document.getElementById("eror").innerHTML = "The Date must be Bigger or Equal to today date";
    // document.getElementById("eror").style.color = "red";
// }
   else {
    document.getElementById("eror").innerHTML = "";
    document.getElementById("miss").value = "";
    // document.getElementById("date").value = today;
    document.getElementById("localhour").value = "00:00";
    //id =i in loadnotesfunction and now is = arr.length
    id = arr.length;

    // this is object....every object has to have key and value!! ..

    var info = {
      "text": text,
      "date": time,
      "hour": watch
    };
    // console.log(info);

    // push its only for push sometihng to array ....

    arr.push(info);
    var myJSON = JSON.stringify(arr);
    localStorage.setItem("mission", myJSON);
    createbox(text, time, id, watch);


  }

}
// creat note on the body function

function createbox(text, time, id, watch) {
  var divdiv = document.createElement('div');
  var ptext = document.createElement('P');
  var pdate = document.createElement('P');
  var ptime = document.createElement('p');
  var x = document.createElement('span');
  var node = document.createTextNode(text);
  var mydate = document.createTextNode(time);
  var mytime = document.createTextNode(watch);
  divdiv.appendChild(x);
  ptext.appendChild(node);
  pdate.appendChild(mydate);
  ptime.appendChild(mytime);
  divdiv.appendChild(ptext);
  divdiv.appendChild(pdate);
  divdiv.appendChild(ptime);
  document.querySelector(".notes-container").appendChild(divdiv);
  divdiv.className = 'box col-lg-3 elementToFadeInAndOut';
  pdate.className = 'paradate';
  ptext.className = 'text';
  ptime.className = 'paratime';
  x.setAttribute("id", id);// id=arr.length
  x.className = 'glyphicon glyphicon-remove';
  x.addEventListener('click', removeNote);
}
// this function for remove the note from localStorage and the page.!!

function removeNote() {

  var element = this.parentNode;// father of x=divdiv
  var t = this;
  element.classList.add("elementToFadeOut");// add class to divdiv fadeout

  setTimeout(function(){

      //(1)this.= glyphicon, (1)parentNode= div/box,(2) parentNode=body,removeChild(this.parentNode=box)

      //take the parent of glyphicon = box--> and than take his parent= body--> and than remove box from body
      t.parentNode.parentNode.removeChild(t.parentNode);
      arr = JSON.parse(localStorage.getItem("mission"));
      var noteLocation = t.getAttribute('id');// that the id will be= arr.length
      arr.splice(noteLocation, 1);
      localStorage.setItem("mission", JSON.stringify(arr));
      refreshIds();

      if(arr.length == 0){
        localStorage.removeItem("mission");
        console.log('asdad');
      }
  }, 900);


}

function refreshIds() {
  var notes = document.getElementsByClassName('glyphicon-remove'); // it also makes it array because the classes
  // console.log(notes);
  for (var i = 0; i < notes.length; i++) {
    notes[i].setAttribute('id', i);
  }
}
