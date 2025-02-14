package com.alten.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alten.test.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
