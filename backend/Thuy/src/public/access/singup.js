var submitbtn = document.querySelector(".signupbtn");
var input = document.querySelector("#username")
var noti =  `<div class="alert alert-danger fade in radius-bordered alert-shadowed">
  <i class="fa-fw fa fa-times"></i>
  <strong>Error!</strong> username : a-z A-Z 1-9.
</div> `

submitbtn.addEventListener("click",function(e){
    console.log("123");
    console.log(input.value);
    var check = input.value.match(/^[A-Za-z0-9_.]+$/);
    if(check == null){
       var html = document.getElementById("noti");
       html.innerHTML = noti;
        e.preventDefault();
    }
})