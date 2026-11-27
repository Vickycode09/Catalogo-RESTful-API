import { Component } from '@angular/core';
import { Lista } from './components/lista/lista';

@Component({
  imports: [Lista],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
