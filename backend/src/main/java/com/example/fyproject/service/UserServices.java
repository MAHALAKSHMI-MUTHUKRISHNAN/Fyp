package com.example.fyproject.service;


import com.example.fyproject.entity.Users;

import java.util.List;

public interface UserServices {
	public List<Users> getUser();

	public String addUser(Users user);

    Users editUser(Users user);

	Users deleteUser(long id);
}
