import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortComponent } from './search-sort.component';

describe('SearchSortComponent', () => {
  let component: SearchSortComponent;
  let fixture: ComponentFixture<SearchSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
