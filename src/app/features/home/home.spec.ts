import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('debe crear una instancia de Home', () => {
    expect(component instanceof Home).toBe(true);
  });

  it('el componente no debe ser null', () => {
    expect(component).not.toBeNull();
  });
});