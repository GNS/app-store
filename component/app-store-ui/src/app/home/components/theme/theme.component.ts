import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { AppThemeChangeAction, ToggleParticleAction, ToggleMenuBackgroundAction } from '../../../app.actions';

@Component({
  selector: 'store-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public selectedTheme: string;
  public particleAnimation: boolean;
  public meunBackImage: boolean;

  public allThemes = [
    {
      name: 'Default Theme',
      className: 'theme-one-light',
      primary: '#42A5F5',
      accent: '#E91E63',
      warn: '#F44336'
    },
    {
      name: 'Apigate Green',
      className: 'theme-apigate-green',
      primary: '#2BB673',
      accent: '#231F20',
      warn: '#F44336'
    },
    {
      name: 'Apigate Blue',
      className: 'theme-apigate-blue',
      primary: '#231F20',
      accent: '#00AEEF',
      warn: '#F44336'
    },
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => this.selectedTheme = theme);
    this.store.select((s) => s.global.layout.particleAnimation).subscribe((flag) => this.particleAnimation = flag);
    this.store.select((s) => s.global.layout.menuBackImage).subscribe((flag) => this.meunBackImage = flag);
  }

  onChange(e) {
    this.store.dispatch(new AppThemeChangeAction(e.value));
  }

  onAnimationToggle(e) {
    this.store.dispatch(new ToggleParticleAction(e.checked));
  }

  onBackgroundToggle(e) {
    this.store.dispatch(new ToggleMenuBackgroundAction(e.checked));
  }
}
