package com.example.fyproject.controller;

import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.Rating;
import com.example.fyproject.entity.ServiceCenter;
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
	
	@PostMapping("/addServiceCenter")
	public String addCenter(@RequestBody ServiceCenter center) {
		Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin();
		//System.out.println("add Center request isAdmin-> "+currentUserLogin.get().equals("admin"));
		//if(currentUserLogin.get().equals("admin")){
			System.out.println(currentUserLogin.get());
			return this.centerService.addCenter(center);
		//}else {
		//	return null;
		//}
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
