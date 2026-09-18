import { Component } from '@angular/core';

@Component({
  selector: 'app-code-to-diagram',
  imports: [],
  templateUrl: './code-to-diagram.html',
  styleUrl: './code-to-diagram.scss',
})
export class CodeToDiagram {
  steps = [
    {
      title: 'Paste your code',
      description: 'Drop in a file, a repo snippet, or an entire module — any language, any size.',
    },
    {
      title: 'We parse the structure',
      description: 'The engine walks your code and maps out classes, functions, and their relationships.',
    },
    {
      title: 'Get a living diagram',
      description: 'A clean, diagram is generated instantly and stays in sync as your code changes.',
    },
  ];
  
}
