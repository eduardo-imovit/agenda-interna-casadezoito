-- Leitura de empresas precisa ser pública: a tela de cadastro (usuário ainda
-- não autenticado) precisa listar as empresas pra montar o select do formulário.
drop policy if exists "empresas: leitura autenticada" on empresas;
drop policy if exists "empresas: leitura publica" on empresas;
create policy "empresas: leitura publica" on empresas for select using (true);
