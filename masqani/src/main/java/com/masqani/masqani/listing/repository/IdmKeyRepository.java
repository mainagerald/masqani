package com.masqani.masqani.listing.repository;

import com.masqani.masqani.listing.model.IdempotencyRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface IdmKeyRepository extends JpaRepository<IdempotencyRecord, Long> {
    Optional<IdempotencyRecord> findByKey(String key);
}
