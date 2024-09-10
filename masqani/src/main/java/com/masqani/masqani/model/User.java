package com.masqani.masqani.model;

import com.masqani.masqani.resource.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "masqani_user")
@Data
public class User extends AuditingEntity<Long> implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSequenceGenerator")
    @SequenceGenerator(name = "userSequenceGenerator",sequenceName = "user_generator", allocationSize = 1)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String imageUrl;
    @Column(name = "public_id", nullable = false)
    private UUID publicId;
    @ManyToMany
    @JoinTable(name = "user_authorities",
    joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    private Set<Authority> authorities = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(imageUrl, user.imageUrl) && Objects.equals(authorities, user.authorities);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, email, imageUrl, authorities);
    }
}
