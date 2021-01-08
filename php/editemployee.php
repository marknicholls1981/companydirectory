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

	$firstName = $_REQUEST['firstName'];
	$lastName = $_REQUEST['lastName'];
	$jobTitle = $_REQUEST['jobTitle'];
	$email = $_REQUEST['email'];
	$departmentID = $_REQUEST['departmentID'];
	$employeeID = $_REQUEST['employeeID'];



	$query = "update personnel p
	set firstName = '$firstName', lastName = '$lastName', jobTitle = '$jobTitle', email = '$email', departmentID = '$departmentID'
	where p.id = '$employeeID' ";

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