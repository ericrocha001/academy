---
name: continuum  
description: Use o Continuum para autocontextualização entre agentes por meio de artefatos duráveis do projeto. Acione para recuperar Implementation Handoffs e contexto histórico produzido por outros agentes, publicar o handoff final de uma implementação ou detectar oportunidades de melhorar o próprio Continuum. Não use como substituto do CodeScope para verificar o estado atual do código, nem para carregar histórico preventivamente quando o contexto presente já é suficiente.
---

# Finalidade

Continuum é a camada de contexto durável entre agentes.

Princípio:

> **Agents are ephemeral. Artifacts are durable. Context is assembled on demand.**

O conhecimento relevante não precisa permanecer no mesmo chat ou na mesma janela de contexto.

Agentes podem:

- produzir artefatos duráveis;
- sair;
- ser substituídos;
- retornar em outro chat;
- recuperar somente o contexto necessário posteriormente.

Continuum é **project-scoped**.

Cada projeto possui seu próprio Continuum.

Não assuma conhecimento compartilhado entre projetos.

# Pure Signal

Continuum não é memória indiscriminada.

Ele preserva somente artefatos deliberadamente definidos como contexto reutilizável.

Não trate como Artifact:

- conversa completa;
- pensamentos intermediários;
- logs arbitrários;
- histórico de ferramentas;
- cada comando executado;
- informação descartável da sessão.

Princípio:

> **Persist deliberate signal, not conversational exhaust.**

# Quando recuperar contexto

Use Continuum quando a tarefa puder depender materialmente de:

- implementações anteriores;
- handoffs de outros agentes;
- alterações recentes realizadas fora do chat atual;
- validações anteriormente relatadas;
- pendências ou desvios conhecidos;
- Capability Opportunities anteriores;
- contexto que, sem Continuum, precisaria ser copiado pelo usuário de outro agente ou chat.

Antes de pedir ao usuário que reconstrua histórico já produzido pelo sistema, verifique o Continuum quando aplicável.

# Quando não recuperar contexto

Não consulte Continuum apenas por precaução.

Evite quando:

- o contexto atual já é suficiente;
- a pergunta é exclusivamente sobre o estado atual do código;
- CodeScope já responde diretamente;
- nenhuma informação histórica influencia a decisão;
- abrir artifacts adicionais não mudaria o próximo passo.

Continuum deve reduzir custo de contextualização, não criar uma nova rotina obrigatória de leitura histórica.

# Retrieval Progressivo

Use:

**discover → select → read**

Primeiro:

`list_artifacts`

Use a listagem para identificar artifacts potencialmente relevantes.

Não abra todos automaticamente.

Depois:

`get_artifact`

somente para os artifacts selecionados.

Pare quando houver contexto suficiente para continuar corretamente.

> **Discover cheaply. Read deliberately.**

# Seleção de Artifacts

Prefira:

- artifacts mais recentes quando a pergunta for sobre trabalho recente;
- títulos diretamente relacionados à tarefa;
- apenas artifacts cuja leitura possa alterar uma decisão material.

Se o primeiro artifact resolver a necessidade, não continue abrindo outros.

O objetivo não é reconstruir toda a história do projeto.

É recuperar:

> **o menor conjunto de contexto histórico suficiente para a tarefa atual.**

# Artifact não é Source Atual

Um Artifact representa conhecimento histórico produzido em determinado momento.

Ele pode informar:

- o que foi implementado;
- o que foi validado;
- que arquivos foram alterados;
- quais problemas foram observados;
- quais pendências permaneceram.

Ele não garante que o repositório continue nesse estado.

Quando a decisão depender do estado atual:

- use CodeScope;
- use Runtime Identity quando houver questão de runtime/freshness;
- use outras capacidades atuais apropriadas.

Princípio:

> **Continuum tells you what happened. CodeScope tells you what exists now.**

Não trate um handoff antigo como autoridade sobre source atual.

# Implementation Handoff

`IMPLEMENTATION_HANDOFF` é o Artifact canônico produzido ao final de uma implementação.

Para o Agente de Implementação:

> o conteúdo do Implementation Handoff é exatamente o Relato Final definido pelo `AGENTS.md` vigente.

Não mantenha uma segunda estrutura equivalente nesta Skill.

Não crie:

- versão resumida para o Continuum;
- JSON semântico duplicado;
- registros separados para cada seção;
- segundo relatório para publicação.

Produza uma fonte única.

# Publicação

Ao concluir o Relato Final:

1. materialize exatamente esse conteúdo em arquivo Markdown UTF-8;
2. preserve o conteúdo verbatim;
3. publique o arquivo pelo publisher oficial;
4. confirme o receipt `PUBLISHED`;
5. preserve o `artifactId`.

Comando operacional atual:

`node scripts/continuum/publish-artifact.cjs implementation-handoff <arquivo.md> --title "<título>"`

O agente informa somente conteúdo semântico e título.

Não forneça manualmente metadata que o Publisher consegue determinar.

# Fidelidade do Markdown

Nunca construa o Implementation Handoff usando um mecanismo de shell que interprete o conteúdo.

Especialmente:

> **não passe o relatório inteiro como argumento de shell e não o materialize através de string interpolada.**

Markdown pode conter:

- backticks;
- `$`;
- `${…}`;
- `$(…)`;
- aspas;
- code fences;
- paths;
- Unicode;
- caracteres que shells interpretam.

Prefira a capacidade de escrita de arquivos da ferramenta/agente para produzir o `.md` diretamente.

O arquivo deve representar exatamente o texto pretendido.

O Continuum protege integridade desde a entrada do Publisher em diante; não consegue reconstruir conteúdo que já tenha sido alterado antes dessa fronteira.

# Publicação bem-sucedida

Depois de `PUBLISHED`:

- preserve o `artifactId`;
- não publique novamente o mesmo handoff por rotina;
- não gere outra versão apenas para apresentar no chat.

Quando o workflow do agente permitir, a resposta final ao usuário pode ser curta e referenciar o Artifact publicado.

O Artifact é a versão durável do handoff.

# Falha de publicação

Se a publicação falhar:

- não declare que o Artifact existe;
- não descarte o Relato Final;
- preserve o relatório na resposta ao usuário ou em outro meio seguro disponível;
- informe explicitamente que o handoff não foi publicado.

Nunca deixe uma falha do Continuum apagar conhecimento necessário para continuidade.

# Continuidade entre Agentes

Ao assumir trabalho vindo de outro agente:

1. identifique se existe contexto histórico material;
2. consulte `list_artifacts`;
3. selecione apenas o handoff relevante;
4. use `get_artifact`;
5. incorpore o contexto necessário;
6. valide no source atual aquilo que exigir atualidade.

Não peça ao usuário copy/paste de um handoff que o Continuum já disponibiliza.

# Continuum Improvement

O uso real deve ajudar a evoluir o Continuum.

Observe dificuldades recorrentes relacionadas a:

- descoberta;
- seleção;
- signal density;
- publicação;
- fidelidade;
- Artifact Types;
- metadata;
- retrieval;
- relações entre artifacts;
- contextualização entre agentes;
- intervenção humana desnecessária.

Pergunta central:

> **O Continuum poderia permitir autocontextualização com mais sinal, menos chamadas, menos tokens ou menos intervenção humana?**

# Sinais de oportunidade

Considere uma Capability Opportunity quando ocorrer de forma material ou recorrente:

- muitos artifacts precisam ser abertos para localizar um fato simples;
- títulos/metadata são insuficientes para selecionar corretamente;
- informação valiosa existe, mas não possui Artifact Type adequado;
- o usuário ainda precisa transportar manualmente contexto que já deveria ser recuperável;
- publicação exige trabalho repetitivo desnecessário;
- fidelidade do conteúdo é difícil de preservar;
- é necessário reconstruir repetidamente relações entre artifacts;
- o volume histórico tornou listagem simples insuficiente;
- o agente não consegue distinguir contexto histórico de atual;
- existe necessidade real e recorrente de contexto cross-project;
- uma sequência manual está compensando uma primitive ausente do Continuum.

Quando houver candidato material:

> use `capability-opportunity` para qualificá-lo.

Não implemente a melhoria fora do escopo atual apenas porque foi observada.

# Near-misses

Não considere deficiência apenas porque:

- um Artifact precisou ser aberto;
- dois handoffs foram necessários;
- CodeScope precisou confirmar source atual;
- um Artifact antigo ficou naturalmente stale;
- uma tarefa não possuía contexto histórico relevante;
- o agente precisou raciocinar sobre o conteúdo recuperado.

Continuum deve fornecer sinal, não substituir raciocínio.

# Evolução

Não resolva inefficiency criando uma operação que retorna toda a memória do projeto.

Preserve:

> **progressive disclosure**

e:

> **Pure Signal**.

Uma melhoria deve provar ganho marginal em pelo menos uma dimensão:

- menos intervenção humana;
- menos tokens;
- menos chamadas necessárias;
- melhor seleção;
- maior precisão;
- menor ambiguidade;
- contexto mais relevante;
- maior confiabilidade da continuidade entre agentes.

# Princípios

> Context transcends the chat.

> Agents are ephemeral. Artifacts are durable.

> Context is assembled on demand.

> Persist deliberate signal, not conversational exhaust.

> Discover cheaply. Read deliberately.

> Continuum tells you what happened. CodeScope tells you what exists now.

> One canonical artifact is better than multiple duplicated representations.

> The Continuum preserves what it receives. The agent must deliver what it intended.

> Improve the Continuum from real usage, not imagined possibilities.
