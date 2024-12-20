package com.masqani.masqani.security.service;

import com.masqani.masqani.security.dto.ReadUserDTO;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService{
    UserDetails loadUserByUsername(String username);
    void checkCache(String username);
    ReadUserDTO getAuthenticatedUser();
    ReadUserDTO getByPublicId(String publicId);
}
