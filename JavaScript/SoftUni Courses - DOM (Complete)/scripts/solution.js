function solve() {
   let signUpBtn = document.getElementsByClassName("courseFoot")[0].childNodes[1];

   signUpBtn.addEventListener("click", signUp);

   let totalCost = 0.00;


   //sign up event/function
   function signUp(){
      //get checks
      let jsFundCheck = document.getElementsByClassName("courseBody")[0].childNodes[1].childNodes[1].childNodes[1].checked;
      let jsAdvancedCheck = document.getElementsByClassName("courseBody")[0].childNodes[1].childNodes[3].childNodes[1].checked;
      let jasAppsCheck = document.getElementsByClassName("courseBody")[0].childNodes[1].childNodes[5].childNodes[1].checked;
      let jsWebCheck = document.getElementsByClassName("courseBody")[0].childNodes[1].childNodes[7].childNodes[1].checked;
      let onlineCheck = document.getElementById("educationForm").childNodes[7].checked;

      //my courses DOM variables
      let myCoursesUl = document.getElementsByClassName("courseBody")[1].childNodes[1];
      let myCoursesCost = document.getElementsByClassName("courseFoot")[1].childNodes[1];

      //online discount
      let onlineDiscount = 1;
      if (onlineCheck){
         onlineDiscount = 0.94;
      }

      //JS Fundamentals
      if (jsFundCheck){
         totalCost += 170.00*onlineDiscount;

         let newCourseLi = document.createElement("li");
         newCourseLi.innerHTML = "JS-Fundamentals";
         myCoursesUl.appendChild(newCourseLi);
      }

      //JS Advanced
      if (jsAdvancedCheck){
         //discount 1
         if (jsFundCheck){
            totalCost += 180.00*onlineDiscount*0.90;
         } else {
            totalCost += 180.00*onlineDiscount;
         }

         let newCourseLi = document.createElement("li");
         newCourseLi.innerHTML = "JS-Advanced";
         myCoursesUl.appendChild(newCourseLi);
      }

      //JS Apps
      if (jasAppsCheck){
         totalCost += 190.00*onlineDiscount;

         let newCourseLi = document.createElement("li");
         newCourseLi.innerHTML = "JS-Applications";
         myCoursesUl.appendChild(newCourseLi);
      }

      //JS Web
      if (jsWebCheck){
         totalCost += 490.00*onlineDiscount;

         let newCourseLi = document.createElement("li");
         newCourseLi.innerHTML = "JS-Web";
         myCoursesUl.appendChild(newCourseLi);
      }

      //discount 2
      if (jsFundCheck && jsAdvancedCheck && jasAppsCheck) {
         totalCost *= 0.94;
      }

      //dsicount 3
      if (jsFundCheck && jsAdvancedCheck && jasAppsCheck && jsWebCheck) {
         let newCourseLi = document.createElement("li");
         newCourseLi.innerHTML = "HTML and CSS";
         myCoursesUl.appendChild(newCourseLi);
      }

      console.log(totalCost);
      let costResult = Math.floor(totalCost)
      myCoursesCost.innerHTML = `Cost: ${costResult.toFixed(2)} BGN`;
   }
}

solve();