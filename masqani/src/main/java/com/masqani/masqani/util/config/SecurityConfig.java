package com.masqani.masqani.util.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestAttributeHandler = new CsrfTokenRequestAttributeHandler();
        requestAttributeHandler.setCsrfRequestAttributeName(null);
        http.authorizeHttpRequests(authorize->authorize
                .anyRequest()
                .authenticated())
                .csrf(csrf-> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(requestAttributeHandler))
                .oauth2Login(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2->oauth2.jwt(Customizer.withDefaults()))
                .oauth2Client(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public GrantedAuthoritiesMapper userAuthoritiesMapper(){
        return authorities -> {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            authorities.forEach(grantedAuthority -> {
                if(grantedAuthority instanceof OidcUserAuthority oidcUserAuthority){
                    grantedAuthorities.addAll(SecurityUtilities.extractAuthorityFromClaims(oidcUserAuthority.getUserInfo().getClaims())) ;
                }
            });
                    return grantedAuthorities;
        };
    }
}
