package com.masqani.masqani.service;

import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.client.mgmt.filter.FieldsFilter;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.json.mgmt.users.User;
import com.auth0.net.Response;
import com.auth0.net.TokenRequest;
import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.exceptions.UserException;
import com.masqani.masqani.util.config.SecurityUtilities;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class Auth0Service {
    @Value("${okta.oauth2.client-id}")
    private String clientId;
    @Value("${okta.oauth2.client-secret}")
    private String clientSecret;
    @Value("${okta.oauth2.issuer}")
    private String domain;
    @Value("${application.auth0.role-landlord-id}")
    private String roleLandlordId;

    private String getAccessToken() throws Auth0Exception {
        AuthAPI authAPI = AuthAPI.newBuilder(clientId, clientSecret,domain).build();
        TokenRequest tokenRequest = authAPI.requestToken(domain + "/api/v2/");
        TokenHolder holder = tokenRequest.execute().getBody();
        return holder.getAccessToken();
    }
    private void assignRoleById(String accessToken, String email, UUID publicId, String roleIdToAdd) throws Auth0Exception{
        ManagementAPI managementAPI = ManagementAPI.newBuilder(domain, accessToken).build();
        Response<List<User>> auth0UserByEmail =managementAPI.users().listByEmail(email, new FieldsFilter()).execute();
        User user = auth0UserByEmail.getBody().stream().findFirst().orElseThrow(()->new UserException(String.format("Cannot find user with public id %s", publicId)));
        managementAPI.roles().assignUsers(roleIdToAdd, List.of(user.getId())).execute();
    }
    public void addLandlordRoleToUser(UserDto userDto){
        if(userDto.getAuthorities().stream().noneMatch(role->role.equals(SecurityUtilities.ROLE_LANDLORD))){
            try{
                String accessToken = this.getAccessToken();
                assignRoleById(accessToken, userDto.getEmail(), userDto.getPublicId(), roleLandlordId);
            }catch (Auth0Exception a){
                throw new UserException(String.format("Not possible to assign role %s to %s", roleLandlordId, userDto.getPublicId()));
            }
        }
    }
}
