
var mySchedule = [
  {"value": -1000, "name":"Prehistorical" },
  {"value": 100, "name":"Ancient"},
  {"value": 500, "name":"Middle Age"},
  {"value": 1500, "name":"Renaissance"},
  {"value": 1789, "name":"French Revolution"},
  {"value":	1800, "name":"Modern 19th Century"},
  {"value":	1900, "name":"Modern 20th Century"},
  {"value":	2000,"name":"Contemporian"},
  {"value": 2100, "name":""}
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
var slideIndex = new Array();
for(let i in era_name)
{
  slideIndex.push(1);
}
for(let i in era_name) {
  var path = './content/'+ era_name[i]+'.txt';
  var folder = "img/" + (parseInt(i)+1) + era_name[i] + '/';

  $.ajax({
      url : folder,
      success: function (data) {
          $(data).find("a").attr("href", function (j, val) {
              if( val.match(/\.(jpe?g|png|gif)$/) ) {
                  var name = decodeURIComponent(val.split('/').pop().split('.')[0]);
                  $('#' + era_name[i] + '-img').append("<figure class=\"items\"><img src='" + val +"'><p>"+ name +"</p></figure>" );
              }
          });
      }
  });
  $.get(path, function(data) {
       $('#' + era_name[i]).append(data);
       $('#' + era_name[i]).append("<a class=\"prev\" >&#10094;</a>");
       $('#' + era_name[i]).append("<a class=\"next\" >&#10095;</a>");
       $('#' + era_name[i] + ' a.prev').attr("onclick", "plusSlides(" + i + ", -1)");
       $('#' + era_name[i] + ' a.next').attr("onclick", "plusSlides(" + i + ", 1)");
       for(let j = 0 ; j < $('#' + era_name[i] + " .mySlides").length; j++){
         $('#' + era_name[i] + '-dot').append(
           "<span class=\"dot\" onclick=\"currentSlide(" + i + ',' + j +")\"></span>"
         );
       }
       $('[lang]').hide(); // hide all lang attributes on start.
       $('[lang="en"]').show();
       //console.log(typeof data);
  }, 'text');
}

window.onload = function() {
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", mySchedule, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:100  , height: elem.offsetHeight , showLabels: false, labelFormat:"%Y", radius: 15});

  // slider
  var len = document.getElementsByClassName('slideshow-container').length;
  for(var j = 0; j < len ; j++)
    showSlides(j, slideIndex[j]);
};
$(window).resize(function() {
  elem = document.getElementById("wrapper");
  $("#timeline2").empty();
  TimeKnots.draw("#timeline2", mySchedule, {dateDimension:false, horizontalLayout: false, color: "#fff", background: "rgba(120,205,215)", width:100  , height: elem.offsetHeight , showLabels: false, labelFormat:"%Y", radius: 15});
});

var upbutton = document.getElementById("up-button");
var downbutton = document.getElementById("down-button")

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
  console.log(a, slideIndex[a]);
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
