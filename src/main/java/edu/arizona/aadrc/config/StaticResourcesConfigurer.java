package edu.arizona.aadrc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Added for development in order to serve static resources from the
 * project folders instead of the defaults
 *
 */
@Configuration
@Profile("development")
public class StaticResourcesConfigurer extends WebMvcConfigurerAdapter {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler("/**")
      .addResourceLocations("file:dist/dev/")
      .setCachePeriod(0);

    registry
      .addResourceHandler("/node_modules/**")
      .addResourceLocations("file:node_modules/");
  }
}
