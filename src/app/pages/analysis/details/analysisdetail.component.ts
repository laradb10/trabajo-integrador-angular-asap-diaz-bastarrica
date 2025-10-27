import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AnalysisService } from 'src/services/analysis.service';
import { Analysis } from '../interfaces/analysis.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-analysis-detail',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './analysisdetail.component.html',
    styleUrls: ['./analysisdetail.component.css']
})
export class AnalysisDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    private analysisService = inject(AnalysisService);
    private router = inject(Router);

    analysisId!: string;
    form = this.fb.group({
        name: [{ value: '', disabled: true }],
        description: [''],
        habitat: [''],
        diet: [''],
        era: [''],
        notes: [''],
        customFields: this.fb.array([])
    });

    habitatOptions = ['America del Norte', 'America Central', 'America del Sur', 'Asia', 'Europa', 'Africa', 'Oceania', 'Antartida'];
    dietOptions = ['Herbívoro', 'Carnívoro', 'Omnívoro'];
    eraOptions = ['Triásico', 'Jurásico', 'Cretácico'];

    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontró el id en la ruta',
                confirmButtonText: 'Volver'
            }).then(() => {
                this.router.navigate(['/analysis']);
            });
            return;
        }
        this.analysisId = idParam;
        this.loadAnalysis();
    }

    loadAnalysis() {
        this.analysisService.getAnalysisById(this.analysisId).subscribe(found => {
            this.form.patchValue({
                name: found.name,
                description: found.description,
                habitat: found.habitat,
                diet: found.diet,
                era: found.era,
                notes: found.notes
            });
            this.customFields.clear();
            if (found.customFields && found.customFields.length > 0) {
                found.customFields.forEach(f => this.addCustomField(f.label, f.value));
            }
        }, () => {
            this.router.navigate(['/analysis']);
        });
    }

    get customFields(): FormArray {
        return this.form.get('customFields') as FormArray;
    }

    addCustomField(label: string = '', value: string = '') {
        const group = this.fb.group({
            label: [label],
            value: [value]
        });
        this.customFields.push(group);
    }

    removeCustomField(index: number): void {
        this.customFields.removeAt(index);
    }


    onSave() {
        if (this.form.valid) {
            const raw = this.form.getRawValue(); // pongo esto porque si no me da error

            const updated: Analysis = {
                id: this.analysisId,
                name: raw.name ?? '',
                description: raw.description ?? '',
                habitat: raw.habitat ?? '',
                diet: raw.diet ?? '',
                era: raw.era ?? '',
                notes: raw.notes ?? '',
                customFields: raw.customFields?.map((f: any) => ({
                    label: f.label ?? '',
                    value: f.value ?? ''
                })) || []
            };

            this.analysisService.updateAnalysis(this.analysisId, updated)
                .subscribe(() => this.router.navigate(['/analysis']));
        }
    }

}
