# Guía de Testing — capacitacion-react

## Stack de testing

| Librería                        | Rol                                                                    |
| ------------------------------- | ---------------------------------------------------------------------- |
| **Vitest**                      | Test runner (integrado con Vite)                                       |
| **@testing-library/react**      | Render de componentes y hooks                                          |
| **@testing-library/jest-dom**   | Matchers extra para el DOM (`toBeInTheDocument`, `toBeDisabled`, etc.) |
| **@testing-library/user-event** | Simula interacciones reales del usuario                                |
| **jsdom**                       | Entorno DOM virtual para Node                                          |

---

## Comandos

```bash
npm run test            # Ejecuta todos los tests una vez
npm run test:watch      # Modo watch (re-ejecuta al guardar)
npm run test:coverage   # Genera reporte de cobertura en /coverage
```

---

## Estructura de archivos

Los tests se ubican en carpetas `__tests__` junto al código que prueban:

```
src/
├── pages/character/
│   ├── adapters/
│   │   ├── character-adacter.adapter.ts
│   │   └── __tests__/
│   │       └── character-adapter.test.ts       ← adapter puro
│   ├── hooks/
│   │   ├── useFetchCharacters.ts
│   │   ├── useSearchCharacters.ts
│   │   └── __tests__/
│   │       ├── useFetchCharacters.test.ts      ← hook con fetch
│   │       └── useSearchCharacters.test.tsx    ← hook con React Query + Router
│   └── components/
│       ├── ButtonCountCharter.tsx
│       ├── InputCharacter.tsx
│       ├── ListCharacter.tsx
│       └── __tests__/
│           ├── ButtonCountCharter.test.tsx     ← componente UI
│           ├── InputCharacter.test.tsx         ← componente controlado
│           └── ListCharacter.test.tsx          ← lista con mock de hijo
└── test/
    └── setup.ts                                ← setup global (jest-dom)
```

---

## Cómo se testea cada tipo

### 1. Funciones puras / Adapters

Son las más simples: importas la función y verificas el output.

```ts
// character-adapter.test.ts
it('trunca el nombre a 12 caracteres', () => {
  const result = characterAdapter({ characters: mockCharacters });
  expect(result[0].name.length).toBeLessThanOrEqual(12);
});
```

No necesitan mocks ni wrappers. Ideal para empezar.

---

### 2. Hooks con estado propio (`useFetchCharacters`)

Usa `renderHook` de `@testing-library/react`. Si el hook llama servicios externos, **mockea el módulo** con `vi.mock`.

```ts
vi.mock('../../services', () => ({
  rickAndMortyService: {
    getCharacters: vi.fn(),
  },
}));

it('carga personajes correctamente', async () => {
  vi.mocked(rickAndMortyService.getCharacters).mockResolvedValue(mockResponse);
  const { result } = renderHook(() => useFetchCharacters());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.characters).toHaveLength(1);
});
```

- Usa `waitFor` para esperar actualizaciones asíncronas.
- Usa `act` para disparar cambios de estado síncronos (`setPage`).

---

### 3. Hooks con React Query + Router (`useSearchCharacters`)

Necesitan un **wrapper** que provea `QueryClient` y `MemoryRouter`:

```tsx
const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

const { result } = renderHook(() => useSearchCharacters(), { wrapper });
```

Mockea los hooks internos que hacen fetch para aislar la lógica:

```ts
vi.mock('../useFetchApicharcter', () => ({
  useFetchApicharcter: () => ({ characters: mockCharacters, error: null, isLoading: false }),
}));
```

---

### 4. Componentes UI simples (`ButtonCountCharter`, `InputCharacter`)

Usa `render` + `screen` para buscar elementos y `userEvent` para interacciones:

```tsx
it('llama incrementPage al hacer click en Sig.', async () => {
  const incrementPage = vi.fn();
  render(<ButtonCountCharter {...props} incrementPage={incrementPage} />);
  await userEvent.click(screen.getByText('Sig.'));
  expect(incrementPage).toHaveBeenCalledTimes(1);
});
```

Regla: **nunca busques por clase CSS o estructura HTML**, usa texto visible o roles accesibles.

---

### 5. Componentes con hijos complejos (`ListCharacter`)

Cuando un hijo usa hooks con dependencias externas, **mockea el componente hijo** para aislar el test del padre:

```tsx
vi.mock('../CharacterCard', () => ({
  CharacterCard: ({ character }) => <div data-testid="character-card">{character.name}</div>,
}));

it('renderiza una card por personaje', () => {
  render(<ListCharacter characters={mockCharacters} setOpen={vi.fn()} />, { wrapper });
  expect(screen.getAllByTestId('character-card')).toHaveLength(2);
});
```

---

## Patrones clave

### Mock de módulo completo

```ts
vi.mock('ruta/al/modulo', () => ({
  nombreExportado: vi.fn(),
}));
```

### Mock de función con retorno

```ts
vi.mocked(servicio.metodo).mockResolvedValue(data); // async
vi.mocked(servicio.metodo).mockReturnValue(data); // sync
vi.mocked(servicio.metodo).mockRejectedValueOnce(err); // error una vez
```

### Limpiar mocks entre tests

```ts
afterEach(() => vi.clearAllMocks());
```

### Buscar elementos en el DOM

```ts
screen.getByText('texto'); // falla si no existe
screen.queryByText('texto'); // retorna null si no existe
screen.getAllByTestId('card'); // retorna array
screen.getByPlaceholderText('...'); // por placeholder
screen.getByDisplayValue('valor'); // por valor actual del input
```

---

## Cobertura actual (~50%)

| Archivo                        | Tests        |
| ------------------------------ | ------------ |
| `character-adacter.adapter.ts` | ✅ 5 tests   |
| `useFetchCharacters.ts`        | ✅ 5 tests   |
| `useSearchCharacters.ts`       | ✅ 6 tests   |
| `ButtonCountCharter.tsx`       | ✅ 6 tests   |
| `InputCharacter.tsx`           | ✅ 3 tests   |
| `ListCharacter.tsx`            | ✅ 2 tests   |
| `useCharacterCrud.ts`          | ⬜ pendiente |
| `useCardHook.ts`               | ⬜ pendiente |
| `useValiateCharacter.ts`       | ⬜ pendiente |
| `CharacterCard.tsx`            | ⬜ pendiente |
| `DialogCreateUpdate.tsx`       | ⬜ pendiente |

Total: **27 tests** en 6 archivos.
