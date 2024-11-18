package com.masqani.masqani.user.mapper;


import com.masqani.masqani.user.application.dto.ReadUserDTO;
import com.masqani.masqani.user.domain.Authority;
import com.masqani.masqani.user.domain.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    ReadUserDTO readUserDTOToUser(User user);

    default String mapAuthoritiesToString(Authority authority) {
        return authority.getName();
    }

}
