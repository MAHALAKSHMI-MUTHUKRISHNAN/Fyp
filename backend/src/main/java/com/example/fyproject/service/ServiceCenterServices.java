package com.example.fyproject.service;

import com.example.fyproject.entity.ServiceCenter;

import java.util.List;
import java.util.Optional;

public interface ServiceCenterServices {

	String addCenter(ServiceCenter center);

	List<ServiceCenter> viewAllCenter();
	List<ServiceCenter> getUserCenters();
	List<ServiceCenter> viewCenterByType(long sctype);
	Optional<ServiceCenter> viewCenterById(long id);

	ServiceCenter deleteCenter(long id);

	String updateCenter(ServiceCenter center);

}
