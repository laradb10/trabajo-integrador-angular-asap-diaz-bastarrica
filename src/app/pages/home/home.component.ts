import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Analysis } from '../analysis/interfaces/analysis.interface';
import { AnalysisService } from 'src/services/analysis.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private analysisService = inject(AnalysisService);

  lastAnalysis = signal<Analysis[]>([]);

  ngOnInit() {
    this.analysisService.getAnalysis().subscribe(list => {
      this.lastAnalysis.set(list);
    });
  }
}
