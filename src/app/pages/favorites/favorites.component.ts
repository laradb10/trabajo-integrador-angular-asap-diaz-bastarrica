import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoriteService } from 'src/services/favorites.service';
import { AnalysisService } from 'src/services/analysis.service';
import Swal from 'sweetalert2';

import { Dino } from '@app/dino/interfaces/dino.interface';
import { Analysis } from '@app/pages/analysis/interfaces/analysis.interface';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: '../../dino/listdino.component.html',
  styleUrls: ['../../dino/listdino.component.css']
})
export class FavoritesComponent implements OnInit {
  private favService = inject(FavoriteService);
  private analysisService = inject(AnalysisService);

  pageTitle = 'My Favorites';

  favorites = signal<Dino[]>([]);
  analysis = signal<Analysis[]>([]);

  searchTerm = signal<string>('');
  letterFilter = signal<string>('');
  loading = signal<boolean>(true);

  filteredDinos = computed(() => {
    let dinos = this.favorites();
    const term = this.searchTerm().toLowerCase();
    if (term) {
      dinos = dinos.filter(d => d.name.toLowerCase().includes(term));
    }
    const letter = this.letterFilter();
    if (letter) {
      dinos = dinos.filter(d => d.name.toLowerCase().startsWith(letter.toLowerCase()));
    }
    return dinos;
  });

  showClear = computed(() => !!this.searchTerm() || !!this.letterFilter());

  ngOnInit() {
    this.loadFavorites();
    this.loadAnalysis();
  }

  loadFavorites() {
    this.favService.getFavorites().subscribe(data => {
      this.favorites.set(data);
      this.loading.set(false);
    });
  }

  loadAnalysis() {
    this.analysisService.getAnalysis().subscribe(list => this.analysis.set(list));
  }

  updateSearch(term: string) {
    this.searchTerm.set(term || '');
  }

  filterByLetter(letter: string) {
    this.letterFilter.set(letter);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.letterFilter.set('');
  }

  isFavorite(_: Dino): boolean {
    return true;
  }

  addToFavorites(dino: Dino) {
    if (dino.id) {
      this.favService.removeFavorite(dino.id).subscribe(() => this.loadFavorites());
    }
  }

  isInAnalysis(dino: Dino): boolean {
    return this.analysis().some(a => a.name === dino.name);
  }

  addToAnalysis(dino: Dino) {
    const payload: Analysis = {
      name: dino.name,
      description: dino.description,
      habitat: '',
      diet: '',
      era: '',
      notes: '',
      customFields: []
    };

    if (this.isInAnalysis(dino)) {
      Swal.fire({
        title: 'Ya está en análisis',
        text: '¿Deseás crear otro análisis para este dinosaurio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear otro',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.analysisService.addAnalysis(payload).subscribe(() => this.loadAnalysis());
        }
      });
    } else {
      this.analysisService.addAnalysis(payload).subscribe(() => this.loadAnalysis());
    }
  }
}
