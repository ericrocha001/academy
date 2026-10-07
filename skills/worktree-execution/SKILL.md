---
name: worktree-execution
description: Use ao conduzir uma implementação em Git worktree isolada quando sessões ou agentes possam trabalhar concorrentemente no mesmo repositório. Mantém uma worktree e branch por sessão, permite vários Planos Finais Executáveis na mesma sessão, cria checkpoints locais após estados coerentes validados, publica a branch ao fim da sessão, orienta integração e só encerra o workspace após preservação e validação suficientes. Não use para ensinar comandos Git, definir provas de software ou decompor planos.
---

# Worktree Execution

## Propósito

Padronizar o ciclo de uma sessão de implementação isolada sem duplicar capacidades do Git, da IDE ou da validação.

> Uma sessão concorrente deve operar em uma worktree e branch próprias antes da primeira alteração. A worktree acompanha a sessão, não cada plano.

Modelo: uma sessão, uma worktree, uma branch, vários planos relacionados, checkpoints locais quando úteis, uma publicação da sessão e um resultado de integração.

## Fronteiras

Esta Skill governa o ciclo da sessão. Para operações Git concretas, use git-operations quando disponível. Para decidir o que prova correção e quando declarar VALIDADO, use validacao-de-implementacoes. O planejamento continua pertencendo à capacidade de planejamento executável.

## Pré-condição de isolamento

Antes de editar, confirme repositório, worktree ativa, branch dedicada e baseline inicial. Prefira a criação ou seleção nativa de worktree da IDE ou harness antes de iniciar a sessão.

Não considere isolamento obtido apenas porque outra worktree existe em outro diretório. A execução precisa estar efetivamente vinculada a ela. Se a sessão começou no checkout compartilhado e o ambiente não consegue provar rebinding seguro, não inicie trabalho concorrente ali; reinicie ou abra a execução na worktree correta.

## Worktree por sessão

Uma mesma worktree pode receber vários Planos Finais Executáveis relacionados. Preserve-a enquanto a sessão continuar sendo uma única linha coerente de implementação e o contexto acumulado continuar útil.

Não crie worktree nova por plano sem razão operacional.

## Baseline

Registre o baseline observado no início. O avanço posterior da branch de destino não muda esse ponto de partida. Use-o no encerramento para reconhecer drift e avaliar integração.

## Plano e checkpoint

Cada plano é implementado e validado antes do próximo. A Skill validacao-de-implementacoes determina a evidência suficiente.

Depois de um plano VALIDADO, prefira um commit local quando o resultado formar um estado coerente, restaurável e semanticamente distinguível do trabalho seguinte.

O checkpoint preserva o último estado saudável. Não crie commit por ritual quando o plano não produzir uma fronteira coerente.

Checkpoint é artefato de execução e não precisa conservar a mesma granularidade no histórico permanente.

## Commit e push

> Commit local preserva checkpoint. Push publica a sessão.

Por padrão, não faça push após cada plano. Acumule os checkpoints validados na branch local da worktree e publique a branch quando a sessão estiver pronta para encerramento.

Push intermediário só é necessário por motivo material, como proteção contra perda local, handoff para outro ambiente, colaboração remota ou exigência explícita do fluxo.

## Encerramento da sessão

Antes de publicar, confirme que os planos destinados à entrega foram concluídos ou explicitamente resolvidos, que as propriedades obrigatórias foram validadas, que não há falha conhecida incompatível com conclusão e que o trabalho pretendido está preservado.

Faça a validação final proporcional à composição quando necessária e então publique a branch conforme a política do repositório.

Push significa que a linha de execução está preservada e disponível para integração; não significa que já pertence ao baseline principal.

## Integração

Integre conforme a política existente do repositório. Esta Skill não impõe merge, rebase, squash ou pull request.

Checkpoints podem permanecer ou ser combinados, desde que a mudança validada e sua intenção sejam preservadas.

Considere drift desde o baseline e mudanças concorrentes. Ausência de conflito textual não prova ausência de incompatibilidade semântica.

## Validação pós-integração

A validação na worktree prova o estado isolado. Depois da integração, determine com validacao-de-implementacoes se alguma propriedade afetável pela combinação precisa ser demonstrada novamente.

Não repita provas por ritual. Revalide apenas o que a integração ou o drift puder materialmente afetar.

Diferencie implementação validada de integração validada.

## Encerramento do workspace

A worktree só pode ser encerrada quando o trabalho necessário estiver preservado e nenhuma alteração relevante depender exclusivamente daquele workspace.

Confirme que o resultado pretendido está em commits, que a publicação ocorreu quando necessária, que a integração ou o descarte deliberado estão resolvidos e que não existe mudança não preservada.

A branch efêmera pode ser encerrada depois da integração confirmada segundo a política do repositório.

> Limpeza é consequência da conclusão comprovada, não prova de conclusão.

## Concorrência

Worktrees diferentes permitem que executores diferentes mantenham sessões independentes sobre o mesmo repositório. Cada sessão conserva seu próprio contexto e pode executar vários planos em sequência.

Não distribua automaticamente unidades do mesmo plano entre agentes apenas porque existem worktrees disponíveis. O isolamento evita interferência física durante a execução, mas não elimina risco de integração entre linhas relacionadas.

## Anti-padrões

- criar worktree em outro diretório e continuar editando o checkout original;
- criar uma worktree por plano sem necessidade;
- manter uma sessão longa sem preservar estados validados restauráveis;
- criar commit mecânico após qualquer plano;
- fazer push obrigatório após cada checkpoint;
- tratar push como integração;
- encerrar a worktree antes de preservar o trabalho;
- assumir que validação isolada elimina a necessidade de reavaliar efeitos da integração.

## Critério de conclusão

Uma execução está encerrada quando começou em workspace realmente isolado, preservou sua linha de execução, manteve checkpoints úteis, publicou a sessão quando aplicável, integrou segundo a política do repositório, revalidou propriedades afetáveis quando necessário e só então encerrou worktree e branch efêmeras.

## Regra final

> Isole antes de editar. Preserve estados validados localmente. Publique a sessão, não cada passo. Integre conscientemente. Revalide o que a integração puder afetar. Encerre o workspace somente depois que o trabalho estiver comprovadamente preservado.