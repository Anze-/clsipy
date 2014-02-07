 var server = "http://stackover1.comeze.com/latex"; //set this option to the absolute path to the folder where your PLATECH index.php is founf 
 var css = "http://anze-.github.io/stylesheets/latex.css"; //set this option to absolute path to the latex.css file
 function

 $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', css) );
 $.getScript("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.1/ZeroClipboard.min.js", function(){

    // Scriploaded main callback
 $( document ).ready(function(){
 $( "latex[dpi]" ).each(function() {
   //alert(encodeURIComponent($( this ).text())); //debugging alerts!
   var queryStr = server + "?l=" + encodeURIComponent($( this ).text()) + "&d=" + $( this ).attr( "dpi" );
 $( this ).replaceWith( "<img src='" + queryStr +"' alt='"+ $( this ).text()+"' id='"+ $( this ).attr('id') + "' class='latex "+ $( this ).attr('class') +"'>");
 });
 });

//hasflash
    var hasFlash = false;
    try
    {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(fo) hasFlash = true;
    }
    catch(e)
    {
        if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
    }
if(hasFlash){
buttons="<a id='copylatex'>Copy Latex Code</a><br><hr><a id='copyurl'>Image URL</a>";
} else {
buttons="<a id='zenmode'>Latex Code</a> <br><hr><a id='copyurl'>Image URL</a> <br><hr><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>";
}


//menu
var menu=document.createElement("div");
document.body.appendChild(menu);
menu.setAttribute("id", "menu");
$('#menu').html(buttons);

var zenmode=document.createElement("div");
document.body.appendChild(zenmode);
zenmode.setAttribute("id", "overlay");
$('#overlay').html("<div id='message' type='text'>ZenMode</div>");

var client = new ZeroClipboard( $("a#copylatex"), { moviePath: '//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.1/ZeroClipboard.swf' } );

$( document ).ready(function(){
$(".latex").bind("contextmenu", function(e) {

client.setText( $(this).prop("alt"));
$('#message').text($(this).prop("alt"));
$("#copyurl").attr("href", $(this).prop("src"));
    $('#menu').css({
        top: e.pageY+'px',
        left: e.pageX+'px'
    }).show();
    $("#copylatex").show();
    return false;
});
});

$("#menu").click(function() {
    $("#copylatex").hide();
    $(this).hide();
});
$(document).click(function() {
    $("#copylatex").hide();
    $("#menu").hide();
});
$("#zenmode").click(function() {
    $("#overlay").show();
});
$("#overlay").click(function(event) {
   if(event.target === this) {
       $("#overlay").hide();
   }
$(document).keyup(function(e) {
  if (e.keyCode == 27) {$("#overlay").hide();}   // esc
});
});

//end of main callback
});