package com.example.fyproject.dao;

import com.example.fyproject.entity.ServiceCenter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceCenterDao extends JpaRepository<ServiceCenter,Long>{
    List<ServiceCenter> findBySctype(long sctype);

}
