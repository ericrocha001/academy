---
name: worktree-execution
description: Use ao iniciar ou conduzir uma sessão de implementação isolada em Git Worktree, incluindo branch exclusiva, checkpoints e retomada. Prefira Git local autorizado; para Worktrees remotas protegidas use worktree-mcp-operations, sem presumir capacidade ou autorização pelo papel.
---

# Worktree Execution

## Propósito

Governar uma sessão isolada, preservando a Worktree entre vários planos, checkpoints e integrações sem confundir conclusão de implementação com encerramento do workspace.

**Modelo:** uma sessão, uma Worktree, uma branch exclusiva; várias entregas validadas podem usar a mesma sessão. Quem executa Git é determinado por **capacidade observada + delegação/autorização**, não pelo rótulo Arquiteto/Implementador. Nenhuma ação Git nasce automaticamente de um handoff validado.
## Fronteiras

Esta Skill governa o ciclo da sessão, não ensina comandos Git ou contratos MCP. Use `validacao-de-implementacoes` para as provas, `continuum-publication` para publicar handoffs, `continuum` para recuperá-los e `engineering-evidence-economy` para comparar canais.

**Roteamento:** agente com Git local no checkout correto e autorização para a operação prefere o meio local; se não tem acesso local, ou a operação exige garantias remotas específicas, usa `worktree-mcp-operations` para Worktrees protegidas ou `git-operations` para Git remoto comum, quando disponíveis e autorizados. Não acione o MCP só para repetir Git, typecheck ou Vitest locais. A Skill `git-operations` pertence ao transporte MCP e não governa comandos locais.

**Autoridade:** acesso ao terminal não autoriza modificar a `main`, Worktree de outro agente ou remoto. Confirme delegação explícita para commit, merge, push ou operação compartilhada; validação/handoff não autorizam mutação implícita. Para executar via MCP respeite aprovação nativa e lease próprios desse canal; Git local não cria nem contorna lease MCP. Nenhum executor deve interferir em escritores concorrentes.
## Pré-condição de isolamento

Antes da primeira alteração persistente, confirme repositório, Worktree efetiva, branch exclusiva da sessão e HEAD/baseline. Preferir criação/seleção nativa da IDE ou harness. Se houver terminal Git local com permissão de preparar a sessão, o próprio executor pode criar/ativar a branch; caso contrário, obtenha a preparação por capacidade autorizada ou escale o bloqueio.

Uma pasta distinta não prova isolamento; a sessão deve estar vinculada ao checkout correto. Não inicie a execução no checkout principal compartilhado quando o trabalho exige Worktree própria.
## Gate obrigatório de inicialização — antes da primeira edição

**Worktree criada não significa sessão preparada.** Observe no ambiente, antes de editar: (1) repositório/checkout correto; (2) branch local e exclusiva, não a principal; (3) HEAD e baseline conhecidos; (4) ausência de colisão com outra Worktree; (5) identidade rastreável no handoff.

**Detached HEAD não passa no gate de escrita.** Se a IDE criou a Worktree detached, o executor com Git local autorizado pode criar e ativar uma branch semântica nela, verificando em seguida a associação real. Na ausência dessa capacidade ou autorização, solicite preparação segura sem editar. Não recrie nem limpe a Worktree para resolver o vínculo. Worktree estritamente read-only pode permanecer detached.

Para uma Worktree legada dirty/detached, preserve os arquivos e o índice, coordene escritores e estabeleça a branch com segurança antes de novos commits. O gate só passa após verificação objetiva; do contrário, bloqueia apenas a escrita dependente.
## Worktree por sessão

Uma mesma worktree pode receber vários Planos Finais Executáveis relacionados. Preserve-a enquanto a sessão continuar sendo uma única linha coerente de implementação e o contexto acumulado continuar útil.

Não crie worktree nova por plano sem razão operacional.

## Identidade e proveniência da Worktree

No handoff, registre a identidade realmente observada da Worktree (path, branch, HEAD/baseline e sessão, quando conhecidos) e se o workspace continuará reutilizável. Obtenha evidência com a ferramenta disponível; não invente ou marque como verificados dados não observados.

Em Artifacts do Continuum originados dessa execução, use `worktreeId` somente se o registry o verificou, e `worktreePath` quando conhecido. São identificadores históricos, não prova de posse. `executionId` correlaciona o trabalho, não substitui a identidade do checkout.

**Plano validado ≠ fim da sessão ≠ Git autorizado ≠ Worktree liberada.** Publicar handoff não autoriza outro agente a alterar o índice/HEAD ou encerrar a Worktree. O mesmo workspace pode continuar em novos planos.
## Baseline

Registre o baseline observado no início. O avanço posterior da branch de destino não muda esse ponto de partida. Use-o no encerramento para reconhecer drift e avaliar integração.

## Plano e checkpoint

Valide cada plano conforme `validacao-de-implementacoes` e publique o handoff pelo `continuum-publication`. Um checkpoint local pode preservar um conjunto coerente e validado antes do próximo plano, sem criar commits mecânicos.

**Quando o responsável pela sessão estiver autorizado a criar commits**, ele pode fazê-los por Git local, sem delegação artificial a um agente remoto. Também é legítimo delegar a operação a outro agente com capacidade adequada mediante handoff de controle verificável. Confirme o estado e os paths antes de stage/commit; não interrompa uma sessão alheia.
## Commit e push

Commit local preserva um estado recuperável; push publica commits; nenhum encerra a Worktree. Selecione explicitamente apenas arquivos pertencentes ao trabalho validado, incluindo untracked intencionais e exclusões pretendidas. Não use "add all" indiscriminadamente, não descarte mudanças desconhecidas e evite escritores simultâneos no mesmo checkout.

Use Git local autorizado quando disponível; `git-operations` MCP apenas se o meio remoto for necessário. **Push não é automático** após checkpoint; requer delegação ou política explícita aplicável. Commit, push e merge são resultados distintos.
## Encerramento da sessão

Fim de plano significa validação e handoff, não necessariamente encerramento da sessão. Novos planos podem reutilizar a Worktree e seus checkpoints. Se o usuário decidir concluir a linha de trabalho, verifique preservação de commits, integração e pendências explicitamente; não feche o workspace por inatividade ou handoff.
## Integração

**Commit e merge são operações distintas.** Integre somente quando houver autorização específica para destino e escopo; o agente com Git local autorizado pode preparar e validar o merge localmente, sem passar pelo MCP. Se a operação for remota e envolver integração de Worktrees protegidas, use `worktree-mcp-operations`.

Confirme estado e disponibilidade do destino, possíveis escritores concorrentes, alterações dirty, commit-base e drift. Resolva conflitos em ambiente isolado quando necessário, preserve ambas as linhas e não substitua o estado da `main` com arquivos antigos. Não confunda ausência de conflito textual com compatibilidade semântica. **Merge não autoriza fechar a Worktree de origem.**
## Validação pós-integração

A validação na Worktree prova o estado isolado; o merge pode exigir provas adicionais no estado composto. Execute as validações proporcionais preferencialmente pelo terminal local disponível. Use canais remotos quando forneçam prova/estado realmente diferente ou exigido. Revalide apenas propriedades afetáveis pela integração, conforme `validacao-de-implementacoes`.
## Encerramento do workspace

**Padrão: conservar a Worktree e sua branch após commits e integração.** Um novo plano pode retomar o checkout existente.

Fechamento/limpeza exige pedido explícito do usuário, garantia de que nenhum conteúdo necessário depende exclusivamente dali, escritores parados e commits preservados. Ferramentas MCP para cleanup gerenciado nunca removem Worktrees externas. Cleanup não é prova de conclusão.
## Concorrência

Worktrees diferentes permitem que executores diferentes mantenham sessões independentes sobre o mesmo repositório. Cada sessão conserva seu próprio contexto e pode executar vários planos em sequência.

Não distribua automaticamente unidades do mesmo plano entre agentes apenas porque existem worktrees disponíveis. O isolamento evita interferência física durante a execução, mas não elimina risco de integração entre linhas relacionadas.

## Anti-padrões

- definir canal Git pelo rótulo «Implementador» ou «Arquiteto» sem verificar capacidade/autorização;
- exigir Code Awareness MCP para Git ou testes locais equivalentes;
- presumir que terminal disponível autoriza escrita na `main` ou Worktree alheia;
- iniciar implementação em detached HEAD ou checkout principal compartilhado sem isolamento comprovado;
- confundir handoff VALIDATED com licença para mutar;
- criar Worktree por plano, misturar staged de autores/escopos diferentes ou cometer push automático;
- encerrar ou limpar a Worktree após commit/merge sem solicitação específica;
- supor que testes isolados validam a integração.
## Critério de conclusão

**Implementação:** comportamento demonstrado pelos testes proporcionais, handoff com proveniência e estado da sessão explicitado.

**Git delegado:** branch/checkpoint/integração concluídos e observados no ambiente autorizado, ou bloqueio documentado. Nenhuma operação é presumida a partir da identidade do agente. Commit não é merge; merge não é fechamento da Worktree.
## Regra final

> Execute onde a capacidade existe e a autorização permite. Preserve Worktree, branch, contexto e checkpoints; valide o resultado combinado quando integrar. Nenhum handoff, commit ou merge encerra automaticamente a sessão.
## Ciclo pelas operações remotas de Worktree

**Esta seção é condicional:** aplica-se somente quando a operação Git efetivamente usar o canal remoto Code Awareness. Não é o procedimento obrigatório para quem dispõe de Git local autorizado.

Nesse canal, siga a Skill `worktree-mcp-operations`: descubra e inspecione a Worktree, obtenha aprovação nativa local, lease, snapshots, receipts e idempotência conforme contrato. Hand-off e pausa do escritor são cooperativos; não presuma posse de uma IDE externa. Para integrar, faça preview e APPLY em checkout gerenciado, valide o commit candidato no próprio checkout e promova somente com prova e ownership válidos. Expiração, restart ou resultado desconhecido exigem recuperação, nunca takeover por timeout.

Na via local, preserve as mesmas invariantes de intenção explícita, ausência de escrita concorrente, rollback não destrutivo e validação, mas **não emule nem solicite leases MCP** para comandar Git pelo terminal.
