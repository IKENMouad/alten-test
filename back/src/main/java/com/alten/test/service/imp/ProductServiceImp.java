package com.alten.test.service.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.alten.test.model.Product;
import com.alten.test.repository.ProductRepository;
import com.alten.test.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImp implements ProductService {

	private final ProductRepository productRepo;

	private String generateProductCode() {
		String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		StringBuilder sb = new StringBuilder();
		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			int index = random.nextInt(alphabet.length());
			char randomChar = alphabet.charAt(index);
			sb.append(randomChar);
		}

		return sb.toString();
	}

	@Override
	public Product updateProduct(Long id, Product product) {
		Product existedProduct = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		existedProduct.setName(product.getName());
		existedProduct.setPrice(product.getPrice());
		existedProduct.setDescription(product.getDescription());
		existedProduct.setCategory(product.getCategory());
		existedProduct.setUpdatedAt(System.currentTimeMillis());
		productRepo.save(existedProduct);
		return existedProduct;
	}

	@Override
	public String deleteProduct(Long id) {
		try {
			productRepo.deleteById(id);
			return "DELETED";
		} catch (Exception e) {
			return "Product not deleted ";
		}
	}

	@Override
	public Product addProduct(Product product) {
		product.setCreatedAt(System.currentTimeMillis());
		if (product.getCode() == null)
			product.setCode(generateProductCode());
		return productRepo.save(product);
	}

	@Override
	public List<Product> addProducts(List<Product> products) {
		List<Product> createdProducts = new ArrayList<>();

		for (Product product : products)
			createdProducts.add(addProduct(product));

		return createdProducts;
	}

	@Override
	public Product getProduct(Long productId) {
		return productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
	}

	@Override
	public List<Product> getProducts() {
		return productRepo.findAll();
	}
}
