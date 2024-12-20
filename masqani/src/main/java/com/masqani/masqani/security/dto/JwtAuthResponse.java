package com.masqani.masqani.security.dto;


import lombok.Data;

@Data
public class JwtAuthResponse {
    private String accessToken;
    private String refreshToken;
}
