import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnalysisService } from 'src/services/analysis.service';
import { Analysis } from '../interfaces/analysis.interface';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  
  private analysisService = inject(AnalysisService);

  analysisList = signal<Analysis[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadAnalysis();
  }

  loadAnalysis() {
    this.analysisService.getAnalysis().subscribe(data => {
      this.analysisList.set(data);
      this.loading.set(false);
    });
  }

  deleteAnalysis(id: string) {
    this.analysisService.removeAnalysis(id).subscribe(() => this.loadAnalysis());
  }
}
