import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from '@movilBA/ui';

@Component({
  imports: [RouterModule, DrawerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: '../styles.scss',
})
export class App {
  protected title = 'movilBA';
}
