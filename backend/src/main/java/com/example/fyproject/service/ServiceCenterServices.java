package com.example.fyproject.service;

import com.example.fyproject.entity.ServiceCenter;

import java.util.List;

public interface ServiceCenterServices {

	String addCenter(ServiceCenter center);

	List<ServiceCenter> viewAllCenter();

	List<ServiceCenter> viewCenterByType(long sctype);

	ServiceCenter deleteCenter(long id);

	String updateCenter(ServiceCenter center);

}
