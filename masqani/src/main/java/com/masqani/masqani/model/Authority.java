package com.masqani.masqani.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "authority")
@Data
public class Authority implements Serializable {

    @NotNull
    @Id
    @Size(max = 50)
    @Column(length = 50)
    private String name;
}
