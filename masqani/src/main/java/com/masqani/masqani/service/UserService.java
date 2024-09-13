package com.masqani.masqani.service;

import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.model.User;
import com.masqani.masqani.repository.UserRepository;
import com.masqani.masqani.util.mappers.UserMapper;
import com.masqani.masqani.util.config.SecurityUtilities;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final String UPDATED_AT_KEY="update_at";
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserDto getAuthenticatedUserFromSecurityContext(){
        OAuth2User principal = (OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = SecurityUtilities.mapOauth2AttributesToUser(principal.getAttributes());
        return getByEmail(user.getEmail()).orElseThrow();
    }

    @Transactional
    public Optional<UserDto> getByEmail(String email) {
        Optional<User> oneByEmail = userRepository.findOneByEmail(email);
        return oneByEmail.map(userMapper::userDtoToUser);
    }

    public void syncWithIdp(OAuth2User oAuth2User, boolean forceRsync){
        log.info("inside sync with idp and user------------> {}", oAuth2User);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        User user = SecurityUtilities.mapOauth2AttributesToUser(attributes);
        log.info("util mapped user----> {}", user);
        Optional<User> existingUser = userRepository.findOneByEmail(user.getEmail());
        log.info("existing user ? {}", existingUser);
        if(existingUser.isPresent()){
            if(attributes.get(UPDATED_AT_KEY)!=null){
                Instant lastModifiedDate = existingUser.orElseThrow().getLastModifiedAt();
                Instant idpModifiedDate;
                if(attributes.get(UPDATED_AT_KEY) instanceof Instant instant){
                    idpModifiedDate=instant;
                }else {
                    idpModifiedDate=Instant.ofEpochSecond((Integer) attributes.get(UPDATED_AT_KEY));
                }
                if(idpModifiedDate.isAfter(lastModifiedDate)|| forceRsync){
                    updateUser(user);
                }
            }
        }else {
            userRepository.saveAndFlush(user);
        }
    }

    private void updateUser(User user){
        Optional<User> userToUpdate = userRepository.findOneByEmail(user.getEmail());
        if (userToUpdate.isPresent()){
            User updatedUser = userToUpdate.get();
            updatedUser.setEmail(user.getEmail());
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setAuthorities(user.getAuthorities());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setImageUrl(user.getImageUrl());
            userRepository.save(updatedUser);
        }
    }

    public Optional<UserDto> getByPublicId(UUID publicId){
       Optional<User> oneByPublicId = userRepository.findOneByPublicId(publicId);
       return oneByPublicId.map(userMapper::userDtoToUser);
    }
}
