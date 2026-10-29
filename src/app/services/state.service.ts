import { Injectable, computed, signal } from '@angular/core';
import { RECURSOS } from '../data/recursos';
import { LifecycleEvent, StudyResource } from '../models/resource';

@Injectable({ providedIn: 'root' })
export class StateService {
  readonly resources = signal<StudyResource[]>(RECURSOS);
  readonly favoriteIds = signal<Set<string>>(new Set());
  readonly completedIds = signal<Set<string>>(new Set());
  readonly selectedCategory = signal<string>('Todas');
  readonly searchText = signal('');
  readonly selectedResourceId = signal<string | null>(null);
  readonly isActive = signal(true);
  readonly lastLifecycleLabel = signal('resumed · La app está activa y visible');
  readonly lifecycleHistory = signal<LifecycleEvent[]>([]);

  readonly favoriteCount = computed(() => this.favoriteIds().size);
  readonly completedCount = computed(() => this.completedIds().size);
  readonly resourceCount = computed(() => this.resources().length);

  readonly filteredResources = computed(() => {
    const q = this.searchText().trim().toLowerCase();
    const cat = this.selectedCategory();
    return this.resources().filter((r) => {
      const matchesCat = cat === 'Todas' || r.category === cat;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  });

  readonly favoriteResources = computed(() =>
    this.resources().filter((r) => this.favoriteIds().has(r.id))
  );

  readonly completedResources = computed(() =>
    this.resources().filter((r) => this.completedIds().has(r.id))
  );

  readonly progressPercent = computed(() => {
    const total = this.resourceCount();
    if (!total) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  readonly pendingCount = computed(() => this.resourceCount() - this.completedCount());

  readonly progressByCategory = computed(() => {
    const map = new Map<string, { total: number; completed: number }>();
    for (const r of this.resources()) {
      const entry = map.get(r.category) ?? { total: 0, completed: 0 };
      entry.total += 1;
      if (this.completedIds().has(r.id)) entry.completed += 1;
      map.set(r.category, entry);
    }
    return [...map.entries()].map(([category, stats]) => ({
      category,
      ...stats,
      percent: stats.total ? Math.round((stats.completed / stats.total) * 100) : 0,
    }));
  });

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  isCompleted(id: string): boolean {
    return this.completedIds().has(id);
  }

  toggleFavorite(id: string): void {
    const next = new Set(this.favoriteIds());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.favoriteIds.set(next);
  }

  toggleCompleted(id: string): void {
    const next = new Set(this.completedIds());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.completedIds.set(next);
  }

  setSearch(text: string): void {
    this.searchText.set(text);
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  openResource(id: string): void {
    this.selectedResourceId.set(id);
  }

  getResourceById(id: string): StudyResource | undefined {
    return this.resources().find((r) => r.id === id);
  }

  pushLifecycleEvent(name: string, isActive?: boolean): void {
    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const event: LifecycleEvent = { name, timestamp, isActive };
    this.lifecycleHistory.update((prev) => [event, ...prev].slice(0, 8));

    if (typeof isActive === 'boolean') {
      this.isActive.set(isActive);
      this.lastLifecycleLabel.set(
        isActive
          ? `${name} · La app está activa y visible`
          : `${name} · La app está en segundo plano`
      );
    } else {
      this.lastLifecycleLabel.set(`${name} · ${timestamp}`);
    }
  }
}
