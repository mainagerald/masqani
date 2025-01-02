package com.masqani.masqani.user.dto;//package com.masqani.masqani.user.application.dto;

import com.masqani.masqani.user.enums.Role;
import lombok.Data;
import java.util.Set;
import java.util.UUID;

@Data
public class ReadUserDTO {
    private UUID publicId;
    private String email;
    private String imageUrl;
    private Role role;
}