---
name: cli-execution
description: Escolha o canal de CLI conforme a localização real do agente: use terminal direto quando há acesso local autorizado ao checkout, e CLI Execution MCP apenas quando um agente remoto precisa executar no host Code Awareness. Oriente a autorização nativa e o ciclo MCP; não roteie agentes locais com terminal pelo MCP nem substitua ferramentas especializadas.
---

# CLI Execution — Code Awareness Channel

## Finalidade e seleção econômica

CLI Execution é uma **capability própria do Channel**, separada de Code Navigation. Executa processos locais no checkout do projeto ativo sob a política de confiança escolhida pelo operador no Desktop. O modo confiável permite CLI geral; supervisão de processos não é sandbox de segurança. Use só quando o resultado exigir um comando local e quando o executor tiver autorização para os seus efeitos.

Prefira capacidades mais específicas quando bastarem: `code-navigation` para leitura/navegação; `git-operations` para Git tipado e concorrência; `validacao-de-implementacoes` e `validation-evidence-channels` para provas por profiles; `continuum` para Artifacts. **Não use CLI para escapar de controles, autoridade, leases, quotas ou limitações de ferramentas tipadas.** **Regra obrigatória:** se o agente tem terminal local autorizado no checkout correto, **use a CLI direta, nunca CLI Execution MCP como intermediário**. O MCP é destinado ao agente remoto que precisa executar no computador do Code Awareness sem acesso direto àquele checkout. Não confunda um terminal remoto de sandbox/cloud com um terminal no computador do usuário.

## Seleção obrigatória do canal — local versus nuvem

**Decida pelo acesso efetivo ao checkout de destino, não pelo nome do agente.**

- **Codex local, agente em IDE ou outro executor no computador com terminal e acesso autorizado ao checkout:** executar comandos pela **CLI local normal**, como já faz. **Não chamar** `prepare_cli_execution`, `start_cli_execution`, `get_cli_execution` ou `cancel_cli_execution` para esses comandos. Não exigir ativação do botão do Channel ou consentimento MCP para uma execução direta. Respeitar permissões e políticas do terminal local.
- **Codex em ambiente de nuvem, ChatGPT.com ou outro agente remoto sem terminal no checkout do host:** quando realmente precisar executar um comando **na máquina em que o Code Awareness está rodando**, usar o **CLI Execution MCP** pelo Channel, com botão ativado, proposta e autorização nativa. Ter terminal na própria máquina virtual/cloud **não** é acesso ao checkout local do usuário.
- **Agente remoto com terminal no próprio workspace remoto:** usar esse terminal para comandos **naquele workspace**, sem passar pelo MCP. Só recorrer ao MCP quando o alvo for o checkout local do host Code Awareness e a operação estiver autorizada.
- **Local sem acesso/autoridade ao checkout ou remoto sem MCP funcional:** não tentar contornar permissões ou alternar de canal para obter privilégios. Declarar a dependência específica ou usar uma ferramenta tipada realmente autorizada.

**A simples existência de CLI Execution MCP nunca justifica substituição da CLI direta.** Essa separação reduz chamadas, tokens, aprovações repetidas e dependência desnecessária do Channel.

## Pré-condições e autorização — apenas MCP remoto

- A capacidade precisa estar **ativada no Channel do Desktop**, pelo botão **Ativar execução CLI**. Se desativada, `prepare_cli_execution`/`start_cli_execution` retornam `CLI_EXECUTION_DISABLED`. Não tentar ativar por comando, mutação de configuração ou bypass; comunicar a dependência ao operador.
- A preferência `cliExecutionEnabled` pertence às configurações locais persistidas do Desktop; o padrão de primeira instalação é **desativado**. Estado de um usuário/dispositivo não autoriza supor ativação em outro.
- Confirme **projeto ativo, checkout e intenção** da operação. Uma proposta não autoriza execução em outro projeto ou após mudança de contexto. O modo efetivo vem do host e acompanha a proposta/receipt. O agente não pode escolher modo por payload, editar o perfil para ativá-lo, ampliar a confiança nem aceitar seus avisos. O gate OFF permanece independente dos modos.
- Autoridade MCP, consentimento nativo e autorização do responsável pela alteração são condições distintas. Não usar comando destrutivo, instalação, transmissão de dados, alteração de arquivos ou operação Git irreversível sem escopo expressamente autorizado.
- O processo roda em Windows e exige supervisor nativo com ownership verificável. `NATIVE_OWNERSHIP_UNAVAILABLE_OR_INVALID` indica dependência de build/instalação do helper, não autorização para fallback desprotegido.

## Modos locais de confiança

- `SUPERVISED`: consentimento nativo por comando; no lote, uma aprovação completa do manifesto fechado. É o default para usuários existentes.
- `AUTONOMOUS_CONSULTATIVE`: sem diálogo somente para a política positiva inicial: whoami.exe e hostname.exe reais em System32, sem argumentos. Shells, wrappers, scripts, executáveis homônimos de outro path e até `--help` ficam fora. `NOT_AUTO_AUTHORIZED` não executa nada: para prosseguir com consentimento, o operador precisa escolher SUPERVISED no Desktop. Não há fallback para confiança ampla.
- `AUTONOMOUS_TRUSTED`: autorização nativa inicial, persistida somente no perfil Desktop e vinculada a repositoryId/checkout físico. Permite comandos gerais, scripts e package managers sem diálogos por comando ou lote, enquanto a identidade e a confiança permanecerem válidas.

A confiança abrange todos os clientes autenticados com acesso à capacidade; não há isolamento por agente/sessionId. Processos usam os direitos e credenciais da conta Windows atual, sem elevação nova. CWD e Job Object NÃO restringem acesso a arquivos/rede; erros e prompt injection continuam possíveis. O operador pode revogar e interromper pela UI local. Não apresente análise textual de comandos como contenção de segurança.

Confirme catálogo, schema e policy no runtime conectado. A atualização desta Skill não prova que o Desktop carregou a implementação: sem modos/tools novos, preserve o fluxo supervisionado disponível e informe a limitação.

## Fluxo MCP remoto — quatro ferramentas unitárias

1. **Preparar:** `prepare_cli_execution({ executable, args?, relativeCwd? })`. Use `executable` real e `args` como vetor literal; não interpolar shell, concatenar comandos nem inserir `cmd /c` por conveniência. `relativeCwd` deve permanecer no checkout ativo. Leia `proposalId`, expiração, `repositoryId`, `command`, `cwd`, riscos e estado. Verifique se o comando resolvido corresponde exatamente à intenção; uma proposta pode expirar e não cria processo.
2. **Iniciar:** `start_cli_execution({ proposalId, operationId })` com `operationId` estável e único para a operação. Início é assíncrono; `policy.mode` identifica se o host solicita consentimento supervisionado ou autoriza autonomamente. `AWAITING_APPROVAL` pode ser transitório durante guards/launch, mesmo sem diálogo no modo autônomo; **não** confundir `start` aceito com processo executado. Se houver incerteza ou timeout de resposta, concilie pela **mesma** `operationId` antes de repetir qualquer mutação. Nunca criar outro ID para contornar resposta desconhecida.
3. **Consultar:** `get_cli_execution({ operationId, cursor? })`. Respeite estado/fase, `exitCode`, `stdout`, `stderr`, `truncated`, `hasMore` e `nextCursor`. Paginar somente se a página adicional puder mudar a conclusão; não despejar logs. Em SUPERVISED, `AWAITING_APPROVAL` aguarda a decisão do operador; em modo autônomo, acompanhe a fase e os guards sem inventar uma aprovação pendente. Nunca prepare duplicatas para contornar esse estado. Em execução longa, consultas proporcionais, não polling agressivo.
4. **Cancelar quando necessário:** `cancel_cli_execution({ operationId })`. Use para interrupção requerida, prazo operacional ou desistência autorizada; consulte o desfecho. A resposta é o **estado observado**, não garantia automática de término. Uma terminação não confirmada não equivale a `CANCELLED`: não declare árvore encerrada nem libere capacidade por inferência.

## Investigação fechada em lote

Use somente quando 2–5 comandos literais já estiverem definidos no mesmo checkout. `prepare_cli_investigation({commands:[{executable,args?,relativeCwd?},...]})` resolve todo o manifesto, devolve manifestHash/policy/budgets e não cria processos. O manifesto resolvido tem limite de 6 KiB para revisão nativa completa; não aceita inserção posterior, placeholders executáveis ou comandos derivados de stdout.

`start_cli_investigation({proposalId,operationId})` usa reserva compartilhada com a execução unitária e o mesmo supervisor. SUPERVISED pede um consentimento para todos os comandos exatos; CONSULTATIVE exige elegibilidade de todos antes de iniciar; TRUSTED dispensa novos diálogos. A sequência é sempre serial e só avança após árvore vazia e handles fechados. Falha, drift, revogação, timeout, cancelamento ou término não confirmado impedem os próximos passos.

`get_cli_investigation({operationId})` retorna apenas estados e metadados, sem stdout/stderr. Use `{operationId,index,cursor?}` para saída somente daquela etapa: página de até 8 KiB de texto combinado. Respeite truncated/hasMore/nextCursor. `cancel_cli_investigation({operationId})` interrompe a árvore e bloqueia o restante; consulte o estado observado.

Orçamentos: 30 s por comando, 90 s no total, 64 KiB de stdout+stderr por etapa, 256 KiB no lote, resumo até 8 KiB. A execução unitária mantém seus limites anteriores. Reconcile resposta perdida pela mesma operationId e proposta; após restart, OPERATION_NOT_FOUND significa estado desconhecido/não recuperável, nunca autorização para reexecutar com novo ID. Saída integral não é persistida por padrão.

## Evidência e falhas

- Aceite funcional de sucesso exige `status: SUCCEEDED`, `phase: TERMINAL`, `exitCode: 0` e saída esperada, quando aplicável. Se a propriedade relevante for encerramento de árvore, exija observação `activeProcesses: 0` e `handlesClosed: true`; saída correta isolada não prova isso.
- `FAILED`, `REFUSED`, `CANCELLED`, `TIMED_OUT`, `AWAITING_APPROVAL` e `OPERATION_NOT_FOUND` têm significados distintos. Nunca tratar bloqueio nativo como bug da implementação sem evidência; distinguir reprovação de autorização, helper ausente, processo falho e desconhecido.
- Comandos Windows `.cmd/.bat` têm restrições de representabilidade de argumentos; se o resolver rejeitar metacaracteres ou aspas, **não** reescrever como shell inseguro. Prefira executável nativo com argv literal ou reporte impossibilidade segura.
- Registre só **comando necessário, checkout/HEAD quando relevante, autorização/estado, exit code, pequeno excerto de stdout/stderr e limite da prova**. Tokens e riscos operacionais são economizados com chamadas direcionadas.
- Em POLICY_CHANGED, revogação, troca de projeto, desconexão ou drift de identidade, interrompa a suposição de contexto anterior: recupere identidade atual e prepare nova proposta somente se a operação ainda for desejada e autorizada.

## Fronteira com outras Skills

Esta Skill governa **a seleção econômica entre terminal local direto e CLI Execution MCP remoto**, além do uso seguro da capability MCP quando ela for realmente necessária. Não substitui políticas de domínio: para validação de software, use `validacao-de-implementacoes`; para Worktrees/PRs, use `worktree-execution` ou `git-operations`; para recuperar failures operacionais específicos, use `engineering-evidence-economy` somente quando a escolha da evidência ainda estiver aberta. Não criar um atalho universal `CLI` para tarefas que ferramentas tipadas resolvem melhor.
