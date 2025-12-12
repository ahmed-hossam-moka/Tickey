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

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable);

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()

                .requestMatchers("/bookings/**").hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.POST, "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,  "/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,"/movies/**", "/halls/**", "/showtimes/**", "/seats/**", "/users/**").hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/**").permitAll()

                .anyRequest().authenticated()
        );

        http.httpBasic(basic -> {});

        return http.build();
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
