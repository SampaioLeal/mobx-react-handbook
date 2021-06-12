# Manual do MobX com React

Exemplos de gerenciamento de estado no React usando a biblioteca MobX

## Versões

Este repositório está utilizando as seguintes versões da biblioteca:

```
mobx: 6.3.2
mobx-react-lite: 3.2.0
```

## Iniciando

Para começar a usar as stores do MobX e desenvolver seus próprios padrões de projeto deve-se começar pelo básico, uma store em forma de classe que atualiza um contador.

Colocaremos nossa primeira store no arquivo `/src/stores/root.ts`:

```ts
class RootStore {}

const rootStore = new RootStore();
export default rootStore;
```

Perceba que faremos uso da geração de uma instância da classe no próprio arquivo para importarmos uma versão global da store e nãop termos stores duplicadas pela aplicação.

Agora é hora de declarar os estados da store.

```ts
class RootStore {
  counter = 0;
}
...
```

No MobX as propriedades da classe são como os estados do react instanciados com `useState`, as alterações feitas nessas propriedades geram reatividade para os componentes que estão utilizando-as e que estão aptos para reagir a essas mudanças.

Tais mudanças só podem ocorrer via `actions`, que são nada mais nada menos que métodos da classe que são responsáveis por alterar as propriedades gerando reatividade.
Vamos definir o primeiro método responsável por incrementar a propriedade counter sempre que for executado:

```ts
class RootStore {
  counter = 0;

  incrementCounter() {
    this.counter++;
  }
}
...
```

Bem simples, né? Poreḿ, más notícias, o código não vai funcionar enquanto não fizermos a configuração básica do MobX para transformar as propriedades em `observables` e os métodos em `actions`:

```ts
import { makeAutoObservable } from "mobx";

class RootStore {
  counter = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  incrementCounter() {
    this.counter++;
  }
}
...
```

A função `makeAutoObservable` irá inferir todos os tipos de propriedades da classe, transformando propriedades em `observables`, métodos em `actions`, etc. No primeiro parâmetro passaremos a referência da classe, o famoso `this`. O segundo parâmetro é utilizado para sobrescrever alguma transformação. O terceiro parâmetro é utilizado para definir as opções da transformação, quando passamos o `autoBind` o MobX irá fazer o binding do método para a instância correta, sua respectiva classe, para não sermos obrigados a utilizar `arrow functions`.

```tsx
// src/App.tsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {...}

        <p>Counter: 0</p>
        <button>Increment Counter</button>

        {...}
      </header>
    </div>
  );
}
```

Agora é hora de trabalharmos no nosso componente, fazer com que ele observe os estados da store e reaja sempre que uma alteração for realizada, atualizando os dados na UI.

Podemos começar substituindo o 0 adicionado manualmente pela propriedade `counter` da store. Basta importar a variável rootStore do arquivo `/src/store/root.ts` e já teremos acesso aos observables e às actions.

```tsx
// src/App.tsx
import rootStore from "./stores/root";

{...}
<p>Counter: {rootStore.counter}</p>
<button>Increment Counter</button>
{...}
```

Agora vamos atrelar ao nosso botão a responsabilidade de incrementar o contador sempre que for clicado:

```tsx
// src/App.tsx
{...}
<button onClick={rootStore.incrementCounter}>Increment Counter</button>
{...}
```

Não aconteceu nada ao clicar no botão? Será que deu bug?
Como havia citado anteriormente: _"as alterações feitas nessas propriedades geram reatividade para os componentes que estão utilizando-as e que **estão aptos para reagir** a essas mudanças"_.

Isso quer dizer que para um componente reagir as alterações de estado, devem ser encapsulados por uma função/HOC `observer`.

### `observer<P>(baseComponent: FunctionComponent<P>): FunctionComponent<P>`

"The observer converts a component into a reactive component, which tracks which observables are used automatically and re-renders the component when one of these values changes. Can only be used for function components. For class component support see the mobx-react package."
"The observer HoC automatically subscribes React components to any observables that are used during rendering. As a result, components will automatically re-render when relevant observables change. It also makes sure that components don't re-render when there are no relevant changes. So, observables that are accessible by the component, but not actually read, won't ever cause a re-render."

_Trecho retirado da [documentação](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite#api-reference-) do MobX_

```tsx
// src/App.tsx
import { observer } from "mobx-react-lite";

function App() {
  {...}
}

export default observer(App);
```

Agora você já pode clicar no botão e ver o contador sendo incrementado, ou seja, agora você tem uma store global e um componente reativo as mudanças da store.
