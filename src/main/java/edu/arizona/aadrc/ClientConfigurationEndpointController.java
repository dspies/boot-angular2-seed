package edu.arizona.aadrc;

import org.springframework.web.bind.annotation.*;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class ClientConfigurationEndpointController {

  @RequestMapping(value = "/config", method = RequestMethod.GET)
  public Map<String, String> getClientConfiguration(@RequestHeader(value = "x-forwarded-prefix", required = false) String forwardedPrefix) {
    Map<String, String> response = new LinkedHashMap<String, String>();
    response.put("baseUrl", cleanForwardPrefix(forwardedPrefix));
    return response;
  }

  private String cleanForwardPrefix(String forwardedPrefix){
    return (forwardedPrefix != null ? forwardedPrefix : "") + "/";
  }

}
