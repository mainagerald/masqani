package com.masqani.masqani.util.utilities;

import com.masqani.masqani.model.Authority;
import com.masqani.masqani.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SecurityUtilities {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_LANDLORD = "ROLE_LANDLORD";
    public static final String ROLE_TENANT = "ROLE_TENANT";

    public static final String CLAIMS_NAMESPACE = "https://masqani.com/roles";

    public static User mapOauth2AttributesToUser(Map<String, Object> attributes){
        User user = new User();
        String sub = String.valueOf(attributes.get("sub"));
        String username = null;

        if (attributes.get("preferred_name")!= null){
            username = String.valueOf(attributes.get("preferred_name"));
        }
        if (attributes.get("given_name")!= null){
            user.setFirstName(String.valueOf(attributes.get("given_name")).toLowerCase());
        }else if(attributes.get("nickname")!=null) {
            user.setFirstName(String.valueOf(attributes.get("nickname")).toLowerCase());
        }
        if (attributes.get("family_name")!= null){
            user.setLastName(String.valueOf(attributes.get("family_name")).toLowerCase());
        }
        if (attributes.get("email")!=null){
            user.setEmail(String.valueOf(attributes.get("email")).toLowerCase());
        } else if (sub.contains("|")&&(username!=null && username.contains("@"))) {
            user.setEmail(username);
        }else {
            user.setEmail(sub);
        }
        if (attributes.get("picture")!= null){
            user.setImageUrl(String.valueOf(attributes.get("family_name")).toLowerCase());
        }

        if(attributes.get(CLAIMS_NAMESPACE)!=null){
            java.util.List<String> authoritiesData = (List<String>) attributes.get(CLAIMS_NAMESPACE);
            Set<Authority> authorities = authoritiesData.stream().map(authority-> {
                Authority auth = new Authority();
                auth.setName(authority);
                return auth;
            }).collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }
        return user;
    }

    public static List<SimpleGrantedAuthority>  extractAuthorityFromClaims(Map<String, Object> claims){
        return mapRolesToGrantedAuthorities(getRolesFromClaims(claims));
    }

    private static List<SimpleGrantedAuthority> mapRolesToGrantedAuthorities(Collection<String> rolesFromClaims) {
        return rolesFromClaims.stream().filter(role->role.startsWith("ROLE_")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public static Collection<String> getRolesFromClaims(Map<String, Object> claims){
        return (List<String>) claims.get(CLAIMS_NAMESPACE);
    }

    public static boolean hasCurrentUserAnyOfAuthorities(String ...authorities){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (authentication!=null && getAuthorities(authentication).anyMatch(authority-> Arrays.asList(authorities).contains(authority)));
    }

    public static Stream<String> getAuthorities (Authentication authentication){
        Collection<? extends GrantedAuthority> authorities = authentication instanceof JwtAuthenticationToken jwtAuthenticationToken ?
                extractAuthorityFromClaims(jwtAuthenticationToken.getToken().getClaims()) : authentication.getAuthorities();
        return authorities.stream().map(GrantedAuthority::getAuthority);
    }
}
