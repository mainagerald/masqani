package com.masqani.masqani.util.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(
        {"com.masqani.masqani.user.repository",
        "com.masqani.masqani.listing.repository",
        "com.masqani.masqani.booking.repository"})
@EnableTransactionManagement
@EnableJpaAuditing
public class DatabaseConfig {
}