package com.masqani.masqani.user.service.impl;

import com.masqani.masqani.user.dto.ReadUserDTO;
import com.masqani.masqani.user.model.User;
import com.masqani.masqani.user.repository.UserRepository;
import com.masqani.masqani.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final CacheManager cacheManager;

    @Override
    @Cacheable(value = "UserDetailsCache", key = "#username")  // Make sure this matches your Hazelcast config
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Fetching details for user: {}", username);
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    @Override
    public ReadUserDTO getByPublicId(String publicId){
        User user = userRepository.findByPublicId(publicId);
        if(user!=null){
            return mapUserToReadUserDto(user);
        }else {
            throw new RuntimeException("User not found");
        }
    }
    @Override
    public ReadUserDTO getAuthenticatedUser() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null|| !authentication.isAuthenticated()){
            throw new RuntimeException("No authentication found");
        }
        Object principal = authentication.getPrincipal();
        log.info("user principal {}", principal);
        if(principal instanceof User user){
            return mapUserToReadUserDto(user);
        }else {
            throw new RuntimeException("Auth not of type user");
        }
    }

    private ReadUserDTO mapUserToReadUserDto(User user){
        ReadUserDTO userDto = new ReadUserDTO();
        userDto.setRole(user.getRole());
        userDto.setEmail(user.getEmail());
        userDto.setPublicId(user.getPublicId());
        return userDto;
    }
//    test cache brute
    public void checkCache(String username) {
        var cache = cacheManager.getCache("UserDetailsCache");
        if (cache != null) {
            var cacheEntry = cache.get(username);
            log.info("Cache entry for {}: {}", username, cacheEntry);
        }
    }
}