---
name: pr-recovery
description: Decida economicamente se deve corrigir, recuperar seletivamente, descartar e reimplementar ou abandonar um PR reprovado após correção malsucedida pelo executor original; prepare uma Recovery Capsule mínima para escalonar só o trabalho necessário. Não use na primeira revisão ou em reparo simples.
---

# PR Recovery — Escalonamento econômico de implementação

## Finalidade e gatilho

Evitar que um agente de maior custo tenha de redescobrir e depurar integralmente uma implementação de outro agente. Acione quando **o mesmo executor abriu um PR, recebeu reprovação material, tentou corrigir e a nova revisão ainda falhou** em contrato relevante. É um julgamento sobre esta entrega, **não** um rótulo permanente sobre o agente. Defeito estrutural crítico pode justificar escalonamento imediato se uma segunda tentativa for insegura.

**Não acione** para feedback editorial, primeira revisão, reparo pequeno já localizado e confiável, ou bloqueio de decisão arquitetural durante execução normal. Para este último, use `escalonamento-de-bloqueios` e `resolucao-de-bloqueios`. A recuperação pode terminar recomendando reparo simples, sem novo executor.

## Princípio de economia

**Transfira o problema restante, não a história da implementação.** O agente mais capaz recebe uma cápsula de evidência e um checkout delimitado, não planos, handoffs, sessões, patches ou logs inteiros. Reutilize provas existentes e leia source apenas quando elas não bastarem. O objetivo é reduzir custo total de triagem + recuperação + correção; não criar uma análise preparatória mais cara que o reparo.

A Skill possui **dois modos independentes**: `PREPARE` (revisor/orquestrador econômico) e `RECOVER` (executor escalonado). Quem começa em `RECOVER` deve receber a cápsula já produzida; não reexecute `PREPARE` por rotina.

## Gate econômico obrigatório — recuperar ou descartar

**A decisão vem antes de repassar o PR ao modelo mais caro.** Não presuma que recuperar é melhor só porque o código já existe. Compare o **custo futuro para entregar contratos válidos**, incluindo risco de novos erros; tokens e esforço passados são custos irrecuperáveis e não favorecem o PR antigo.

1. **Valor e segurança:** se a funcionalidade deixou de ser desejada, recomendar **ABANDONAR A INICIATIVA**; não encomendar reimplementação. Se ainda é desejada, separar defeitos localizados das fronteiras cuja arquitetura, proveniência ou segurança não pode ser confiavelmente aproveitada. Uma área insegura não contamina automaticamente todo o PR, mas tampouco pode ser classificada como preservada sem prova.
2. **Estimar opções com mesma cobertura:** comparar recuperação (entender o legado + corrigir + integrar + validar + retrabalho provável) e reimplementação (reler apenas contratos necessários + implementar do zero + integrar + validar + retrabalho provável). Incluir custo de transição de agente e ampliação provável de escopo. Contar só trabalho restante; não contar como benefício linhas já escritas nem como custo os tokens antigos. Para estratégia seletiva, somar custo de extrair e verificar partes preservadas.
3. **Evidência barata:** usar PR diff e falhas já registradas, interfaces diretas, confiança das provas, quantidade de fronteiras independentes, acoplamento, custo de testes, abrangência do redesign e tentativas anteriores. Quando houver métricas históricas de tokens de atividades equivalentes, utilizá-las com proveniência; caso contrário, comparar faixas relativas BAIXO/MÉDIO/ALTO ou intervalos aproximados, identificando confiança. **Não fabricar números precisos ou medir tokens com análise mais cara que a decisão.**
4. **Regra de escolha:** preferir recuperação apenas com **economia plausível de pelo menos ~25% no custo total futuro**, sem risco de validação maior. Esse limiar é uma margem heurística para cobrir o erro de estimativa, não uma previsão exata. Um patch evidentemente pequeno e isolado passa pelo mesmo princípio sem exigir planilha. Caso recuperação e reimplementação tenham custos próximos, vantagem incerta ou retrabalho sistêmico provável, **descartar a implementação defeituosa e reimplementar da base estável**; reaproveitar apenas contratos/testes cuja correção seja conhecida.
5. **Limite da triagem:** para dúvida capaz de mudar a decisão, permitir **uma prova pequena e discriminativa**, com hipótese explícita. Se a incerteza persistir, decidir pelo caminho de menor risco e menor dependência do código não comprovado; não varrer o repositório nem gerar outro plano extenso. Se nenhuma opção puder satisfazer segurança e orçamento, escalar o bloqueio concreto, sem alegar conclusão.

**Saídas distintas:** PATCH ISOLADO (corrigir em branch/Worktree apropriada), TRANSPLANTE SELETIVO (reutilizar partes comprovadas sobre base estável), REIMPLEMENTAR (não reutilizar implementação antiga; reconstruir com contratos mínimos) ou ABANDONAR A INICIATIVA (não implementar). **Descartar um PR não significa cancelar a funcionalidade.** PR/branch rejeitados permanecem preservados até decisão Git autorizada; fechamento de PR, novo PR, merge e descarte de dados requerem autoridade independente conforme worktree-execution.

**Sinais fortes para REIMPLEMENTAR:** o entendimento do código defeituoso custa quase uma implementação nova; defeitos em múltiplas fronteiras acopladas; tentativas de remendo aumentam complexidade; provas de partes reutilizáveis são inexistentes; custo de verificar código herdado supera reconstruí-lo; ou defeito de segurança inviabiliza confiar na arquitetura. Uma falha estrutural isolada pode favorecer TRANSPLANTE SELETIVO em vez de descarte integral.
## PREPARE — triagem mínima antes do escalonamento

1. Fixe a identidade: repositório, PR, branch, base, HEAD rejeitado, revisão/commit anterior da tentativa de reparo, Worktree e escopo de escrita autorizado. Use Git/diff e diagnósticos de revisão; inspecione `git-operations` ou `worktree-mcp-operations` quando a via específica exigir. Não leia o PR inteiro por padrão.
2. Parta **dos contratos reprovados**. Para cada defeito, registre sintoma, prova existente, localização mínima (path/símbolo) e propriedade exigida. Não repita alegações do handoff como se fossem provas. Sem evidência suficiente, marque `NÃO VERIFICADO`; não invente aprovação.
3. Obtenha do diff apenas o conjunto de arquivos alterados e suas dependências diretas. Classifique **por fronteira/contrato**, não por volume de arquivos:
   - `PRESERVAR`: comportamento com evidência confiável e não invalidada pelas mudanças;
   - `SUBSTITUIR`: implementação inadequada ou contrato reprovado; indicar extensão mínima da substituição;
   - `VERIFICAR`: indeterminado ou ligado à fronteira defeituosa; não presumir válido.
   Um arquivo pode conter trechos preserváveis e defeituosos; não classificar arquivos inteiros como seguros sem justificativa.
4. Aplique o **Gate econômico obrigatório** às fronteiras classificadas: escolha PATCH ISOLADO, TRANSPLANTE SELETIVO, REIMPLEMENTAR ou ABANDONAR A INICIATIVA. PATCH usa HEAD do PR em Worktree autorizada; TRANSPLANTE parte da base estável e importa somente partes comprovadas; REIMPLEMENTAR parte da base estável sem código herdado. Se abandonar a iniciativa, não abrir execução. Não faça force-push, descarte de mudanças, abertura de PR nem merge sem autoridade; siga `worktree-execution`.
5. Gere **uma única Recovery Capsule**, não novo Plano Final por padrão. Meta de tamanho: cerca de 600–1.200 tokens, excedível somente por requisito de segurança/contrato. Prefira referências precisas a colagens de source. Se a triagem exigir varredura ampla, interrompa, indique a informação decisiva faltante e selecione uma aquisição mínima.

## Recovery Capsule — contrato de handoff

```markdown
## Recovery Capsule
- Fonte: repo; PR #; base SHA; HEAD SHA; branch/Worktree; tentativa rejeitada
- Decisão: PATCH ISOLADO | TRANSPLANTE SELETIVO | REIMPLEMENTAR | ABANDONAR A INICIATIVA; razão e confiança
- Custo futuro comparado: recuperar vs reimplementar (faixas/intervalos ou evidência medida); inclui validação, risco de retrabalho e margem de decisão
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
3. Execute apenas a decisão da cápsula: patch localizado, transplante determinístico ou reimplementação limpa. Em REIMPLEMENTAR, **não leia nem adapte o legado por rotina**; consulte-o só para contrato externo não recuperável por outra fonte. Em ABANDONAR A INICIATIVA, não execute mudança de código. Se um componente `PRESERVAR` falhar em contrato afetado, reclassifique **somente a fronteira**, reavalie custo futuro e registre evidência; não faça reauditoria geral.
4. Valide primeiro a propriedade reprovada, depois as regressões adjacentes proporcionais usando `validacao-de-implementacoes`. Reaproveite evidências associadas ao mesmo código/HEAD quando continuarem válidas; não reexecute suites amplas por ritual. Falha crítica não comprovada continua `PENDENTE`, mesmo com outros testes verdes.
5. Entregue relato curto: **delta alterado; contratos provados; testes e HEAD; pendências; destino da atualização**. Atualize a entrega Git apenas dentro das permissões de `worktree-execution`. Se foi criado um novo PR em vez do antigo, preserve vínculo com o PR rejeitado e indique qual deve ser encerrado por autoridade competente.

## Portas de segurança e fim

- **Não** exigir manipulação gráfica por agentes nem presença do operador para validar UIs; preferir testes programáticos. Consentimentos nativos do produto não podem ser contornados quando a execução real os exigir. Se faltar prova de aceitação, registrar como pendência sem falsificar conclusão.
- Não modificar `AGENTS.md`. Não usar merge automático, abrir novo PR ou reescrever histórico apenas porque a Skill foi acionada.
- Não escolher modelo caro por prestígio: escalonar **somente o trabalho cuja complexidade excedeu o executor anterior**. Preparação mecânica, Git, fixtures e integração simples ficam com executor econômico ou ferramentas determinísticas quando disponíveis.
- O resultado esperado é **aproveitamento comprovado + correção de escopo limitado + custo contextual mínimo**. Se a cápsula não reduz o escopo nem a incerteza, suspenda o escalonamento e reavalie a estratégia.
