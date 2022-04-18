package com.example.fyproject.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name="user")
public class Users {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String role;
	private String name;
	@Column(unique=true)
	private String username;
	@Column(unique=true)
	private String mobile;
	@Column(unique=true)
	private String email;
	private String password;


	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name="user_id", referencedColumnName = "id")
	List<com.example.fyproject.entity.Appointment> appointments = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name="user_id", referencedColumnName = "id")
	List<com.example.fyproject.entity.ServiceCenter> serviceCenters = new ArrayList<>();
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}
//	@Override
//	public String toString() {
//		return "Users [id=" + id + ", role=" + role + ", name=" + name + ", username=" + username + ", mobile=" + mobile
//				+ ", email=" + email + ", password=" + password + "]";
//	}
//	public Users(String role, String name, String username, String mobile, String email, String password) {
//		super();
//		this.role = role;
//		this.name = name;
//		this.username = username;
//		this.mobile = mobile;
//		this.email = email;
//		this.password = password;
//	}
//	public long getId() {
//		return id;
//	}
//	public void setId(long id) {
//		this.id = id;
//	}
//	public String getRole() {
//		return role;
//	}
//	public void setRole(String role) {
//		this.role = role;
//	}
//	public String getName() {
//		return name;
//	}
//	public void setName(String name) {
//		this.name = name;
//	}
//	public String getUsername() {
//		return username;
//	}
//	public void setUsername(String username) {
//		this.username = username;
//	}
//	public String getMobile() {
//		return mobile;
//	}
//	public void setMobile(String mobile) {
//		this.mobile = mobile;
//	}
//	public String getEmail() {
//		return email;
//	}
//	public void setEmail(String email) {
//		this.email = email;
//	}
//	public Users() {
//		super();
//		// TODO Auto-generated constructor stub
//	}


}
