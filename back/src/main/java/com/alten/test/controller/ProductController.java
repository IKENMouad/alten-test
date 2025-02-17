package com.alten.test.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alten.test.model.Product;
import com.alten.test.service.ProductService;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin("*")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@PostMapping
	public Product createProduct(@RequestBody Product product) {
		return productService.addProduct(product);
	}

	@PatchMapping("/{id}")
	public Product updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
		return productService.updateProduct(id, product);
	}

	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable("id") Long id) {
		return productService.deleteProduct(id);
	}

	@PostMapping("/batch")
	public List<Product> createProduct(@RequestBody List<Product> products) {
		return productService.addProducts(products);
	}

	@GetMapping("/{id}")
	public Product getProduct(@PathVariable("id") Long id) {
		return productService.getProduct(id);
	}

	@GetMapping
	public List<Product> getProducts(Principal principal) {
		return productService.getProducts();
	}
}
