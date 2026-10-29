import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CATEGORY_COLORS } from '../../data/recursos';
import { LEVEL_LABELS, ResourceLevel, StudyResource } from '../../models/resource';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';
import { typeIcon } from '../../shared/icons';

@Component({
  selector: 'app-resource-list-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './resource-list-card.component.html',
  styleUrl: './resource-list-card.component.scss',
})
export class ResourceListCardComponent {
  @Input({ required: true }) resource!: StudyResource;
  @Output() open = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<string>();

  readonly state = inject(StateService);

  typeIcon = typeIcon;

  categoryLight(category: string): string {
    return (CATEGORY_COLORS as Record<string, { light: string }>)[category]?.light ?? '#A5B4FC';
  }

  levelLabel(level: ResourceLevel): string {
    return LEVEL_LABELS[level];
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.resource.id);
  }
}
