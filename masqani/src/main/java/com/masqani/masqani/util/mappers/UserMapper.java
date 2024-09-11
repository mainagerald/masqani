package com.masqani.masqani.util.mappers;

import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.model.Authority;
import com.masqani.masqani.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userDtoToUser(User user);

    default String mapAuthoritiesToString(Authority authority){
        return authority.getName();
    }
}
