package com.masqani.masqani.util;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.context.event.EventListener;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.Instant;

@MappedSuperclass
@EntityListeners(AuditingEntity.class)
@Data
public abstract class AuditingEntity<T> implements Serializable {

    public abstract T getId();

    @CreatedDate
    @Column(updatable = false, name = "created_at")
    private final Instant createdAt = Instant.now();

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private final Instant lastModifiedAt = Instant.now();


}
