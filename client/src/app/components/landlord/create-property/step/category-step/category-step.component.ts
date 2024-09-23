import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryName } from '../../../../../layout/navbar/category/category.model';
import { CategoryService } from '../../../../../layout/navbar/category/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterStepComponent } from "../../../../../shared/footer-step/footer-step.component";

@Component({
  selector: 'app-category-step',
  standalone: true,
  imports: [FontAwesomeModule, FooterStepComponent],
  templateUrl: './category-step.component.html',
  styleUrl: './category-step.component.scss'
})
export class CategoryStepComponent implements OnInit{
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  categoryService: CategoryService = inject(CategoryService);

  categories: Category[] | undefined;

  categoryName = input.required<CategoryName>();

  @Output()
  categoryChange = new EventEmitter<CategoryName>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  onSelectCategory(newCategory: CategoryName): void{
    this.categoryChange.emit(newCategory);
    this.stepValidityChange.emit(true);
  }
}
