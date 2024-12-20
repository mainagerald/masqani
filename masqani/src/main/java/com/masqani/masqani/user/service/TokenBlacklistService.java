package com.masqani.masqani.user.service;

public interface TokenBlacklistService {
    boolean isTokenBlacklisted(String token);
    void blacklistToken(String token);
}
