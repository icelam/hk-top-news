<?php
ini_set("display_errors", 0);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');

include 'NewsApi.php';

$NewsApi = new NewsApi();
$response = $NewsApi->getTopHeadlines();

// Set HTTP status code and print result
http_response_code($response['status_code']);
echo $response['output'];
?>
