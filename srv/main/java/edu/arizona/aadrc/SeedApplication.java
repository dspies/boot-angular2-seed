package edu.arizona.aadrc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class SeedApplication {

  // Match everything without a suffix to index
  @RequestMapping(value = "/{path:[^\\.]*}")
  public String redirect() {
    // Forward to home page so that route is preserved.
    return "forward:/";
  }

  public static void main(String[] args){
    SpringApplication.run(SeedApplication.class, args);
  }
}
