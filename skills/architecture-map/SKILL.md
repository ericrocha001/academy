---
name: architecture-map
description: Consulte o Architecture Map canônico para topologia, ownership e invariantes globais; para decisões normativas consulte também ARCHITECTURAL_PRINCIPLES quando existir. Navegue por Feature Maps e source seletivamente; para autoria e correções do mapa use architecture-map-authoring.
---

# Architecture Map

## Propósito

Manter uma representação arquitetural canônica e barata do repositório para reduzir reconstrução repetida da arquitetura por agentes.

O Architecture Map responde:

> **Como este sistema está organizado hoje?**

Ele é Layer 0 de orientação **arquitetural substantiva**, não um sumário genérico: um agente deve entender o software como sistema sem ler todas as features.

Fluxo preferencial:

**Architecture Map → Feature Map relevante → Code Navigation → source mínimo**

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

Não use por rotina quando a tarefa já está confinada a uma feature e seu Feature Map ou source conhecido bastam.

## Princípios arquiteturais normativos

Quando a intenção for **decidir arquitetura e não apenas localizar domínios**, verifique se o repositório possui um Living Artifact canônico `{ livingArtifact: true, artifactRole: "ARCHITECTURAL_PRINCIPLES" }` e consulte os princípios aplicáveis à decisão. Esse Artifact governa regras transversais desejadas (inclusive autonomia, fricção e custo); o Architecture Map continua responsável pela topologia/estado arquitetural e source/runtime pela implementação comprovada. Não carregue o documento de princípios para mera navegação operacional nem duplique as regras no mapa.

Mudança comprovada em princípio global pode exigir manutenção pelo `continuum-living-artifacts` e, se alterar a imagem sistêmica, por `architecture-map-authoring`.

## Drill-down

Architecture Map deve ser **suficiente para compreender o sistema**, não um resumo superficial. Registre topologia, ownership, dependências, runtime boundaries, fluxos e invariantes globais; mantenha a profundidade própria das features somente nos Feature Maps. Profundidade suficiente não significa inventário exaustivo.

Quando uma feature possuir Feature Map, relacione:

`Architecture Map --drills-down-to--> Feature Map`

Para aprofundar:

1. leia o Architecture Map;
2. liste relações outbound `drills-down-to`;
3. selecione somente o Feature Map relevante;
4. abra esse mapa;
5. use Code Navigation apenas para lacunas, confirmação ou implementação.

Não carregue todos os Feature Maps preventivamente.

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

> **Mantenha uma imagem arquitetural pequena, atual e navegável do sistema. Use-a primeiro para orientação, desça para Feature Maps quando necessário e trate source/runtime como verdade sempre que houver discrepância.**
