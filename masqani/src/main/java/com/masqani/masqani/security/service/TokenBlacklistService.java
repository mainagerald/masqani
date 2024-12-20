package com.masqani.masqani.security.service;

public interface TokenBlacklistService {
    boolean isTokenBlacklisted(String token);
    void blacklistToken(String token);
}
