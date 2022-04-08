package com.example.fyproject.controller;

import com.example.fyproject.entity.Login;
import com.example.fyproject.entity.Users;
import com.example.fyproject.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MyController {
	@Autowired
	private UserServices User;
	
	@GetMapping("/getuser")
	public List<Users> getUser(){
		return this.User.getUser();
	}

	@GetMapping("/getOnlyUser")
	public List<Users> getOnlyUser(){
		List<Users> allUser = getUser();
		List<Users> onlyUser = new ArrayList<>();
		for(Users u:allUser){
			if(u.getRole().equals("admin")){
				continue;
			}
			onlyUser.add(u);
		}
		return onlyUser;
	}
	@PostMapping("/signup")
	public String addUser(@RequestBody Users user,HttpSession session) {
		//user.setRole("user");
		return this.User.addUser(user);
	}
	
	
	@PostMapping("/login")
	public Users validateUser(@RequestBody Login login) {
		List<Users> user = getUser();
		for(Users u:user){
			if((login.getEmail().equals(u.getEmail()))&&(login.getPassword().equals(u.getPassword()))) 
			{
				return u;
			}
		}
		return null;
	}
	
	@PutMapping("/editUser")
	public Users editUser(@RequestBody Users user){
		this.User.editUser(user);
		return user;
	}

	@DeleteMapping("/deleteUser/{id}")
	public Users deleteUser(@PathVariable String id){
		return this.User.deleteUser(Long.parseLong(id));
	}

}
