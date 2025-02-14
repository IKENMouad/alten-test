package com.alten.test.service;

import java.util.List;

import com.alten.test.model.Product;

public interface ProductService {

	Product addProduct(Product product);

	Product getProduct(Long id);

	Product updateProduct(Long id, Product product);

	String deleteProduct(Long id);

	List<Product> getProducts();

	List<Product> addProducts(List<Product> products);
}
