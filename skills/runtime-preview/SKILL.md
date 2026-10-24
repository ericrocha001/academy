---
name: runtime-preview
description: Execute e acompanhe o aplicativo real de uma Worktree/branch pelo Runtime Preview MCP do Code Awareness, com aprovação nativa, isolamento e aceitação visual humana. Use quando o usuário pedir para abrir, testar ou validar uma implementação na janela Electron sem integrar à main. Não use para navegação de source, testes locais equivalentes ou deploy.
---

# Runtime Preview — execução assistida e aceitação humana

## Capacidade e limites

Permite ao agente (inclusive Arquiteto sem acesso local ao IDE) **solicitar ao host Code Awareness que inicie o app de uma Worktree selecionada**, consultar identidade e evidências tipadas, orientar o usuário a examiná-lo na janela real e registrar o resultado. O usuário opera/observa a janela no próprio Windows; o MCP **não transmite automaticamente frames, screenshots, cliques ou controle remoto da UI para o chat**. Não alegue ter visto uma tela que não foi fornecida. Para inspeção visual pelo agente, use imagem/evidência fornecida por canal disponível e autorizado; probes da janela ainda são uma oportunidade distinta, não assuma que existem.

Conceitos distintos: `PREFLIGHT SUPPORTED` autoriza tentar iniciar; `RUNNING` indica processo; `READY` + atestação indica prontidão técnica delimitada; **aceitação humana** demonstra o que a pessoa realmente verificou; `QUALIFICATION PASSED` requer prova comportamental no Ledger e binding de execução compatíveis. Nenhum desses resultados substitui automaticamente outro. A Skill `validation-evidence-channels` governa prova formal; `worktree-mcp-operations` governa identidade, Git e permissões; `continuum-publication` governa handoff persistente.

## Quando usar e quando não usar

Use para: “rode esta branch”, “quero abrir a implementação na minha máquina”, “mostre-me o aplicativo da Worktree para eu validar”, ou revisão de UI/comportamento real de um checkpoint antes do PR. Pode ser acionada diretamente, sem Implementador intermediário, **se as ferramentas e autorizações necessárias estiverem realmente acessíveis**.

Não iniciar só para consultar arquitetura, provar que testes unitários passaram, ler source ou confirmar que um PR foi mergeado. Não inferir autorização de execução a partir de acesso de leitura ou do papel do agente. **Não iniciar uma sessão apenas porque o usuário está pedindo para construir/ensinar esta Skill.**

## Seleção correta e autorização

1. Confirme o repositório **canônico**, a branch e a Worktree que contém o checkpoint a revisar. Descubra `repositoryId` pela operação tipada do ambiente, não use automaticamente ID de projeto da Academy, path ou nome. Use `discover_worktrees`/`inspect_worktree` (conforme `worktree-mcp-operations`), ou `list_runtime_preview_worktrees`. Confirme `worktreeId`, `generation`, branch, HEAD e estado atual. Não iniciar outra Worktree por conveniência.
2. `list_runtime_preview_profiles({repositoryId})` → escolher perfil fixo do host efetivamente suportado, com `profileId` e `fingerprint` observados. A seleção exigida pelo MCP é `{repositoryId,worktreeId,generation,profileId,fingerprint}`; não invente campos, IDs ou fingerprints. Perfil automático no botão **Rodar aplicativo** da UI do Work Orchestration é alternativa humana conveniente; o catálogo MCP atual **não expõe a ação simplificada RUN_BRANCH_APP**, portanto use a sequência tipada abaixo.
3. `preflight_runtime_preview({selection})`: interpretar todas as recusas, compatibilidade, isolamento e permissões; `UNKNOWN` não é compatível por pressuposto. Perfil host-owned, runtime/dependências, cooperation/bootstrap V5 e eventual `REPOSITORY_SNAPSHOT` são políticas do host. Não contornar falta de checkout, aprovação, compatibilidade ou isolamento. Dados copiados ao snapshot são privados, sem sincronização reversa ao Continuum canônico; não copiar credenciais.
4. Quando houver autorização explícita da execução e aprovação do perfil pendente, `authorize_runtime_preview_profile({selection})` invoca **aprovação nativa do operador** na revisão/fingerprint exatos. Cancelamento é cancelamento; não solicitar bypass nem inventar aprovação. Se a aprovação não for possível pelo canal, explique o bloqueio e indique a ação local exigida.

## Executar e acompanhar

5. Revalidar checkout, seleção e preflight após aprovação. `start_runtime_preview({selection,operationId})` requer UUID novo por **intenção de início**, reaproveitado em reconciliações dessa mesma operação (nunca criar UUID novo só para retry de resultado incerto). Um retorno `PREVIEW_REQUEST_IN_PROGRESS`, `pending` ou operationId **não prova lançamento concluído**. Observe `list_runtime_previews({repositoryId,worktreeId})` e `inspect_runtime_preview({sessionId})` até estado inequívoco, sem polling agressivo. Single-session: não encerrar outra sessão automaticamente nem tentar segunda execução enquanto uma permanecer ativa.
6. Confira que processo, endpoint, checkout/HEAD/geração, perfil e contexto operacional correspondem ao alvo. Onde necessário, `probe_runtime_preview({sessionId,probes:["READINESS","ATTESTATION"]})`; os dois probes são um conjunto obrigatório, não executar subconjunto. Leia somente evidência tipada pertinente por `read_runtime_preview_evidence({sessionId,section:"SOURCE"|"COVERAGE"|"RUNTIME",offset?,limit?})`; estas tools não são Console, screenshot, leitor de logs, shell, avaliador de JavaScript ou controlador remoto da janela. Diagnósticos de término inesperado são diferentes de STOP explicitamente pedido.
7. **Aceitação assistida:** informe ao usuário qual branch/HEAD foi executado e peça que examine a janela real, em especial o comportamento que motivou a mudança. Peça observação objetiva de PASS/FAIL por critério (evidência ou captura, quando material). O agente pode orientar a navegação, registrar problemas e relacionar a manifestação humana à sessão, mas **não declarar validação visual em nome dela**. Uma declaração humana valida apenas o escopo efetivamente observado; não prova automaticamente outras áreas, artefatos servidos ou histórico de processo.

## Qualificação e encerramento

8. Para qualificação formal via MCP, use `list_runtime_preview_bindings({sessionId})` e a Skill `validation-evidence-channels` para obter **binding certificado da execução** e **prova Ledger** do tipo `MANUAL_ACCEPTANCE` ou `E2E`, com escopo e identidades compatíveis. Somente então `qualify_runtime_preview({sessionId,bindingId,proofId,criterionId})`. Verifique resultado real: `PASSED`, `FAILED` ou `INCONCLUSIVE`, razões e cobertura. Se não houver binding, prova compatível ou atestação suficiente, registre **aceitação humana observada** separadamente e indique formalização pendente; não fabricar `PASSED`. Exigir checkout/fingerprint atual e evidência vinculada temporalmente à sessão. `READY` não dispensa prova.
9. Após o usuário encerrar o exame ou autorizar fechamento, `stop_runtime_preview({sessionId})` e inspecione até provar o término, liberação de processos e recursos. Resultado pending não é STOPPED; fechamento manual da janela sem `STOP_REQUESTED` pode permanecer `UNEXPECTED_PROCESS_EXIT` mesmo com exit code 0. Não matar processo do host, não executar stop-all e não apagar dados/worktrees.
10. Reporte em poucas linhas **target repository/branch/HEAD/worktree, sessionId, estado técnico, atestação e limites, observação humana por critério, qualificação formal (se houver), término/cleanup** e próxima ação. Preserve evidência e handoff no Continuum apenas se fizerem parte da execução; separação PR/merge continua regida por `git-operations` e `worktree-execution`. Preview **não** é push, PR, merge nem promoção de source.

## Falhas e disciplina de contexto

Identidade que mudou → redescobrir a seleção e pedir nova autorização quando necessário. Resultado desconhecido → recuperar mesma sessão/intenção, não iniciar em duplicidade. Ambiente incompatível → informar razão precisa e trabalho necessário, sem relaxar segurança. Falha de renderer, processo ou IPC → FAIL/INCONCLUSIVE segundo prova, jamais sucesso por simples abertura. Uma observação de usuário sem imagem não se transforma em imagem vista pelo agente.

**Custo:** orientação e seleção por metadata primeiro; ler `SOURCE`/`COVERAGE`/`RUNTIME` somente para resolver dúvida ou provar critério. Não carregar histórico de todas as sessões nem todos os Artifacts; apenas o alvo e sua prova.
