
var timeline = [
  {"value": -1000, "name":"Prehistorical", "link": "Prehistorical-head" },
  {"value": 100, "name":"Ancient", "link": "Antiquity-head"},
  {"value": 500, "name":"Middle Age", "link": "Middle-Age-head"},
  {"value": 1500, "name":"Renaissance", "link": "Renaissance-head"},
  {"value": 1789, "name":"French Revolution", "link": "French-Revolution-head"},
  {"value":	1800, "name":"Modern 19th Century", "link": "Modern19th-head"},
  {"value":	1900, "name":"Modern 20th Century", "link": "Modern20th-head"},
  {"value":	2000,"name":"Contemporian", "link": "Contemporian-head"},
  {"value": 2100, "name":"", "link": "#"}
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
var fileNames = [
  // Prehistorical
  ['mères et chasseuses et cheffes.jpg', 'Prehistoric.jpg'],
  //Antiquity
  ['Femme sportives Sicile.jpg', 'Femmes sportives grecques.jpg','Hypathie.jpg','Peseshet.jpg', 'sappho.jpg'],
  //Middle-Age
  ['Aliénor d’aquitaine.jpg', 'Christine-de-Pisan.jpg', 'Femmes-chevaleresses.jpg', 'Modern-age.jpg'],
  //Renaissance
  ['Artemesia Gentilesche.jpg', 'Catherine de medicis.jpg', 'Emilie du châtelet.jpg', 'Louise Depinay.jpg', 'Maria-Anna Mozart.jpg', 'Reine Margot.jpg'],
  //French-Revolution
  ['Anne Théroigne de Méricourt.jpg', 'Déclaration des droits de la femme, extrait.jpg', 'Femmes à cheval allant à versailles.jpg', 'Louise de Kéralio.jpg', 'Olympe de Gouge.jpg'],
  //Modern19th
  [],
  //Modern20th
  [],
  //Contemporian
  []

];
for(let i in era_name) {
  var path = './content/'+ era_name[i]+'.txt';
  var folder = "./img/" + (parseInt(i)+1) + era_name[i] + '/';

  // $.ajax({
  //     url : folder,
  //     success: function (data) {
  //         $(data).find("a").attr("href", function (j, val) {
  //             if( val.match(/\.(jpe?g|png|gif)$/) ) {
  //                 var name = decodeURIComponent(val.split('/').pop().split('.')[0]);
  //                 $('#' + era_name[i] + '-img').append("<figure class=\"items\"  ><img src='" + val +"' onmouseover=\"zoom(this)\" onmouseout=\"unzoom(this)\"><p>"+ name +"</p></figure>" );
  //             }
  //         });
  //     }
  // });
  $.get(path, function(data) {
       $('#' + era_name[i]).append(data);
       $('#' + era_name[i]).append("<a class=\"prev\" >&#10094;</a>");
       $('#' + era_name[i]).append("<a class=\"next\" >&#10095;</a>");
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
  for(j in fileNames[i])
  {
    var val = folder+fileNames[i][j];
    console.log(val);
    var name = decodeURIComponent(val.split('/').pop().split('.')[0]);
    $('#' + era_name[i] + '-img').append("<figure class=\"items\"  ><img src='" + val +"' onmouseover=\"zoom(this)\" onmouseout=\"unzoom(this)\"><p>"+ name +"</p></figure>" );
  }
}
var allRow = document.getElementsByClassName("row");
for(k = 0; k < allRow.length; k++)
{
  allRow[k].setAttribute("onmouseover", "highlight(this)");
  allRow[k].setAttribute("onmouseout", "unhighlight(this)");
}
function highlight(x){
  x.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function unhighlight(x){
  x.style.backgroundColor = "rgba(0,0,0,0)";
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
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upbutton.style.display = "block";
    downbutton.style.display = "none";
  } else {
    upbutton.style.display = "none";
    downbutton.style.display = "block";
  }
}
function scrollDown(){
  document.body.scrollTop = window.innerHeight;
  document.documentElement.scrollTop = window.innerHeight;
}

function topFunction(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function zoom(x){
  x.style.maxWidth = "120%";
  x.style.maxHeight = "120%";
  x.style.zIndex = "99";
}
function unzoom(x){
  x.style.maxWidth = "100%";
  x.style.maxHeight = "calc(100% - 20px)";
  x.style.zIndex = "0";
}

elem = document.getElementById("wrapper");
$("#timeline2").empty();
TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});

$('[lang]').hide(); // hide all lang attributes on start.
$('[lang="en"]').show(); // show just Korean text (you can change it)
$('#lang-switch').change(function () { // put onchange event when user select option from select
    var lang = $(this).val(); // decide which language to display using switch case. The rest is obvious (i think)
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
  slides[slideIndex[a]-1].style.display = "block";
  dots[slideIndex[a]-1].className += " active";
}

const resize_ob = new ResizeObserver(function(entries) {
	// since we are observing only a single element, so we access the first element in entries array
	let rect = entries[0].contentRect;
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
});

// start observing for resize
resize_ob.observe(document.querySelector("#wrapper"));

$(window).resize(function() {
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
});

$(document).ready(function(){
    $(window).on('load',function() {
    elem = document.getElementById("wrapper");
    $("#timeline2").empty();


    // slider
    var len = document.getElementsByClassName('slideshow-container').length;
    for(var j = 0; j < len ; j++)
      showSlides(j, slideIndex[j]);
    TimeKnots.draw("#timeline2", timeline, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:60  , height: elem.offsetHeight-40 , showLabels: false, labelFormat:"%Y", radius: 15});
    $(".row").css("position", "static");
  });
});
