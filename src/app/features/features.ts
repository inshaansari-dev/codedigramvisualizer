import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  features = [
    {
      icon: '⚡',
      title: 'Instant Generation',
      description: 'Diagrams render in seconds, no matter how large or complex your codebase is.',
    },
    {
      icon: '🧩',
      title: 'Multi-Language Support',
      description: 'Works across JavaScript, TypeScript, Python, Java, and more out of the box.',
    },
    {
      icon: '🔄',
      title: 'Always in Sync',
      description: 'Update your code and regenerate the diagram — no more outdated documentation.',
    },
    {
      icon: '🎨',
      title: 'Interactive Diagrams',
      description: 'Pan, zoom, and click through nodes to explore relationships in your code.',
    },
    {
      icon: '📤',
      title: 'Export Anywhere',
      description: 'Download diagrams as SVG or PNG, or share a link with your team.',
    },
    {
      icon: '🔒',
      title: 'Private & Secure',
      description: 'Your code is processed securely and never stored longer than needed.',
    },
  ];
}
