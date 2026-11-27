import { Component, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css',
})
export class Tarjeta {
  readonly personaje = input.required<Pokemon>();

  protected abilityNames(): string {
    return this.personaje().abilities.map(({ ability }) => ability.name).join(', ');
  }
}
