(this.webpackJsonpshop=this.webpackJsonpshop||[]).push([[0],{23:function(e,t,a){e.exports=a(36)},28:function(e,t,a){},30:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(19),l=a.n(r),i=(a(28),a(9)),s=a(10),o=a(12),m=a(11),u=a(4),h=a(13),d=a(20),b=a(6),v=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(o.a)(this,Object(m.a)(t).call(this))).state={cart:JSON.parse(localStorage.getItem("cart"))},e.sumPrice=e.sumPrice.bind(Object(u.a)(e)),e.back=e.back.bind(Object(u.a)(e)),e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"sumPrice",value:function(){var e=0,t=this.state.cart;if(t===[])alert("Chua mua gi!!");else for(var a=0;a<t.length;a++)e+=t[a].price;return e}},{key:"back",value:function(){window.location.href="#"}},{key:"render",value:function(){return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{className:"box-body"},n.a.createElement("table",{className:"table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Item"),n.a.createElement("th",null,"Price"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,this.state.cart.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.price))}))))))),n.a.createElement("div",{className:"col-md-12"},n.a.createElement("h3",null,"Total: ",this.sumPrice())),n.a.createElement("div",{className:"col-md-12"},n.a.createElement("button",{onClick:this.back},"Back")))}}]),t}(n.a.Component),E=(a(29),a(30),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(o.a)(this,Object(m.a)(t).call(this))).state={items:[{name:"book",price:3},{name:"clothes",price:5},{name:"hat",price:2},{name:"shoe",price:4},{name:"toy",price:6}],cart:[]},e.checkout=e.checkout.bind(Object(u.a)(e)),e.pick=e.pick.bind(Object(u.a)(e)),e.remove=e.remove.bind(Object(u.a)(e)),e.refresh=e.refresh.bind(Object(u.a)(e)),e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"refresh",value:function(){null!==localStorage.getItem("items")?this.setState({items:JSON.parse(localStorage.getItem("items"))}):this.setState({items:[]}),null!==localStorage.getItem("cart")?this.setState({cart:JSON.parse(localStorage.getItem("cart"))}):this.setState({cart:[]})}},{key:"checkout",value:function(){var e=this.state.items,t=this.state.cart;e!==[]&&localStorage.setItem("items",JSON.stringify(e)),t!==[]&&localStorage.setItem("cart",JSON.stringify(t)),window.location.href="#/checkout"}},{key:"pick",value:function(e,t){var a=this.state.cart,c=this.state.items;a.push(e),c.splice(c.indexOf(e),1),this.setState({item:c,cart:a})}},{key:"remove",value:function(e,t){var a=this.state.cart,c=this.state.items;c.push(e),a.splice(a.indexOf(e),1),this.setState({item:c,cart:a})}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("h2",null,"SHOP"),n.a.createElement("div",{className:"row"},this.state.items.map((function(t){return n.a.createElement("div",{className:"col-md-4"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h3",{className:"card-title"},"Item: ",t.name),n.a.createElement("h3",{className:"card-text"},"Price: ",t.price),n.a.createElement("button",{onClick:function(a){return e.pick(t,a)}},"Add"))))}))),n.a.createElement("h2",null,"CART"),n.a.createElement("div",{className:"row"},this.state.cart.map((function(t){return n.a.createElement("div",{className:"col-md-4"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h3",{className:"card-title"},"Item: ",t.name),n.a.createElement("h3",{className:"card-text"},"Price: ",t.price),n.a.createElement("button",{onClick:function(a){return e.remove(t,a)}},"Remove"))))}))),n.a.createElement(d.a,null,n.a.createElement(b.c,null,n.a.createElement(b.a,{path:"/checkout",component:v}))),n.a.createElement("button",{onClick:function(t){return e.checkout()}},"Checkout"))}}]),t}(n.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.51650890.chunk.js.map