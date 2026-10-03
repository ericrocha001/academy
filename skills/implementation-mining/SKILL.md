---
name: implementation-mining
description: Descubra e inspecione seletivamente implementações externas reais para extrair modelos arquiteturais reutilizáveis antes de projetar ou decidir uma solução. Use quando uma funcionalidade, mecanismo, integração ou problema técnico puder se beneficiar de referências existentes em repositórios públicos ou outras fontes de código. Não use para copiar código, para pesquisas conceituais sem necessidade de implementação, nem quando a solução já estiver suficientemente determinada pelo contexto atual.
---

# Implementation Mining

Use implementações externas como evidência para reduzir incerteza arquitetural, encurtar investigação e evitar reinvenção desnecessária.

O objetivo é produzir um **modelo de implementação**, não copiar uma implementação existente.

## Princípios

- **Referência é evidência, não autoridade.**
- **Modelo, não cópia.**
- **Seleção antes da inspeção.**
- **Leia apenas o que responde a uma incerteza concreta.**
- **Popularidade não prova qualidade arquitetural.**
- **Mais contexto só é válido quando o ganho esperado justifica o custo.**
- **Pare quando evidência adicional deixar de alterar materialmente o modelo ou a decisão.**

## Procedimento

### 1. Defina o alvo da mineração

Antes de buscar código externo, formule com precisão:

- qual capacidade ou mecanismo precisa ser compreendido;
- quais decisões estão em aberto;
- quais contratos, restrições ou riscos do sistema atual importam;
- que conhecimento uma implementação externa poderia acrescentar.

Não inicie mineração apenas porque existem projetos semelhantes.

### 2. Descubra candidatos

Pesquise fontes externas adequadas e identifique poucos projetos com sinais concretos de relevância para o alvo.

Use os meios disponíveis para localizar código. Não dependa de uma plataforma específica.

Considere sinais como:

- a funcionalidade realmente existe no projeto;
- maturidade e uso real;
- manutenção recente quando relevante;
- documentação suficiente para localizar a implementação;
- arquitetura ou stack compatível o bastante para gerar aprendizado transferível.

Estrelas, popularidade ou reputação podem ajudar na descoberta, mas nunca substituem a inspeção.

### 3. Selecione antes de aprofundar

Não leia repositórios inteiros.

Para cada candidato, faça primeiro uma triagem barata usando documentação, estrutura do projeto, busca por símbolos, nomes de módulos, dependências, chamadas ou outros indícios.

Aprofunde apenas nos candidatos que provavelmente respondem às perguntas definidas no passo 1.

### 4. Inspecione cirurgicamente

Leia somente o trecho necessário para compreender o mecanismo relevante.

Procure extrair:

- componentes e responsabilidades;
- fluxo de dados e controle;
- contratos e invariantes;
- estados e transições relevantes;
- dependências essenciais;
- mecanismos de erro, recuperação e consistência;
- decisões arquiteturais aparentes;
- trade-offs;
- acoplamentos e pressupostos específicos daquele projeto.

Expanda a inspeção apenas quando surgir uma nova incerteza material.

### 5. Modele a implementação

Converta os detalhes observados em uma representação abstrata e transferível.

O modelo deve explicar **como o mecanismo funciona** sem depender desnecessariamente de nomes, arquivos ou peculiaridades do projeto original.

Distingua explicitamente:

- **essência reutilizável** — mecanismo, contrato, invariante ou padrão;
- **decisão contextual** — escolha válida apenas sob determinadas restrições;
- **detalhe local** — algo específico da implementação observada;
- **risco ou dívida aparente** — aspecto que não deve ser herdado sem justificativa.

### 6. Compare quando houver valor marginal

Use múltiplas referências somente quando a importância da decisão justificar o custo adicional.

A comparação é especialmente útil quando:

- há estratégias concorrentes;
- uma única implementação parece idiossincrática;
- o risco arquitetural é alto;
- identificar convergências entre projetos reduziria incerteza relevante.

Ao comparar, procure convergências e divergências de mecanismo, não uma votação entre projetos.

### 7. Faça o Greenfield Check

Antes de recomendar qualquer decisão influenciada pela referência, pergunte:

> Se esta implementação externa nunca tivesse sido vista, os contratos, restrições e riscos do sistema atual ainda justificariam esta solução?

Classifique o resultado como uma destas possibilidades:

- o modelo observado é adequado ao contexto atual;
- apenas partes do modelo são úteis;
- uma solução híbrida é preferível;
- uma solução greenfield é superior;
- a evidência encontrada é insuficiente para influenciar a arquitetura.

Não preserve uma decisão apenas porque ela já existe em software real.

### 8. Entregue conhecimento, não volume

A saída deve ser compacta e orientada à decisão. Inclua somente o necessário:

- problema investigado;
- referências efetivamente relevantes;
- modelo ou modelos extraídos;
- contratos e invariantes importantes;
- trade-offs e riscos;
- o que é transferível e o que não é;
- resultado do Greenfield Check;
- implicações para a solução atual.

Não despeje código-fonte, árvores extensas de arquivos ou notas de exploração sem utilidade decisória.

## Controle de contexto

Trate tokens e contexto como recursos limitados.

Siga esta progressão:

**descoberta → triagem → localização → inspeção cirúrgica → modelagem → decisão**

Antes de abrir mais código, pergunte se a nova leitura pode alterar materialmente o entendimento ou a decisão.

Se não puder, pare.

Não confunda falta de compreensão com falta de contexto: quando a evidência já for suficiente, raciocine sobre ela em vez de continuar coletando arquivos.

## Restrições

Não:

- copie uma arquitetura apenas porque pertence a um projeto conhecido;
- presuma qualidade a partir de estrelas, adoção ou autoridade dos autores;
- leia centenas de arquivos para "entender o projeto" quando apenas um mecanismo interessa;
- faça mineração externa quando não houver incerteza relevante a reduzir;
- transforme semelhança superficial entre projetos em equivalência arquitetural;
- introduza dependências, padrões ou complexidade que não se justificam no sistema atual;
- trate código observado como especificação normativa.
