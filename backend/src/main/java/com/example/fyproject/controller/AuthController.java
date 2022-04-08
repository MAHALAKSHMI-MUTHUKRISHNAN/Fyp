package com.example.fyproject.controller;

import com.example.fyproject.config.JwtUtility;
import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.dao.UserDao;
import com.example.fyproject.entity.Users;
import com.example.fyproject.model.JwtRequest;
import com.example.fyproject.model.JwtResponse;
import com.example.fyproject.service.JwtUserDetailsService;
import com.example.fyproject.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @Autowired
  private UserServices User;


  @Autowired
  public UserDao dao;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtility jwtTokenUtil;

  @Autowired
  private JwtUserDetailsService userDetailsService;

  @PostMapping(value = "/authenticate")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

    authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

    final UserDetails userDetails = userDetailsService
        .loadUserByUsername(authenticationRequest.getUsername());
    System.out.println(userDetails.toString());

    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtResponse(token));
  }

  @GetMapping(value = "/mydetails")
  public ResponseEntity<?> getMyDetails() throws Exception {
    Users user = dao.findByUsername(SecurityUtils.getCurrentUserLogin().get());
    return ResponseEntity.ok(user);
  }



  @PostMapping(value = "/register")
  public ResponseEntity<?> addUser(@RequestBody Users user) throws Exception {
    return ResponseEntity.ok(User.addUser(user));
  }

  private void authenticate(String username, String password) throws Exception {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }

}
