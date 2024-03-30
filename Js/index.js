var btnNumber = document.getElementById("btnNumber");
var number =document.getElementById("Number");

var toastElement = document.querySelector('.toast');
var toast = new bootstrap.Toast(toastElement);

btnNumber.addEventListener("click",function(e)
{
    var bookNumber = number.value;

 if(bookNumber===""|| !isFinite(bookNumber) )
 {
    e.preventDefault();
    toast.show();
    localStorage.clear();

 }else
 {
    localStorage.setItem("booksNumbers",bookNumber);
    number.value="";
 }

});
number.addEventListener("focus",function(){toast.hide();})