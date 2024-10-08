package com.masqani.masqani.controller;

import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final UserService userService;
    private final ClientRegistration clientRegistration;

    public AuthController(UserService userService, ClientRegistrationRepository registration) {
        this.userService = userService;
        this.clientRegistration = registration.findByRegistrationId("okta");
    }


    @GetMapping("/getAuthUser")
    public ResponseEntity<UserDto> getAuthenticatedUser(
            @AuthenticationPrincipal OAuth2User user,
            @RequestParam boolean forceResync
            ){
        log.info("resource user {}", user);
        if (user==null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }else {
            userService.syncWithIdp(user, forceResync);
            UserDto connectedUser = userService.getAuthenticatedUserFromSecurityContext();
            log.info("connected--------------------------------------------> {}", connectedUser);
            return new ResponseEntity<>(connectedUser, HttpStatus.OK);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request){
        String issuerUri = clientRegistration.getProviderDetails().getIssuerUri();
        String originUrl = request.getHeader(HttpHeaders.ORIGIN);
        Object[] params = {issuerUri, clientRegistration.getClientId(), originUrl};
        String logoutUrl = MessageFormat.format("{0}v2/logout?client_id={1}&returnTo={2}", originUrl, clientRegistration.getClientId());
        return ResponseEntity.ok().body(Map.of("logoutUrl", logoutUrl));
    }
}
