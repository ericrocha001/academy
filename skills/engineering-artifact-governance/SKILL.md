---
name: engineering-artifact-governance
description: Governe artefatos auxiliares gerados por agentes durante implementações e investigações: escolha local isolado, retenção, promoção e limpeza segura. Acione quando surgirem subprodutos ou ao encerrar execuções que os produziram; não substitui validação, Continuum ou Skill Engineering.
---

# Engineering Artifact Governance

## Responsabilidade

Evitar que scripts ad hoc, fixtures, logs, recibos, medições, screenshots e relatórios intermediários se acumulem sem propósito, mantendo o que ainda oferece prova, diagnóstico ou reutilização.

**Todo artefato auxiliar deve ter finalidade, pertencimento à execução e destino.** Não classifique apenas por extensão: um `.cjs` pode ser temporário ou uma ferramenta durável; um `.json` pode ser fixture, recibo ou dado operacional.

Esta capacidade governa **o ciclo de vida material** dos subprodutos da execução, não a força das provas, o conteúdo dos handoffs nem a criação de Skills. Para esses fins, use, quando necessário, `validacao-de-implementacoes`, `continuum-publication`, `harness-productization` e `skill-engineering`, sem duplicar seus procedimentos.

## Antes de produzir

1. **Reconheça o destino existente.** Identifique runners, diretórios de evidência, convenções locais, worktree, `.gitignore` e regras de retenção. Preserve os caminhos e os contratos que o projeto já gerencia; não monte uma estrutura paralela por estética.
2. **Escolha o menor local apropriado.** Saídas de runners ficam nos destinos gerenciados por eles. Para arquivos livres de uma investigação ou implementação, prefira o scratch ignorado do projeto, isolado por execução, como `<scratch>/<execution-id>/`. O nome real do diretório é decisão do repositório, nunca uma exigência desta Skill. Se não existir convenção, adote local temporário e isolado sem ampliar a estrutura permanente desnecessariamente.
3. **Evite colisões.** Em trabalho concorrente, não compartilhe nomes ou diretórios mutáveis. Respeite worktrees e ownership; não altere arquivos sob execução de outro agente.
4. **Use metadata já existente.** IDs e recibos dos runners bastam quando identificam origem, comando/prova, status e localização. Não crie manifestos ou índices por arquivo sem problema comprovado de recuperabilidade.

Não trate o diretório ignorado pelo Git como proteção contra exposição: logs e fixtures ainda podem conter segredos, tokens, dados pessoais e caminhos sensíveis. Aplique as proteções existentes e não publique conteúdo bruto sem revisão.

## Classificação pelo destino

No encerramento da tarefa, ou antes quando o destino já estiver claro, decida pela **necessidade futura**, não pela quantidade de arquivos:

| Destino | Critério | Ação |
|---|---|---|
| **Descartar** | Intermediário regenerável, experimento abandonado, script pontual sem dependência residual | Liberar somente após confirmar que nenhuma tarefa/prova ainda depende dele |
| **Reter evidência** | Log, screenshot, medição, fixture ou recibo ainda necessário para auditoria, reprodução, diagnóstico, comparação ou trabalho bloqueado | Manter no store de evidências apropriado, identificável pela execução; revisar quando a necessidade cessar |
| **Promover mecanismo** | Script, cenário ou teste com valor recorrente comprovado, especialmente regressão relevante | Integrar à ferramenta, suíte ou Harness canônico adequado, com contrato e validação; não apenas copiar para um diretório permanente |
| **Preservar conhecimento** | Decisão, diagnóstico, limitação, conclusão ou aprendizado que um agente futuro precisará compreender | Externalizar síntese de alto sinal na fonte canônica adequada, inclusive Continuum quando aplicável; evitar despejar logs e documentação concorrente |

Um artefato pode mudar de destino, mas **não promova por precaução**. Se uma prova precisa ficar acessível, preserve sua referência e contexto suficientes para recuperá-la; um resumo ou registro no ledger não substitui os bytes brutos enquanto eles forem indispensáveis.

**Dados operacionais do produto, source, assets publicados e bancos persistentes não são scratch.** Não os submeta a limpeza desta Skill.

## Encerramento seguro

1. Confirme se a execução terminou, se há falha/bloqueio pendente, se suas evidências foram revisadas e se o próximo agente precisará reproduzir algo. Trabalho bloqueado ou inconcluso pode exigir retenção extensa.
2. Determine explicitamente quais subprodutos são removíveis, quais continuam necessários e quais merecem promoção. **Não invente prazo universal de expiração**; use regras reais do projeto e revisite a retenção por estado, dependência e custo.
3. Para limpar, use a operação suportada pelo runner ou restrinja a remoção ao diretório isolado **de propriedade daquela execução**, depois de conferir caminhos, vínculos e dependências. Não faça limpeza ampla, por idade, extensão ou glob recursivo; não siga links que escapem do escopo. Se houver ambiguidade, retenha e sinalize para revisão. Operações fora do próprio scratch exigem autorização correspondente.
4. Evite duplicar referências: reporte no handoff, de forma breve, apenas evidências ainda relevantes, promoções e retenções pendentes. Não crie relatório extra quando não há decisão residual.

Em diretórios geridos por ferramentas, **a política e a API de retenção da ferramenta prevalecem**. Um agente não deve apagar manualmente um store ativo porque acredita que o teste já terminou.

## Scripts associados a Skills

A presença de `scripts/` em um package de Skill não cria obrigação de usar scripts.

- **Projeto-específico:** mantenha junto ao repositório e aos entrypoints reais do projeto; uma Skill global pode orientar a descoberta ou invocação sem incorporá-lo.
- **Compartilhável:** considere script complementar somente quando a execução determinística integrar diretamente a capacidade daquela Skill, for justificadamente reutilizável entre projetos, tiver entradas/saídas/dependências explícitas e puder ser validada nos destinos relevantes.
- **Particular a um projeto, mas procedural:** avalie Skill de escopo do projeto quando houver julgamento recorrente que a justifique; não globalize o script para justificar uma Skill.
- **Não duplicação:** script promovido tem uma fonte canônica. Evite cópias divergentes na Academy e no projeto, wrappers sem ganho real e pacotes dependentes de paths locais fixos.

Ao anexar recursos a uma Skill, use `skill-engineering` para packaging, referências relativas e verificação de distribuição. Não execute scripts desconhecidos ou com efeitos mutáveis apenas por estarem no pacote.

## Limites e critério de sucesso

Não acione esta Skill para classificar arquivos normais do produto, decidir a suficiência de testes, definir quais decisões publicar no Continuum ou governar catálogo/versionamento das Skills isoladamente.

A governança foi aplicada corretamente quando:
- os artefatos necessários continuam localizáveis e protegidos;
- nenhuma evidência indispensável ou trabalho de outro agente foi descartado;
- ferramentas reutilizáveis foram promovidas apenas ao proprietário adequado;
- os resíduos sem valor foram liberados quando seguro;
- agentes futuros não precisam vasculhar pastas desorganizadas para reconstruir o resultado.

> **Preserve valor, não volume. Isole por execução, retenha por necessidade, promova por reutilização demonstrada e limpe por propriedade comprovada.**
