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
 
    
        let employeeFirstName = employeedetails['data'][0]['firstName']
        let employeeLastName = employeedetails['data'][0]['lastName']
        $('#employeetodelete').html(`<p class="employeetodelete" id=${employeeID}>Are you sure you wish to permanently delete ${employeeFirstName} ${employeeLastName} from the company records?</p>`)
  
  

        
           },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error");
          
        },
      });

      
$('#deleteemployeeform').on('submit', function()
{console.log($('.employeetodelete').attr('id'))

  
  $.ajax({

    
      
    url: "php/deleteemployee.php",
    type: "POST",
    dataType: "json",
    data: {
      employeeID: $('.employeetodelete').attr('id')
      
    },
    success: function () {

      alert(`${employeeFirstName} ${employeeLastName} deleted from records`)  


     

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})
  
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
      
        
      
        $.ajax({
      
          url: "php/getEmployeeById.php",
          type: "POST",
          dataType: "json",
          data: {
            employeeID: $tr.data('value')
       
            
          },
          success: function (result) {
            let employeedetails = result      
      
      
      
          let employeeFirstName = employeedetails['data'][0]['firstName']
          let employeeLastName = employeedetails['data'][0]['lastName']
          $('#employeetodelete').html(`<p class="employeetodelete" id=${employeeID}>Are you sure you wish to permanently delete ${employeeFirstName} ${employeeLastName} from the company records?</p>`)
          $('#deleteemployeeform').on('submit', function()
          {console.log($('.employeetodelete').attr('id'))
          
            
            $.ajax({
          
              
                
              url: "php/deleteemployee.php",
              type: "POST",
              dataType: "json",
              data: {
                employeeID: $tr.data('value')
                
              },
              success: function () {
          
                alert(`${employeeFirstName} ${employeeLastName} deleted from records`)  
          
          
               
          
                 },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error");
                
              },
            });
          
          })
    
  
          
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
          $('#departmenttodelete').append(`<option value="${selecteddepartmentId}">${selectedDepartment}</option>`);

  })
 
})

$.getJSON("php/getAllLocations.php", (result) => {

  let locations = result.data

  
  locations.forEach(location=>{
   
          locationID = location['id']
          locationName = location['name']
          
          $("#location").append(`<option value="${locationID}">${locationName}</option>`);
          $("#locationtodelete").append(`<option value="${locationID}">${locationName}</option>`);

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

$('#addlocationform').on('submit', function(){
 
  $.ajax({

url: "php/addlocation.php",
type: "POST",
dataType: "json",
data: {
  
  locationName: capitalizeFirstLetter($('#InputLocationName').val()),
 
},
success: function () {
   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})


$('#adddepartmentform').on('submit', function(){
 
  $.ajax({

url: "php/adddepartment.php",
type: "POST",
dataType: "json",
data: {
  
  departmentName: capitalizeFirstLetter($('#InputDepartmentName').val()),
  locationID: $("#location").val()
 
},
success: function () {
   

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

$('#removedepartmentform').on('submit', function(){
  
 
  $.ajax({

url: "php/checkdepartment.php",
type: "POST",
dataType: "json",
data: {
  
  departmentID: $("#departmenttodelete").val()
  
 
},
success: function (result) { 
  employeesindepartment = result.data[0]['total_in_use']
  if(employeesindepartment > 0){

    alert(`${employeesindepartment} staff are in this department, therefore it cannot be removed.`)
  }
  else{

    $.ajax({

      url: "php/deletedepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentID: $("#departmenttodelete").val()
      },
      success: function () {
       
      
         },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
        
      },
      });


  }
   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})


$('#removelocationform').on('submit', function(){
  
 
  $.ajax({

url: "php/checklocation.php",
type: "POST",
dataType: "json",
data: {
  
  locationID: $("#locationtodelete").val()
  
 
},
success: function (result) { 


  departmentsinlocation = result.data[0]['total_in_use']
  if( departmentsinlocation > 0){

    alert(`${departmentsinlocation} departments are at this location, therefore it cannot be removed.`)
  }
  else{

    $.ajax({

      url: "php/deletelocation.php",
      type: "POST",
      dataType: "json",
      data: {
        locationID: $("#locationtodelete").val()
      },
      success: function () {
       
      
         },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
        
      },
      });


  }
   

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
