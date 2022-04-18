package com.example.fyproject.controller;

import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.dao.UserDao;
import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.Rating;
import com.example.fyproject.entity.ServiceCenter;
import com.example.fyproject.entity.Users;
import com.example.fyproject.service.ServiceCenterServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceCenterController {
	@Autowired
	private ServiceCenterServices centerService;
	@Autowired
	private UserDao dao;
	@PostMapping("/addServiceCenter")
	public String addCenter(@RequestBody ServiceCenter center) {
		Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin();
		//System.out.println("add Center request isAdmin-> "+currentUserLogin.get().equals("admin"));
		//if(currentUserLogin.get().equals("admin")){
		Users user = dao.findByUsername(SecurityUtils.getCurrentUserLogin().get());
		center.setU_id(user.getId());
		System.out.println(center.getU_id());
			System.out.println(currentUserLogin.get());
			return this.centerService.addCenter(center);
		//}else {
		//	return null;
		//}
	}
	@GetMapping("/getCenters/user")
	public List<ServiceCenter> getUserCenters(){
		return this.centerService.getUserCenters();
	}

	@GetMapping("/viewAllCenter")
	public List<ServiceCenter> viewAllCenter(){
		return this.centerService.viewAllCenter();
	}


	@GetMapping("/viewCenterByType/{id}")
	public List<ServiceCenter> viewCenterByType(@PathVariable String id){
		return this.centerService.viewCenterByType(Long.parseLong(id));
	}

	@DeleteMapping("/deleteCenter/{id}")
	public ServiceCenter deleteCenter(@PathVariable String id) {
		ServiceCenter deleted = this.centerService.deleteCenter(Long.parseLong(id));
		return deleted;
	}
	@PutMapping("/updateCenter")
		public String updateCenter(@RequestBody ServiceCenter center) {
			return this.centerService.updateCenter(center);
		}
}
