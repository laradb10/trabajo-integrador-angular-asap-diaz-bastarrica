import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Dino } from '../interfaces/dino.interface';

@Injectable({ providedIn: 'root' })
export class DinoService {
  private http = inject(HttpClient);
  private url = 'https://dinosaur-facts-api.shultzlab.com';

  getAllDinos(): Observable<Dino[]> {
    return this.http.get<any[]>(`${this.url}/dinosaurs`).pipe(
      map(res =>
        res.map(d => ({
          name: d.Name,
          description: d.Description
        }))
      )
    );
  }
}







