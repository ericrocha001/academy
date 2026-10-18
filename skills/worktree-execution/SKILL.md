---
name: worktree-execution
description: Use ao executar trabalho isolado em Git Worktree ou revisar uma sessão concluída por Pull Request. Governa branches, commits por Plano validado, PR único por conclusão, integração e retomada, respeitando autorização.
---

# Worktree Execution

## Propósito

Governar uma sessão isolada sem confundir **validação de Plano**, **conclusão de sessão**, **integração por merge** e **encerramento da Worktree**.

**Modelo padrão:** uma sessão, uma Worktree e uma branch exclusiva por linha coerente de trabalho. A sessão pode executar vários Planos Finais Executáveis. Cada Plano concluído e validado gera **um commit de validação** na branch da sessão; nenhum deles abre PR isoladamente. Ao concluir a sessão, o conjunto de commits é submetido em **um único Pull Request (PR)**. Revisão e merge ocorrem apenas com autorização própria. Uma execução apenas suspensa pode ser retomada no mesmo ambiente. Após merge verificado ou abandono confirmado, uma nova tentativa exige nova Worktree, branch e PR sobre o destino atualizado.

Quem opera Git depende de **capacidade observada + delegação/autorização**, nunca do rótulo Arquiteto/Implementador. Delegação contínua específica pode cobrir commits e o PR final sem reconfirmações repetidas, mas Skill, validação e handoff não concedem autoridade.

## Fronteiras

Esta Skill governa o ciclo da sessão, não ensina comandos Git ou contratos MCP. Use `validacao-de-implementacoes` para as provas, `continuum-publication` para publicar handoffs, `continuum` para recuperá-los e `engineering-evidence-economy` para comparar canais.

**Roteamento:** agente com Git local no checkout correto e autorização para a operação prefere o meio local; se não tem acesso local, ou a operação exige garantias remotas específicas, usa `worktree-mcp-operations` para Worktrees protegidas ou `git-operations` para Git remoto comum, quando disponíveis e autorizados. Não acione o MCP só para repetir Git, typecheck ou Vitest locais. A Skill `git-operations` pertence ao transporte MCP e não governa comandos locais.

**Autoridade:** acesso ao terminal não autoriza modificar a `main`, Worktree de outro agente ou remoto. Antes de mutações, verifique autorização explícita na solicitação vigente ou uma **delegação contínua, verificável e específica do repositório**, com operações e destino delimitados. A delegação contínua para preparar commits de Planos validados, publicar a branch de trabalho e abrir o PR de conclusão dispensa reconfirmações por Plano/sessão enquanto estiver válida; não nasce apenas de uma Skill, teste ou handoff. Sem delegação suficiente, solicite-a ou registre bloqueio. **Permissão para PR não é permissão para merge**: integração na `main` exige autoridade própria do integrador, revisão e evidência de validação pertinente; uma delegação contínua para integração só vale quando também explícita para esse destino e escopo. Para executar via MCP respeite aprovação nativa e lease próprios desse canal; Git local não cria nem contorna lease MCP. Nenhum executor deve interferir em escritores concorrentes.
## Pré-condição de isolamento

Antes da primeira alteração persistente, confirme repositório, Worktree efetiva, branch exclusiva da sessão e HEAD/baseline. Preferir criação/seleção nativa da IDE ou harness. Se houver terminal Git local com permissão de preparar a sessão, o próprio executor pode criar/ativar a branch; caso contrário, obtenha a preparação por capacidade autorizada ou escale o bloqueio.

Uma pasta distinta não prova isolamento; a sessão deve estar vinculada ao checkout correto. Não inicie a execução no checkout principal compartilhado quando o trabalho exige Worktree própria.
## Gate obrigatório de inicialização — antes da primeira edição

**Worktree criada não significa sessão preparada.** Observe no ambiente, antes de editar: (1) repositório/checkout correto; (2) branch local e exclusiva, não a principal; (3) HEAD e baseline conhecidos; (4) ausência de colisão com outra Worktree; (5) dependências preparadas e verificadas no checkout da sessão, quando aplicáveis; (6) identidade rastreável no handoff.

**Detached HEAD não passa no gate de escrita.** Se a IDE criou a Worktree detached (padrão do Codex), o executor com Git local autorizado **deve criar e ativar uma branch exclusiva e semanticamente nomeada no próprio checkout antes de editar**, verificando em seguida a associação real. Isso não altera a criação automática da Worktree pelo host: corrige o estado detached imediatamente após sua criação. A ação nativa da IDE, quando funcional, pode ser preferida. Na ausência dessa capacidade ou autorização, solicite preparação segura sem editar. Não recrie nem limpe a Worktree para resolver o vínculo. Worktree estritamente read-only pode permanecer detached.

Para uma Worktree legada dirty/detached, preserve os arquivos e o índice, coordene escritores e estabeleça a branch com segurança antes de novos commits. O gate só passa após verificação objetiva; do contrário, bloqueia apenas a escrita dependente.
## Vínculo explícito da execução no Continuum

Quando o repositório oferecer `bind_execution` no Continuum Local Agent Channel, após recuperar o Plano canônico com `executionId` e selecionar/verificar a branch e Worktree da sessão, registre a associação no início do trabalho, a partir do checkout do executor:

`node scripts/continuum/local.cjs bind_execution --repository <repositoryId confirmado por status> --id <artifactId do Plano> --execution <executionId exato do Plano>`

Use `continuum-local-cli` para identidade e transporte. Não forneça branch, HEAD, geração ou path como fatos: a operação os resolve no Git Operations. Preserve o recibo `PERSISTED`; replay da mesma execução/instância retorna o mesmo Artifact mesmo após commits. O registro é declaração autenticada com evidência Git pontual, não prova posse do processo, atividade, autoria ou validação. Em timeout, reconcilie pelo mesmo comando idempotente. Detached, geração desconhecida, drift, fonte divergente ou canal sem a operação não autorizam inventar associação; informe a cobertura real. Rename/recriação exige nova associação sem migrar histórico por nome. Não edite AGENTS.md para duplicar esta instrução.

## Preparação obrigatória das dependências — após vincular a branch

**Ordem de inicialização:** (1) criar/selecionar a Worktree; (2) criar/ativar e verificar a branch exclusiva nessa Worktree; **(3) instalar/preparar as dependências dentro dela**; (4) verificar que o ambiente está apto a executar o aplicativo e as validações pertinentes; (5) iniciar a implementação. A instalação é a primeira ação de preparação do ambiente após o vínculo Git, não uma providência adiada até surgir falha ao rodar o aplicativo.

Identifique os manifests, lockfiles, gerenciador de pacotes, requisitos de runtime e estrutura de workspaces do projeto; execute a instalação no diretório correto **da Worktree ativa**, usando o gerenciador e o modo reproduzível compatíveis com o lockfile. Respeite o arranjo do projeto (inclusive monorepos). Não presuma que dependências disponíveis no checkout principal estejam disponíveis nesta Worktree, nem copie artefatos gerados de outra Worktree como substituto da instalação. Não altere lockfiles, versões ou dependências por efeito colateral da preparação; mudanças realmente necessárias exigem tratamento explícito no escopo do trabalho.

**Gate de prontidão:** confirme que a instalação terminou com êxito e que comandos relevantes do projeto podem localizar suas dependências; a existência da pasta de dependências, isoladamente, não prova prontidão. Se o projeto não possui etapa de instalação, registre essa constatação e prossiga. Falha, falta de acesso, configuração ausente ou dependências indisponíveis devem ser relatadas como impedimento à execução/validação dependente; não declare o ambiente pronto nem prossiga com implementação que dependa dele.

**Reutilização:** não reinstale por Plano ou sessão automaticamente. Ao reutilizar a Worktree, verifique se as dependências continuam prontas e compatíveis com manifests/lockfiles; reinstale quando ausentes, desatualizadas ou incompatíveis. Registre no handoff eventuais limitações de preparação que afetem a execução ou a validação.

## Nome semântico da branch ao longo da sessão

**O nome pertence à branch Git; não presuma que renomear a branch renomeie o diretório da Worktree, o ID da sessão ou o rótulo exibido pela UI de Orchestration.** O estado autoritativo é o Git observado no checkout, não um rótulo que pode estar desatualizado.

**Na preparação:** antes da primeira edição, leia o objetivo efetivo do Plano e o contexto mínimo necessário para identificar o trabalho. Escolha um nome de branch curto, único e descritivo da mudança (por exemplo, `fix/codemap-grid-alignment` ou `feat/continuum-artifact-search`), conforme convenção do repositório. A nomenclatura nasce do **trabalho solicitado**, não da frase genérica usada para delegá-lo: `implement-plan`, `new-worktree`, `codex-task` e números sem semântica não representam o escopo. Não invente intenção técnica não identificada: investigue o Plano suficientemente antes de nomear. A branch deve ser exclusiva da sessão e não ocupada por outra Worktree.

**Evolução proporcional:** a branch identifica a **linha coesa da sessão**, que pode abranger vários Planos, não apenas o primeiro. Se o escopo real se revelar ou mudar materialmente, reavalie a adequação do nome. **Não renomeie por commit**: o commit descreve a validação de um Plano, enquanto a branch descreve o conjunto da sessão.

**Gate de conclusão antes do PR:** compare o nome atual com o trabalho efetivamente entregue (todos os commits/Planos). Se ainda representar bem a sessão, preserve-o. Se for materialmente impreciso, renomeie **quando seguro e autorizado**, preferencialmente **antes do primeiro push** e antes de abrir o PR. Renomeação não é rito obrigatório nem deve provocar reescrita de commits. Antes de renomear, confirme branch/Worktree corretas, exclusividade, conflitos de nome, upstream, publicação remota e consumidores da referência. Se a branch já foi publicada, é usada por terceiros ou possui PR, **não renomeie automaticamente**: mantenha a referência estável, dê título fiel ao PR e só altere a branch com coordenação explícita e plano de atualização das referências. Não force-push ou apague refs remotas por conveniência de nomenclatura.

**Verificação:** confira que HEAD está anexado à branch pretendida por evidência Git e registre seu nome efetivo no handoff e no PR. Se a UI do Codex continuar exibindo detached ou outro rótulo após uma operação Git confirmada, reporte possível divergência visual; não recrie Worktree, branch ou commits para corrigir apenas a apresentação.

## Worktree por sessão

Uma mesma worktree pode receber vários Planos Finais Executáveis relacionados. Preserve-a enquanto a sessão continuar sendo uma única linha coerente de implementação e o contexto acumulado continuar útil.

Não crie worktree nova por plano sem razão operacional.

## Identidade e proveniência da Worktree

No handoff, registre a identidade realmente observada da Worktree (path, branch, HEAD/baseline e sessão, quando conhecidos) e se a execução permanece suspensa/retomável ou o workspace está apenas conservado para evidência. Obtenha evidência com a ferramenta disponível; não invente ou marque como verificados dados não observados.

Em Artifacts do Continuum originados dessa execução, use `worktreeId` somente se o registry o verificou, e `worktreePath` quando conhecido. São identificadores históricos, não prova de posse. `executionId` correlaciona o trabalho, não substitui a identidade do checkout.

**Plano validado ≠ fim da sessão ≠ Git autorizado ≠ Worktree liberada.** Publicar handoff não autoriza outro agente a alterar o índice/HEAD ou encerrar a Worktree. O mesmo workspace pode continuar em novos planos.
## Baseline

Registre o baseline observado no início. O avanço posterior da branch de destino não muda esse ponto de partida. Use-o no encerramento para reconhecer drift e avaliar integração.

## Plano e checkpoint

**Validação** é o fechamento comprovado de um Plano Final Executável, conforme `validacao-de-implementacoes`. Terminadas as provas obrigatórias daquele Plano, registre **um commit correspondente ao Plano validado**; relacione-o no relato/handoff, preservando escopo, HEAD e evidência. Várias Unidades de Implementação de um mesmo Plano não geram automaticamente vários commits de validação. Um Plano parcial, teste isolado ou checkpoint operacional ainda não constitui essa validação.

**Conclusão** é o fechamento da sessão e do conjunto de Planos validados. Verifique os commits da sessão, pendências e a consistência da composição; produza validação integrada adicional **quando houver propriedades da composição ainda não demonstradas**. A conclusão autoriza submeter **um PR para a sessão**, nunca um PR por commit. **Integração** é a aprovação e o merge posteriores, distintos de validação e conclusão.

Use `continuum-publication` para publicar handoffs pertinentes, inclusive após cada Plano validado, sem tratar handoff como gatilho de PR. Não crie commits mecânicos de Unidade ou de WIP; se necessário, preserve progresso intermediário por mecanismo recuperável autorizado e explicitamente identificado, sem denominá-lo commit validado. Se um Plano não puder ser validado, registre bloqueio e não atribua selo de validação.

Commits e operações Git cabem ao executor com capacidade no checkout correto e autorização, ou a operador delegado com handoff de controle verificável. Confirme paths, índice, branch e HEAD antes de cada mutação; não interfira em sessão alheia.

## Commit e push

**Autorização contínua expressa do responsável:** após cada implementação ou Plano declarado `VALIDADO`, o agente está autorizado e deve realizar o commit do escopo validado e o push normal da branch exclusiva da Worktree em que está trabalhando para o remoto já configurado e verificado desse repositório, sem pedir nova confirmação por validação ou sessão. A autorização foi concedida pelo responsável; a validação é o gatilho para exercê-la, não sua fonte. Identifique repositório, remoto e branch ao solicitar a execução ao ambiente, apresentando essa delegação vigente como evidência de autorização.

Essa delegação cobre commit e push da própria branch de trabalho. PR, merge na `main`, force-push, exclusão de refs e alterações em Worktrees alheias permanecem sujeitos às autorizações correspondentes. Uma instrução explícita para manter uma entrega somente local prevalece para aquela entrega, sem revogar a delegação das demais. Se o ambiente rejeitar a operação, respeite a rejeição e relate o motivo; não contorne o controle.

O commit de validação preserva o estado e a prova do Plano. Selecione apenas arquivos do escopo validado, incluindo untracked intencionais e exclusões previstas. Evite `add all`, não descarte alterações desconhecidas e não misture autores no índice.

**Cadência sob a autorização contínua acima:** um commit e um push por implementação ou Plano validado, sem aguardar o encerramento da sessão; **um PR na conclusão**, quando autorizado. Unidades parciais e checkpoints não equivalem a validação. Push para backup de trabalho ainda não validado exige autorização própria e **não dispara PR nem merge**.

Use Git local autorizado quando disponível e `git-operations` apenas se exigir canal remoto. Publique somente a branch exclusiva da sessão, jamais `main` por inferência. Se houver commits de reparo após revisão, atualize **o mesmo PR**, com revalidação proporcional; não abra PR duplicado.

## Entrega validada via Pull Request — fluxo padrão

**O PR nasce da conclusão da sessão, não da validação de cada Plano.** A responsabilidade decorre de estado observável e delegação, não do papel nominal do agente.

- **Quem produz:** ao concluir a sessão, confere que todos os Planos destinados ao PR foram validados e têm commits rastreáveis; verifica branch, HEAD, índice, base, composição e pendências. Com delegação adequada, publica a branch sem force e abre **um PR contra o destino previsto** usando GitHub/CLI/API autorizado. A superfície MCP de Worktree não cria PR por si.
- **Quem revisa:** recebe o PR, examina intenção, lista de Planos/commits, diff consolidado, evidências, target e drift; aprova ou solicita correções. Só integra com autorização explícita para o destino. A abertura do PR não é aprovação nem concede escrita na `main`.
- **Transferência:** registre objetivo da sessão, Planos e respectivos commits de validação, riscos, evidências, HEAD, base, branch final, identidade da Worktree e URL/número reais do PR, quando existirem. Publique o handoff com `continuum-publication`.

**Recuperação condicional da criação de PR:** se a abertura autorizada falhar, o canal GitHub estiver indisponível ou não houver comprovante de PR criado, consulte `references/pr-creation-recovery.md` **somente nesse caso**. O procedimento diagnostica canais e prepara a criação pelo GitHub CLI, sem duplicar a governança da sessão nem contornar bloqueios de autorização ou política. Não carregue esse recurso na criação normal. Um link para formulário web nunca comprova PR aberto.

**Cadência e coesão:** um PR por sessão concluída, ainda que contenha vários Planos validados. Não prolongue uma sessão artificialmente para agrupar trabalho não relacionado ou produzir PR excessivamente amplo; nesse caso, conclua uma sessão coerente e inicie outra. Não fragmente a mesma sessão em PRs por Plano/checkpoint. Se uma entrega precisar ser integrada antecipadamente por dependência ou urgência, **conclua formalmente a unidade de sessão correspondente** e abra o PR dela, em vez de manter vários PRs parciais dependentes da mesma sessão.

**Revisão progressiva e econômica:** comece por objetivo da sessão, critérios de aceitação, base/HEAD, Planos/commits, paths, riscos e evidências. Aprofunde nos diffs, contratos e relações conforme risco real, sem aprovar apenas pelo resumo. Reutilize provas válidas e atuais; execute provas adicionais somente diante de lacuna material ou composição não coberta (`validation-evidence-channels`). Compare custo total de revisão e integração, não apenas linhas ou tokens.

**Preservação da rastreabilidade:** prefira método de merge que preserve os commits individuais de validação no destino. Squash destrói essa granularidade no histórico integrado; somente o utilize se uma política explícita do repositório prevalecer, registrando a limitação. Não reescreva commits validados por conveniência.

**Exceções:** sem acesso, autorização, plataforma de PR ou revisor, preserve commits e provas; reporte o bloqueio e faça handoff rastreável, sem declarar PR ou merge inexistente. Integração direta é exceção expressamente delegada, não padrão.

## Revisão e integração sem CI

**Validação da implementação não é autorização de integração.** Os Planos são validados no checkout/Worktree conforme `validacao-de-implementacoes`; após a conclusão da sessão, o conjunto é proposto por um PR. O fluxo padrão não inclui CI, status checks obrigatórios, branch protection nem pipeline após o merge. A inexistência desses mecanismos não dispensa revisão, evidência suficiente ou autoridade para integrar.

**Antes do merge**, o integrador verifica no provedor o PR, destino, HEAD atual, diferenças, conflitos e drift; inspeciona handoff, riscos e provas já obtidas, aprofundando apenas o necessário. Quando o Code Awareness Channel expuser as consultas, utilize `get_pull_request_access`, `get_pull_request`, `get_pull_request_reviews` e `get_pull_request_checks` **conforme `git-operations`**, para distinguir grants do GitHub App, aprovação efetiva e requisitos/políticas atuais. Use `inspect_pull_request_mergeability` apenas como evidência de grafo, nunca como licença para integrar. Não substitua evidência do provedor por `ahead/behind` do tracking local ou leituras públicas que não comprovam grants; `UNKNOWN`/`INCOMPLETE` material bloqueia decisão dependente. A inexistência de checks obrigatórios na política vigente não dispensa validação local e revisão material. Solicite correção ou validação adicional apenas diante de lacuna real. A autorização de merge é distinta de validar a implementação e abrir o PR.

**Após o merge**, confirme apenas o estado `merged`, o commit efetivamente integrado e a branch de destino. Ao usar merge REST assíncrono, `PENDING` ou `ENQUEUED` ainda não é integração: reconcilie `get_pull_request_operation` com o mesmo ID e, quando necessário, releia o PR até obter prova remota de `MERGED`; não repita mutação com ID novo. O status de fila somente se aplica onde houver Merge Queue efetivamente habilitada. Não dispare nem aguarde validação remota automática pré ou pós-merge. A eventual necessidade de validação adicional depende de risco de integração observado, não de um gate recorrente.

## Atualização condicional da branch do PR

**Não atualizar por ritual.** Compare HEAD/base, merge-base, conflitos e drift. Se a branch estiver defasada e isso impedir a integração segura ou alterar materialmente a composição avaliada, atualize **a branch daquele PR** somente com autorização específica ou delegação contínua aplicável. Priorize a operação nativa do provedor; se indisponível, integre a base na origem por Git autorizado, sem force-push, perda de commits, sobrescrita de trabalho externo ou escrita em checkout alheio. Conflitos e autoria ambígua exigem resolução consciente.

**Depois da atualização**, confirme o novo HEAD remoto, preservação dos commits e revisão das diferenças relevantes. Reavalie seletivamente as provas afetadas pela nova composição; nenhuma execução de CI ou check remoto é pré-condição deste fluxo. Mantenha o mesmo PR para correções da mesma entrega.

## Encerramento da sessão

O fim de um Plano significa **validação + commit + handoff pertinente**, não encerramento da sessão. Outros Planos relacionados podem continuar na mesma branch/Worktree.

Na conclusão, confirme a adequação semântica do nome da branch e eventual renomeação segura antes do PR, a preservação dos commits validados, a composição com prova suficiente, o PR único (ou seu bloqueio explícito) e as pendências. **Sessão concluída não significa PR merged.** Não feche automaticamente a Worktree. Para nova tentativa após integração ou abandono confirmado, crie nova Worktree e branch sobre o destino atualizado, com novo PR; não reabra o checkout antigo como ambiente de implementação.

## Integração

**Commit, PR e merge são operações distintas.** O caminho padrão é revisar e integrar pelo PR, sem fazer merge direto na `main` a partir da Worktree produtora. Integre somente com autorização para destino e escopo; Git local pode integrar diretamente apenas sob exceção explícita. Se a operação realmente envolver Worktrees protegidas via MCP, use `worktree-mcp-operations`.

Confirme estado e disponibilidade do destino, possíveis escritores concorrentes, alterações dirty, commit-base e drift. Resolva conflitos em ambiente isolado quando necessário, preserve ambas as linhas e não substitua o estado da `main` com arquivos antigos. Não confunda ausência de conflito textual com compatibilidade semântica. **Merge não autoriza fechar a Worktree de origem.**
## Sincronização local após merge remoto

**Merge no provedor não atualiza automaticamente a branch local.** Após confirmar integração de um PR, quando houver delegação para sincronizar o checkout local de destino, identifique o repositório, a Worktree que realmente contém a branch de destino e a origem remota. Não execute o pull na Worktree produtora apenas porque ela originou o PR.

No checkout correto, observe branch, HEAD, upstream, Git operation e alterações locais; obtenha freshness remota via fetch quando necessário. **Somente com destino correto, nenhuma operação Git ativa e Worktree limpa**, avance por fast-forward-only; nunca crie merge commit local, rebase, reset ou force para apenas sincronizar. Verifique a convergência do HEAD com o remoto antes de declarar a sincronização concluída. Se já estiver atualizado, nenhuma mutação é necessária.

Se houver mudanças staged, unstaged ou untracked, **não faça stash/shelf, commit, descarte ou pull automático**. Preserve o estado, informe os paths e o bloqueio; o responsável deve resolver conscientemente a situação. Se o canal retornar outcome desconhecido, reconcilie com estado/receipts antes de tentar outra mutação. Ausência do checkout local, branch ocupada ou falta de delegação são limites explícitos, não motivo para trocar de Worktree ou agir em checkout alheio. Sincronizar a main local é diferente de validar a composição integrada; esta última requer evidência própria.

## Validação pós-integração

O merge confirmado não impõe testes, builds ou pipelines pós-merge. A validação local da entrega permanece válida para o escopo que demonstrou. Somente quando a composição integrada introduzir risco material não coberto pelas provas existentes, obtenha a menor evidência adicional suficiente, preferencialmente no ambiente local, conforme `validacao-de-implementacoes`. Para nova entrega, atualize a base da próxima branch a partir do destino integrado, evitando reapresentar commits antigos.

## Encerramento do workspace

**Conservar evidência não autoriza retomar um checkout integrado ou abandonado.** Uma execução apenas suspensa continua retomável; depois de merge verificado ou abandono confirmado, nova tentativa usa nova Worktree, branch e PR sobre o destino atualizado, consumindo contexto útil do Continuum.

Fechamento exige autoridade específica para remover a identidade/path selecionados, liberação comprovada do proprietário/host e preservação ou descarte conscientemente autorizado do conteúdo. Delegação para commit, PR ou merge não autoriza delete. Worktree clean, inatividade, idade, Artifact ou ancestralidade isolada não provam liberação ou merge.

No Code Awareness, a limpeza automática é opt-in revogável por repositório e inscrição individual de Worktree gerenciada, limpa, sem conteúdo auxiliar não classificado, com consentimento duradouro específico de remoção e liberação do proprietário. Exige associação verificada do PR real, SHA/destino, merged e metadata coerente; aprovação/lease pontual não é consentimento para exclusões futuras. Worktrees externas sem protocolo de release nunca recebem automação.

Remoção manual de Worktree externa local exige operador/proprietário legítimo, sessão previamente encerrada/liberada na IDE, atestação consciente e autorização nativa para identidade/path e fingerprint exatos. Se há disputa, writer conhecido/incerto ou recusa da IDE, bloqueie. Não transforme esse handoff humano em gerência automática ou licença para kill.

PREPARE é prévia com validade, não posse nem READY sem consentimento. EXECUTE revalida identidade/generation, projeto, HEAD/branch/índice, conteúdo tracked/untracked/ignored, links, operação, autorização e preservação sob exclusividade. CANCEL invalida preparação e inscrição correspondente. Dirty manual só admite o único force necessário do Git sob descarte integralmente revisado; nunca double-force ou remoção recursiva arbitrária. Branches, refs remotas, PRs e Artifacts permanecem por padrão.

Recibos idempotentes distinguem efeito comprovado de outcome desconhecido. CLOSED exige ausência física e no registry Git/provedor, com preservação verificada; restart/timeout exige reconciliação e bloqueia nova exclusão às cegas. Sem adapter remoto autorizado e comprovado, remoção remota permanece UNSUPPORTED/UNAVAILABLE. Cleanup não é prova de conclusão.

## Concorrência

Worktrees diferentes permitem que executores diferentes mantenham sessões independentes sobre o mesmo repositório. Cada sessão conserva seu próprio contexto e pode executar vários planos em sequência.

Não distribua automaticamente unidades do mesmo plano entre agentes apenas porque existem worktrees disponíveis. O isolamento evita interferência física durante a execução, mas não elimina risco de integração entre linhas relacionadas.

## Anti-padrões

- definir canal Git pelo rótulo «Implementador» ou «Arquiteto» sem verificar capacidade/autorização;
- exigir Code Awareness MCP para Git ou testes locais equivalentes;
- presumir que terminal disponível autoriza escrita na `main` ou Worktree alheia;
- iniciar implementação em detached HEAD ou checkout principal compartilhado sem isolamento comprovado;
- começar implementação sem preparar e verificar as dependências da Worktree após vinculá-la à branch, ou presumir que as dependências de outro checkout servem;
- confundir handoff VALIDATED com licença para mutar ou tratar autorização contínua como permissão universal entre repositórios;
- criar Worktree por plano, misturar staged de autores/escopos diferentes ou dar push por checkpoint sem delegação;
- abrir PR por teste, checkpoint ou Plano validado antes de concluir a sessão; criar múltiplos PRs dependentes na mesma sessão, acumular Planos alheios ao objetivo para reduzir PRs ou duplicar PR em revisão;
- reconfirmar repetidamente commit/push/PR quando já existir delegação contínua válida, ou fazer merge por mera autoria do PR, sem revisão e autoridade de integração;
- executar pull no checkout errado, com estado dirty, ou tratar merge remoto como atualização automática da main local;
- encerrar ou limpar a Worktree após commit/merge sem solicitação específica;
- supor que testes isolados validam a integração.
## Critério de conclusão

**Validação de Plano:** propriedades obrigatórias demonstradas, um commit rastreável correspondente ao Plano validado, provas e handoff pertinente; não implica PR.

**Conclusão da sessão para revisão:** todos os Planos previstos validados, commits preservados, composição suficientemente verificada, branch/HEAD observados e um PR aberto verificável (ou impedimento explícito), com handoff e proveniência. Não implica merge.

**Integração autorizada:** revisão efetiva, validação proporcional, autorização de destino e merge observado (ou bloqueio documentado). Nenhuma dessas etapas encerra automaticamente a Worktree.

## Regra final

> **Um commit por Plano validado; um PR por sessão concluída; merge por integração aprovada.** Quem produz conclui e propõe sob delegação; quem revisa integra com autoridade própria. A mesma Worktree pode acolher outra sessão, sem confundir branches, commits ou baselines.

## Ciclo pelas operações remotas de Worktree

**Esta seção é condicional:** aplica-se somente quando a operação Git efetivamente usar o canal remoto Code Awareness. Não é o procedimento obrigatório para quem dispõe de Git local autorizado.

Nesse canal, siga a Skill `worktree-mcp-operations`: descubra e inspecione a Worktree, obtenha aprovação nativa local, lease, snapshots, receipts e idempotência conforme contrato. Hand-off e pausa do escritor são cooperativos; não presuma posse de uma IDE externa. Se houver **exceção autorizada de integração direta**, faça preview e APPLY em checkout gerenciado, valide o commit candidato no próprio checkout e promova somente com prova e ownership válidos. No fluxo padrão, conclua a sessão e submeta um único PR da branch consolidada; deixe o merge para a revisão autorizada. Expiração, restart ou resultado desconhecido exigem recuperação, nunca takeover por timeout.

Na via local, preserve as mesmas invariantes de intenção explícita, ausência de escrita concorrente, rollback não destrutivo e validação, mas **não emule nem solicite leases MCP** para comandar Git pelo terminal.
