# Convite Romântico (React + Vite)

Site simples e romântico com navegação por páginas (React Router), animações (Framer Motion) e ranking com drag & drop (HTML5 nativo).

## ✅ Como rodar localmente

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto (mesmo nível do `package.json`) e configure:

```bash
VITE_FORM_ENDPOINT=https://exemplo.com/form
```

> **Observação:** Esse endpoint será usado para enviar o ranking final via `fetch` (POST JSON) na página **/ranking**.

3. Rode o projeto:
```bash
npm run dev
```

Acesse o link exibido no terminal (normalmente `http://localhost:5173`).

## Estrutura do projeto

- `src/pages` → páginas do React Router (`/`, `/pergunta`, `/ranking`)
- `src/components` → componentes reutilizáveis (Button, Card, etc.)
- `src/styles` → estilos globais e utilitários
- `public` → imagens/arquivos públicos (placeholder)

## Variáveis de ambiente (Vite)

- `VITE_FORM_ENDPOINT` (obrigatória para envio do ranking)
  - Exemplo: `VITE_FORM_ENDPOINT=https://exemplo.com/form`

Arquivo de exemplo: `.env.example`.
