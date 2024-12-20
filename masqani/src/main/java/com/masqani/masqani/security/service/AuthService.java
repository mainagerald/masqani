package com.masqani.masqani.security.service;

import com.masqani.masqani.security.dto.JwtAuthResponse;
import com.masqani.masqani.security.dto.SignInRequest;
import com.masqani.masqani.security.dto.SignUpRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> initiateSignUp(SignUpRequest signUpRequest);
    ResponseEntity<?> verifyEmail(String token);
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse refreshToken(String refreshToken);
    boolean isTokenValid(String token);
    ResponseEntity<?> logout(String accessToken, String refreshToken);
    void promoteToLandlord(String email);
}
