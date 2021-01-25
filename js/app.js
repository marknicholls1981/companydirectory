function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Employee tab



var triggerTabList = [].slice.call(document.querySelectorAll('#nav-home-tab'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

let firstname;
let lastname;
let email;
let department;
let locationname;
let employmentid;
let jobtitle;
let departmentid;
let locationid;
let employeesindepartment;




$.getJSON("php/getallemployees.php", (results) =>{
  $('#query').focus()

 let details = results.data  
 
 details.forEach(detail => {
  
  
   firstname = detail['firstName']
   lastname = detail['lastName']
   email = detail['email']
   department = detail['departmentname']
   locationname = detail['locationname']
   employmentid = detail['employmentid']
   jobTitle = detail['jobTitle']
   departmentid = detail['departmentID']
  
   $('.employees-table').append(`<tr data-value=${employmentid}><td>${firstname} ${lastname}</td><td>${department}</td><td>${jobTitle}</td><td>${locationname}</td><td><a href="mailto:">${email}</a></td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editemployee">Edit</button><button type="button" class="btn btn-danger badge-pill deleteemployee">Delete</button></td></tr>`
  )       
 });
 $('.editemployee').on('click', function() {
  $('#editemployeemodal').modal('show');
  $('#editemployeedepartment').html('<option selected disabled value="">Select a department</option>');
  $tr = $(this).closest('tr');
  employmentid = $tr.data('value')
  

  $.getJSON("php/getalldepartments.php", (result) => {

    let departments = result.data         
    departments.forEach(department=>{
     
      departmentid = department['departmentid']        
      department = department['departmentname']
      locationid = department['locationID']
      locationname - department['locationname']
      $('#editemployeedepartment').append(`<option value="${departmentid}">${department}</option>`);
   
  

    
    })
          
  })


  $.ajax({

    url: "php/getemployeebyid.php",
    type: "POST",
    dataType: "json",
    data: {
      employmentid: employmentid
      
    },

    success: function (result) {
      let employeedetails = result      

    

    firstname = employeedetails['data'][0]['firstName']
    lastname = employeedetails['data'][0]['lastName']
    jobtitle = employeedetails['data'][0]['jobTitle']
    email = employeedetails['data'][0]['email']
    departmentid = employeedetails['data'][0]['departmentID']
  

     $('#editFirstName').val(firstname)
     $('#editFirstName').attr('value', employmentid)
     $('#editLastName').val(lastname)
     $('#editJobTitle').val(jobtitle)
     $('#editEmail').val(email)
     $('#editemployeedepartment').val(departmentid).change()

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

});

$('.deleteemployee').on('click', function() {
  $('#deleteemployeemodal').modal('show');
  $tr = $(this).closest('tr');
  employmentid = $tr.data('value')
 
  

  $.ajax({

    url: "php/getemployeebyid.php",
    type: "POST",
    dataType: "json",
    data: {
      employmentid: employmentid
      
    },
    success: function (result) {
      let employeedetails = result      


  firstname = employeedetails['data'][0]['firstName']
    lastname = employeedetails['data'][0]['lastName']
    $('#employeetodelete').html(`<p class="employeetodelete" id=${employmentid}>Are you sure you wish to permanently delete ${firstname} ${lastname} from the company records?</p>`)



    
       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

  
$('#deleteemployeeform').on('submit', function()
{


$.ajax({


  
url: "php/deleteemployee.php",
type: "POST",
dataType: "json",
data: {
  employmentid: $('.employeetodelete').attr('id')
  
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

$('#employeequery').keyup( function (e) {
  $('.employees-table').html('')
  $.ajax({

    url: "php/employeesearch.php",
    type: "POST",
    dataType: "json",
    data: {
      searchquery: $('#employeequery').val()
    },
    success: function (results) {
      
      
      $('#employeequery').focus()
      
      let details = results.data
      if (details.length >= 1){
        details.forEach(detail => {
          firstname = detail['firstName']
          lastname = detail['lastName']
          email = detail['email']
          department = detail['departmentname']
          locationname = detail['name']
          employmentid = detail['id']
          jobTitle = detail['jobTitle']
          departmentid = detail['departmentID']
         
          $('.employees-table').append(`<tr data-value=${employmentid}><td>${firstname} ${lastname}</td><td>${department}</td><td>${jobTitle}</td><td>${locationname}</td><td><a href="mailto:">${email}</a></td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editemployee">Edit</button><button type="button" class="btn btn-danger badge-pill deleteemployee">Delete</button></td></tr>`
         )  
        });
        $('.editemployee').on('click', function() {
          $('#editemployeemodal').modal('show');
          $('#editemployeedepartment').html('<option selected disabled value="">Select a department</option>');
          $tr = $(this).closest('tr');
          employmentid = $tr.data('value')
          
          
        
          $.getJSON("php/getalldepartments.php", (result) => {
        
            let departments = result.data 
         
            departments.forEach(department=>{
             
              departmentid = department['departmentid']        
      department = department['departmentname']
      locationid = department['locationID']
      locationname - department['locationname']
      $('#editemployeedepartment').append(`<option value="${departmentid}">${department}</option>`);
      
     

            
            })
                  
          })
          
        
        
          $.ajax({
        
            url: "php/getemployeebyid.php",
            type: "POST",
            dataType: "json",
            data: {
              employmentid: employmentid
              
            },
        
            success: function (result) {
              let employeedetails = result      
        
            
        
            firstname = employeedetails['data'][0]['firstName']
            lastname = employeedetails['data'][0]['lastName']
            jobtitle = employeedetails['data'][0]['jobTitle']
            email = employeedetails['data'][0]['email']
            departmentid = employeedetails['data'][0]['departmentID']
            
        
             $('#editFirstName').val(firstname)
             $('#editFirstName').attr('value', employmentid)
             $('#editLastName').val(lastname)
             $('#editJobTitle').val(jobtitle)
             $('#editEmail').val(email)
             $('#editemployeedepartment').val(departmentid).change()
        
               },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error");
              
            },
          });

          
        
        });

        $('.deleteemployee').on('click', function() {
          $('#deleteemployeemodal').modal('show');
          $tr = $(this).closest('tr');
          employmentid = $tr.data('value')
         
          
        
          $.ajax({
        
            url: "php/getemployeebyid.php",
            type: "POST",
            dataType: "json",
            data: {
              employmentid: employmentid
              
            },
            success: function (result) {
              let employeedetails = result      
        
        
          firstname = employeedetails['data'][0]['firstName']
            lastname = employeedetails['data'][0]['lastName']
            $('#employeetodelete').html(`<p class="employeetodelete" id=${employmentid}>Are you sure you wish to permanently delete ${firstname} ${lastname} from the company records?</p>`)
        
        
        
            
               },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error");
              
            },
          });
        
          
        $('#deleteemployeeform').on('submit', function()
        {
        
        
        $.ajax({
        
        
          
        url: "php/deleteemployee.php",
        type: "POST",
        dataType: "json",
        data: {
          employmentid: $('.employeetodelete').attr('id')
          
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


      }
      else{

        $('.employees-table').html(`<h3 text-center>No Records</h3>`)
      }       
       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
    },
  });

  
});

     
$.getJSON("php/getalldepartments.php", (result) => {
        
  let departments = result.data    
  departments.forEach(department=>{
   
    departmentid = department['departmentid']        
department = department['departmentname']
locationid = department['locationID']
locationname - department['locationname']
$('#editemployeedepartment').append(`<option value="${departmentid}">${department}</option>`);
$('#addemployeedepartment').append(`<option value="${departmentid}">${department}</option>`);



  
  })
        
})



$('#addemployeeform').on('submit', function(){
 
  $.ajax({

url: "php/addemployee.php",
type: "POST",
dataType: "json",
data: {
  firstName: capitalizeFirstLetter($('#addemployeefirstname').val()),
  lastName: capitalizeFirstLetter($('#addemployeelastname').val()),
  jobTitle: capitalizeFirstLetter($('#addemployeejobtitle').val()),
  email: $('#addemployeeemail').val(),
  departmentID: $("#addemployeedepartment").val()
},
success: function () {
  alert(`${capitalizeFirstLetter($('#InputFirstName').val())} ${capitalizeFirstLetter($('#InputLastName').val())} added to records`)   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})

// Department tab

var triggerTabList = [].slice.call(document.querySelectorAll('#nav-profile-tab'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

$.getJSON("php/getalldepartments.php", (result) => {

  let details = result.data    
  
  details.forEach(detail=>{
   
    departmentid = detail['departmentid']        
    department = detail['departmentname']
    locationid = detail['locationid']
    locationname = detail['locationname']
    
   

    
    $('.departments-table').append(`<tr data-value=${departmentid}><td>${department}</td><td id=${locationid}>${locationname}</td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editdepartment">Edit</button><button type="button" class="btn btn-danger badge-pill deletedepartment">Delete</button></td></tr>`
    )  

  
  })

  $.getJSON("php/getalllocations.php", (result) => {

    let details = result.data    

    
    details.forEach(detail=>{
   
      locationid = detail['id']
  
      locationname = detail['name']
      $('#editdepartmentlocation').append(`<option value="${locationid}">${locationname}</option>`);
      $('#departmentlocation').append(`<option value="${locationid}">${locationname}</option>`);
  
    
    })
          
  })

  $('.deletedepartment').on('click', function() {

    $tr = $(this).closest('tr');
    departmentid = $tr.data('value')

    $.ajax({

      url: "php/checkdepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        
        departmentid: departmentid
        
       
      },
      success: function (result) { 

        employeesindepartment = result.data[0]['total_in_use']
      
        if(employeesindepartment > 0){
      
          bootbox.alert(`<h3 class="text-center">Department cannot be deleted</h3><br><p>There are currently ${employeesindepartment} staff working within this department, therefore it can not be deleted.</p>`)
        
        }
        else{
          $('#deletedepartmentmodal').modal('show');
  

    $.ajax({

      url: "php/getdepartmentbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentid: departmentid
        
      },
  
      success: function (result) {
        let details = result.data    

        department = details[0]['departmentname']
        locationname = details[0]['locationname']
        locationid = details[0]['locationid']

        
  
        $('#departmenttodelete').html(`<p class="departmenttodelete" id=${departmentid}>Are you sure you wish to permanently delete the ${department} department?</p>`)

  
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


  
  });


  $('.editdepartment').on('click', function() {
    $('#editdepartmentmodal').modal('show');
    $('#editdepartmentlocation').html('<option selected disabled value="">Select a department</option>');
    $tr = $(this).closest('tr');
    departmentid = $tr.data('value')
 
    
$.getJSON("php/getalllocations.php", (result) => {

  let details = result.data    

  
  details.forEach(detail=>{
 
    locationid = detail['id']

    locationname = detail['name']
    $('#editdepartmentlocation').append(`<option value="${locationid}">${locationname}</option>`);
    // $('#departmentlocation').append(`<option value="${locationid}">${locationname}</option>`);

  
  })
        
})
  

    
    $.ajax({

      url: "php/getdepartmentbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentid: departmentid
        
      },
  
      success: function (result) {
        let details = result.data    

        department = details[0]['departmentname']
        locationname = details[0]['locationname']
        locationid = details[0]['locationid']

        $('#editdepartmentname').val(department)

       
     $('#editdepartmentname').attr('value', departmentid)
  
     
      $('#editdepartmentlocation').val(locationid).change()
  
         },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
        
      },
    });

  
        
        
  
   
  
  });
  

  
})

$('#departmentquery').keyup( function (e) {
  $('.departments-table').html('')
  $.ajax({

    url: "php/departmentsearch.php",
    type: "POST",
    dataType: "json",
    data: {
      searchquery: $('#departmentquery').val()
    },
    success: function (results) {
      
      
      $('#departmentquery').focus()
      
      let details = results.data
      if (details.length >= 1){
        details.forEach(detail => {
        
          department = detail['departmentname']
          locationname = detail['locationname']
         
          departmentid = detail['departmentid']
          locationid = detail['locationid']
         
          $('.departments-table').append(`<tr data-value=${departmentid}><td>${department}</td><td id="${locationid}">${locationname}</td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editdepartment">Edit</button><button type="button" class="btn btn-danger badge-pill deletedepartment">Delete</button></td></tr>`
         )  
        });

   
  $('.deletedepartment').on('click', function() {

    $tr = $(this).closest('tr');
    departmentid = $tr.data('value')

    $.ajax({

      url: "php/checkdepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        
        departmentid: departmentid
        
       
      },
      success: function (result) { 

        employeesindepartment = result.data[0]['total_in_use']
      
        if(employeesindepartment > 0){
      
          bootbox.alert(`<h3 class="text-center">Department cannot be deleted</h3><br><p>There are currently ${employeesindepartment} staff working within this department, therefore it can not be deleted.</p>`)
        
        }
        else{
          $('#deletedepartmentmodal').modal('show');
  

    $.ajax({

      url: "php/getdepartmentbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentid: departmentid
        
      },
  
      success: function (result) {
        let details = result.data    

        department = details[0]['departmentname']
        locationname = details[0]['locationname']
        locationid = details[0]['locationid']

        
  
        $('#departmenttodelete').html(`<p class="departmenttodelete" id=${departmentid}>Are you sure you wish to permanently delete the ${department} department?</p>`)

  
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


  
  });
 
  
        
  $('.editdepartment').on('click', function() {
    $('#editdepartmentmodal').modal('show');
    $('#editdepartmentlocation').html('<option selected disabled value="">Select a department</option>');
    $tr = $(this).closest('tr');
    departmentid = $tr.data('value')
 
    
$.getJSON("php/getalllocations.php", (result) => {

  let details = result.data   
  
  details.forEach(detail=>{
 
    locationid = detail['id']

    locationname = detail['name']
    $('#editdepartmentlocation').append(`<option value="${locationid}">${locationname}</option>`);
    $('#departmentlocation').append(`<option value="${locationid}">${locationname}</option>`);
    
  
  })
        
})
  

    
    $.ajax({

      url: "php/getdepartmentbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentid: departmentid
        
      },
  
      success: function (result) {
        let details = result.data    

        department = details[0]['departmentname']
        locationname = details[0]['locationname']
        locationid = details[0]['locationid']

        $('#editdepartmentname').val(department)

       
     $('#editdepartmentname').attr('value', departmentid)
     
      $('#editdepartmentlocation').val(locationid).change()
  
         },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
        
      },
    });

  
        
        
  
   
  
  });
   
      

      }
      else{

        $('.departments-table').html(`<h3 text-center>No Records</h3>`)
      }       
       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
    },
  });

  
});

$('#adddepartmentform').on('submit', function(){
 
  $.ajax({

url: "php/adddepartment.php",
type: "POST",
dataType: "json",
data: {
  
  departmentName: capitalizeFirstLetter($('#adddepartmentname').val()),
  locationID: $("#departmentlocation").val()
 
},
success: function () {
   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})



// Locations tab

var triggerTabList = [].slice.call(document.querySelectorAll('#nav-contact-tab'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

$.getJSON("php/getalllocations.php", (result) => {

  let details = result.data    
  
  
  details.forEach(detail=>{
 
    locationid = detail['id']

    locationname = detail['name']
    $('.locations-table').append(`<tr data-value=${locationid}><td>${locationname}</td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editlocation">Edit</button><button type="button" class="btn btn-danger badge-pill deletelocation">Delete</button></td></tr>`
    )  
   

  
  })

  
  $('.editlocation').on('click', function() {
    $('#editlocationmodal').modal('show');
   
    $tr = $(this).closest('tr');
    locationid = $tr.data('value')

    $.ajax({

      url: "php/getlocationbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        locationid: locationid
        
      },
  
      success: function (result) {
        let details = result.data    

        
        locationname = details[0]['locationname']
        

        $('#editlocationname').val(locationname)
        $('#editlocationname').attr('value', locationid)
 
     
  
         },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
        
      },
    });
 
   
  
        
        
  
   
  
  });

  $('.deletelocation').on('click', function() {

    $tr = $(this).closest('tr');
 
    locationid = $tr.data('value')

    $.ajax({

      url: "php/checklocation.php",
      type: "POST",
      dataType: "json",
      data: {
        
        locationid: locationid
        
       
      },
      success: function (result) { 
    
        employeesindepartment = result.data[0]['total_in_use']
      
        if(employeesindepartment > 0){
      
          bootbox.alert(`<h3 class="text-center">Location cannot be deleted</h3><br><p>There are currently ${employeesindepartment} departments working from this location, therefore it can not be deleted.</p>`)
        
        }
        else{
          $('#deletelocationmodal').modal('show');
  

    $.ajax({

      url: "php/getlocationbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        locationid: locationid
        
      },
  
      success: function (result) {
        let details = result.data    

        
        locationname = details[0]['locationname']
        locationid = details[0]['locationid']

        
  
        $('#locationtodelete').html(`<p class="locationtodelete" id=${locationid}>Are you sure you wish to permanently delete the ${locationname} location?</p>`)

  
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


  
  });


        
})

$('#locationquery').keyup( function (e) {

  $('.locations-table').html('')

  $.ajax({

    url: "php/locationsearch.php",
    type: "POST",
    dataType: "json",
    data: {
      searchquery: $('#locationquery').val()
    },
    success: function (results) {
      
      
      $('#locationquery').focus()
      
      let details = results.data
    
      if (details.length >= 1){
        details.forEach(detail => {
        
          
          locationname = detail['name']
         
          
          locationid = detail['id']
         
          $('.locations-table').append(`<tr data-value=${locationid}><td>${locationname}</td><td class="text-right"><button type="button" class="btn btn-primary badge-pill m-1 editlocation">Edit</button><button type="button" class="btn btn-danger badge-pill deletelocation">Delete</button></td></tr>`
         )  


        });

        $('.editlocation').on('click', function() {
          $('#editlocationmodal').modal('show');
         
          $tr = $(this).closest('tr');
          locationid = $tr.data('value')
      
          $.ajax({
      
            url: "php/getlocationbyid.php",
            type: "POST",
            dataType: "json",
            data: {
              locationid: locationid
              
            },
        
            success: function (result) {
              let details = result.data    
      
              
              locationname = details[0]['locationname']
              
      
              $('#editlocationname').val(locationname)
              $('#editlocationname').attr('value', locationid)
       
           
        
               },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error");
              
            },
          });
       
         
        
              
              
        
         
        
        });
        $('.deletelocation').on('click', function() {

          $tr = $(this).closest('tr');
          
          locationid = $tr.data('value')
      
          $.ajax({
      
            url: "php/checklocation.php",
            type: "POST",
            dataType: "json",
            data: {
              
              locationid: locationid
              
             
            },
            success: function (result) { 
        
              employeesindepartment = result.data[0]['total_in_use']
            
              if(employeesindepartment > 0){
            
                bootbox.alert(`<h3 class="text-center">Location cannot be deleted</h3><br><p>There are currently ${employeesindepartment} departments working from this location, therefore it can not be deleted.</p>`)
              
              }
              else{
                $('#deletelocationmodal').modal('show');
        
      
          $.ajax({
      
            url: "php/getlocationbyid.php",
            type: "POST",
            dataType: "json",
            data: {
              locationid: locationid
              
            },
        
            success: function (result) {
              let details = result.data    
      
              
              locationname = details[0]['locationname']
              locationid = details[0]['locationid']
      
              
        
              $('#locationtodelete').html(`<p class="locationtodelete" id=${locationid}>Are you sure you wish to permanently delete the ${locationname} location?</p>`)
      
        
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
      
      
        
        });
       

         
 
   
      

      }
      else{

        $('.locations-table').html(`<h3 text-center>No Records</h3>`)
      }       
       }
       
       ,
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
    },
  });
   
  
    
  

  
});







// Buttons
$('#editemployeeform').on('submit', function()
{
  
  $.ajax({
      
    url: "php/editemployee.php",
    type: "POST",
    dataType: "json",
    data: {
      employmentid: $('#editFirstName').attr('value'),
      firstname: capitalizeFirstLetter($('#editFirstName').val()),
      lastname: capitalizeFirstLetter($('#editLastName').val()),
      jobtitle: capitalizeFirstLetter($('#editJobTitle').val()),
      email: $('#editEmail').val(),
      departmentid: $("#editemployeedepartment").val()

      
    },
    success: function () {
      

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})

$('#editdepartmentform').on('submit', function()
{
  
  $.ajax({
      
    url: "php/editdepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      departmentid: $('#editdepartmentname').attr('value'),
      department: capitalizeFirstLetter($('#editdepartmentname').val()),
     
      locationid: $("#editdepartmentlocation").val()
    },
    success: function () {
      alert(`${capitalizeFirstLetter($('#InputFirstName').val())} ${capitalizeFirstLetter($('#InputLastName').val())} added to records`)   

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})

$('.deletelocation').on('click', function() {

  $tr = $(this).closest('tr');
  locationid = $tr.data('value')

  $.ajax({

    url: "php/checklocation.php",
    type: "POST",
    dataType: "json",
    data: {
      
      locationid: locationid
      
     
    },
    success: function (result) { 
      console.log(result)
      employeesindepartment = result.data[0]['total_in_use']
    
      if(employeesindepartment > 0){
    
        bootbox.alert(`<h3 class="text-center">Location cannot be deleted</h3><br><p>There are currently ${employeesindepartment} staff working within this location, therefore it can not be deleted.</p>`)
      
      }
      else{
        $('#deletelocationmodal').modal('show');


  $.ajax({

    url: "php/getlocationbyid.php",
    type: "POST",
    dataType: "json",
    data: {
      locationid: locationid
      
    },

    success: function (result) {
      let details = result.data    

      
      locationname = details[0]['locationname']
      locationid = details[0]['locationid']

      

      $('#locationtodelete').html(`<p class="locationtodelete" id=${locationid}>Are you sure you wish to permanently delete the ${locationname} location?</p>`)


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



});

$('#addlocationform').on('submit', function(){
 
  $.ajax({

url: "php/addlocation.php",
type: "POST",
dataType: "json",
data: {  
  locationname: capitalizeFirstLetter($('#addlocationname').val())
   
},
success: function () {
   

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})

$('#editlocationform').on('submit', function()
{
  
  $.ajax({
      
    url: "php/editlocation.php",
    type: "POST",
    dataType: "json",
    data: {
      locationid: $('#editlocationname').attr('value'),
      locationname: capitalizeFirstLetter($('#editlocationname').val()),
     
    },
    success: function () {
     

       },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      
    },
  });

})

$('#deletedepartmentform').on('submit', function()
{


$.ajax({


  
url: "php/deletedepartment.php",
type: "POST",
dataType: "json",
data: {
  departmentid: $('.departmenttodelete').attr('id')
  
},
success: function () {

  alert(`${employeeFirstName} ${employeeLastName} deleted from records`)  


 

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})

$('#deletelocationform').on('submit', function()
{


$.ajax({


  
url: "php/deletelocation.php",
type: "POST",
dataType: "json",
data: {
  locationid: $('.locationtodelete').attr('id')
  
},
success: function () {

  alert(`${employeeFirstName} ${employeeLastName} deleted from records`)  


 

   },
error: function (jqXHR, textStatus, errorThrown) {
  console.log("Error");
  
},
});

})



