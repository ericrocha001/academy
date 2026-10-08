---
name: worktree-execution
description: Use ao iniciar e conduzir implementações isoladas em Git Worktrees e coordenar sua retomada, handoff, checkpoints, integração e encerramento entre Implementador e Arquiteto. O Implementador apenas desenvolve, valida e publica o handoff; operações Git são feitas pelo Arquiteto somente após solicitação do usuário. Não use para comandos Git nem para decidir as provas de software.
---

# Worktree Execution

## Propósito

Governar sessões de implementação isoladas **sem consumir o contexto/tokens do Implementador com Git**. A Worktree acompanha a sessão e pode receber vários planos, correções e handoffs sem ser recriada.

**Política de papéis:** Implementador = implementar, testar, validar e publicar handoff; usuário = decidir quando solicitar operações Git; Arquiteto = executar a governança Git autorizada. Publicação de handoff não é solicitação, concessão ou execução de commit/merge/push.

## Fronteiras

Esta Skill governa o ciclo de trabalho e a separação de papéis. Os comandos, aprovações locais, leases, snapshots, receipts e integração protegida pertencem exclusivamente à Skill `git-operations` e ao seu backend. As evidências de correção pertencem à `validacao-de-implementacoes`; os Artifacts pertencem ao `continuum`.

**Nenhuma ação Git é responsabilidade normal do Implementador**, incluindo stage, commit, branch, push, merge, integração, checkout, fechamento, handoff de posse, solicitação ou transmissão de credenciais. O Implementador não deve aceitar, gerar ou repassar leases. Não interrompa a implementação para realizar Git em nome do Arquiteto.

O Arquiteto não age por gatilho automático de VALIDATED/IMPLEMENTATION_HANDOFF: aguarda **pedido explícito do usuário**, verifica o estado real e obtém a aprovação nativa do operador quando o backend a exigir. O pedido do usuário não elimina as preconditions técnicas. Se a Worktree ainda estiver sendo modificada por uma IDE/agente, confirme quiescência antes da mutação; coordenação cooperativa não é lock de IDE externa.

## Pré-condição de isolamento

A Worktree com **branch exclusiva ativa** deve ser providenciada pela IDE/harness ou pelo Arquiteto **antes** do início do trabalho do Implementador. Uma pasta diferente não prova que a sessão está nela. O agente recebe o checkout pronto, não executa comandos Git para prepará-lo.

O baseline, a identidade da Worktree e a branch dedicada devem ser fornecidos pelo ambiente/orquestrador e associados ao handoff. Se essas condições não forem demonstráveis, o trabalho persistente fica bloqueado até a preparação por quem governa o Git.

## Gate obrigatório de inicialização — antes da primeira edição

**Worktree criada não significa sessão preparada.** O ambiente/orquestrador deve confirmar antes da primeira edição: (1) workspace efetivamente vinculado ao repositório e à Worktree destinados à execução; (2) branch dedicada, local, exclusiva, distinta da principal; (3) HEAD/baseline e ausência de colisão de branch; (4) identidade rastreável para o handoff.

**Detached HEAD não passa no gate de uma sessão de escrita.** Se a IDE criou a Worktree detached, a IDE/harness ou o Arquiteto estabelece a branch nela antes de o Implementador iniciar. Não delegue essa operação ao Implementador e não mude o checkout compartilhado para contornar o bloqueio. Uma Worktree só de leitura pode permanecer detached. Para Worktree legada dirty/detached, preserve todo o conteúdo e peça preparação segura ao responsável Git, sem clean/reset/recriação forçada.

## Worktree por sessão

Uma mesma worktree pode receber vários Planos Finais Executáveis relacionados. Preserve-a enquanto a sessão continuar sendo uma única linha coerente de implementação e o contexto acumulado continuar útil.

Não crie worktree nova por plano sem razão operacional.

## Identidade e proveniência da Worktree

No handoff de cada Plano, registre a identidade já conhecida e verificada da Worktree (path absoluto, branch, HEAD/commit observado, baseline, ID da sessão se disponível) e se o workspace continuará reutilizável. O Implementador **não precisa executar Git** para produzir novos snapshots; use os dados fornecidos pelo ambiente e marque como não verificado o que não puder confirmar.

Nos Artifacts do Continuum originados dessa execução, use no frontmatter: `worktreeId` **somente** quando obtido do registry e efetivamente verificado; `worktreePath` quando conhecido. São localizadores históricos, não prova de autoridade ou estado atual. `executionId` é independente e pode correlacionar os Artifacts. Não adicione proveniência retroativa a planos prévios nem invente IDs.

**Implementação concluída ≠ sessão encerrada ≠ Worktree liberada ≠ Git autorizado.** Um IMPLEMENTATION_HANDOFF validado apenas informa que o trabalho está disponível para revisão. Não exige do Implementador pausas, concessões, comandos Git ou envio de credenciais; não dispara ação no Arquiteto. A continuidade da mesma Worktree permanece possível.

## Baseline

Registre o baseline observado no início. O avanço posterior da branch de destino não muda esse ponto de partida. Use-o no encerramento para reconhecer drift e avaliar integração.

## Plano e checkpoint

Cada plano implementado deve ser validado com a evidência proporcional definida em `validacao-de-implementacoes`. O Implementador publica o handoff correspondente no `continuum` e para aí sua responsabilidade.

**Checkpoint Git é feito pelo Arquiteto quando o usuário pedir**, após inspecionar o estado real, selecionar os paths corretos, confirmar que não há escrita concorrente e seguir `git-operations`. Prefira commit local quando o conjunto de mudanças validadas formar estado coerente e recuperável; não comite por ritual. Se houver novos planos na mesma Worktree, ela continua preservada e pode acumular checkpoints sucessivos.

## Commit e push

**Commit local registra um estado da Worktree; push publica os commits; nenhum dos dois encerra automaticamente a Worktree.** Ambos são responsabilidade do Arquiteto **somente mediante solicitação do usuário**.

O Arquiteto deve inspecionar staged/unstaged/untracked, incluir apenas o trabalho pretendido e não misturar alterações anteriores ou desconhecidas. O commit altera o HEAD e o índice daquela Worktree, não exige apagar seu diretório. Evite operações simultâneas da IDE/Implementador. Push intermediário exige motivo material ou pedido expresso; não é consequência obrigatória de cada handoff.

## Encerramento da sessão

Fim de Plano significa handoff validado, não encerramento da Worktree. Se o usuário decidir finalizar a linha de trabalho, o Arquiteto verifica os handoffs e checkpoints que se pretende entregar, resolve pendências explícitas e planeja integração/preservação. Nenhum encerramento automático por publicação, validação, commit ou inatividade. Uma sessão pode ser retomada para ajustes na mesma Worktree.

## Integração

**Integração é um pedido Git distinto do commit local.** O usuário decide quando integrá-la e qual branch de destino; o Arquiteto usa `git-operations` com preview, isolamento de conflitos, validação do candidato e promoção protegida pela evidência real, conforme os contratos vigentes.

Verifique commits fonte, drift do destino e estado concorrente. Não altere diretamente uma branch ocupada/dirty, não confunda ausência de conflito textual com compatibilidade semântica. Uma integração aprovada não obriga remover a Worktree fonte.

## Validação pós-integração

Validação da implementação isolada e validação do estado integrado são provas distintas. O Arquiteto coordena somente as provas adicionais materialmente necessárias após composição, usando `validacao-de-implementacoes`; não repita todos os testes por ritual. Se forem necessárias correções, o usuário pode retomar a Worktree original com o Implementador.

## Encerramento do workspace

**Padrão: conservar a Worktree e sua branch** mesmo após commit ou integração. Reutilizá-la exige manter intactos arquivos, diretório, branch e contexto até decisão explícita.

O Arquiteto só pode fechar uma Worktree **se o usuário pedir especificamente o encerramento**, depois de comprovar que commits/trabalho estão preservados, que nenhuma alteração necessária existe apenas ali, que não há sessão em escrita e que os controles do `git-operations` autorizam o fechamento. Worktrees externas não gerenciadas não devem ser removidas pela tool de cleanup gerenciado. Limpeza não é evidência de conclusão.

## Concorrência

Worktrees diferentes permitem que executores diferentes mantenham sessões independentes sobre o mesmo repositório. Cada sessão conserva seu próprio contexto e pode executar vários planos em sequência.

Não distribua automaticamente unidades do mesmo plano entre agentes apenas porque existem worktrees disponíveis. O isolamento evita interferência física durante a execução, mas não elimina risco de integração entre linhas relacionadas.

## Anti-padrões

- atribuir ao Implementador operações Git, aprovação, REQUEST/ACCEPT/RELEASE ou posse por lease;
- disparar commit, push, merge ou fechamento automaticamente ao publicar um handoff;
- iniciar escrita em detached HEAD, branch compartilhada ou Worktree não comprovadamente vinculada à sessão;
- criar Worktree nova para cada Plano sem necessidade;
- commitar trabalhos de autoria/escopo misturados sem inspeção;
- tratar handoff validado como prova de quiescência ou autorização técnica;
- criar checkpoint mecânico após cada Plano ou push automático após checkpoint;
- confundir commit, publicação, integração e encerramento;
- fechar Worktree que se pretende reutilizar ou remover conteúdo não preservado;
- inferir que validação isolada prova compatibilidade da integração.

## Critério de conclusão

**Implementador concluído:** código implementado, evidência de validação proporcional produzida e handoff publicado com proveniência disponível. Nenhuma ação Git adicional exigida dele.

**Arquiteto concluído em operação solicitada:** operação Git autorizada e segura concluída/verificada conforme `git-operations`, com resultado comunicado ao usuário. Commit não equivale a integração; integração não equivale a fechamento. A Worktree permanece disponível salvo pedido específico de encerramento.

## Regra final

> Implemente e valide sem gastar tokens do Implementador em Git. O usuário aciona o Arquiteto. O Arquiteto protege cada mutação e conserva a Worktree para eventuais retomadas. Nenhuma transferência de permissão entre agentes e nenhuma limpeza automática.

## Ciclo pelo Git Operations MCP

Somente o Arquiteto, depois da solicitação do usuário, usa `git-operations` para descobrir e inspecionar a Worktree, adquirir **autorização local do operador diretamente no backend** quando exigida, fazer stage/commit/push ou integração protegida e verificar receipts/snapshots. O Implementador não solicita aprovação nem fornece credenciais. O backend continua impondo confirmação nativa, lease temporário, scope, drift/freshness, locks cooperativos e operação recuperável: não trate a ordem do usuário como bypass técnico.

Para integração, use checkout gerenciado em commit autorizado, preview vinculado ao source/target, APPLY no sandbox e prova verdadeira do candidato antes de PROMOTE; sessões concorrentes exigem refresh de preview/snapshot/provas. Mantenha estados distintos de checkpoint, PUBLISHED, INTEGRATION_PREPARED e INTEGRATION_VALIDATED, sem cleanup automático. Expiração, restart ou resultado desconhecido exigem recuperação, nunca tomada de posse por timeout.
