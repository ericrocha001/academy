---
name: system-modeling
description: Modele a arquitetura de um sistema de software, sobretudo externo, em conhecimento de alto sinal e reutilizável, distinguindo evidências, mecanismos e condições de transferência; publique o modelo no Continuum. Não use para inspecionar só uma implementação (implementation-mining), manter Architecture Map do repositório (architecture-map-authoring) ou planejar uma implementação.
---

# System Modeling — engenharia reversa de conhecimento arquitetural

## Resultado e fronteira

Transforme fontes técnicas sobre um **sistema delimitado** em um modelo que permita a outro agente compreender suas capacidades e mecanismos sem repetir toda a pesquisa, e avaliar sua possível reutilização **sem copiar a arquitetura por prestígio**.

**Saída:** um **System Model** versionado por evidência, arquiteturalmente compreensível e descobrível no Continuum do repositório ativo. O modelo registra o sistema observado, **não** se torna Architecture Map canônico do produto local, decisão normativa, plano executável nem catálogo integral de features.

Use quando o objetivo for estudar **como o sistema funciona como conjunto**. Se a necessidade for apenas inspecionar um mecanismo de código externo para resolver uma decisão pontual, utilize `implementation-mining`; se o objetivo for manter o mapa arquitetural do próprio repositório, `architecture-map-authoring`.

## Framework: pergunta → evidência → arquitetura → transferibilidade → Artifact

### 1. Delimite o modelo

Identifique **sistema, versão/commit ou data de observação, superfície analisada, pergunta que o estudo deve responder e possível consumidor futuro**. Sistemas grandes podem exigir um recorte explícito; não confunda modelo de um subsistema com compreensão integral do produto.

Formule a pergunta central: **"Como esse sistema produz seu resultado, que contratos tornam isso possível e sob quais restrições?"**

### 2. Adquira fontes por redução de incerteza

Comece por documentação oficial, especificações, diagramas e descrição pública de componentes. Localize código, testes, histórico ou runtime **somente** para confirmar contratos contestados, decisões importantes e lacunas materiais. Se um mecanismo exigir inspeção cirúrgica de implementação externa, utilize `implementation-mining` como capacidade especializada, sem repetir seu procedimento.

Registre procedência: URLs/identificadores, data e, quando verificável, versão/commit. Use os qualificadores:
- **[SPEC]** comportamento prescrito, não necessariamente implementado;
- **[IMPL]** observado no código/fonte da versão examinada;
- **[TEST]** demonstrado por teste realmente consultado/executado, explicitando qual;
- **[RELATO]** afirmação de autor/equipe, sem verificação independente;
- **[INFERÊNCIA]** interpretação arquitetural derivada das fontes;
- **[DESCONHECIDO]** informação material não sustentada.

Não transforme exemplos de workflow, configuração padrão, promessa de roadmap ou inferência em capacidade obrigatória comprovada. Em caso de divergência, registre escopo, versões e limites; não faça reconciliação imaginária.

### 3. Modele nove dimensões, com profundidade adaptativa

| Dimensão | Pergunta que merece resposta |
|---|---|
| 1. Finalidade | Qual problema resolve, quem consome, que resultado garante? |
| 2. Componentes | Quais domínios existem e qual responsabilidade essencial pertence a cada um? |
| 3. Fronteiras | Quem possui autoridade sobre ações e dados? Onde termina cada responsabilidade/processo? |
| 4. Fluxos | Qual caminho principal atravessa os componentes e como retorna um resultado? |
| 5. Contratos | Quais interfaces, protocolos e invariantes têm impacto arquitetural? |
| 6. Estado | Onde mora a verdade, como o estado transita, persiste e é reconstruído? |
| 7. Concorrência | Que operações coexistem, como são reservadas/isoladas e como disputas são resolvidas? |
| 8. Falhas | Quais interrupções, invalidações, retries e recuperações preservam os contratos? |
| 9. Dependências | Que serviços/runtime externos sustentam a operação e quais trade-offs introduzem? |

Essas dimensões são **perguntas de cobertura, não nove seções obrigatórias**. Combine ou omita detalhes sem efeito arquitetural; indique explicitamente os desconhecidos que afetem entendimento ou transferência. Considere segurança, escala, desempenho, deployment e observabilidade quando forem decisões estruturais materiais.

Identifique capacidades a partir de **comportamentos verificáveis**, incluindo condição de ativação, garantia e limite. Não faça catálogo por cada função do repositório. Modele **um fluxo principal**, o **fluxo de falha/retomada mais relevante** e as invariantes que explicam ambos. Diagrama somente se for mais esclarecedor que prosa compacta.

### 4. Separe arquitetura essencial de escolhas contextuais

Para cada mecanismo candidato a aprendizado, classifique:
- **Essência transferível:** contrato/princípio que sobrevive à troca de stack;
- **Implementação contextual:** tecnologia/estratégia justificada por restrições daquele sistema;
- **Risco ou lacuna:** propriedade não garantida ou custo para outro ambiente;
- **Não transferível:** pressuposto incompatível ou específico daquele produto.

Sempre explicite **por que funciona**, **qual problema evita**, **quais pré-condições exige** e **como falharia ao transplantá-lo**. Faça o *Greenfield Check*: os requisitos locais justificariam a ideia se a referência nunca tivesse sido vista? Sem requisitos locais comprovados, registre oportunidade **condicional**, não recomendação de implementação.

### 5. Comprima para Pure Signal

Entregue uma camada inicial de orientação que permita recuperar, em leitura breve: **propósito → topologia → autoridade → fluxos → invariantes → recuperação → limites**. Aprofunde seletivamente somente onde a ausência do detalhe geraria erro de decisão. Evite:
- listas de classes/arquivos/flags/logs sem valor de contrato;
- repetição de documentação e transcrição extensa de fonte;
- inventários indiscriminados de capacidades de baixo impacto;
- conclusões sem lastro ou confiança inflada;
- espelhar o estudo integral num segundo texto concorrente.

Critério de inclusão: **se retirar esta informação puder gerar interpretação ou decisão arquitetural materialmente errada, mantenha-a**. Caso contrário, comprima, referencie a fonte ou descarte.

## Contrato do System Model

O Artifact resultante deve conter, na ordem útil ao leitor, sem rigidez artificial:

1. **Identidade e cobertura:** sistema, escopo/versão, data observada, objetivo do estudo e grau de comprovação.
2. **Modelo executivo:** em poucas linhas, o que existe e a decisão fundamental de arquitetura.
3. **Topologia e ownership:** componentes necessários, fronteiras, autoridades e dependências direcionais.
4. **Fluxos e invariantes:** caminho de sucesso, falha/recuperação, contratos, estados e concorrência material.
5. **Capacidades estruturais:** mecanismos que diferenciam o sistema, sob quais condições existem.
6. **Trade-offs, limites e incógnitas:** o que não foi comprovado; o que a arquitetura sacrifica.
7. **Conhecimento reutilizável:** essência, condições, riscos, antiexemplos e hipóteses de adoção **não aprovadas**.
8. **Fontes rastreáveis:** links/versionamento suficientes para nova verificação sem repetir a pesquisa inteira.

Torne o documento **menor do que as evidências** e tão detalhado quanto o risco de entendimento exigir. Não há quota artificial de seções ou tokens. Se o modelo estiver incompleto, nomeie o recorte e a incerteza em vez de rotular a arquitetura toda como conhecida.

## Publicação, descoberta e manutenção

1. Use `continuum` para descobrir seletivamente modelo anterior **do mesmo sistema e escopo**. A identidade do Continuum é o **repositório ativo**: não existe biblioteca global compartilhada entre repositórios; confirme que o destino é relevante ao consumidor.
2. **Atualize o mesmo Artifact** se for revisão do mesmo modelo/escopo; crie um novo quando estudar outra arquitetura, variante/versionamento incompatível ou recorte com finalidade independente. Não acumule versões duplicadas por rotina.
3. Use `continuum-publication` para autorizar, compor YAML e publicar/editar. Padrão: `kind: INVESTIGATION`, `artifactRole: SYSTEM_MODEL`, `name` com o sistema, `description` discriminativa, `date` com offset, sem `status` de execução. Identidade/versão examinada ficam no corpo. Não marque `livingArtifact: true` por padrão: estudos externos são snapshots fundamentados em evidência datada; só use papel vivo quando existir governança real de manutenção.
4. Relacione `derived-from` a uma investigação de origem existente no mesmo Continuum, e `related-to` a uma decisão/produto local **somente** quando facilitar descoberta material, preservando a semântica dos vínculos. URLs externas no corpo não são relações entre Artifacts.
5. Confirme persistência efetiva, `artifactId` e revisão. **QUEUED não equivale a publicado**. Se falhar, preserve o Markdown e comunique impedimento; não simule sucesso.
6. Se novas evidências mudarem propriedade relevante, reavalie versões, confiança, metadata e relações; não faça atualização cosmética. Fonte atual pode refutar um modelo histórico, mas isso não transforma a versão antiga automaticamente em falso: explicite o recorte temporal.

## Gate final de qualidade

Antes de publicar, verifique:
- Outra IA consegue explicar **quem faz o quê e por quê**, sem abrir todo o source?
- A origem e o nível de certeza de cada afirmação material são recuperáveis?
- Especificação, implementação, políticas do exemplo e inferências foram separados?
- Os mecanismos transferíveis possuem **pré-condições e contraindicações**?
- O modelo não afirma que a arquitetura externa já existe ou foi aprovada no produto local?
- Um segundo leitor encontraria esse modelo por nome/description/metadata e chegaria às evidências relacionadas?

**Concluído = modelo sustentado, suficientemente compacto e publicação confirmada.**
