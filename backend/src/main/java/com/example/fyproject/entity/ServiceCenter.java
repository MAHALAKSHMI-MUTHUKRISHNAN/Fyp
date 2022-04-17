package com.example.fyproject.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor

public class ServiceCenter {
	@Id
	//@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	private String name;

	private long sctype;
	private String email;
	private String address;
	private String mobile;
	private String imageurl;
	private String details;

	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name="center_id", referencedColumnName = "id")
	List<com.example.fyproject.entity.Appointment> appointments = new ArrayList<>();


//	@Override
//	public String toString() {
//		return "ServiceCenter [id=" + id + ", name=" + name + ", email=" + email + ", address=" + address + ", mobile="
//				+ mobile + ", imageurl=" + imageurl + ", details=" + details + "]";
//	}
//	public long getId() {
//		return id;
//	}
//	public void setId(long id) {
//		this.id = id;
//	}
//	public String getName() {
//		return name;
//	}
//	public void setName(String name) {
//		this.name = name;
//	}
//	public String getEmail() {
//		return email;
//	}
//	public void setEmail(String email) {
//		this.email = email;
//	}
//	public String getAddress() {
//		return address;
//	}
//	public void setAddress(String address) {
//		this.address = address;
//	}
//	public String getMobile() {
//		return mobile;
//	}
//	public void setMobile(String mobile) {
//		this.mobile = mobile;
//	}
//	public String getImageurl() {
//		return imageurl;
//	}
//	public void setImageurl(String imageurl) {
//		this.imageurl = imageurl;
//	}
//	public String getDetails() {
//		return details;
//	}
//	public void setDetails(String details) {
//		this.details = details;
//	}
//	public ServiceCenter(long id, String name, String email, String address, String mobile, String imageurl,
//			String details) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.email = email;
//		this.address = address;
//		this.mobile = mobile;
//		this.imageurl = imageurl;
//		this.details = details;
//	}
//	public ServiceCenter() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
}
