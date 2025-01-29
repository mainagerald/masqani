package com.masqani.masqani.user.service.impl;

import com.masqani.masqani.user.service.JwtService;
import com.masqani.masqani.user.service.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements TokenBlacklistService {
    private final JwtService jwtService;
    private final RedisTemplate<String, Object> redisTemplateToken;
    private static  final String TOKEN_BLACKLIST_PREFIX="Blacklist:";

    @Override
    public void blacklistToken(String token){
        try{
            Claims claims = jwtService.extractAllClaims(token);
            long expirationTime=claims.getExpiration().getTime();
            long currentTime=System.currentTimeMillis();
            long timeToLive=Math.max(0, expirationTime-currentTime);
            if(timeToLive>0){
                redisTemplateToken.opsForValue().set(TOKEN_BLACKLIST_PREFIX+token, true,timeToLive, TimeUnit.MILLISECONDS);
                log.info("Token blacklisted successfully");
            }
        }catch(Exception e){
            log.error("Error blacklisting token", e);
        }
    }

    @Override
    public boolean isTokenBlacklisted(String token){
        log.info("checking if token {} is blacklisted", token);
        return Boolean.TRUE.equals(redisTemplateToken.opsForValue().get(TOKEN_BLACKLIST_PREFIX+token));
    }
}