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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public List<ServiceCenter> getServiceCenters() {
		return serviceCenters;
	}

	public void setServiceCenters(List<ServiceCenter> serviceCenters) {
		this.serviceCenters = serviceCenters;
	}




}
