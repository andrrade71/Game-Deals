# Game Deals Finder (Site de Ofertas de Jogos)

## 🚀 Descrição

Este projeto é um site desenvolvido para ajudar utilizadores a encontrar as melhores ofertas e promoções de jogos para PC. Utilizando a API da [CheapShark](https://www.cheapshark.com/api/), o site exibe uma lista de jogos em promoção, permitindo filtrar, ordenar e visualizar detalhes para encontrar o melhor preço.

## ✨ Funcionalidades Implementadas

* **Visualização de Ofertas:** Exibe uma lista de jogos atualmente em promoção.
* **Detalhes do Jogo (Modal):** Ao clicar numa oferta, um modal exibe:
    * Informações básicas do jogo (título, imagem).
    * O menor preço histórico registado para o jogo.
    * Uma lista de outras lojas que também possuem o jogo em promoção no momento.
* **Filtragem de Ofertas:**
    * Por loja específica.
    * Por percentagem mínima de desconto.
    * Por título do jogo.
* **Ordenação de Ofertas:** Permite ordenar os resultados por:
    * Relevância (padrão da API)
    * Preço
    * Percentagem de Desconto
    * Título (A-Z)
    * Avaliação (Metacritic)
    * Data de Lançamento
* **Paginação:** Navegação entre múltiplas páginas de ofertas.
* **Processamento de Ofertas:** Apenas a melhor oferta (menor preço) para cada jogo único é exibida na lista principal por página de resultados da API.

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * [React](https://reactjs.org/) (Biblioteca JavaScript para construção de interfaces)
    * [Tailwind CSS](https://tailwindcss.com/) (Framework CSS utility-first para estilização rápida)
* **API:**
    * [CheapShark API](https://apidocs.cheapshark.com/) (Para obter dados de ofertas de jogos)
* **Ambiente de Desenvolvimento:**
    * Node.js
    * npm/yarn

## 📊 Fonte dos Dados

Todas as informações sobre ofertas de jogos, preços e lojas são fornecidas pela [CheapShark API](https://apidocs.cheapshark.com/). Um agradecimento especial à equipe da CheapShark por manter esta API pública e acessível.

## 🚀 Como Executar o Projeto Localmente (Exemplo)

1.  Clone o repositório:
    ```bash
    git clone [https://docs.github.com/articles/referencing-and-citing-content](https://docs.github.com/articles/referencing-and-citing-content)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd nome-da-pasta-do-projeto/deals-app 
    ```
    (Ajuste `nome-da-pasta-do-projeto` e `deals-app` conforme a sua estrutura)
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
