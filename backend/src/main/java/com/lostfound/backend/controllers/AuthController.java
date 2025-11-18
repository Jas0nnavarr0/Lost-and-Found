package com.lostfound.backend.controllers;

import com.lostfound.backend.model.EnumRole;
import com.lostfound.backend.model.Role;
import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.RoleRepository;
import com.lostfound.backend.repositories.UserRepository;
import com.lostfound.backend.auth.jsontoken.TokenUtilities;
import com.lostfound.backend.auth.dtos.LoginDTO;
import com.lostfound.backend.auth.dtos.SignupDTO;
import com.lostfound.backend.auth.response_bodies.AuthResponse;
import com.lostfound.backend.auth.response_bodies.UserDetailsResponse;
import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenUtilities tokenUtilities;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/secure/endpoint")
    public ResponseEntity<?> authenticateUser(Authentication auth) {
        return new ResponseEntity<>("endpoint authenticated", HttpStatus.FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDTO loginDTO) {
        Authentication auth;
        try {
            auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
            );
            System.out.println(auth.toString());
        } catch (AuthenticationException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Your username or password is incorrect");
            return new ResponseEntity<Object>(error, HttpStatus.NOT_FOUND);
        }
        SecurityContextHolder.getContext().setAuthentication(auth);

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        System.out.println(userDetails.getId());
        ResponseCookie jwtCookie = tokenUtilities.createJwtCookie(userDetails);
        System.out.println(jwtCookie.toString());
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        System.out.println(roles.toString());
        UserDetailsResponse response = new UserDetailsResponse(userDetails.getId(), userDetails.getUsername(), roles, jwtCookie.toString());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie clearedCookie = tokenUtilities.retrieveClearedCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                clearedCookie.toString()).body(new AuthResponse("You have logged out."));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody SignupDTO signupDTO) {
        if (userRepository.existsByUsername(signupDTO.getUsername())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Username is already in use."));
        }
        if (userRepository.existsByPhoneNumber(signupDTO.getPhoneNumber())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Phone number is already in use"));
        }

        if (userRepository.existsByEmail(signupDTO.getEmail())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Email is already in use."));
        }

        User createdUser = new User(signupDTO.getUsername(), signupDTO.getEmail(), passwordEncoder.encode(signupDTO.getPassword()), signupDTO.getPhoneNumber());

        Set<String> strRoles = signupDTO.getRole();
        Set<Role> userRoles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByRoleName(EnumRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role does not exist"));
            userRoles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin": {
                        Role admin = roleRepository.findByRoleName(EnumRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        Role moderator = roleRepository.findByRoleName(EnumRole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        Role user = roleRepository.findByRoleName(EnumRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        userRoles.add(admin);
                        userRoles.add(moderator);
                        userRoles.add(user);
                        break;
                    }
                    case "moderator": {
                        Role moderator = roleRepository.findByRoleName(EnumRole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        Role user = roleRepository.findByRoleName(EnumRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        userRoles.add(moderator);
                        userRoles.add(user);
                        break;
                    }
                    default: {
                        Role user = roleRepository.findByRoleName(EnumRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role does not exist"));
                        userRoles.add(user);
                    }
                }
            });
        }

        createdUser.setRoles(userRoles);
        userRepository.save(createdUser);
        return ResponseEntity.ok(new AuthResponse("User has created an account"));
    }

    @GetMapping("/retrieve_username")
    public String currentUserName(Authentication auth) {
        if(auth != null) {
            return auth.getName();
        } else {
            return "";
        }
    }

    @GetMapping("/retrieve_user_info")
    public ResponseEntity<?> getUserInfo(Authentication auth) {
        UserDetailsImpl userInfo = (UserDetailsImpl) auth.getPrincipal();
        List<String> roles = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        UserDetailsResponse response = new UserDetailsResponse(userInfo.getId(), userInfo.getUsername(), roles);

        return ResponseEntity.ok().body(response);
    }
}
