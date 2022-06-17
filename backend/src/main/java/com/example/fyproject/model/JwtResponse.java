package com.example.fyproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
public class JwtResponse {

  public JwtResponse(String jwtToken) {
    this.jwtToken = jwtToken;
  }

  public static long getSerialVersionUID() {
    return serialVersionUID;
  }

  public String getJwtToken() {
    return jwtToken;
  }

  public void setJwtToken(String jwtToken) {
    this.jwtToken = jwtToken;
  }

  private static final long serialVersionUID = -8091879091924046844L;
  private String jwtToken;
}
