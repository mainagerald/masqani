package com.masqani.masqani.shared.idm;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdmKeyRepository extends JpaRepository<IdempotencyRecord, Long> {
    Optional<IdempotencyRecord> findByKey(String key);
}
