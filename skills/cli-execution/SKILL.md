---
name: cli-execution
description: Execute comandos locais no projeto ativo pelo Code Awareness Channel via MCP com proposta, autorização nativa, saída paginada e cancelamento seguro. Use quando a tarefa realmente exigir processo local remoto; não use para navegação read-only, Git tipado, validação por profile ou operações que já tenham ferramenta especializada equivalente.
---

# CLI Execution — Code Awareness Channel

## Finalidade e seleção econômica

CLI Execution é uma **capability própria do Channel**, não um terminal irrestrito nem parte de Code Navigation. Permite executar processos locais no checkout do **projeto ativo**, depois de resolução da proposta e consentimento nativo do operador. Use só quando o resultado exigir um comando local e quando o executor tiver autorização para os seus efeitos.

Prefira capacidades mais específicas quando bastarem: `code-navigation` para leitura/navegação; `git-operations` para Git tipado e concorrência; `validacao-de-implementacoes` e `validation-evidence-channels` para provas por profiles; `continuum` para Artifacts. **Não use CLI para escapar de controles, autoridade, leases, quotas ou limitações de ferramentas tipadas.** Quando o executor autorizado já possui terminal no checkout correto, prefira-o se for equivalente e mais barato; o MCP serve especialmente a agentes externos sem acesso local.

## Pré-condições e autorização

- A capacidade precisa estar **ativada no Channel do Desktop**, pelo botão **Ativar execução CLI**. Se desativada, `prepare_cli_execution`/`start_cli_execution` retornam `CLI_EXECUTION_DISABLED`. Não tentar ativar por comando, mutação de configuração ou bypass; comunicar a dependência ao operador.
- A preferência `cliExecutionEnabled` pertence às configurações locais persistidas do Desktop; o padrão de primeira instalação é **desativado**. Estado de um usuário/dispositivo não autoriza supor ativação em outro.
- Confirme **projeto ativo, checkout e intenção** da operação. Uma proposta não autoriza execução em outro projeto ou após mudança de contexto. Mesmo com o botão ligado, `start_cli_execution` exige consentimento **nativo e específico**. O modelo não pode concedê-lo.
- Autoridade MCP, consentimento nativo e autorização do responsável pela alteração são condições distintas. Não usar comando destrutivo, instalação, transmissão de dados, alteração de arquivos ou operação Git irreversível sem escopo expressamente autorizado.
- O processo roda em Windows e exige supervisor nativo com ownership verificável. `NATIVE_OWNERSHIP_UNAVAILABLE_OR_INVALID` indica dependência de build/instalação do helper, não autorização para fallback desprotegido.

## Fluxo padrão de quatro ferramentas

1. **Preparar:** `prepare_cli_execution({ executable, args?, relativeCwd? })`. Use `executable` real e `args` como vetor literal; não interpolar shell, concatenar comandos nem inserir `cmd /c` por conveniência. `relativeCwd` deve permanecer no checkout ativo. Leia `proposalId`, expiração, `repositoryId`, `command`, `cwd`, riscos e estado. Verifique se o comando resolvido corresponde exatamente à intenção; uma proposta pode expirar e não cria processo.
2. **Iniciar:** `start_cli_execution({ proposalId, operationId })` com `operationId` estável e único para a operação. Início é assíncrono e normalmente retorna `AWAITING_APPROVAL`. O consentimento é recebido no Desktop; **não** confundir `start` aceito com processo executado. Se houver incerteza ou timeout de resposta, concilie pela **mesma** `operationId` antes de repetir qualquer mutação. Nunca criar outro ID para contornar resposta desconhecida.
3. **Consultar:** `get_cli_execution({ operationId, cursor? })`. Respeite estado/fase, `exitCode`, `stdout`, `stderr`, `truncated`, `hasMore` e `nextCursor`. Paginar somente se a página adicional puder mudar a conclusão; não despejar logs. Se ainda `AWAITING_APPROVAL`, aguarde a decisão do operador sem iniciar propostas duplicadas. Em execução longa, consultas proporcionais, não polling agressivo.
4. **Cancelar quando necessário:** `cancel_cli_execution({ operationId })`. Use para interrupção requerida, prazo operacional ou desistência autorizada; consulte o desfecho. A resposta é o **estado observado**, não garantia automática de término. Uma terminação não confirmada não equivale a `CANCELLED`: não declare árvore encerrada nem libere capacidade por inferência.

## Evidência e falhas

- Aceite funcional de sucesso exige `status: SUCCEEDED`, `phase: TERMINAL`, `exitCode: 0` e saída esperada, quando aplicável. Se a propriedade relevante for encerramento de árvore, exija observação `activeProcesses: 0` e `handlesClosed: true`; saída correta isolada não prova isso.
- `FAILED`, `REFUSED`, `CANCELLED`, `TIMED_OUT`, `AWAITING_APPROVAL` e `OPERATION_NOT_FOUND` têm significados distintos. Nunca tratar bloqueio nativo como bug da implementação sem evidência; distinguir reprovação de autorização, helper ausente, processo falho e desconhecido.
- Comandos Windows `.cmd/.bat` têm restrições de representabilidade de argumentos; se o resolver rejeitar metacaracteres ou aspas, **não** reescrever como shell inseguro. Prefira executável nativo com argv literal ou reporte impossibilidade segura.
- Registre só **comando necessário, checkout/HEAD quando relevante, autorização/estado, exit code, pequeno excerto de stdout/stderr e limite da prova**. Tokens e riscos operacionais são economizados com chamadas direcionadas.
- Em troca de projeto, desconexão ou drift de identidade, interrompa a suposição de contexto anterior: recupere identidade atual e prepare nova proposta somente se a operação ainda for desejada e autorizada.

## Fronteira com outras Skills

Esta Skill governa **o uso seguro e econômico da CLI remota**. Não substitui políticas de domínio: para validação de software, use `validacao-de-implementacoes`; para Worktrees/PRs, use `worktree-execution` ou `git-operations`; para recuperar failures operacionais específicos, use `engineering-evidence-economy` somente quando a escolha da evidência ainda estiver aberta. Não criar um atalho universal `CLI` para tarefas que ferramentas tipadas resolvem melhor.
