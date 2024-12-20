package com.masqani.masqani.security.dto;//package com.masqani.masqani.user.application.dto;

import lombok.Data;
import java.util.Set;
import java.util.UUID;

@Data
public class ReadUserDTO {
    private String publicId;
    private String email;
    private String imageUrl;
    private Set<String> authorities;
}