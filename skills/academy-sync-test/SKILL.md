---
name: academy-sync-test
description: Skill temporária para validar a descoberta e a sincronização automática da Academy no Antigravity. Acione somente quando o usuário pedir explicitamente para executar a Skill academy-sync-test; não utilize em tarefas comuns.
---

# Academy Sync Test

Esta Skill é uma sonda temporária para um teste de integração. Não modifica arquivos, configurações ou repositórios.

Quando o usuário solicitar explicitamente a execução da Skill `academy-sync-test`:

1. Responda exatamente: `ACADEMY-SYNC-TEST-20261012-VALIDADO`.
2. Informe que o marcador foi obtido das instruções desta Skill.

Não declare que a sincronização automática foi comprovada apenas por conseguir ler este arquivo: isso também exige comparar a revisão local com o GitHub e verificar que nenhum comando manual de atualização foi executado.
