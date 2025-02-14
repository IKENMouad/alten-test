package com.alten.test.model;

import com.alten.test.enums.InventoryStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String code;
	private String name;
	private String description;
	private String image;
	private String category;
	private double price;
	private double quantity;
	private String internalReference;
	private double shellId;
	private InventoryStatus inventoryStatus;
	private int rating;
	private Long createdAt;
	private Long updatedAt;
}
