<?php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	//include("config.php");
	include("config_dev.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($host_name, $user_name, $password, $database);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$firstname = $_REQUEST['firstname'];
	$lastname = $_REQUEST['lastname'];
	$jobtitle = $_REQUEST['jobtitle'];
	$email = $_REQUEST['email'];
	$departmentid = $_REQUEST['departmentid'];
	$employmentid = $_REQUEST['employmentid'];



	$query = "update personnel p
	set firstName = '$firstname', lastName = '$lastname', jobTitle = '$jobtitle', email = '$email', departmentID = '$departmentid'
	where p.id = '$employmentid' ";

	echo $query;


    
   
	$result = $conn->query($query);

	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}


?>