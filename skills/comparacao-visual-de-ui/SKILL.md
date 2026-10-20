---
name: comparacao-visual-de-ui
description: Prepare evidência visual reproduzível comparando referência aprovada e captura real com o Harness local do Code Awareness. Use para lado a lado/overlay, receipt, proveniência e inspeção de redesign; não use para gerar mockups, mapear estados de UI ou aprovar beleza automaticamente.
---

# Comparação Visual de UI — Harness Local

## Resultado

Entregar **evidência para inspeção de uma intenção visual**, não um veredito estético automático. Esta Skill operacionaliza o comparador local do Code Awareness; o critério de aceitação pertence a `validacao-de-implementacoes`, a composição a `otimizacao-de-ui` e a criação da referência a `mockup-design`.

**Acione quando:** houver pedido explícito de comparar mockup/referência aprovado com uma captura; implementação de UI precisar confrontar sua composição com direção aprovada; agente precisar do pacote lado a lado/overlay com integridade e proveniência.

**Não acione quando:** o objetivo for apenas gerar um mockup, corrigir um bug visual sem referência, fazer screenshot sem comparação ou descobrir/cobrir todos os estados de uma UI. A iniciativa futura `UI Coverage` não é implementada por esta ferramenta.

## Gate de disponibilidade e autorização

Esta implementação é **específica do repositório Code Awareness**. Na worktree de execução, confirme presença de `scripts/ui-visual-validation/compare.cjs`, `harness.cjs`, `README.md` e dos scripts npm. Não assuma que a `main` ou outro clone já integrou a versão; confirme Git HEAD e dependências (`sharp`, `electron` quando cenário exigir). Se não disponível, informe a lacuna e use a via manual permitida; **não crie ferramenta paralela**.

Execução de um cenário, leitura de capturas e publicação exigem acesso/autorizações apropriados. O harness é **opt-in**; não execute suites gerais, Spikes, benchmarks ou cenários sem autorização. Use apenas o cenário necessário.

## Escolha de canal

**A — Dois PNGs existentes, sem Electron.** Para comparar captura do aplicativo fornecida pelo responsável com a referência escolhida:

```text
npm run harness:ui:compare -- --reference "<referencia.png>" --reference-approved --actual "<captura.png>" --origin USER_RUNTIME_SCREENSHOT
```

Opcional: `--metadata "<metadados.json>"` com `reference`/`actual`, `viewport` (CSS px), `scale` (PNG/CSS), `theme` e `gitRevision` quando conhecidos. Declarações externas não são autenticação independente. **`--reference-approved` é uma declaração do chamador; nunca equivale, por si só, à aprovação humana real.**

**B — Captura nomeada no Electron isolado, depois comparação.** Para um cenário **existente e compatível com o checkout**:

```text
npm run harness:ui:scenario -- git-atlas-mockup --reference "<referencia.png>" --reference-approved --capture mockup-wide-dark --metadata "<metadados.json>"
```

O comando acima é um **exemplo condicionado** ao Git Atlas: não use esse cenário para qualquer outra tela. Confirme a captura nomeada, viewport/tema/região e a versão do próprio cenário. O Electron executa componentes reais sob fixture controlada e perfil temporário, não necessariamente backend integrado. Em situações sem referência aprovada, execute captura isolada apenas se autorizada e **não declare a comparação concluída**.

## Contrato de saída

Artefatos locais ignorados sob `.code-awareness/visual-validation/<run-id>/`, com subdiretório de comparação:

- `side-by-side.png`: referência à esquerda; observado à direita;
- `overlay.png`: sobreposição em proporção 50%/50%;
- `comparison.json`: SHA-256 dos originais e resultados, dimensões, proveniência, viewport/escala/tema quando conhecidos e estados independentes;
- no canal de cenário, `receipt.json` com estado de captura, runtime, cenário, source observado e cleanup.

**Interpretar gates separadamente:** `CAPTURE_OK` comprova captura do cenário; `COMPARISON_READY`/`READY_FOR_REVIEW` comprova produção do pacote; `VISUAL_ACCEPTED` não é emitido pelo comando. Captura de fixture não autentica runtime integrado. Nenhum percentual de pixels prova qualidade estética.

## Procedimento proporcional

1. Identifique **uma referência realmente aprovada** e uma captura da mesma região, viewport, escala e tema. Se diferirem, não alinhe/redimensione silenciosamente. Datas, nomes, hashes e valores ilustrativos não são oráculo pixel-perfect.
2. Escolha A ou B; execute na worktree correta. Em caso de `PNG_INVALID`, `GEOMETRY_INCOMPATIBLE`, `THEME_INCOMPATIBLE`, `PATH_UNAUTHORIZED`, `CAPTURE_UNAVAILABLE` ou erro de runtime, **pare e corrija a premissa**; não enfraqueça guardrails, altere PNG original ou mascare erro.
3. **Abra e inspecione efetivamente** os dois PNGs e a composição; compare hierarquia, alinhamento, proporções, labels, regiões/estados materiais e identidade visual do Design System. Permita divergência legítima sustentada por verdade funcional e intenção aprovada. A imagem não substitui provas de interação, backend, acessibilidade ou desempenho.
4. Reporte de maneira econômica **referência → cenário/estado → divergência material/justificativa → evidência/caminho → veredito limitado**. Não despeje PNGs no contexto nem no Continuum por padrão; disponibilize arquivos somente via canal autorizado.

## Limites e evolução

Para comparar uma UI inteira em vários estados, execute **poucos pares selecionados** que representem decisões materiais; o Harness atual não descobre nem mapeia automaticamente os estados. A futura `UI Coverage` é Work Item `artifact-11b1b804-01bd-4d09-aec5-871fd539275c` no Continuum do Code Awareness, **não capacidade presente**.

A verdade operacional sobre flags, requisitos nativos e outputs está em `scripts/ui-visual-validation/README.md` **da worktree ativa**. Se o contrato de source for diferente, prevalece o source atual; não execute por memória.
