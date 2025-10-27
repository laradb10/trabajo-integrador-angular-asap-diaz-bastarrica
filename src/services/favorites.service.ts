import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dino } from '@app/dino/interfaces/dino.interface';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3001/favorites';
  getFavorites(): Observable<Dino[]> {
    return this.http.get<Dino[]>(this.url);
  }

  addFavorite(dino: Dino): Observable<Dino> {
    console.log(dino.id);
    return this.http.post<Dino>(this.url, dino);
  }

  removeFavorite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
