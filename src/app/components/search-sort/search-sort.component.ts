import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-sort',
  templateUrl: './search-sort.component.html',
  styleUrls: ['./search-sort.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SearchSortComponent {
  searchTerm: string = '';
  sortProperty: string = 'name'; // Default sort property
  sortDirection: boolean = true; // true for ascending

  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<{ property: string; direction: boolean }>();

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onSortChange(property: string) {
    this.sortDirection = this.sortProperty === property ? !this.sortDirection : true;
    this.sortProperty = property;
    this.sortChange.emit({ property: this.sortProperty, direction: this.sortDirection });
  }
}
