import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListPage } from './anime-list.page';

describe('AnimeListPage', () => {
  let component: AnimeListPage;
  let fixture: ComponentFixture<AnimeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
