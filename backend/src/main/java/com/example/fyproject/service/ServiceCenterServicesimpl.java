package com.example.fyproject.service;

import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.dao.ServiceCenterDao;
import com.example.fyproject.dao.UserDao;
import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.Rating;
import com.example.fyproject.entity.ServiceCenter;
import com.example.fyproject.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ServiceCenterServicesimpl implements com.example.fyproject.service.ServiceCenterServices {
	@Autowired
	private ServiceCenterDao centerDao;
	@Autowired
	private UserDao dao;

	@Override
	public String addCenter(ServiceCenter center) {
		List<ServiceCenter> centers = viewAllCenter();

		for(ServiceCenter x : centers){
			if(x.getId()==center.getId()){
				return "id";
			}
			if((x.getName().toLowerCase()).equals(center.getName().toLowerCase()) && (x.getAddress().toLowerCase()).equals(x.getAddress().toLowerCase())){
				return "exist";
			}
		}
		this.centerDao.save(center);
		System.out.println(center.getU_id());
		List<Users> users = this.dao.findAll();
		for(Users y:users){
			if(Objects.equals(y.getId(),center.getU_id())){
				y.getServiceCenters().add(center);
				this.dao.save(y);
			}
		}
		return "success";
	}
	@Override
	public List<ServiceCenter> viewAllCenter() {
		// TODO Auto-generated method stub
		Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin();
		System.out.println(currentUserLogin.get());
		
		return centerDao.findAll();
	}

	@Override
	public List<ServiceCenter> getUserCenters() {
		Users user = dao.findByUsername(SecurityUtils.getCurrentUserLogin().get());
		List<ServiceCenter> result = user.getServiceCenters();

		return result;
	}


	public List<ServiceCenter> viewCenterByType(long sctype) {

		return centerDao.findBySctype(sctype);
	}

	@Override
	public ServiceCenter deleteCenter(long id) {
		// TODO Auto-generated method stub
		List<ServiceCenter> centers = viewAllCenter();
		ServiceCenter center = new ServiceCenter();
		for(ServiceCenter x : centers) {
			if(x.getId()==id) {
				center = x;
				this.centerDao.delete(center);
			}
		}
		return center;
	}
	@Override
	public String updateCenter(ServiceCenter center) {
		Optional<ServiceCenter> centerTemp = this.centerDao.findById(center.getId());
		ServiceCenter center1 = centerTemp.orElseThrow(()->new RuntimeException("No suh data found"));
		List<ServiceCenter> centers = viewAllCenter();
		for(ServiceCenter x: centers){
			if(Objects.equals(x,center1)){
				continue;
			}
			if((x.getName().toLowerCase()).equals(center.getName().toLowerCase()) && (x.getAddress().toLowerCase()).equals(center.getAddress().toLowerCase())){
				return "exist";
			}
		}

		center1.setName(center.getName());
		center1.setAddress(center.getAddress());
		center1.setDetails(center.getDetails());
		center1.setEmail(center.getEmail());
		center1.setMobile(center.getMobile());
		center1.setImageurl(center.getImageurl());


		this.centerDao.save(center1);
		return "success";

	}

}
