import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://pokeapi.co/api/v2/pokemon';
  private readonly pageSize = 20;

  getAll(pagina = 1): Observable<PokemonListResponse> {
    const offset = (pagina - 1) * this.pageSize;

    return this.http
      .get<PokemonListResponse>(`${this.url}?limit=${this.pageSize}&offset=${offset}`)
      .pipe(
        catchError((err: unknown) => {
          console.error(err);
          return throwError(() => new Error('No se pudo obtener la información'));
        }),
      );
  }

  getById(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/${id}`).pipe(
      catchError((err: unknown) => {
        console.error(err);
        return throwError(() => new Error('No se pudo obtener la información'));
      }),
    );
  }
}
