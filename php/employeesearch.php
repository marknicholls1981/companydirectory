<?php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");
	// include("config_dev.php");

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

	$searchquery = $_REQUEST['searchquery'];

	$stmt = $conn->prepare('select p.firstName, p.lastName, p.email,d.name as departmentname, l.name, p.id, p.jobTitle from personnel p 
	inner join department d
	inner join location l
	on l.id = d.locationID
	on d.id = p.departmentID
    where firstName like "%' .$searchquery. '%" || d.name like "%' .$searchquery . '%"  || l.name like "%' .$searchquery . '%" || lastName like "%' .$searchquery . '%" || firstname + " " + lastname like "%' .$searchquery . '%"');
	$stmt->execute();

	$result = $stmt->get_result();
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];
		

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>