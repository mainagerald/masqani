package com.masqani.masqani.user.model;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.masqani.masqani.user.enums.AuthProvider;
import com.masqani.masqani.user.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User implements UserDetails, OAuth2User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(unique = true, nullable = false, name = "email")
    @EqualsAndHashCode.Include
    private String email;

    @Column(name = "password")
    private String password;

    @Column(unique = true, name = "public_id")
    @EqualsAndHashCode.Include
    private UUID publicId;
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

    @CreatedDate
    @Column(updatable = false, name = "created_at")
    private final Instant createdAt = Instant.now();

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private final Instant lastModifiedAt = Instant.now();

    @Column(name = "oauth2_attributes")
    private String oauth2AttributesJson;

    @Transient
    private Map<String, Object> attributes;

    public Map<String, Object> getAttributes() {
        if (attributes == null && oauth2AttributesJson != null) {
            // deserialize attributes when needed
            try {
                ObjectMapper mapper = new ObjectMapper();
                attributes = mapper.readValue(oauth2AttributesJson,
                        new TypeReference<Map<String, Object>>() {});
            } catch (Exception e) {
                attributes = new HashMap<>();
            }
        }
        return attributes == null ? new HashMap<>() : attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
        try {
            // for storage
            ObjectMapper mapper = new ObjectMapper();
            this.oauth2AttributesJson = mapper.writeValueAsString(attributes);
        } catch (Exception e) {
            this.oauth2AttributesJson = "{}";
        }
    }
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