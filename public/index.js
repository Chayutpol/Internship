
var timeline = [
  {"value": -1000, "name":"Prehistorical", "link": "Prehistorical-head" },
  {"value": 100, "name":"Ancient", "link": "Antiquity-head"},
  {"value": 500, "name":"Middle Age", "link": "Middle-Age-head"},
  {"value": 1500, "name":"Renaissance", "link": "Renaissance-head"},
  {"value": 1789, "name":"French Revolution", "link": "French-Revolution-head"},
  {"value":	1800, "name":"Modern 19th Century", "link": "Modern19th-head"},
  {"value":	1900, "name":"Modern 20th Century", "link": "Modern20th-head"},
  {"value":	2000,"name":"Contemporian", "link": "Contemporian-head"},
  {"value": 2100, "name":"", "link": "header"}
];
var elem = document.getElementById("wrapper");
var era_name= [
  'Prehistorical',
  'Antiquity',
  'Middle-Age',
  'Renaissance',
  'French-Revolution',
  'Modern19th',
  'Modern20th',
  'Contemporian'
];
//add the filename for the image here
var fileNames = [
  // Prehistorical
  ['mères et chasseuses et cheffes.jpg', 'Prehistoric.jpg'],
  //Antiquity
  ['Femme sportives Sicile.jpg', 'Femmes sportives grecques.jpg','Hypathie.jpg','Peseshet.jpg', 'sappho.jpg'],
  //Middle-Age
  ['Aliénor d’aquitaine.jpg', 'Christine-de-Pisan.jpg', 'Femmes-chevaleresses.jpg', 'Modern-age.jpg'],
  //Renaissance
  ['Artemesia Gentilesche.jpg', 'Catherine de medicis.jpg', 'Emilie du châtelet.jpg', 'Louise Depinay.jpg', 'Maria-Anna Mozart.jpg', 'Reine Margot.jpg', 'arrow.png','arrow.png'],
  //French-Revolution
  ['Anne Théroigne de Méricourt.jpg', 'Déclaration des droits de la femme, extrait.jpg', 'Femmes à cheval allant à versailles.jpg', 'Louise de Kéralio.jpg', 'Olympe de Gouge.jpg'],
  //Modern19th
  [],
  //Modern20th
  [],
  //Contemporian
  []

];
var timelineColor = "rgba(200,180,170)";
var timelineBackground = "#654A3E";
if(window.innerWidth < 772)
{
  var galleries = document.getElementsByClassName("img-container");
  for(var i = 0; i < galleries.length ; i++)
  {
    galleries[i].classList.add("collapse-content")
  }
}
var navbar = document.getElementById('nav-bar');
navbar.style.display = "none";
for(let i = 0 ; i < era_name.length; i++) {
  var path = './content/'+ era_name[i]+'.txt';
  var folder = "./img/" + (parseInt(i)+1) + era_name[i] + '/';
  // get the content from the specify path
  $.get(path, function(data) {
       $('#' + era_name[i]).append(data);
       $('#' + era_name[i]).append("<a class=\"prev\" ><div>&#10094;</div></a>");
       $('#' + era_name[i]).append("<a class=\"next\" ><div>&#10095;</div></a>");
       $('#' + era_name[i] + ' a.prev').attr("onclick", "plusSlides(" + i + ", -1)");
       $('#' + era_name[i] + ' a.next').attr("onclick", "plusSlides(" + i + ", 1)");
       for(let j = 0 ; j < $('#' + era_name[i] + " .mySlides").length; j++){
         $('#' + era_name[i] + '-dot').append(
           "<span class=\"dot\" onclick=\"currentSlide(" + i + ',' + (parseInt(j)+1) +")\"></span>"
         );
       }
       $('[lang]').hide(); // hide all lang attributes on start.
       $('[lang="en"]').show();
       showSlides(i, slideIndex[i]);
       //console.log(typeof data);
  }, 'text');
  let div = document.createElement("button");
  let line = document.createElement("hr");

  div.append(era_name[i]);
  div.setAttribute('onclick',"TimeKnots.scroll(\"" + era_name[i] + "-head\")");
  div.setAttribute('id',era_name[i]+'-nav');
  navbar.append(div);
  if(i != era_name.length-1)
    navbar.append(line);

  for(j in fileNames[i])
  {
    var val = folder+fileNames[i][j];
    var name = decodeURIComponent(val.split('/').pop().split('.')[0]);
    $('#' + era_name[i] + '-img').append("<figure class=\"items\"  ><span><img src='" + val +"' title=\"" + name +"\" loading=\"lazy\"><p class=\"image-caption\">"+ name +"</p></span></figure>" );
  }
}

var slideIndex = new Array();
for(let i in era_name)
{
  slideIndex.push(1);
}


var upbutton = document.getElementById("up-button");
var downbutton = document.getElementById("down-button");
$("#down-button img").attr("onmouseover", "onHover(this)").attr("onmouseout","unHover(this)");
function onHover(x){
  x.classList.add("animate__animated");
  x.classList.add("animate__bounce");
  x.classList.add("animate__infinite");
}
function unHover(x){
  x.classList.remove("animate__bounce");
}
function spring(x){
  x.classList.add("spring");
}
function unspring(x){
  x.classList.remove("spring");
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    upbutton.style.display = "block";
    navbar.style.display = "";
    downbutton.style.display = "none";
  } else {
    upbutton.style.display = "none";
    navbar.style.display = "none";
    downbutton.style.display = "block";
  }
  var count = 1;
  for(let i = 0; i < era_name.length; i++)
  {
    var elem = document.getElementById(era_name[i]+'-head');
    if(isInViewport(elem) && count != 0)
    {
      document.getElementById(era_name[i]+'-nav').classList.add('active');
      count = 0;
    }
    else
    {
      document.getElementById(era_name[i]+'-nav').classList.remove('active');
    }
  }
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function scrollDown(){
  document.body.scrollTop = window.innerHeight;
  document.documentElement.scrollTop = window.innerHeight;
}

function topFunction(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

elem = document.getElementById("wrapper");
$("#timeline2").empty();
TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: timelineColor, background: timelineBackground, width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});

$('[lang]').hide(); // hide all lang attributes on start.
$('[lang="en"]').show(); // show just Korean text (you can change it)
$('#lang-switch').change(function () { // put onchange event when user select option from select
    var lang = $(this).val(); // decide which language to display using switch case.
    switch (lang) {
        case 'en':
            $('[lang]').hide();
            $('[lang="en"]').show();
        break;
        case 'fr':
            $('[lang]').hide();
            $('[lang="fr"]').show();
        break;
        default:
            $('[lang]').hide();
            $('[lang="en"]').show();
        }
});


// Next/previous controls
function plusSlides(a, n) {
  showSlides(a, slideIndex[a] += n);
}

// Thumbnail image controls
function currentSlide(a, n) {
  showSlides(a, slideIndex[a] = n);
}

function showSlides(a, n) {
  var i;
  var slides = document.getElementById(era_name[a]).getElementsByClassName("mySlides");
  var dots = document.getElementById(era_name[a]+"-dot").getElementsByClassName("dot");
  if (n > slides.length) {slideIndex[a] = 1}
  if (n < 1) {slideIndex[a] = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  if(typeof(slides[slideIndex[a]-1]) != 'undefined'){
    slides[slideIndex[a]-1].style.display = "block";
    dots[slideIndex[a]-1].className += " active";
  }
  else {
    console.log(a);
  }
}
for(i = 0; i < era_name.length; i++)
{
  var newButton = document.createElement("button");
  newButton.textContent = "Show gallery";
  newButton.classList.add("collapsible");
  newButton.type = "button";
  var gallery = document.getElementById(era_name[i] + "-img");
  if(gallery.childNodes.length == 1){
    continue;
  }

  var parent = gallery.parentNode;
  parent.insertBefore(newButton, gallery);
}
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.classList.contains('active')) {
      content.classList.remove('active')
    } else {
      content.classList.add('active')
    }
  });
}

const resize_ob = new ResizeObserver(function(entries) {
	// since we are observing only a single element, so we access the first element in entries array
	let rect = entries[0].contentRect;
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: timelineColor, background: timelineBackground, width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
});

// start observing for resize
resize_ob.observe(document.querySelector("#wrapper"));

$(window).resize(function() {
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: timelineColor, background: timelineBackground, width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
  if(window.innerWidth <= 772)
  {
    var galleries = document.getElementsByClassName("img-container");
    for(var i = 0; i < galleries.length ; i++)
    {
      galleries[i].classList.add("collapse-content")
    }
  }
  if(window.innerWidth > 772)
  {
    var galleries = document.getElementsByClassName("img-container");
    for(var i = 0; i < galleries.length ; i++)
    {
      galleries[i].classList.remove("collapse-content")
    }
  }
});

$(document).ready(function(){
    $(window).on('load',function() {
    fetch('https://extreme-ip-lookup.com/json/')
      .then( res => res.json())
      .then(response => {
          console.log("Country: ", response.country);
       })
       .catch((data, status) => {
          console.log('Request failed');
       })
    var language = window.navigator.userLanguage || window.navigator.language;
    language = language.toLowerCase();
    alert(language);
    var fr = ['fr', 'fr-ca', 'fr-lu', 'fr-ch'];
    if(fr.includes(language))
    {
      $('#lang-switch').val('fr').change();
    }
    elem = document.getElementById("wrapper");
    $("#timeline2").empty();


    // slider
    var len = document.getElementsByClassName('slideshow-container').length;
    for(var j = 0; j < len ; j++)
    {
      showSlides(j, slideIndex[j]);
      console.log(j);
    }

    TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: timelineColor, background: timelineBackground, width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
    $(".row").css("position", "static");
  });
});
