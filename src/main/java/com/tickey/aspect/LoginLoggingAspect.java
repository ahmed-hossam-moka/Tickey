package com.tickey.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.tickey.services.Auth.DTOs.LoginRequest;
import com.tickey.services.Auth.DTOs.RegisterRequest;

@Aspect
@Component
public class LoginLoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoginLoggingAspect.class);

    @AfterReturning(pointcut = "execution(* com.tickey.services.Auth.AuthService.login(..))", returning = "result")
    public void logAfterLogin(JoinPoint joinPoint, Object result) {
        String email = "Unknown";
        Object[] args = joinPoint.getArgs();
        if (args.length > 0 && args[0] instanceof LoginRequest) {
            email = ((LoginRequest) args[0]).getEmail();
        }
        logActivity("LOGIN", email, result);
    }

    @AfterReturning(pointcut = "execution(* com.tickey.services.Auth.AuthService.register(..))", returning = "result")
    public void logAfterRegister(JoinPoint joinPoint, Object result) {
        String email = "Unknown";
        Object[] args = joinPoint.getArgs();
        if (args.length > 0 && args[0] instanceof RegisterRequest) {
            email = ((RegisterRequest) args[0]).getEmail();
        }
        logActivity("REGISTER_CUSTOMER", email, result);
    }

    @AfterReturning(pointcut = "execution(* com.tickey.services.Auth.AuthService.registerAdmin(..))", returning = "result")
    public void logAfterRegisterAdmin(JoinPoint joinPoint, Object result) {
        String email = "Unknown";
        Object[] args = joinPoint.getArgs();
        if (args.length > 0 && args[0] instanceof RegisterRequest) {
            email = ((RegisterRequest) args[0]).getEmail();
        }
        logActivity("REGISTER_ADMIN", email, result);
    }

    private void logActivity(String action, String email, Object result) {
        if (result instanceof ResponseEntity) {
            ResponseEntity<?> response = (ResponseEntity<?>) result;

            StringBuilder logMessage = new StringBuilder();
            logMessage.append("User Activity | ");
            logMessage.append("Action: ").append(action).append(" | ");
            logMessage.append("Email: ").append(email).append(" | ");

            if (response.getStatusCode().is2xxSuccessful()) {
                logMessage.append("Status: SUCCESS");
                logger.info(logMessage.toString());
            } else {
                logMessage.append("Status: FAILED");
                logger.warn(logMessage.toString());
            }
        }
    }
}