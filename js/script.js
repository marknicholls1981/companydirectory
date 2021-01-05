let firstName;
let lastName;
let email;
let department;
let place;
let $departmentSelect = $("#departments");
let $locationSelect = $("#locations");
let selecteddepartmentId
let selecteddepartment
let selectedLocation
let selectedLocationId
let departmentID
let employeeID

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


$.getJSON("php/getallemployees.php", (results) =>{
     $('#query').focus()

    let details = results.data  
    
    details.forEach(detail => {
     
     
      firstName = detail['firstName']
      lastName = detail['lastName']
      email = detail['email']
      department = detail['departmentname']
      place = detail['name']
      employeeID = detail['id']
      
      jobTitle = detail['jobTitle']
      departmentID = detail['departmentID']
     
      $('.employees').append(`<tr data-value=${employeeID}><td>${firstName} ${lastName}</td><td>${department}</td><td>${jobTitle}</td><td>${place}</td><td><a href="mailto">${email}</a></td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editEmployee">Edit</button><button type="button" class="btn btn-danger badge-pill deleteemployee">Delete</button></td></tr>`
     )       
    });
    

    $('.editEmployee').on('click', function() {
      $('#editmodal').modal('show');
      $('#editdepartments').html('<option selected disabled value="">Select a department</option>');
      $tr = $(this).closest('tr');
        employeeID = $tr.data('value')
     
      
      $.getJSON("php/getAllDepartments.php", (result) => {
  
        let departments = result.data
             
        departments.forEach(department=>{
         
                selecteddepartmentId = department['id']        
                selectedDepartment = department['name']
                selectedLocationId = department['locationID']        
                $('#editdepartments').append(`<option value="${selecteddepartmentId}">${selectedDepartment}</option>`);
                
        
        })
              
      })
      
  
      $.ajax({
  
        url: "php/getEmployeeById.php",
        type: "POST",
        dataType: "json",
        data: {
          employeeID: employeeID
          
        },
        success: function (result) {
          let employeedetails = result      
  
        console.log(employeedetails)
  
        let employeeFirstName = employeedetails['data'][0]['firstName']
        let employeeLastName = employeedetails['data'][0]['lastName']
        let employeejobTitle = employeedetails['data'][0]['jobTitle']
        let employeeemail = employeedetails['data'][0]['email']
        let employeedepartmentID = employeedetails['data'][0]['departmentID']
        
  
         $('#editFirstName').val(employeeFirstName)
         $('#editFirstName').attr('value', employeeID)
         $('#editLastName').val(employeeLastName)
         $('#editJobTitle').val(employeejobTitle)
         $('#editEmail').val(employeeemail)
         $('#editdepartments').val(employeedepartmentID).change() 
         $('#editemployeeform').on('submit', function()
{
  


})


    
   
           },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error");
          
        },
      });

    });
    $('.deleteemployee').on('click', function() {
      $('#deletemodal').modal('show');
      $tr = $(this).closest('tr');
      let employeeID = $tr.data('value')
     
      
    
      $.ajax({
    
        url: "php/getEmployeeById.php",
        type: "POST",
        dataType: "json",
        data: {
          employeeID: employeeID
          
        },
        success: function (result) {
          let employeedetails = result      
    
        console.log(employeedetails)
    
        let employeeFirstName = employeedetails['data'][0]['firstName']
        let employeeLastName = employeedetails['data'][0]['lastName']
        $('#employeetodelete').html(`<p>Are you sure you wish to permanently delete ${employeeFirstName} ${employeeLastName} from the company records?</p>`)
  
  

        
           },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error");
          
        },
      });
  
    });

 









})

$('.queryform').keyup( function (e) {
  $('.employees').html('')
  $.ajax({

    url: "php/employeesearch.php",
    type: "POST",
    dataType: "json",
    data: {
      searchquery: $('#query').val()
    },
    success: function (results) {
      console.log(results)
      $('#query').focus()
      
      let details = results.data

      if (details.length >= 1){
        details.forEach(detail => {
          firstName = detail['firstName']
          lastName = detail['lastName']
          email = detail['email']
          id = detail['id']
          jobTitle = detail['jobTitle']
          department = detail['departmentname']
          place = detail['name']
          $('.employees').append(`<tr data-value=${id}><td>${firstName} ${lastName}</td><td>${department}</td><td>${jobTitle}</td><td>${place}</td><td><a href="mailto">${email}</a></td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editEmployee">Edit</button><button type="button" class="btn btn-danger badge-pill deleteemployee" >Delete</button></td></tr>`
         )    
     
        });

      }
      else{

        $('.employees').html(`<h3 text-center>No Records</h3>`)
      }
      $('.editEmployee').on('click', function() {
        $('#editmodal').modal('show');
        $('#editdepartments').html('<option selected disabled value="">Select a department</option>');
        $tr = $(this).closest('tr');
        employeeID = $tr.data('value')
       
       
    
        $.getJSON("php/getAllDepartments.php", (result) => {
    
          let departments = result.data
               
          departments.forEach(department=>{
           
                  selecteddepartmentId = department['id']        
                  selectedDepartment = department['name']
                  selectedLocationId = department['locationID']
                          
                  $('#editdepartments').append(`<option value="${selecteddepartmentId}">${selectedDepartment}</option>`);
          
          })
                
        })
        
     
    
        $.ajax({
    
          url: "php/getEmployeeById.php",
          type: "POST",
          dataType: "json",
          data: {
            employeeID: employeeID
            
          },

          success: function (result) {
            let employeedetails = result      
    
          console.log(employeedetails)
    
          let employeeFirstName = employeedetails['data'][0]['firstName']
          let employeeLastName = employeedetails['data'][0]['lastName']
          let employeejobTitle = employeedetails['data'][0]['jobTitle']
          let employeeemail = employeedetails['data'][0]['email']
          let employeedepartmentID = employeedetails['data'][0]['departmentID']
    
           $('#editFirstName').val(employeeFirstName)
           $('#editFirstName').attr('value', employeeID)
           $('#editLastName').val(employeeLastName)
           $('#editJobTitle').val(employeejobTitle)
           $('#editEmail').val(employeeemail)
           $('#editdepartments').val(employeedepartmentID).change() 
     
             },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error");
            
          },
        });

      });

      $('.deleteemployee').on('click', function() {
        $('#deletemodal').modal('show');
        $tr = $(this).closest('tr');
        let employeeID = $tr.data('value')
       
        
      
        $.ajax({
      
          url: "php/getEmployeeById.php",
          type: "POST",
          dataType: "json",
          data: {
            employeeID: employeeID
            
          },
          success: function (result) {
            let employeedetails = result      
      
          console.log(employeedetails)
      
          let employeeFirstName = employeedetails['data'][0]['firstName']
          let employeeLastName = employeedetails['data'][0]['lastName']
          $('#employeetodelete').html(`<p>Are you sure you wish to permanently delete ${employeeFirstName} ${employeeLastName} from the company records?</p>`)
    
    
  
          
             },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error");
            
          },
        });
    
      });

      
      
       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
    },
  });

  
});

$.getJSON("php/getAllDepartments.php", (result) => {

  let departments = result.data
  
  departments.forEach(department=>{
   
          selecteddepartmentId = department['id']
          selectedDepartment = department['name']
          selectedLocationId = department['locationID']
          $departmentSelect.append(`<option value="${selecteddepartmentId}">${selectedDepartment}</option>`);

  })
 
})


$('#addemployeeform').on('submit', function(){
 
  $.ajax({

url: "php/addEmployee.php",
type: "POST",
dataType: "json",
data: {
  firstName: capitalizeFirstLetter($('#InputFirstName').val()),
  lastName: capitalizeFirstLetter($('#InputLastName').val()),
  jobTitle: capitalizeFirstLetter($('#InputJobTitle').val()),
  email: $('#InputEmail').val(),
  departmentID: $("#departments").val()
},
success: function () {
  alert(`${capitalizeFirstLetter($('#InputFirstName').val())} ${capitalizeFirstLetter($('#InputLastName').val())} added to records`)   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})
$('#editemployeeform').on('submit', function()
{
  
  $.ajax({
      
    url: "php/editEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      employeeID: $('#editFirstName').attr('value'),
      firstName: capitalizeFirstLetter($('#editFirstName').val()),
      lastName: capitalizeFirstLetter($('#editLastName').val()),
      jobTitle: capitalizeFirstLetter($('#editJobTitle').val()),
      email: $('#editEmail').val(),
      departmentID: $("#editdepartments").val()
    },
    success: function () {
      alert(`${capitalizeFirstLetter($('#InputFirstName').val())} ${capitalizeFirstLetter($('#InputLastName').val())} added to records`)   

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})

$('#deleteemployeeform').on('submit', function()
{
  console.log(employeeID)
  
  $.ajax({
      
    url: "php/deleteEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      employeeID: employeeID
      
    },
    success: function () {

      alert(`${employeeFirstName} ${employeeLastName} deleted from records`)  


     

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})



$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});
