# Tickey

## Overview

Tickey is a Spring Boot application built with Java 21. This project incorporates modern frameworks and technologies to provide a robust and secure platform for managing your tasks efficiently.

## Features
- Built with **Spring Boot 4.0.0**  
- Supported by **Java 21**  
- Secure your application using **Spring Security**  
- Utilize **Spring Data JPA** for database interactions  
- Connect to a **MySQL** database  

## Getting Started

To get started with Tickey, follow the instructions below:

### Prerequisites
- Java 21
- MySQL Database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahmed-hossam-moka/Tickey.git
   cd Tickey
   ```
2. Setup your MySQL database and configure the `application.properties` file accordingly.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

## Configuration

Make sure to set up your MySQL connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
```  

## Acknowledgments
Thanks to Spring Boot, Spring Security, and Spring Data JPA teams for their incredible frameworks.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---  
Last updated: 2026-04-11 16:19:15 (UTC)