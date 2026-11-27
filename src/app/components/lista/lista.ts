import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { ApiService } from '../../services/api.service';
import { Tarjeta } from '../tarjeta/tarjeta';

@Component({
  selector: 'app-lista',
  imports: [Tarjeta],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  private readonly api = inject(ApiService);
  protected readonly personajes = signal<Pokemon[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: (response) => {
        if (response.results.length === 0) {
          this.personajes.set([]);
          this.cargando.set(false);
          return;
        }

        forkJoin(response.results.map(({ name }) => this.api.getById(name))).subscribe({
          next: (personajes) => {
            this.personajes.set(personajes.sort((first, second) => first.id - second.id));
            this.cargando.set(false);
          },
          error: (cause: unknown) => {
            this.error.set(this.errorMessage(cause));
            this.cargando.set(false);
          },
        });
      },
      error: (cause: unknown) => {
        this.error.set(this.errorMessage(cause));
        this.cargando.set(false);
      },
    });
  }

  private errorMessage(cause: unknown): string {
    return cause instanceof Error ? cause.message : 'No se pudo obtener la información';
  }
}
