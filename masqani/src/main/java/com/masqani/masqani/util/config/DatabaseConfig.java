package com.masqani.masqani.util.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories({"com.masqani.masqani.repository.userRepository",
        "com.masqani.masqani.repository.listingRepository",
        "com.masqani.masqani.repository.rentingRepository"})
@EnableTransactionManagement
@EnableJpaAuditing
public class DatabaseConfig {
}

//for creation dates and modifications tracking