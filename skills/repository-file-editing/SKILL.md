---
name: repository-file-editing
description: Edite trechos literais ou substitua arquivos existentes no checkout ativo pelo MCP do Code Awareness quando essa for a via de escrita disponível. Use revisão literal SHA-256 e reconciliação de receipts. Para novos arquivos do host use repository-file-ingress; não use para Git, Academy, Continuum ou edição local equivalente já autorizada.
---

# Repository File Editing

Use para mutação autorizada de um arquivo existente pelo Channel. Verifique que inspect_repository_file e a ferramenta de mutação escolhida estão realmente disponíveis. Se houver editor local autorizado equivalente, prefira essa via; ter papel de Implementador ou Arquiteto não prova capacidade nem autoridade.

Para criação de novo arquivo do host, use repository-file-ingress. Para Skills ou destinos projetados, use a Academy; para Artifacts, use continuum-publication. Git Operations permanece responsável pelo índice e pelos commits.

## Autoridade e revisão

Confirme o path relativo e a alteração solicitada. AGENTS.md e ARCHITECT.md exigem pedido explícito do usuário para esta alteração exata. Implementar uma infraestrutura ou melhorar código não autoriza modificar incidentalmente kernels. Envie intent.description específico; use intent.explicitUserAuthorization: true somente quando esse pedido existir. Reconcile primeiro versões locais/remotas concorrentes do kernel.

Chame inspect_repository_file no path explícito. Por padrão receba somente size e sha256; peça includeContent: true quando precisar das âncoras literais. A leitura é UTF-8 limitada a 1 MiB. CodeMap orienta seleção, mas não substitui esta revisão literal atual.

## Mutação

Prefira edit_repository_text para preservar o restante do texto: envie destinationPath, expectedSha256 observado, intent e 1–32 replacements com oldText/newText literais. Cada oldText deve ocorrer exatamente uma vez na mesma versão original; regiões não podem sobrepor. Não use regex, nem introduza normalização de BOM ou quebras de linha.

Use replace_repository_file quando a intenção autorizada for trocar o arquivo inteiro. Envie destinationPath, expectedSha256, intent e exatamente uma origem: text UTF-8 até 1 MiB ou file-param autorizado do host até 32 MiB, inclusive binário. Não use URL inventada, Base64 manual, force, overwrite ou upsert. A ausência do destino é erro; não contorne pela importação.

Confirme receipt.path, operation, beforeSha256, afterSha256, size, changed e state: CONFIRMED. Não reabra o documento inteiro apenas para repetir o receipt. Checkout dirty não impede mutação do path exato sob revisão, mas staging preexistente deve ser observado quando afetar a entrega.

## Reconciliação

FILE_REVISION_CONFLICT exige nova inspeção e reavaliação da alteração; não substitua apenas o hash antigo pelo novo. PATCH_AMBIGUOUS exige âncoras inequívocas ou escolha explicitamente autorizada de substituição integral. PROTECTED_PATH não autoriza contornar governança ou usar outro path.

Depois de timeout, resposta perdida ou WRITE_OUTCOME_UNKNOWN, inspecione o alvo antes de reenviar. Hash final esperado confirma os bytes presentes; hash original mostra que o conteúdo desejado ainda não está presente; terceiro hash ou arquivo ausente exige investigação. Não repita uma mutação destrutiva cegamente.

O serviço serializa escritores cooperantes. Escritores externos podem disputar a janela de troca; não afirme compare-and-swap global. A capacidade não cria stage, commit, push, rename ou exclusão.
