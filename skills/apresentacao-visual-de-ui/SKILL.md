---
name: apresentacao-visual-de-ui
description: Capture, inspecione e apresente ao responsável a UI materialmente alterada na própria Worktree usando o Harness Visual existente. Use para encerrar mudanças de apresentação ou interação, mesmo sem referência aprovada. Não use para mudanças sem efeito visual; comparação com referência pertence a comparacao-visual-de-ui.
---

# Apresentação Visual da UI Alterada

## Resultado e fronteira

Entregue a imagem do estado realmente alterado, inspecionada pelo agente e efetivamente apresentada ao responsável, com origem e limitações explícitas. Captura, inspeção agentiva, apresentação e aceite humano são fatos distintos. PNG, receipt PASS e ausência de resposta nunca significam aprovação humana.

Acione em alterações materiais de apresentação ou interação: componente, layout, CSS, tema, estado visível ou fluxo gráfico. Dispense em mudanças sem efeito nessas propriedades, com justificativa causal curta. Em automações sem consumidor humano, preserve captura e inspeção quando exigidas pela tarefa e registre apresentação/aceite como não aplicáveis; não invente um gate humano. Se a tarefa exige revisão por responsável, transporte indisponível é bloqueio de revisão visual.

Esta Skill opera captura e apresentação; critérios de suficiência pertencem a `validacao-de-implementacoes`, composição a `otimizacao-de-ui`. Use `comparacao-visual-de-ui` somente quando houver referência realmente aprovada e comparação necessária. Não exija referência ou comparador para mostrar uma alteração.

## Preparar a prova

1. Confirme o checkout efetivamente em edição: caminho absoluto, branch, HEAD e alterações staged, unstaged e untracked relevantes. Execute o Harness **dessa Worktree**, com diretório de trabalho explícito. Captura da main, de outro checkout ou anterior à alteração não prova o estado atual.
2. No Code Awareness, confira `scripts/ui-visual-validation/harness.cjs`, seu `README.md` e os scripts npm locais. Leia o contrato atual para flags, dependências, cenários e saídas; não replique o runner nem use comandos de memória. Verifique Electron e dependências **dessa Worktree**. Prepare o ambiente e execute scripts somente com autorização aplicável; o pedido de execução/prova já autorizado não exige reconfirmação. Sem Harness ou canal autorizado equivalente, relate a lacuna; não construa Runtime Preview, servidor, runner ou infraestrutura paralela.
3. Inspecione o cenário antes de executá-lo. Escolha o menor cenário existente que importe o componente e CSS de produção alterados e reproduza o estado material com providers, props e dados fiéis. Um cenário de outra tela ou HTML que imita a proposta não serve. Sem cobertura, crie um cenário mínimo isolado na extensão prevista pelo Harness, quando autorizado, ou declare bloqueio. Não substitua o componente por uma imagem, mockup ou fixture visualmente enganosa.
4. Identifique dados sintéticos, adapters e integrações ausentes. A fixture comprova somente o renderer e as interações exercitadas. Se a propriedade exige backend, persistência ou integração real, obtenha essa prova separadamente; não rotule fixture como aplicação integralmente integrada. Não use dados privados nem publique imagens externamente sem autorização.

## Capturar, inspecionar e apresentar

1. Execute somente o cenário selecionado no Electron local com perfil isolado pelo Harness existente. Capture um estado representativo; acrescente outros apenas se discriminarem riscos materiais. Não faça build do app completo nem use Runtime Preview por ritual. Não automatize consentimentos reais, aprovações, permissões ou ações em perfis pessoais; esta capacidade não fornece CUA genérico.
2. Preserve PNG original e `receipt.json` no store local de evidências do Harness. Registre instante, cenário/estado, tema, viewport, Worktree, branch e HEAD. Quando dirty, retenha patch/source relevante e hash ou revisão observável, incluindo arquivos untracked usados na prova, junto da evidência. Se o receipt não cobrir essa origem, complemente somente a lacuna. Compare a origem antes/depois da captura; drift material exige nova captura ou bloqueio. Identidade pontual não atesta frescor contínuo.
3. **Abra e inspecione a imagem**, verificando que contém a alteração e o estado pretendidos, legibilidade, recortes, overflow e divergências materiais. Corrija e recapture se necessário. Log de execução, DOM e PASS técnico não substituem ver os pixels.
4. **Apresente efetivamente a imagem ao responsável pela interface disponível**: incorpore/anexe a captura ou entregue arquivo acessível que transporte a imagem, identificando estado, origem e limitações. Se o agente consegue mostrar a imagem, listar somente o caminho é insuficiente. Se a IDE não transportar imagens/arquivos, forneça o caminho absoluto verificável e declare **revisão visual bloqueada por transporte**; não afirme que anexou ou mostrou.
5. Receba correções ou aceite sem presumir resposta. Se houver correção material, repita captura, inspeção e apresentação dos estados afetados. Registre separadamente resultado técnico, julgamento do agente, apresentação realizada e aceite humano efetivamente recebido ou pendente.

## Retorno e fechamento

Retorne imagem apresentada (ou bloqueio explícito), receipt/local da evidência, proveniência, estado observado, limitações e situação real do aceite. A apresentação deve acontecer **antes** de solicitar conclusão visual, abertura de PR ou merge de uma alteração material de UI. Apresentar não autoriza PR nem merge: as aprovações independentes continuam em `worktree-execution`. Não declare aceitação humana sem manifestação do responsável nem trate falta de apresentação obrigatória como revisão concluída.
