package com.masqani.masqani.util.mappers;

import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.model.Authority;
import com.masqani.masqani.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "authorities", source = "authorities")
    UserDto userDtoToUser(User user);

    default Set<String> mapAuthorities(Set<Authority> authorities) {
        return authorities.stream()
                .map(Authority::getName)
                .collect(Collectors.toSet());
    }
}
