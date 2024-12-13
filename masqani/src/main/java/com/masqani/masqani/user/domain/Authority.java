package com.masqani.masqani.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "authority")
@Data
public class Authority implements Serializable {

    @NotNull
    @Size(max=50)
    @Id
    @Column(length = 50)
    private String name;
}
