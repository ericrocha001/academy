---
name: pr-recovery
description: Recupere economicamente um PR reprovado após tentativa malsucedida de correção pelo executor original, preparando uma Recovery Capsule mínima para escalonar apenas contratos defeituosos a um agente mais capaz. Não use na primeira revisão, em reparo pontual confiável ou em bloqueio comum de implementação.
---

# PR Recovery — Escalonamento econômico de implementação

## Finalidade e gatilho

Evitar que um agente de maior custo tenha de redescobrir e depurar integralmente uma implementação de outro agente. Acione quando **o mesmo executor abriu um PR, recebeu reprovação material, tentou corrigir e a nova revisão ainda falhou** em contrato relevante. É um julgamento sobre esta entrega, **não** um rótulo permanente sobre o agente. Defeito estrutural crítico pode justificar escalonamento imediato se uma segunda tentativa for insegura.

**Não acione** para feedback editorial, primeira revisão, reparo pequeno já localizado e confiável, ou bloqueio de decisão arquitetural durante execução normal. Para este último, use `escalonamento-de-bloqueios` e `resolucao-de-bloqueios`. A recuperação pode terminar recomendando reparo simples, sem novo executor.

## Princípio de economia

**Transfira o problema restante, não a história da implementação.** O agente mais capaz recebe uma cápsula de evidência e um checkout delimitado, não planos, handoffs, sessões, patches ou logs inteiros. Reutilize provas existentes e leia source apenas quando elas não bastarem. O objetivo é reduzir custo total de triagem + recuperação + correção; não criar uma análise preparatória mais cara que o reparo.

A Skill possui **dois modos independentes**: `PREPARE` (revisor/orquestrador econômico) e `RECOVER` (executor escalonado). Quem começa em `RECOVER` deve receber a cápsula já produzida; não reexecute `PREPARE` por rotina.

## PREPARE — triagem mínima antes do escalonamento

1. Fixe a identidade: repositório, PR, branch, base, HEAD rejeitado, revisão/commit anterior da tentativa de reparo, Worktree e escopo de escrita autorizado. Use Git/diff e diagnósticos de revisão; inspecione `git-operations` ou `worktree-mcp-operations` quando a via específica exigir. Não leia o PR inteiro por padrão.
2. Parta **dos contratos reprovados**. Para cada defeito, registre sintoma, prova existente, localização mínima (path/símbolo) e propriedade exigida. Não repita alegações do handoff como se fossem provas. Sem evidência suficiente, marque `NÃO VERIFICADO`; não invente aprovação.
3. Obtenha do diff apenas o conjunto de arquivos alterados e suas dependências diretas. Classifique **por fronteira/contrato**, não por volume de arquivos:
   - `PRESERVAR`: comportamento com evidência confiável e não invalidada pelas mudanças;
   - `SUBSTITUIR`: implementação inadequada ou contrato reprovado; indicar extensão mínima da substituição;
   - `VERIFICAR`: indeterminado ou ligado à fronteira defeituosa; não presumir válido.
   Um arquivo pode conter trechos preserváveis e defeituosos; não classificar arquivos inteiros como seguros sem justificativa.
4. Escolha a recuperação mais barata que preserve os invariantes:
   - `PATCH ISOLADO`: contrato localizado e arquitetura aproveitável; corrigir pequena área em Worktree dedicada, partindo do HEAD do PR.
   - `TRANSPLANTE SELETIVO`: fronteira estruturalmente comprometida ou histórico de remendos arriscado; nova Worktree a partir da base estável, importar somente partes `PRESERVAR` por Git e reconstruir `SUBSTITUIR`.
   - `RECONSTRUÇÃO`: poucas partes confiáveis ou interdependências tornam transplante mais caro/inseguro. Justificar exceção; não chamar automaticamente de recuperação econômica.
   **Não replique a implementação defeituosa inteira na nova base.** Não faça force-push, descarte de mudanças, nova abertura de PR ou merge sem autoridade específica; a integração deve seguir `worktree-execution`.
5. Gere **uma única Recovery Capsule**, não novo Plano Final por padrão. Meta de tamanho: cerca de 600–1.200 tokens, excedível somente por requisito de segurança/contrato. Prefira referências precisas a colagens de source. Se a triagem exigir varredura ampla, interrompa, indique a informação decisiva faltante e selecione uma aquisição mínima.

## Recovery Capsule — contrato de handoff

```markdown
## Recovery Capsule
- Fonte: repo; PR #; base SHA; HEAD SHA; branch/Worktree; tentativa rejeitada
- Decisão: PATCH ISOLADO | TRANSPLANTE SELETIVO | RECONSTRUÇÃO; razão em 1–2 frases
- Reprovado: [contrato → evidência reproduzível → path/símbolo → condição de aceite]
- Preservar: [fronteira → prova válida → referência exata] ou NÃO VERIFICADO
- Substituir: [fronteira → limitação do código existente → contrato de substituição]
- Verificar: [incerteza material e forma barata de resolvê-la]
- Fronteiras: interfaces de entrada/saída, dependências diretas, invariantes de segurança
- Execução: origem da Worktree autorizada; arquivos/área permitidos; exclusões
- Prova mínima: testes dirigidos, typecheck/regressões adjacentes necessárias
- Encerramento: branch/PR a atualizar com autorização; evidências e pendências
```

**Não inclua** narrativa da sequência de falhas, transcrições, bundle integral, árvore completa, comentários pessoais sobre o autor, benchmarks sem propósito, planos originais copiados nem UI/screenshots. Links e IDs de artifacts são localizadores, não obrigam leitura integral.

## RECOVER — execução pelo agente mais capaz

1. Confirme identidade e freshness do HEAD da cápsula. Se mudou, compare somente o delta desde o HEAD fixado; não reinicie investigação. Verifique escopo e autorização da Worktree antes de escrita.
2. Leia inicialmente somente `SUBSTITUIR`, interfaces de fronteira e os testes dirigidos. Trate `PRESERVAR` como código reutilizável, **não** como isento de regressão. Use CodeScope/`code-navigation` para ampliar contexto apenas quando um erro ou dependência real exigir.
3. Execute a decisão da cápsula: patch localizado ou transplante determinístico de alterações selecionadas. Se um componente listado como `PRESERVAR` falhar no contrato afetado, reclassifique **somente a fronteira** e registre a nova evidência. Não transforme a correção em reauditoria geral.
4. Valide primeiro a propriedade reprovada, depois as regressões adjacentes proporcionais usando `validacao-de-implementacoes`. Reaproveite evidências associadas ao mesmo código/HEAD quando continuarem válidas; não reexecute suites amplas por ritual. Falha crítica não comprovada continua `PENDENTE`, mesmo com outros testes verdes.
5. Entregue relato curto: **delta alterado; contratos provados; testes e HEAD; pendências; destino da atualização**. Atualize a entrega Git apenas dentro das permissões de `worktree-execution`. Se foi criado um novo PR em vez do antigo, preserve vínculo com o PR rejeitado e indique qual deve ser encerrado por autoridade competente.

## Portas de segurança e fim

- **Não** exigir manipulação gráfica por agentes nem presença do operador para validar UIs; preferir testes programáticos. Consentimentos nativos do produto não podem ser contornados quando a execução real os exigir. Se faltar prova de aceitação, registrar como pendência sem falsificar conclusão.
- Não modificar `AGENTS.md`. Não usar merge automático, abrir novo PR ou reescrever histórico apenas porque a Skill foi acionada.
- Não escolher modelo caro por prestígio: escalonar **somente o trabalho cuja complexidade excedeu o executor anterior**. Preparação mecânica, Git, fixtures e integração simples ficam com executor econômico ou ferramentas determinísticas quando disponíveis.
- O resultado esperado é **aproveitamento comprovado + correção de escopo limitado + custo contextual mínimo**. Se a cápsula não reduz o escopo nem a incerteza, suspenda o escalonamento e reavalie a estratégia.
