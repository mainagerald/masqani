package com.masqani.masqani.user.model;

import com.masqani.masqani.user.enums.AuthProvider;
import com.masqani.masqani.user.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails, OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, nullable = false, name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(unique = true, name = "public_id")
    private String publicId;
    @Column(name = "verification_token")
    private String verificationToken;
    @Column(name = "is_activated")
    private boolean isActivated = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "user_role")
    private Role role=Role.ROLE_TENANT;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    private AuthProvider provider;

    @Column(name = "provider_id")
    private String providerId;

//    @ManyToMany
//    @JoinTable(name = "user_authority",
//            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
//            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
//    private Set<Authority> authorities = new HashSet<>();

    @Transient
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
//
//    public Set<String> getAuthoritiesAsStrings(){
//        return authorities.stream().map(authority -> authority.getName()).collect(Collectors.toSet());
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return email;
    }
}