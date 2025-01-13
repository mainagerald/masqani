package com.masqani.masqani.user.service.impl;


import com.masqani.masqani.user.dto.JwtAuthResponse;
import com.masqani.masqani.user.dto.SignInRequest;
import com.masqani.masqani.user.dto.SignUpRequest;
import com.masqani.masqani.user.enums.Role;
import com.masqani.masqani.user.exceptions.UnauthorizedException;
import com.masqani.masqani.user.model.User;
import com.masqani.masqani.user.repository.UserRepository;
import com.masqani.masqani.user.service.AuthService;
import com.masqani.masqani.user.service.JwtService;
import com.masqani.masqani.user.service.TokenBlacklistService;
import com.masqani.masqani.user.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final TokenBlacklistService tokenBlacklistService;
    private final EmailService emailService;

    @Transactional
    public ResponseEntity<?> initiateSignUp(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use.");
        }

        log.info("inside initiate service");
        String verificationToken = generateVerificationToken();
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPublicId(UUID.randomUUID());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(Role.ROLE_TENANT);
        user.setVerificationToken(verificationToken);
        user.setActivated(false);

        userRepository.save(user);
        sendVerificationEmail(user.getEmail(), verificationToken);
        return ResponseEntity.status(HttpStatus.CREATED).body("Verification email sent.");
    }

    public ResponseEntity<?> verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid verification token.");
        }

        user.setActivated(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        return ResponseEntity.ok("Email verified successfully.");
    }
    private void sendVerificationEmail(String email, String token) {
        try {
            emailService.sendVerificationEmail(email, token);
        } catch (MessagingException e) {
            // TODO: retry mechanism
            // TODO: storing failed verification emails for manual review
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }


    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        var user = userRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email address"));
        if(!user.isActivated()){
            throw new UnauthorizedException("User is not activated!");
        }
        userService.checkCache(user.getEmail());
        return createJwtAuthResponse(user);
    }
    public ResponseEntity<?> logout(String accessToken, String refreshToken) {
        try {
            if (accessToken != null && !accessToken.isEmpty()) {
                tokenBlacklistService.blacklistToken(accessToken);
                String username = jwtService.extractUsername(accessToken);

                // TODO: Optionally clear user details cache maybe
                log.info("User {} logged out", username);
            }
            if (refreshToken != null && !refreshToken.isEmpty()) {
                tokenBlacklistService.blacklistToken(refreshToken);
                String username = jwtService.extractUsername(refreshToken);
                log.info("Refresh token for user {} invalidated", username);
            }

            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            log.error("Logout failed", e);
            return ResponseEntity.badRequest().body("Logout failed");
        }
    }
    public void promoteToLandlord(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->new IllegalStateException("User with provided email does not exist. No promotion."));
        if(user!=null){
            user.setRole(Role.ROLE_LANDLORD);
            userRepository.save(user);
        }
    }

    public JwtAuthResponse refreshToken(String refreshToken) {
        try {
            String userEmail = jwtService.extractUsername(refreshToken);
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            if (jwtService.isRefreshTokenValid(refreshToken, user)) {
                return createJwtAuthResponse(user);
            } else {
                throw new IllegalArgumentException("Invalid refresh token");
            }
        } catch (Exception e) {
            log.error("Error refreshing token: ", e);
            throw new IllegalArgumentException("Invalid refresh token");
        }
    }

    private JwtAuthResponse createJwtAuthResponse(User user) {
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(accessToken);
        jwtAuthResponse.setRefreshToken(refreshToken);
        return jwtAuthResponse;
    }

    public boolean isTokenValid(String token) {
        try {
            String userEmail = jwtService.extractUsername(token);
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email address!"));
            return jwtService.isTokenValid(token, user);
        } catch (Exception e) {
            log.error("Error occurred: {}", e.getMessage());
            return false;
        }
    }
}