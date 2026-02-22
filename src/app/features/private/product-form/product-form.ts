import { Component, inject, input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from '@core/services/catalog';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  id = input<string>(); // Viene de la URL si es edición
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private catalogService = inject(CatalogService);
  private router = inject(Router);
  categories = toSignal(this.catalogService.getCategories(), { initialValue: [] });
  conditions = toSignal(this.catalogService.getConditions(), { initialValue: [] });
  statuses = toSignal(this.catalogService.getStatuses(), { initialValue: [] });

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [null, [Validators.required]], // IDs temporales para tu API NestJS
    statusId: [null, [Validators.required]],
    conditionId: [null, [Validators.required]],
    userId: [1]
  });

  ngOnInit() {
    if (this.id()) {
      this.productService.getProductById(this.id()!).subscribe(prod => {
        this.productForm.patchValue(prod as any);
      });
    }
  }

  save() {
    const data = this.productForm.value;
    const request = this.id()
      ? this.productService.update(this.id()!, data) // Debes crear update() en tu service de Angular
      : this.productService.create(data);            // Debes crear create() en tu service de Angular

    request.subscribe(() => this.router.navigate(['/catalog']));
  }
}
