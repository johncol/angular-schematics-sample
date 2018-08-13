import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';

const authorText: string = `/**
 * @author John Doe
 * @email john.doe@mail.com
 */
`;

export function authorInfo(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    (tree: Tree, _context: SchematicContext) => {
      const sourceDir: string = `src/app/${options.name}`;

      tree.getDir(sourceDir).visit(filePath => {
        if (!filePath.endsWith('.ts')) {
          return;
        }

        const content: Buffer = tree.read(filePath) as Buffer;
        if (!content || content.indexOf(authorText) !== -1) {
          return;
        }

        tree.overwrite(filePath, authorText + content);
      });
    }
  ]);
}
