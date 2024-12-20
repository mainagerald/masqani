package com.masqani.masqani.security.dto;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}