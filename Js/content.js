import { Author,Book } from "./classes.js";

var bookNum = localStorage.getItem("booksNumbers");
var bookNumber =Number(bookNum);
var txtTitle=document.getElementsByClassName("title")[0];
var btnNumber =document.getElementById("btnNumber");
var bookName=document.getElementById("bookName");
var bookPrice =document.getElementById("bookPrice");
var bookAuthor =document.getElementById("bookAuthor");
var authorEmail =document.getElementById("authorEmail");
var formAdd = document.getElementsByClassName("formAdd")[0];
var error = document.getElementsByClassName("error")[0];
var toastid = document.getElementById("toastid");
var toast = document.querySelector(".toast");
var banerResultDiv=document.getElementsByClassName("banerResult")[0];



var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

var array =[];
txtTitle.textContent=`You can enter ${bookNumber} Books` ;

btnNumber.addEventListener("click", function(e) {

    if (bookNumber == 0) {

        bookName.disabled = true;
        bookPrice.disabled = true;
        bookAuthor.disabled = true;
        authorEmail.disabled = true;

        txtTitle.textContent=`You cannot enter Books any more !` ;


        bookName.value ="";
        bookPrice.value="";
        bookAuthor.value="";
        authorEmail.value="";
    }
    else if (
        bookName.value === "" ||bookPrice.value === "" || bookAuthor.value === "" || authorEmail.value === "") {
        toast.style.display = "block";
        e.preventDefault();
    }
    else if ( isFinite(bookName.value) || isFinite(bookAuthor.value )) {
        toastid.textContent="Book Name and Book Auther Must be String"
        toast.style.display = "block";
        e.preventDefault();
    }
    else if(!regexEmail.test(authorEmail.value))
    {
        e.preventDefault();
       
        error.style.display = "inline";
    } 
    else {
        
        var bName = bookName.value;
        var bPrice = bookPrice.value;
        var bAuthor = bookAuthor.value;
        var bEmail = authorEmail.value;
        //-----------------------------------------TakeData
        var author1 =new Author(bAuthor,bEmail);
        var book1 =new Book(bName,bPrice,author1);
        
         array.push(book1);
        toast.style.display = "none";

        //------------------------------------------------
        bookNumber--;
        txtTitle.textContent=`You can enter ${bookNumber} Books` ;
        bookName.value ="";
        bookPrice.value="";
        bookAuthor.value="";
        authorEmail.value="";
        
        console.log(bookNumber);
        if (bookNumber == 0) {
            console.log(array);
            displayData(array);

            bookName.disabled = true;
            bookPrice.disabled = true;
            bookAuthor.disabled = true;
            authorEmail.disabled = true;
    
            txtTitle.textContent=`You cannot enter Books any more !` ;
    
    
            bookName.value ="";
            bookPrice.value="";
            bookAuthor.value="";
            authorEmail.value="";
            toast.style.display = "none";


        }//more cheak
    }
});

bookName.addEventListener("focus",function()
{
    error.style.display = "none";
    toast.style.display = "none";
})
authorEmail.addEventListener("focus",function()
{
    error.style.display = "none";
    toast.style.display = "none";
})
//-------------------------------------------------------------------displayResult----
var container =document.getElementsByClassName("container")[0];
// var author2 = {Aname:"bAuthor",Aemail:"bEmail"};
// var book2 = {Bname:"bName" ,Bprice:"bPrice",auther:author2};

// var arr2=[]

// arr2.push(book2);
// displayData(arr2);


  function displayData(arr) {
    var idbtn =0;
    banerResultDiv.innerHTML=""; // remove all last divs in parent div 
    arr.forEach(element => {
     var containerDiv = document.createElement("div");
     containerDiv.classList.add('d-flex', 'col-md-12', 'col-xs-2');
     containerDiv.style.borderBottom = "2px solid #dee2e6";
     containerDiv.style.justifyContent = "space-between";
     containerDiv.style.alignItems = "center";

     containerDiv.style.height="50px";

      var nameH3 = document.createElement("input");
      nameH3.classList.add('hName','form-control');
      nameH3.type = "text";
      nameH3.readOnly=true;
      nameH3.style.width="170px";
      nameH3.setAttribute("id",idbtn);
      nameH3.style.marginLeft="-10px"

      nameH3.value = element.name; 

      
      var prichH3 = document.createElement("input");
      prichH3.classList.add('hPrich','form-control');
      prichH3.type = "text";
      prichH3.style.width="170px"
      prichH3.readOnly=true;
      prichH3.setAttribute("id",idbtn);
      // prichH3.style.paddingLeft="5px"
      prichH3.value = element.price; 

      
      containerDiv.appendChild(nameH3);
      containerDiv.appendChild(prichH3);
      
      var ind =0;
      for (const key in element.author) {
        if (Object.hasOwnProperty.call(element.author, key)) {
          var EnameH3 = document.createElement("input");
          EnameH3.type = "text";
          EnameH3.style.width="180px"
          EnameH3.readOnly=true;
          EnameH3.style.marginLeft="-10px"
          EnameH3.value = element.author[key];

           EnameH3.classList.add(`hAName${ind}`,'form-control'); //----first hAName0 =>name  second hAName1 =>email but same id
           EnameH3.setAttribute("id",idbtn);
          //  EnameH3.style.paddingRight="5px";
          containerDiv.appendChild(EnameH3);
        }
      }
      var btnEdit = document.createElement("button");
      btnEdit.classList.add("btn", "btn-outline-warning", "ps-5","pe-5","btn-edit");
      btnEdit.setAttribute("id",idbtn);
      btnEdit.textContent="Edit";
       
      var btnDelete = document.createElement("button");
      btnDelete.classList.add("btn", "btn-outline-danger", "ps-5","pe-5","btn-delete","me-4");
      btnDelete.setAttribute("id",idbtn);
      btnDelete.textContent="Delete"
      idbtn++;

      //-----empty for space
    //   var btn1 = document.createElement("button");
    //   btn1.classList.add("btn", "btn-outline-primary", "ps-5", "pe-5", "mt-3","ms-5");
    //   btn1.textContent="Delete"

    //   var btn2 = document.createElement("button");
    //   btn2.classList.add("btn", "btn-outline-primary", "ps-5", "pe-5", "mt-3","ms-5");
    //   btn2.textContent="Delete"
    //   btn2.style.display="none";

      //--------------------------------------------------------------
     // btnDelete.style.marginLeft="20px"
      
      containerDiv.appendChild(btnEdit);
      containerDiv.appendChild(btnDelete);

      banerResultDiv.appendChild(containerDiv)
    
    });

  console.log("Added Data",array)

  }

var oldArray=[];
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
      console.log("pernt")

      if(event.target.textContent === "Delete"){
        console.log("go1")

        var idD= event.target.getAttribute('id');
        array.splice(idD,1) 
        displayData(array);
        toast.style.display = "none";

        console.log("After Delete",array)

      }else if(event.target.textContent === "Cancel") // refresh data to old data if enter any char and cancel
      {
        var idedit= event.target.getAttribute('id');

        var h3ElementsWithId = document.querySelectorAll(`input[id="${idedit}"]`);

        h3ElementsWithId.forEach(function(element) {

          element.readOnly=true;
      });
      console.log("go2")

      event.target.textContent = "Delete";
      event.target.classList.remove("btn-outline-primary");
      event.target.classList.add("btn-outline-danger");

      var selecEdite = document.querySelectorAll(`.btn-edit[id="${idedit}"]`);  //make save => edit when press canscel

      selecEdite.forEach(function(btnEdit) {
        
         btnEdit.textContent="Edit"
    });
         //////////////////////////////////////////////////////////////////-----refresh data to old save data first if press edit copy old data
         array[idedit] = oldArray;
          displayData(array);

      }
    }
    
   
    else if (event.target.classList.contains('btn-edit')) {
      var idE = event.target.getAttribute('id'); // index

      if (event.target.textContent === "Edit") {
          
          var btnDelete=this.getElementsByClassName('btn-delete')[idE];
          btnDelete.textContent="Cancel";
          btnDelete.classList.remove("btn-outline-danger");

          btnDelete.classList.add("btn-outline-primary");

          event.target.textContent = "Save";
          var h3ElementsWithId = document.querySelectorAll(`input[id="${idE}"]`); 
          
          
          //------------------------------------------------------------------------
            /////////////////////////////////////--------------save copy old data => if press cancle restore old

            var temp = 1;
            h3ElementsWithId.forEach(function(element) {
  
              element.readOnly=false;
  
              if (temp === 1) {
                name = element.value;
                temp++;
            } else if (temp === 2) {
                price = element.value;
                temp++;
            } else if (temp === 3) {
                Aname = element.value;
                temp++;
            } else if (temp === 4) {
                Aemail = element.value;
                temp++;
            }
  
            var authorDetailsOld = new Author(Aname, Aemail);
            var bookDetailsOld = new Book(name, price, authorDetailsOld);
            oldArray=bookDetailsOld;
          });
          /////////////////////////////////////---------------------------------------------
          
      } else if (event.target.textContent === "Save") {
        var h3ElementsWithId = document.querySelectorAll(`input[id="${idE}"]`);
        var error = document.getElementById("error");
    
        h3ElementsWithId.forEach(function(element) {
            element.readOnly = false;
        });
    
        var name, price, Aname, Aemail;
        var temp = 1;
        h3ElementsWithId.forEach(function(element) {
            element.readOnly = true;
            if (temp === 1) {
                name = element.value;
                temp++;
            } else if (temp === 2) {
                price = element.value;
                temp++;
            } else if (temp === 3) {
                Aname = element.value;
                temp++;
            } else if (temp === 4) {
                Aemail = element.value;
                temp++;
            }
        });
    
        var reqex2=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(?:[a-zA-Z0-9]+)$/

        if(name==""||isFinite(name)||price==""||!isFinite(price)||Aname==""||isFinite(Aname)||Aemail==""||!reqex2.test(Aemail))
        {
            if (!reqex2.test(Aemail)) {
                if (error) {
                    error.style.display = "inline";
                }
            }
            event.target.textContent = "Save";
            toast.textContent = "All Fields are Required, Names Must be Strings, Prices Must be Numbers";
            toast.style.display = "block";
            h3ElementsWithId.forEach(function(element) {
                element.readOnly = false; // Make inputs editable again
            });
        } else {
            h3ElementsWithId.forEach(function(element) {
                element.readOnly = true;
            });
            event.target.textContent = "Edit";
            toast.style.display = "none";
            if (error) {
                error.style.display = "none";
            }
    
            var authorDetails = new Author(Aname, Aemail);
            var bookDetails = new Book(name, price, authorDetails);
            array[idE] = bookDetails;
            displayData(array);
    
            console.log("After Update", array)
        }
    }
    
    
  }
});







// document.addEventListener('click', function(event) {
     
//   if(event.target.classList.contains('hName') && event.target.id==idE)
//   {
//      event.target.contentEditable =true;

//      var editedBookName = event.target.textContent;
//      console.log(editedBookName)

//   }
//   if(event.target.classList.contains('hPrich') && event.target.id==idE)
//   {
//      event.target.contentEditable =true;

//      var editedBookPrice = event.target.innerText;
//      console.log(editedBookPrice)


//   }

//   if(event.target.classList.contains('hAName0') && event.target.id==idE)
//   {
//      event.target.contentEditable =true;

//      var editedAName = event.target.textContent;

//   }
//   if(event.target.classList.contains('hAName1') && event.target.id==idE)
//   {
//      event.target.contentEditable =true;

//      var editedAEmail = event.target.textContent;

//   }
  
  

// //  if(event.target.textContent=="Save" && event.target.classList.contains('btn-edit'))
// //  {
  // var authorDetails =new Author(editedAName,editedAEmail);
  // var bookDetails =new Book(editedBookName,editedBookPrice,authorDetails);
  // array[idE] = bookDetails;
  // displayData(array);
// //  }


  


// });