import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analysis } from '@app/pages/analysis/interfaces/analysis.interface';


@Injectable({ providedIn: 'root' })
export class AnalysisService {
    private http = inject(HttpClient);
    private url = 'http://localhost:3002/analysis';

    getAnalysis(): Observable<Analysis[]> {
        return this.http.get<Analysis[]>(this.url);
    }

    addAnalysis(dino: Analysis): Observable<Analysis> {
        return this.http.post<Analysis>(this.url, dino);
    }

    removeAnalysis(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    updateAnalysis(id: string, dino: Analysis): Observable<Analysis> {
        return this.http.put<Analysis>(`${this.url}/${id}`, dino);
    }

    getAnalysisById(id: string): Observable<Analysis> {
        return this.http.get<Analysis>(`${this.url}/${id}`);
    }


}
