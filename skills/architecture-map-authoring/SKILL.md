---
name: architecture-map-authoring
description: Crie ou mantenha Architecture Map canônico quando mudarem subsistemas, ownership, dependências, runtime boundaries ou invariantes globais; reconcilie mudanças de princípio com ARCHITECTURAL_PRINCIPLES via continuum-living-artifacts, sem duplicar normas. Para somente ler use architecture-map.
---

# Architecture Map — autoria e manutenção

Use esta Skill quando precisar **criar, atualizar ou corrigir** o mapa arquitetural canônico, não para consulta rotineira. A Skill `architecture-map` define a identidade, descoberta e leitura do mapa existente. Reutilize-a para localizar o Artifact a ser atualizado; preserve sua identidade e as relações comprovadamente válidas.

## O que deve conter

Preserve informação arquitetural **suficiente para orientar decisões sobre o sistema inteiro**, sem reduzir o Architecture Map a uma sinopse superficial:

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
- relações para Feature Maps;
- limites e elementos deliberadamente legados quando isso evita interpretação errada.

## O que não deve conter

A profundidade é determinada pela função sistêmica, não por uma meta arbitrária de tamanho. Remeta ao Feature Map detalhes locais das features, mas preserve aqui as relações e fronteiras globais que permitem compreendê-las.

Não transforme o mapa em:

- inventário de classes;
- árvore de arquivos;
- API reference;
- schema completo;
- changelog;
- plano;
- handoff;
- lista exaustiva de features;
- duplicação do Feature Map;
- documentação de detalhes locais.

> **Architecture Map orients. Feature Maps contextualize. Code Navigation investigates. Source proves.**

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
2. use source atual e Feature Maps existentes como evidência;
3. adquira somente contexto suficiente para identificar domínios, boundaries e fluxos;
4. não tente compreender toda implementação;
5. publique como Living Artifact;
6. relacione Feature Maps comprovadamente pertencentes ao sistema.

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

## Integração com princípios arquiteturais

Quando uma decisão ou incidente material revelar **princípio transversal novo ou alteração normativa**, não esconda a regra nas seções do Architecture Map: acione `continuum-living-artifacts` para descobrir e atualizar o Living Artifact `ARCHITECTURAL_PRINCIPLES` do repositório **na mesma execução**, se houver autorização de escrita e decisão suficientemente fundamentada. O retorno necessário é Artifact canônico/revisão persistida ou bloqueio específico.

O Architecture Map conserva apenas a consequência global para topologia, ownership, fluxo e invariantes, referenciando o documento de princípios em vez de reproduzir seu catálogo. Se a norma desejada ainda não foi implementada, identifique claramente a diferença entre direção normativa e estado do source/runtime; não reescreva fatos de implementação como se a mudança já existisse. Uma leitura histórica ou refactor local sem princípio material não ativa esta passagem.

## Relação com Skills vizinhas

Use `continuum` para discovery e relações; use `continuum-publication` somente para publicação e edição.

Use `code-navigation` para confirmar source e investigar discrepâncias.

Use `capability-opportunity` quando a própria dificuldade de manter/compreender o mapa revelar uma lacuna reutilizável.

Não copie esses procedimentos aqui.

