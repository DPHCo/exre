import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LEVEL_LABELS, ResourceLevel, StudyResource } from '../../models/resource';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';
import { typeIcon } from '../../shared/icons';

@Component({
  selector: 'app-resource-grid-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './resource-grid-card.component.html',
  styleUrl: './resource-grid-card.component.scss',
})
export class ResourceGridCardComponent {
  @Input({ required: true }) resource!: StudyResource;
  @Output() open = new EventEmitter<string>();

  readonly state = inject(StateService);
  typeIcon = typeIcon;

  levelLabel(level: ResourceLevel): string {
    return LEVEL_LABELS[level];
  }
}
