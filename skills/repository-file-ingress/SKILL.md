---
name: repository-file-ingress
description: Use quando um arquivo fornecido ou gerado no host ChatGPT precisar ser materializado como novo arquivo dentro do repositório ativo, por exemplo mockups, imagens, binários ou assets de apoio. Use a tool `import_repository_file` com file param autorizado e destinationPath repository-relative, confirme path/size/SHA-256 e mantenha Git Operations separado. Não use como editor de source, para overwrite de arquivo existente, para transportar Base64 manualmente ou para stage/commit.
---

# Repository File Ingress

## Finalidade

Materialize com segurança um arquivo que já existe no host/conversa dentro do worktree do repositório ativo.

Princípio:

> **Ingress writes the file. Git Operations governs Git state.**

Esta capability existe para transportar bytes sem fazer o modelo serializá-los em Base64.

## Quando usar

Use quando:

- um mockup gerado precisa ser preservado no repo;
- uma imagem, binário ou asset fornecido pelo usuário precisa entrar no worktree;
- outra Skill produzir um arquivo durável que precisa ser materializado;
- o usuário pedir para salvar/colocar/importar um arquivo da conversa no repositório ativo.

Não use quando:

- a tarefa é editar semanticamente source code;
- o conteúdo pode ser produzido normalmente pelo mecanismo de edição textual apropriado;
- a intenção é substituir um arquivo existente;
- a intenção real é stage, commit, branch ou push.

## Contrato

A tool pública é:

`import_repository_file`

Entradas:

- `file` — file param autorizado pelo host;
- `destinationPath` — caminho explícito relativo ao repository root.

Resultado esperado:

- path normalizado;
- size em bytes;
- SHA-256.

A capability é:

- create-only;
- limitada a 32 MiB;
- HTTPS/host-file based;
- confinada ao repositório;
- sem stage/commit implícito.

## Procedimento

1. Confirme qual repositório ativo deve receber o arquivo.
2. Escolha um destinationPath explícito, repository-relative e semanticamente apropriado.
3. Prefira convenções já existentes do projeto.
4. Chame `import_repository_file` passando o file param do host e o destinationPath.
5. Verifique o recibo:
   - path;
   - size;
   - SHA-256.
6. Quando a tarefa exigir versionamento, use `git-operations` depois para observar e operar o estado Git.
7. Pare quando a materialização estiver confirmada.

Não faça polling ou chamadas extras apenas para reconstruir informação já presente no recibo.

## Create-only

Arquivo existente deve produzir conflito.

Não tente contornar o contrato:

- não peça overwrite;
- não gere URL alternativa;
- não serialize Base64;
- não escolha mecanismo destrutivo para “forçar” substituição.

Se a intenção verdadeira for criar uma nova revisão de asset, use um novo nome versionado.

Se a intenção for substituir semanticamente um arquivo existente, use a capability apropriada para edição/substituição, não Repository File Ingress.

## Paths

Use caminhos relativos claros.

Evite nomes temporários ou ambíguos para conteúdo durável.

Para mockups, quando `mockup-design` aplicar:

`docs/mockups/<feature>/<feature>-<state-or-purpose>-vN.webp`

O ingress é genérico; essa convenção pertence ao fluxo de mockup, não à capability.

## Relação com Git Operations

Repository File Ingress não é uma operação Git.

Após uma importação:

- o arquivo normalmente aparece como untracked;
- não está stageado;
- nenhum commit foi criado.

Quando versionamento fizer parte da tarefa:

`repository-file-ingress`
→ confirmar recibo
→ `git-operations`
→ observar mudança
→ stage/commit explícitos quando autorizados.

Não misture essas responsabilidades.

## Segurança e falhas

Trate como falhas esperadas:

- destination conflict;
- path inválido;
- arquivo grande demais;
- timeout/download failure;
- filesystem/cleanup failure.

Não tente compensar com URL arbitrária ou escrita manual de bytes.

A tool já aplica confinamento, streaming, limite e atomicidade; a Skill não deve recriar essas garantias proceduralmente.

## Uso por outras Skills

Skills especializadas devem chamar esta capability somente para persistência.

Exemplos:

- `mockup-design` decide qual mockup merece ser salvo e qual path usar;
- `repository-file-ingress` materializa o arquivo;
- `git-operations` versiona a mudança quando necessário.

Compartilhe capacidade por composição, não copiando o procedimento em cada Skill.

## Critério de sucesso

O uso está concluído quando:

- o arquivo foi materializado no destinationPath pretendido;
- o recibo confirma path, size e SHA-256;
- nenhum overwrite ocorreu;
- nenhuma mutação Git implícita ocorreu;
- qualquer etapa Git necessária foi delegada à Skill correta.

## Regra Final

> **Use Repository File Ingress para mover bytes autorizados do host ao repositório, não para editar semântica. Escolha o path explicitamente, aceite create-only, confie no recibo de integridade e mantenha Git como uma etapa separada.**
