// package com.tickey.SecurityConfig;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http.csrf(AbstractHttpConfigurer::disable);

//         http.authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/auth/**").permitAll()

//                 .requestMatchers("/bookings/**").hasRole("CUSTOMER")

//                 .requestMatchers(HttpMethod.POST, "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")
//                 .requestMatchers(HttpMethod.PUT,  "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")
//                 .requestMatchers(HttpMethod.DELETE,"/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")

//                 .requestMatchers(HttpMethod.GET, "/**").permitAll()

//                 .anyRequest().authenticated()
//         );

//         http.httpBasic(basic -> {});

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }

package com.tickey.SecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // Disable CSRF (not needed for REST APIs)
        http.csrf(AbstractHttpConfigurer::disable);

        // Enable CORS (REQUIRED)
        http.cors(withDefaults());

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()

                .requestMatchers("/bookings/**").hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.POST, "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**")
                .hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**")
                .hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/movies/**", "/halls/**", "/showtimes/**", "/seats/**",
                        "/users/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/**").permitAll()

                .anyRequest().authenticated());

        http.httpBasic(withDefaults());

        return http.build();
    }

    // CORS CONFIGURATION
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Allowed frontend origins
        config.setAllowedOrigins(List.of(
                "http://localhost:5173", // Vite (React)
                "http://127.0.0.1:5173",
                "http://localhost:3000",
                "http://127.0.0.1:3000"));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
