# Uso da Academy — versões seletivas e Change Impact Preflight

## Acionamento
Leia quando precisar revisar alteração concreta de uma Skill canônica, consultar diferenças históricas ou investigar quem poderia ser afetado por uma revisão. Não aplique por rotina a toda discussão de Skill. Este recurso não substitui projeto de Skills, `surgical-evals` nem verificação de distribuição.

## Procedimento
1. **Adquira a versão corrente.** Obtenha ID e versão via `list_academy_skills` e package completo por `get_academy_skill(skillId)`. A fonte de verdade é o Store canônico, não uma projeção de IDE ou plugin. Para histórico, faça `get_academy_skill_history({skillId,metadataOnly:true})` e depois `{skillId,version:n}` para recuperar literalmente somente o que precisa. A chamada sem seletores traz todos os packages: evite-a por padrão.
2. **Prepare o package candidato integralmente, sem gravar.** Preserve o `skillMd` completo e os `artifacts` não alterados. Considere explicitamente alterações em descriptions, instruções e recursos; não passe apenas um trecho recortado.
3. **Faça o Preflight.** Use `analyze_academy_change_impact({skillId,expectedVersion,package})` para candidato ou `{skillId,baseVersion,targetVersion}` para versões já persistidas. Examine `diff`, `consumers`, `coverage` e `snapshot`; expanda só janelas `changes`/`consumers`/`evidence` e o `consumerId` realmente necessários.
4. **Interprete, não presuma.** Referência nominal não é dependência comprovada; `EXPLICIT_REFERENCE` ou `CANONICAL_MENTION` descrevem a extração, não a consequência. `POR_SKILL` não prova qual contrato é consumido. Negação, exemplos, aliases e dependências implícitas podem exigir inspeção seletiva adicional. A ausência de match não certifica segurança. Não altere consumidor automaticamente: quando necessário, justifique uma revisão própria.
5. **Verifique freshness antes da escrita.** Passe `snapshot` e `candidateHash` obtidos da análise a `verify_academy_change_impact`. Se `STALE`, investigue causa e repita a análise; `UNKNOWN` não comprova frescor. `CURRENT` é consultivo e não implica compatibilidade ou atomicidade até `update`. Qualquer alteração do candidato exige novo Preflight; `expectedVersion` protege apenas a Skill de origem.
6. **Persista e diferencie entrega.** Com autorização, use `update_academy_skill` e `expectedVersion` corrente com package inteiro. Recibo `PERSISTED` não significa `CONVERGED`; consulte `get_academy_skill_delivery_status` para a versão criada. Validação comportamental de triggering ou uso de complementos é responsabilidade de `surgical-evals` quando realmente necessária.

## Canais e fallback
No MCP remoto, consulte `analyze_academy_change_impact`, `verify_academy_change_impact` e `get_academy_skill_history`; no Local Agent Channel, as operações correspondentes são `change_impact`, `verify_change_impact` e `history` quando disponíveis e autorizadas. Os dois canais delegam à mesma Academy. Confirme a versão realmente disponível no runtime, pois plugins/projeções podem estar desatualizados.

Se a capacidade não estiver acessível, recorra à leitura canônica seletiva ou revisão manual proporcional, explicite cobertura e limites, e não afirme ter executado o Preflight. Não crie outro grafo, banco ou mecanismo de classificação semântica para contornar a falta momentânea da consulta.
