package com.masqani.masqani.user.service.impl;


import com.masqani.masqani.user.enums.AuthProvider;
import com.masqani.masqani.user.enums.Role;
import com.masqani.masqani.user.model.User;
import com.masqani.masqani.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            throw new OAuth2AuthenticationException("Email not found from OAuth provider");
        }

        User user = userRepository.findByEmail(email)
                .map(existingUser -> updateExistingUser(existingUser, oAuth2User))
                .orElseGet(() -> createNewUser(oAuth2User));
        user.setAttributes(new HashMap<>(oAuth2User.getAttributes()));
        return user;
    }

    private User updateExistingUser(User existingUser, OAuth2User oAuth2User) {
        existingUser.setEmail(oAuth2User.getAttribute("email"));
//        existingUser.setPublicId(oAuth2User.getAttribute("public_id"));
//        existingUser.setRole(oAuth2User.getAttribute("role"));
        existingUser.setAttributes(new HashMap<>(oAuth2User.getAttributes()));
        userRepository.save(existingUser);
        return existingUser;
    }

    private User createNewUser(OAuth2User oAuth2User) {
        User user = new User();
        user.setEmail(oAuth2User.getAttribute("email"));
        user.setPublicId(UUID.randomUUID());
        user.setActivated(true);
        user.setRole(Role.ROLE_TENANT);
        user.setAttributes(new HashMap<>(oAuth2User.getAttributes()));
        user.setProvider(AuthProvider.GOOGLE);
        user.setProviderId(oAuth2User.getAttribute("sub"));
        return userRepository.save(user);

//        TODO: CHECK FOR PROVIDER DETAILS IN CASE OF MORE THAN ONE PROVIDER
//        IMPLEMENT YOUR LOGIC OF CHOICE
//        if ("accounts.google.com".equals(oAuth2User.getAttribute("iss"))) {
//
//        } else {
//        FALLBACK FOR NO PROVIDER ATTRIBUTE FOUND
//            user.setProvider(AuthProvider.LOCAL);
//        }

    }
}
