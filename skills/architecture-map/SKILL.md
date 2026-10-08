---
name: architecture-map
description: Consulte o Architecture Map canônico de um repositório para compreender topologia, subsistemas, ownership, dependências, runtime boundaries e invariantes globais antes de aprofundar seletivamente em Capability Maps ou source. Não use para navegar código rotineiramente, inspecionar detalhes de feature ou criar/revisar o mapa; para autoria e correções use architecture-map-authoring.
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

## Quando o mapa precisar mudar

Esta Skill orienta o **consumo** do mapa, não a edição. Se mudanças comprovadas de source/runtime ou uma discrepância arquitetural material exigirem criação, atualização de conteúdo ou reparo de relações do Living Artifact, utilize `architecture-map-authoring`. Não atualize o mapa por mudanças internas semanticamente neutras.

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
