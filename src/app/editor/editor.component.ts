import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface DiagramType {
  id: string;
  label: string;
  icon: SafeHtml;
}

const DIAGRAM_TYPE_ICONS: Record<string, string> = {
  flowchart: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="3" width="7" height="5" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="8.5" y="16" width="7" height="5" rx="1.2" stroke="currentColor" stroke-width="1.7"/><path d="M6.5 8v3a2 2 0 0 0 2 2h3M17.5 8v3a2 2 0 0 1-2 2h-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  sequence: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="3.2" rx="1" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="10.4" width="12" height="3.2" rx="1" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="16.8" width="15" height="3.2" rx="1" stroke="currentColor" stroke-width="1.7"/></svg>`,
  class: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 9h16M4 14h16" stroke="currentColor" stroke-width="1.7"/></svg>`,
  er: `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5.5" rx="8" ry="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 5.5V18.5C4 19.88 7.58 21 12 21C16.42 21 20 19.88 20 18.5V5.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 12c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
  state: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="3.3" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="17" r="3.3" stroke="currentColor" stroke-width="1.7"/><path d="M9.8 9.2 14.2 14.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  gantt: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 4v16h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="6.5" y="6" width="6" height="2.6" rx="1" fill="currentColor"/><rect x="9.5" y="11" width="9" height="2.6" rx="1" fill="currentColor"/><rect x="6.5" y="16" width="4" height="2.6" rx="1" fill="currentColor"/></svg>`,
  pie: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 0 9 9h-9V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M15 3.5A9 9 0 0 1 20.5 9H13.5L15 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  mindmap: `<svg viewBox="0 0 24 24" fill="none"><circle cx="4.5" cy="12" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="5.5" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="12" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="18.5" r="2" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 12h5.5M12.3 7.1 8.8 10.6M12.3 16.9 8.8 13.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="16" y="4.2" width="6" height="2.6" rx="0.8" fill="currentColor"/><rect x="16" y="10.7" width="6" height="2.6" rx="0.8" fill="currentColor"/><rect x="16" y="17.2" width="6" height="2.6" rx="0.8" fill="currentColor"/></svg>`,
  userJourney: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="6" r="2.4" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 20c0-3.3 2.8-5.5 6-5.5 1.2 0 2.3.3 3.2.9M13 12l3 3 5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  gitGraph: `<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="5" r="2" stroke="currentColor" stroke-width="1.7"/><circle cx="6" cy="19" r="2" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="1.7"/><path d="M6 7v10M6 9c0 4 4 3 10 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  others: `<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>`,
};

@Component({
  selector: 'app-editor',
  imports: [FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  private sanitizer = inject(DomSanitizer);
  private elementRef = inject(ElementRef<HTMLElement>);

  diagramTypes: DiagramType[] = (
    [
      { id: 'flowchart', label: 'Flowchart' },
      { id: 'sequence', label: 'Sequence' },
      { id: 'class', label: 'Class' },
      { id: 'er', label: 'ER' },
      { id: 'state', label: 'State' },
      { id: 'gantt', label: 'Gantt' },
      { id: 'pie', label: 'Pie' },
      { id: 'mindmap', label: 'Mindmap' },
      { id: 'userJourney', label: 'User Journey' },
      { id: 'gitGraph', label: 'Git Graph' },
      { id: 'others', label: 'Others' },
    ] as { id: string; label: string }[]
  ).map((type) => ({
    ...type,
    icon: this.sanitizer.bypassSecurityTrustHtml(DIAGRAM_TYPE_ICONS[type.id]),
  }));

  selectedDiagramTypeId = 'flowchart';
  isDiagramMenuOpen = false;

  get selectedDiagramType(): DiagramType {
    return this.diagramTypes.find((t) => t.id === this.selectedDiagramTypeId) ?? this.diagramTypes[0];
  }

  toggleDiagramMenu() {
    this.isDiagramMenuOpen = !this.isDiagramMenuOpen;
  }

  selectDiagramType(id: string) {
    this.selectedDiagramTypeId = id;
    this.isDiagramMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isDiagramMenuOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isDiagramMenuOpen = false;
    }
  }

  code = `public class Order {
    private UUID id;
    private Customer customer;
    private List<Item> items;

    public double total() {
        return items.stream()
                .mapToDouble(Item::price)
                .sum();
    }

    public void addItem(Item item) {
        items.add(item);
    }
}`;

  get lineNumbers(): number[] {
    const count = this.code.length === 0 ? 1 : this.code.split('\n').length;
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  clearCode() {
    this.code = '';
  }

  syncScroll(textarea: HTMLTextAreaElement, gutter: HTMLElement) {
    gutter.scrollTop = textarea.scrollTop;
  }
}
