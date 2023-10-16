package miu.pmp.server;

import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.CacheControl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The type Server application.
 */

@SpringBootApplication
@EnableJpaAuditing // so that it will generate code in base entity
@EnableJpaRepositories
public class ServerApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    //Creating bean keycloakConfigResolver
    @Bean
    public KeycloakSpringBootConfigResolver keycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("file:" + System.getProperty("user.dir") + "/static/").setCacheControl(CacheControl.noCache());

        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST","PUT","DELETE")
                .allowedHeaders("Origin", "Accept", "Content-Type", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);

    }
}
