---
name: worktree-execution
description: Use ao executar trabalho isolado em Git Worktree ou receber uma entrega validada por Pull Request para revisão e integração. Governa branches, checkpoints, submissão/revisão de PR e retomada; não dependa do rótulo do agente nem contorne autorizações.
---

# Worktree Execution

## Propósito

Governar uma sessão isolada, preservando a Worktree entre vários planos, checkpoints e integrações sem confundir conclusão de implementação com encerramento do workspace.

**Modelo:** uma sessão, uma Worktree e uma branch exclusiva por linha de trabalho; várias entregas validadas podem usar a mesma sessão. Cada **entrega pronta para revisão**, depois de validada, é oferecida por Pull Request (PR), conforme a política autorizada do projeto. Quem opera Git depende de **capacidade observada + delegação/autorização**, não do rótulo Arquiteto/Implementador. Handoff e validação não concedem permissão automática para qualquer mutação Git.
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

Valide entregas e Planos conforme `validacao-de-implementacoes` e publique o handoff pelo `continuum-publication`. Um checkpoint local pode preservar um conjunto coerente antes do próximo plano, sem criar commits mecânicos. **O gatilho de PR é uma entrega coesa, independentemente integrável e validada**, segundo as fronteiras previstas em `planejamento-executavel`; sem Plano formal, aplique a mesma exigência à entrega autônoma. Um Plano coeso normalmente gera um PR; mais de um PR no mesmo Plano exige fatias autônomas já validadas, sem declarar concluído o Plano ainda parcial. Teste aprovado, Unidade intermediária ou checkpoint não bastam por si só.

**Quando o responsável pela sessão estiver autorizado a criar commits**, ele pode fazê-los por Git local, sem delegação artificial a um agente remoto. Também é legítimo delegar a operação a outro agente com capacidade adequada mediante handoff de controle verificável. Confirme o estado e os paths antes de stage/commit; não interrompa uma sessão alheia.
## Commit e push

Commit local preserva um estado recuperável; push publica commits; nenhum encerra a Worktree. Selecione explicitamente apenas arquivos pertencentes ao trabalho validado, incluindo untracked intencionais e exclusões pretendidas. Não use "add all" indiscriminadamente, não descarte mudanças desconhecidas e evite escritores simultâneos no mesmo checkout.

Use Git local autorizado quando disponível; `git-operations` MCP apenas se o meio remoto for necessário. **Push não é automático** após checkpoint; requer delegação ou política explícita aplicável. A política de PR por entrega validada autoriza publicar **a branch de trabalho** quando a delegação do repositório permitir, nunca push direto ou merge na `main`. Commit, push, PR e merge são resultados distintos.

## Entrega validada via Pull Request — fluxo padrão

**A responsabilidade decorre do estado observável, não da autodenominação do agente.**

- **Quem produz:** o executor que alterou a branch/Worktree de origem e validou a entrega. Com commits selecionados, provas suficientes e revisão pronta, verifica branch/HEAD/índice, publica a branch autorizada sem force e **abre PR contra o destino previsto**. Use Git local para push e cliente GitHub/CLI/API autorizado para abrir PR; a superfície MCP de Worktree não cria PR por si.
- **Quem revisa:** quem recebe o PR com autorização para decidir integração. Examina commits, diff, evidências, checks, target e drift; aprova ou solicita mudanças. **Só após revisão e checks satisfeitos** executa merge no destino, preferencialmente pelo PR, e confirma a integração e validação proporcional. Receber o link não comprova aprovação.
- **Transferência:** PR informa finalidade, target, HEAD, evidências e Plano/Continuum quando disponível. Depois de abrir, inclua URL/número verificáveis no Relato Final e publique o handoff pelo `continuum-publication`, mantendo `executionId` e proveniência da Worktree.

**Cadência:** um PR por **entrega independentemente integrável e validada**, preferencialmente um por Plano coeso. Um mesmo Plano só origina PRs separados quando as fronteiras previstas permitem merge independente sem quebra de contratos; não publique uma fatia incompleta como validada. Testes e checkpoints não abrem PRs. Correções e revalidações **antes do merge atualizam o mesmo PR**; uma nova entrega após o merge usa novo PR. A mesma Worktree pode continuar, desde que a próxima branch parta de base atualizada, não reapresente commits já integrados e não seja fechada automaticamente.

**Revisão progressiva e econômica:** quem recebe o PR inicia por intenção/critério de aceitação, base/HEAD, resumo de paths, tamanho e natureza das mudanças, riscos declarados, handoff e evidências existentes. Aprofunda então **seletivamente** nos diffs, contratos e relações relevantes ao risco observado; amplia a leitura se necessário para cobrir o que é material, sem aprovar apenas por resumo. Reutiliza provas válidas e atuais e solicita novos testes somente quando a propriedade necessária não estiver demonstrada ou puder ter sido alterada pela integração (conforme `validation-evidence-channels`). Não leia todo o repositório nem reexecute toda a suíte por rotina. Avalie custo **total** de revisão/CI/recontextualização, não só tokens por PR. A complexidade e o risco, não um limite arbitrário de linhas/arquivos, determinam a profundidade.

**Exceções:** se falta acesso, autorização, plataforma de PR ou revisor, preserve commits e provas, reporte a etapa bloqueada e faça handoff rastreável; não declare PR ou merge inexistente. Integração direta é exceção expressamente delegada, não padrão.

## Encerramento da sessão

Fim de plano significa validação e handoff, não necessariamente encerramento da sessão. Novos planos podem reutilizar a Worktree e seus checkpoints. Se o usuário decidir concluir a linha de trabalho, verifique preservação de commits, integração e pendências explicitamente; não feche o workspace por inatividade ou handoff.
## Integração

**Commit, PR e merge são operações distintas.** O caminho padrão é revisar e integrar pelo PR, sem fazer merge direto na `main` a partir da Worktree produtora. Integre somente com autorização para destino e escopo; Git local pode integrar diretamente apenas sob exceção explícita. Se a operação realmente envolver Worktrees protegidas via MCP, use `worktree-mcp-operations`.

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
- abrir PR por teste/checkpoint, quebrar entrega atômica em micro-PRs, agrupar mudanças independentes em PR gigante sem ganho ou duplicar PR da mesma entrega em revisão;
- fazer merge da própria proposta por rótulo presumido, revisar apenas o resumo sem evidência crítica ou reler/revalidar todo o repositório por rotina;
- encerrar ou limpar a Worktree após commit/merge sem solicitação específica;
- supor que testes isolados validam a integração.
## Critério de conclusão

**Entrega para revisão:** escopo independentemente integrável e validado, branch e HEAD observados, PR aberto verificável (ou impedimento explícito), handoff com proveniência e URL quando existir. Validação e PR não provam integração.

**Integração autorizada:** revisão efetiva, checks/validação proporcional e merge observados no destino, ou bloqueio documentado. Nenhuma operação é presumida a partir da identidade do agente. Merge não encerra a Worktree.
## Regra final

> Quem produz uma entrega validada propõe o PR; quem recebe a proposta com autoridade revisa e integra. Execute onde a capacidade e a autorização permitem. Nenhum PR ou merge encerra automaticamente a Worktree.
## Ciclo pelas operações remotas de Worktree

**Esta seção é condicional:** aplica-se somente quando a operação Git efetivamente usar o canal remoto Code Awareness. Não é o procedimento obrigatório para quem dispõe de Git local autorizado.

Nesse canal, siga a Skill `worktree-mcp-operations`: descubra e inspecione a Worktree, obtenha aprovação nativa local, lease, snapshots, receipts e idempotência conforme contrato. Hand-off e pausa do escritor são cooperativos; não presuma posse de uma IDE externa. Se houver **exceção autorizada de integração direta**, faça preview e APPLY em checkout gerenciado, valide o commit candidato no próprio checkout e promova somente com prova e ownership válidos. No fluxo padrão, entregue a branch por PR e deixe o merge para a revisão autorizada. Expiração, restart ou resultado desconhecido exigem recuperação, nunca takeover por timeout.

Na via local, preserve as mesmas invariantes de intenção explícita, ausência de escrita concorrente, rollback não destrutivo e validação, mas **não emule nem solicite leases MCP** para comandar Git pelo terminal.
