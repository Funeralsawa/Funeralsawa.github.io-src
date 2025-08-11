# React

## 前端工程化

所谓前端工程化，就是把系统化的，规范化的，可度量的方法和工具应用到前端开发中。它的目的是提高开发效率，通过一系列的规范，辅助工具和开发框架来解决前端开发以及前后端协作的一些问题。

- **模块化**：指将一个文件拆分成多个相互依赖的文件，最后进行统一的打包和加载，这样能够很好地保证高效的多人协作。模块化是对文件、代码和资源拆分。
- **组件化**：在功能实现的设计层面上，按功能或业务来把`UI`界面进行拆分成一个个包含模块(HTML)+样式(CSS)+逻辑(JS)的功能晚辈的结构单元。
- **规范化**：是指在项目开发初期以及开发期间指定的一系列规范，包括文件目录规范，命名规范，代码规范等等。
- **自动化**：是指代利用自动化工具来完成项目开发过程中的重复性，机械化，简单性的工作。

## React介绍

`React`是一个用于构建`UI(User Interface)`的`Js`库，也是目前世界最流行的前端框架之一。由`Facebook`在2013年5月开源的前端项目。

`React`官方并不认可`MVC`开发模式，所以`React`不是一个完整的`MVC`前端框架，只能说是一个轻量级的视图框架(`MVC`中的`View`)。

官网：[点我](https://react.dev/)

特点如下：

- **声明式设计**：`React`为应用的每一个状态设计简洁的视图，当数据改变时`React`能有效地更新并正确地渲染组件。
- **高效**：`React`采用`Virtual DOM`，极大地提升了`UI`渲染效率。
- **灵活**：`React`允许结合其他框架和库一起使用，而且有大量的开发者围绕`React`去开发各种各样的工具库。
- **`JSX`**：`JSX`是`React`框架基于`JS`的语法扩展，可以很好地描述`UI`应该呈现出它应用交互的本质形式。
- **组件**：通过`React`构建组件，使得代码更加容易得到复用，能够很好地应用在大项目的开发中。
- **单向响应的数据流**：`React`采用了单向响应的数据流，使得组件状态更容易维护，组件模块化更易于快速开发。

***`Virtual Dom`介绍*：**

![Virtual DOM](https://pic1.imgdb.cn/item/68405b6b58cb8da5c82ce2de.png)



- 用`JS`对象模拟真实的`DOM`树，对真实的`DOM`树进行抽象。
- 运用`diff`算法比较两棵树的差异。
- 用`Patch`算法将两个`DOM`树的差异应用到真正的`DOM`树里。



## React引入与快速上手

### 引入

在`head`标签中添加这两个脚本元素：

```html
<!-- React的核心包，提供了操作React的所有必要功能 -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<!-- ReactDOM包，提供了将React组件渲染到DOM的功能 -->
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<!-- Babel是一个JavaScript编译器，可以将JSX语法转换为普通的JavaScript -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

**注：React实际上包含了`React-dom`进行网页开发，以及`React-native`进行APP开发**



### 快速上手

***直接渲染文本：***

```html
<div id="root"></div>

<script>
    let msg = "Hello, React!";
    // 创建一个React元素
    const root = ReactDOM.createRoot(document.querySelector('#root'));
    // 渲染一个简单的React元素到页面上
    root.render(msg);
</script>
```

***渲染节点：***

```html
<div id="root"></div>

<script>
    let msg = "Hello, React!";
    // 创建一个React元素
    const root = ReactDOM.createRoot(document.querySelector('#root'));

    // 使用React.createElement创建一个节点，第一个参数是元素类型，第二个参数是节点的属性，第三个参数是子节点
    msg = React.createElement('h1', {title: msg}, msg);

    // 渲染一个简单的React元素到页面上
    root.render(msg);
</script>
```



## JSX

### 基础介绍

`JSX(JavaScript Xml)`是React基于JavaScript和XML实现的语法扩展，类似模板语言，但具有JavaScript的全部功能。`JSX`提供了在JavaScript中写XML(HTML)代码的功能，让项目中的用户界面代码变得更加直观，结构清晰，从而提升开发效率，所以React推荐开发者使用`JSX`来声明描述用户界面。

`JSX`本质上就是`React.createElement(component, props, children)`的**语法糖**，使用`babel`编译后，`JSX`会变成虚拟DOM对象。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- React的核心包，提供了操作React的所有必要功能 -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <!-- ReactDOM包，提供了将React组件渲染到DOM的功能 -->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel是一个JavaScript编译器，可以将JSX语法转换为普通的JavaScript -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <title>1</title>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel"> <!-- 指定编译器 -->
        let msg = "Hello, React!";
        // 创建一个React元素
        const root = ReactDOM.createRoot(document.querySelector('#root'));
        
        // 使用JSX语法创建一个React元素
        const VDOM = <h1>{msg}</h1>;
        
        // 渲染一个简单的React元素到页面上
        root.render(VDOM);
    </script>
</body>
</html>
```



### 语法介绍

- 所有标签必须闭合，最外层有且只有一个根元素。遇到与JS关键字同名的属性，要特殊处理。（甚至使用空标签`<></>`或`<React.Fragment></React.Fragment>`
    1. `class` ---> `className`
    2. `for` ---> `htmlFor`
    
- JSX中使用{}嵌入表达式
    
- 注释的处理需要使用花括号`{}`转化为JS的注释处理方式

- 没有返回值的语句不能嵌入JSX中，如`let a = 10`

- `for`语句或者`if`语句没有结果，不能嵌入JSX中，但三元表达式可以代替`if`语句，`map`对象可以遍历对象或数组

- 匿名对象或者函数名不可以直接嵌入JSX中

- 数组可以直接嵌入JSX，前提是子元素没有包含对象

- 列表元素`li`遍历时需要给每个元素绑定一个唯一的`key`属性

    - > 因为React的高性能是依赖于虚拟DOM的，所以React的JSX操作中都尽量避免去操作DOM元素的。但是对于开发中的列表数据而言，因为列表元素在操作过程中会出现位置改变的情况，而React的虚拟DOM是不知情的，此时，有可能React的虚拟DOM会把位置改变后的所有元素全部进行重新渲染，这就会大量增加DOM操作了，因此React会要求我们在遍历列表元素时给元素绑定一个唯一的key属性，当列表中的元素在操作过程中出现位置改变时，React就可以通过预先设定好的key值来识别了。
    
- 渲染样式表，行内或者内嵌，行内样式表属性名如果有`-`连接的话，需要使用小驼峰式写法，或者用引号引入，例子：

    ```jsx
    <style>
        .pp {
            color: red;
        }
    
        .mystyle {
            background-color: aqua;
            color: orange;
        }
    </style>
    
    // 渲染style
    let VDOM7 = (
        /* 注意这里的style属性是一个对象，里面的属性名是小驼峰式的（或者用引号引起来），例如fontSize */
        <div style={{'color': 'blue', "font-size": '200px'}}>
            这是一个内联样式的div
        </div>
    );
    
    let VDOM8 = (
        <div className="mystyle">
            这是一个带有class的div
        </div>
    );
    ```

- 标签转义，采用`__html`属性，通过`dangerouslySetInnerHTML`来渲染HTML内容（可以自动防范XSS）

    ```jsx
    // 标签转义，采用__html属性，通过dangerouslySetInnerHTML来渲染HTML内容
    let data = {
        __html: '<h1>这是一个转义的标题</h1>'
    };
    
    let VDOM10 = (
        <div dangerouslySetInnerHTML={data}></div>
    );
    
    // 渲染一个简单的React元素到页面上
    root.render(VDOM10);
    ```




## 基于项目构建工具来管理项目

由于我们一直在把重复的代码写在一个文件中，每次使用这个文件都去反复引入`react`、`react-dom`、`babel`等文件，这无疑很影响我们的学习和开发效率，所以接下来我们可以基于项目构建工具来搭建一个`react`项目，以工程化的方式来继续学习。

```shell
# 采用官方脚手架
yarn create react-app yarn-react-basic
    
npm init react-app npm-react-basic

npx create-react-app npx-react-basic

pnpm create react-app npm-react-basic


# 采用vite脚手架
yarn create vite

npm init vite

pnpm create vite
```

*注：`yarn`、`npm`就是包管理器，可以对项目进行构建管理。`React`官方为了方便学习`React`推出了一个脚手架`create-react-app`，而`Vite`则是另一个前端框架`Vue`的作者尤雨溪开发的轻量易用脚手架*。

**`create-react-app`搭建的`React`，默认入口是`public/index.html`，脚本扩展名是`js`；`Vite`搭建的`React`，默认入口是`index.html`，脚本扩展名是`jsx`**



## 环境配置

1. 安装`Node.js`&emsp;[官网参考](https://nodejs.org/en)

2. 安装`pnpm`       [官网参考](http://pnpm.io/)

    ```bash
    npm install -g pnpm@latest-10
    ```

3. 安装`bootstrap`

    ```shell
    pnpm i bootstrap
    
    # 引入方式：import 'bootstrap/dist/css/bootstrap.css';
    ```

4. 安装`VSCode`的插件

    - Simple React Snippets （简单的自动补全，如`imr`、`cc`）
    - Prettier - Code formatter

5. 创建一个新项目（注意目录要自己创建），进入这个目录后运行：

    ```shell
    pnpm create vite
    ```

    

## 组件化

### 基础

在前端开发中经常出现多个网页的功能是重复的，而且很多不同的页面之间也存在同样的功能。在`React`中，可以按照功能或者业务来吧UI界面进行拆分成一个一个包含模板（HTML)+样式（CSS）+逻辑（JS）的功能完备的结构单元。这些结构单元就可以设计成一个一个组件方便开发人员进行代码复用，也就是组件式开发，前端人员在组件化开发时，只需要书写一次代码，随处引入即可。

**`React`创建组件的两种方式：**

1. **函数式组件**：以函数格式来创建组件，直接在函数中`return`返回视图代码即可。
2. **类组件**：以类的方式来创建组件，组件类必须直接或间接继承于`ReactComponent`类，而且视图代码必须通过`render`方法`return`返回给外界。

*在`React17`以前，函数式组件也叫无状态(`state`)组件，而类组件则为有状态组件。无状态意思是组件内部是否能定义状态（`state`，状态就是组件内部定义和使用的私有数据），并通过`state`来保存数据或者修改视图。在`React17`版本开始，函数式组件可以通过`Hooks`来定义状态，保存数据或者修改视图了，函数式组件的应用也变得强大起来了。*

```jsx
//这个代码并非必须，但是低版本所有组件的代码都需要引入React，最新版本的组件可以不引入。
//这是因为低版本代码最后都被babel编译成了React.createElement的形式，
//而最新版本的代码可以直接使用jsx语法，编译后不需要React对象
//现在写入这句话是为了兼容低版本的React代码
import React from "react"; 

// 函数式组件，函数名就是组件名，组件名一般和文件名同名，首字母必须要大写。
// 函数式组件的返回值必须是jsx视图代码，或者字符串等。
function App() {
    return (
        <>
            <h1>App组件！</h1>
        </>
    );
}

// 类组件，类名就是组件名，组件名一般和文件名同名，首字母必须要大写。
// 类组件必须继承React.Component类，并且必须实现render方法，render方法的返回值必须是jsx视图代码，或者字符串等。
class AppClass extends React.Component {
    message = 'hello'; // 类组件的属性可以直接声明
    
    state = { // state是固定变量名不能改，可以通过setState函数来重新渲染（修改DOM树）
        
    }

    // 构造函数，类组件可以有构造函数，构造函数必须调用super()方法
    constructor(props) {
        super(props);
        // 可以在这里初始化状态
        this.state = {};

        //内部数据
        this.msg = 'msg=内部数据'; //声明组件属性
    }

    fun() {
        return '这是类组件的fun方法';
    }

    render() {
        return (
            <>
                <h1>AppClass组件！</h1>
                <p>{this.msg}</p>
                <p>{this.message}</p>
                <p>{this.fun()}</p>
            </>
        )
    }
}

export default (App, AppClass); // 导出函数式组件和类组件，供其他文件使用
```



### 组件的嵌套

组件可以随意组合和嵌套。在开发中，我们习惯把整个项目分成大大小小的组件，一个页面可以设计成一个组件，而一个页面组件下又可以包含多个功能组件，而有些复杂的功能组件还可以细化嵌套自己的子组件。

- `src/main.jsx`

    ```jsx
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    // import AppClass from './1-组件化的基本使用'
    import App from './2-组件的嵌套.jsx' // 引入App组件
    
    // StrictMode 开启React的严格模式
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    
    ```

- `src/2-组件的嵌套.jsx`

    ```jsx
    import React from 'react';
    import Header from './component/Header.jsx'; // 引入Header组件
    import Footer from './component/Footer.jsx'; // 引入Footer组件
    
    class App extends React.Component {
    
        constructor(props) {
            super(props);
            // 可以在这里初始化状态
            this.state = {};
        }
    
        render() {
            return (
                <div>
                    <Header></Header>
                    <p>App组件公共部分！</p>
                    <Footer></Footer>
                </div>
            );
        }
    }
    
    export default App; // 导出App组件供其他文件使用ww
    ```

- `src/component/Header.jsx`

    ```jsx
    import React from 'react';
    
    class Header extends React.Component {
        render() {
            return (
                <header>
                    <p>这是Header组件的内容。</p>
                </header>
            );
        }
    }
    
    export default Header; // 导出Header组件供其他文件使用
    ```

- `src/component/Footer.jsx`

    ```jsx
    import React from 'react';
    
    function Footer() {
        return (
            <footer>
                <p>这是Footer组件的内容。</p>
            </footer>
        );
    }
    
    export default Footer; // 导出Footer组件供其他文件使用
    ```



## 事件处理

### 示例

React 主要的功能是渲染视图，而视图操作中事件的绑定和处理是必不可少的。

```jsx
import React from 'react';

class App extends React.Component {

    msg = 'Hello, React!';

    render() {
        return (
            <div>
                <button onClick={this.fn1.bind(this)}>点击按钮</button>
                <button onClick={() => {this.fn2()}}>点击按钮</button>
            </div>
        )
    }
    
    fn1() {
        console.log('按钮fn1被点击了！', this.msg);
    }

    fn2() {
        console.log('按钮fn2被点击了！', this.msg);
    }
}

export default App; // 导出App组件供其他文件使用
```



### this的绑定问题

`<button onClick={this.fn1}>点击按钮/button>`，这里其实是直接把`fn1`函数本身传给了`onClick`，但没有指定它内部的`this`应该绑定到哪里。当浏览器触发这个事件时，它会“直接调用”这个函数，而不是通过 `App` 这个实例来调用它。

所以：

- 在 **严格模式** 下：`this` 是 `undefined`

- 在 **非严格模式** 下：`this` 是 `window`（全局对象）

    

**语法层面的理解：**

==普通函数的 this 是运行时决定的，而不是定义时决定的。==

例子：

```javascript
class App {
    msg = 'hi';

    fn1() {
        console.log(this.msg);
    }
}

const app = new App();
const f = app.fn1;
f(); // ❌ this 是 undefined 或 window，而不是 app

```

这就等于在浏览器中写：

```javascript
const f = function() {
    console.log(this.msg);
};
f(); // this 不是你想要的组件
```

只有“通过对象调用”的函数，才绑定正确：

```javascript
app.fn1(); // ✅ this 是 app
```

但在 React 中是这样写的：

```React
<button onClick={this.fn1}>点我</button>
```

React 只是把 `this.fn1` 当作函数传给了事件系统，最终 React 在执行时其实就是：

```React
fn1(); // 而不是 this.fn1()
```

所以 `this` 丢失了。

==箭头函数没有自己的 this，它会“捕获”定义它的上下文的 this。==

所以当箭头函数是这样的时候：

```javascript
fn1 = () => {
  console.log(this.msg);
}
```

这个箭头函数的 `this` 会自动绑定到组件实例，无论它被怎么调用，都是绑定好的。



### this的上下文切换

在JS中`this`的上下文切换可以采用三个函数来完成：

- **call**
- **apply**
- **bind**

| 方法    | 作用                                  | 立即调用？ | 参数格式           |
| ------- | ------------------------------------- | ---------- | ------------------ |
| `call`  | 修改 this 后调用函数                  | ✅ 是       | 逗号分隔的参数列表 |
| `apply` | 修改 this 后调用函数                  | ✅ 是       | 参数数组           |
| `bind`  | 修改 this，**返回新函数，不立即调用** | ❌ 否       | 逗号分隔的参数列表 |

在React一般使用`bind`即可。





### 事件机制

在React的事件处理中，React并没有把事件绑定到具体的`dom`节点上，而是通过**事件代理**（也叫事件委托）的方式将所有的事件绑定到了React注册的根节点（React 17之前是Document）上，然后由统一的事件监听器（`dispatchEvent`)去监听事件的触发，这样的处理不仅减少了页面的注册事件数量、减少事件处理和回收带来的内存开销、抹平浏览器之间的事件差异，还能在组件挂载销毁时统一订阅和移除事件，达到了性能优化的目的。

React内部基于浏览器的事件机制实现了一套事件机制（`SyntheticEvent`，合成事件）。包括事件的注册、存储、合成及执行等。合成事件是浏览器原生事件的包装器。除兼容所有的浏览器外，它还拥有和浏览器原生事件相同的接口，包括`stopPropagation()`和`preventDefault()`。

React在内部维护了一个映射表(`listenerBank`)来记录事件与组件的事件处理函数的对应关系，当某个事件触发时，React根据当前的组件ID和事件类型到映射表中将事件分派给指定的事件处理函数。当一个组件挂载与卸载时，相应的事件处理函数会自动被添加到事件监听器的内部映射表中或从表中删除。

因为React是合成事件，是在事件冒泡阶段执行，所以会比JS原生事件对象慢

**代码：**

```react
import React from 'react';

class App extends React.Component {

    msg = 'Hello, React!';

    render() {
        return (
            <div onClick={() => {this.fn3()}}>
                <button onClick={this.fn1.bind(this)}>点击按钮</button>
                <button onClick={(e) => {this.fn2(e)}}>点击按钮</button>
                <a href="https://www.baidu.com/" onClick={(e) => {
                    this.fn4(e);
                }}>点我跳转百度</a>
            </div>
        )
    }
    
    fn1() {
        console.log('按钮fn1被点击了！', this.msg);
    }

    fn2(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('按钮fn2被点击了！', this.msg);
    }

    fn3() {
        console.log('fn3被点击了！', this.msg);
    }

    fn4(e) {
        e.preventDefault(); // 阻止默认行为
        console.log('fn4被点击了！', this.msg);
    }
}

export default App; // 导出App组件供其他文件使用
```



 
