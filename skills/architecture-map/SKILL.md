---
name: architecture-map
description: Use quando for necessário criar, consumir, revisar ou corrigir o Architecture Map canônico de um repositório: a representação viva e de alto sinal da topologia, ownership, dependency direction, runtime boundaries, fluxos e invariantes globais do sistema. Use também quando source/runtime ou uma mudança validada revelar discrepância arquitetural material no mapa. Não use para documentar detalhes internos de uma feature, substituir Capability Maps, navegar source rotineiramente ou atualizar o mapa por refactors semanticamente neutros.
---

# Architecture Map

## Propósito

Manter uma representação arquitetural canônica e barata do repositório para reduzir reconstrução repetida da arquitetura por agentes.

O Architecture Map responde:

> **Como este sistema está organizado hoje?**

Ele é Layer 0 de orientação.

Fluxo preferencial:

**Architecture Map → Capability Map relevante → Code Navigation → source mínimo**

## Representação canônica

O Architecture Map vive no Continuum como Living Artifact com:

- `livingArtifact: true`
- `artifactRole: ARCHITECTURE_MAP`

Regra padrão:

> **um Architecture Map canônico por repositório.**

Não crie cópias concorrentes por versão.

Atualize o mesmo `artifactId`.

## Quando consumir primeiro

Use o Architecture Map antes de reconstruir arquitetura pelo source quando a tarefa exigir:

- compreender o repositório como sistema;
- formar escopo arquitetural;
- localizar qual subsistema deve ser investigado;
- entender ownership entre domínios;
- compreender direção de dependências;
- entender runtime boundaries;
- planejar mudança que atravessa múltiplas features;
- contextualizar um agente novo sobre o projeto.

Descubra por:

`metadata: { livingArtifact: true, artifactRole: "ARCHITECTURE_MAP" }`

Se existir um único mapa canônico, leia-o primeiro.

Não use por rotina quando a tarefa já está confinada a uma feature e seu Capability Map ou source conhecido bastam.

## Drill-down

Architecture Map deve permanecer raso.

Quando uma feature possuir Capability Map, relacione:

`Architecture Map --drills-down-to--> Capability Map`

Para aprofundar:

1. leia o Architecture Map;
2. liste relações outbound `drills-down-to`;
3. selecione somente o Capability Map relevante;
4. abra esse mapa;
5. use Code Navigation apenas para lacunas, confirmação ou implementação.

Não carregue todos os Capability Maps preventivamente.

## O que deve conter

Preserve somente informação arquitetural que muda decisões:

- finalidade do sistema;
- grandes subsistemas/domínios;
- ownership de responsabilidades;
- dependency direction;
- runtime/process boundaries;
- fluxos principais entre subsistemas;
- persistência e autoridade de dados;
- integrações estruturais;
- cross-cutting systems;
- invariantes arquiteturais;
- superfícies agent-facing/human-facing quando relevantes;
- relações para Capability Maps;
- limites e elementos deliberadamente legados quando isso evita interpretação errada.

## O que não deve conter

Não transforme o mapa em:

- inventário de classes;
- árvore de arquivos;
- API reference;
- schema completo;
- changelog;
- plano;
- handoff;
- lista exaustiva de features;
- duplicação do Capability Map;
- documentação de detalhes locais.

> **Architecture Map orients. Capability Maps contextualize. Code Navigation investigates. Source proves.**

## Gate de atualização

Reavalie o mapa quando uma mudança validada:

- cria ou remove subsistema relevante;
- move responsabilidade entre fronteiras;
- altera dependency direction;
- cria/remove runtime boundary;
- altera fluxo principal entre domínios;
- muda persistência ou ownership de dados;
- introduz/remove integração estrutural;
- altera protocolo/transporte arquitetural;
- muda princípio arquitetural global;
- muda materialmente como duas ou mais capabilities se relacionam.

Não atualize por:

- bugfix local;
- rename;
- helper;
- refactor interno;
- mudança visual;
- teste;
- otimização local;
- alteração interna que não muda a imagem global.

Pergunta decisiva:

> **Se um agente lesse o mapa anterior após esta mudança, poderia formar uma imagem materialmente errada da organização do sistema?**

Se não, não atualize.

## Discrepância e self-healing

Architecture Map é orientação, não autoridade sobre o estado atual.

Se source/runtime contradisserem o mapa:

1. confie em source/runtime para a verdade atual;
2. determine se a discrepância é arquitetural ou apenas detalhe interno;
3. confirme com Code Navigation o menor escopo necessário;
4. se arquiteturalmente material, atualize o mesmo Artifact;
5. preserve relações `drills-down-to` ainda válidas;
6. remova ou ajuste relações que ficaram obsoletas;
7. atualize `date` e metadata corrente;
8. não registre a discrepância como histórico dentro do mapa.

Se a discrepância vier de source stale versus runtime, resolva freshness antes de editar o Artifact.

## Criação inicial

Antes de criar:

1. confirme que não existe `ARCHITECTURE_MAP` canônico;
2. use source atual e Capability Maps existentes como evidência;
3. adquira somente contexto suficiente para identificar domínios, boundaries e fluxos;
4. não tente compreender toda implementação;
5. publique como Living Artifact;
6. relacione Capability Maps comprovadamente pertencentes ao sistema.

O mapa inicial deve ser menor que a arquitetura que explica.

## Manutenção incremental

Ao atualizar, altere apenas as seções afetadas.

Não reescreva o documento inteiro por hábito.

Preserve:

- vocabulário estável;
- topologia;
- relações;
- invariantes ainda válidos.

Remova conhecimento obsoleto quando a arquitetura mudar.

Living Artifact representa o melhor modelo corrente, não a história das versões.

## Relação com Skills vizinhas

Use `continuum` para operações de discovery/publicação/edição.

Use `code-navigation` para confirmar source e investigar discrepâncias.

Use `capability-opportunity` quando a própria dificuldade de manter/compreender o mapa revelar uma lacuna reutilizável.

Não copie esses procedimentos aqui.

## Critério de sucesso

Um Architecture Map é bom quando um agente novo consegue:

- formar uma imagem correta do sistema em uma leitura;
- identificar a região responsável por uma tarefa;
- saber onde aprofundar;
- evitar reconstruir topologia pelo source;
- reconhecer as principais fronteiras sem receber detalhes desnecessários.

E continua sendo barato o suficiente para ser usado como bootstrap.

## Regra Final

> **Mantenha uma imagem arquitetural pequena, atual e navegável do sistema. Use-a primeiro para orientação, desça para Capability Maps quando necessário e trate source/runtime como verdade sempre que houver discrepância.**
