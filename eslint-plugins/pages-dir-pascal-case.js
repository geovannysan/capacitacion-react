import path from 'node:path';

/**
 * Valida que los directorios de primer nivel bajo `pages/` usen PascalCase.
 * Ejemplo válido:   src/pages/Auth/...
 * Ejemplo inválido: src/pages/auth/...
 */
const pagesDirPascalCaseRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Los directorios de primer nivel bajo `pages/` deben ser PascalCase (ej: Auth, Character).',
    },
    schema: [],
    messages: {
      invalid:
        'El directorio "{{dir}}" bajo pages/ debe ser PascalCase (ej: "{{expected}}").',
    },
  },
  create(context) {
    return {
      Program(node) {
        const filePath = context.getFilename();
        if (filePath === '<text>') return;

        // Normaliza separadores
        const normalized = filePath.replace(/\\/g, '/');

        // Captura el segmento inmediatamente después de pages/
        const match = normalized.match(/\/pages\/([^/]+)\//);
        if (!match) return;

        const segment = match[1];
        // PascalCase: empieza con mayúscula
        if (!/^[A-Z]/.test(segment)) {
          const expected = segment.charAt(0).toUpperCase() + segment.slice(1);
          context.report({
            node,
            messageId: 'invalid',
            data: { dir: segment, expected },
          });
        }
      },
    };
  },
};

export default pagesDirPascalCaseRule;
