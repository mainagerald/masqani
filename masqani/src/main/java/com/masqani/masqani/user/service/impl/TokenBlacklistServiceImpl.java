package com.masqani.masqani.user.service.impl;

import com.masqani.masqani.user.service.JwtService;
import com.masqani.masqani.user.service.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements TokenBlacklistService {
    private final CacheManager cacheManager;
    private final JwtService jwtService;

    private static final String TOKEN_BLACKLIST_CACHE = "tokenBlacklistCache";

    public void blacklistToken(String token) {
        Cache cache = cacheManager.getCache(TOKEN_BLACKLIST_CACHE);
        if (cache == null) {
            log.error("Cache '{}' not found", TOKEN_BLACKLIST_CACHE);
            return;
        }

        try {
            Claims claims = jwtService.extractAllClaims(token);
            long expirationTime = claims.getExpiration().getTime();
            long currentTime = System.currentTimeMillis();

            long timeToLive = Math.max(0, expirationTime - currentTime);
            if (timeToLive > 0) {
                cache.put(token, true);
                log.info("Token blacklisted successfully for {} ms", timeToLive);
            } else {
                log.warn("Token has already expired and cannot be blacklisted");
            }
        } catch (Exception e) {
            log.error("Error blacklisting token", e);
        }
    }

    public boolean isTokenBlacklisted(String token) {
        log.info("Checking if token {} is blacklisted", token);
        Cache cache = cacheManager.getCache(TOKEN_BLACKLIST_CACHE);
        if (cache == null) {
            log.error("Cache '{}' does not exist", TOKEN_BLACKLIST_CACHE);
            return false;
        }

        Boolean isBlacklisted = cache.get(token, Boolean.class);
        return Boolean.TRUE.equals(isBlacklisted);
    }
}
