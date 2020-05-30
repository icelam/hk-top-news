<?php
class NewsApi {
  public function __construct() {
    // API endpoint
    $this->api_endpoint = "https://newsapi.org/v2";
    $this->api_key = "<API_KEY_HERE>";
  }

  /**
   * Wrapper for https://newsapi.org/v2/top-headlines
   * API Specification: https://newsapi.org/docs/endpoints/top-headlines
   */
  public function getTopHeadlines() {
    $query = $_GET;
    $query["apiKey"] = $this->api_key;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $this->api_endpoint . "/top-headlines?" . http_build_query($query));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec ($curl);

    $http_status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close ($curl);

    return array(
      "status_code" => $http_status_code,
      "output" => $server_output
    );
  }
}
?>
