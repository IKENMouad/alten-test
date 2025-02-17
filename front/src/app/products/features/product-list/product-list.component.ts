import { Component, OnInit, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CartActions } from "app/store/cart/cart.actions";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ToastModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {
  private store = inject(Store)
  private readonly productsService = inject(ProductsService);
  private readonly messageService = inject(MessageService)


  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      product.id = null;
      this.productsService.create(product).subscribe({
        error: (err) =>
          this.messageService.add({ severity: 'error', summary: 'An Error Occurred', detail: err, life: 3000 })
      });
    } else {
      this.productsService.update(product).subscribe({
        error: (err) =>
          this.messageService.add({ severity: 'error', summary: 'An Error Occurred', detail: err, life: 3000 })
      });
    }
    this.closeDialog();
  }

  public onDelete = (product: Product) => this.productsService.delete(product.id).subscribe({
    error: (err) =>
      this.messageService.add({ severity: 'error', summary: 'An Error Occurred', detail: err, life: 3000 })
  });
  public onCancel = () => this.closeDialog();
  private closeDialog = () => this.isDialogVisible = false;


  public onAddToCard = (product: Product) => this.store.dispatch(CartActions.addProduct({ product }));
}
