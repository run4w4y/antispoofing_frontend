(this.webpackJsonpantispoofing_frontend=this.webpackJsonpantispoofing_frontend||[]).push([[0],{29:function(e){e.exports=JSON.parse('{"webcam":{"bar":{"success_count":{"title":"Successful attempts: ","text":"{{success_count}} out of 5"},"face_score":{"target_face_text":"Target face","not_target_face_text":"Not target face - open the given image on another device"},"input_select":{"title":"Select input device: "},"mirror_toggle":{"title":"Mirror image: "}},"view":{"timer":{"title":"Time left: ","expired":"Time limit was reached. Try again later."},"success":{"text":"5 successful attempts were reached, here\'s your key: {{key}}","copy_button":"Copy to clipboard"}}}}')},30:function(e){e.exports=JSON.parse('{"webcam":{"bar":{"success_count":{"title":"\u0423\u0441\u043f\u0435\u0448\u043d\u044b\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0438: ","text":"{{success_count}} \u0438\u0437 5"},"face_score":{"target_face_text":"\u0426\u0435\u043b\u0435\u0432\u043e\u0435 \u043b\u0438\u0446\u043e","not_target_face_text":"\u041d\u0435\u0446\u0435\u043b\u0435\u0432\u043e\u0435 \u043b\u0438\u0446\u043e - \u043e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438, \u043d\u0430 \u0434\u0440\u0443\u0433\u043e\u043c \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435"},"input_select":{"title":"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u043c\u0435\u0440\u0443: "},"mirror_toggle":{"title":"\u041f\u0435\u0440\u0435\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435: "}},"view":{"timer":{"title":"\u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u0432\u0440\u0435\u043c\u0435\u043d\u0438: ","expired":"\u0412\u0440\u0435\u043c\u044f \u0432\u044b\u0448\u043b\u043e. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u043f\u043e\u0437\u0436\u0435."},"success":{"text":"\u0411\u044b\u043b\u043e \u0437\u0430\u0444\u0438\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043e 5 \u0443\u0441\u043f\u0435\u0448\u043d\u044b\u0445 \u043f\u043e\u043f\u044b\u0442\u043e\u043a, \u0432\u043e\u0442 \u0432\u0430\u0448 \u043a\u043b\u044e\u0447: {{key}}","copy_button":"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432 \u0431\u0443\u0444\u0435\u0440"}}}}')},35:function(e,t,c){},51:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),a=c(23),i=c.n(a),s=(c(35),c(17)),u=c(2),o=c(5),l=c.n(o),b=c(9),j=c(4),d=c(21),f=c(53),h=c(1),O=function(e){var t=Object(n.useState)(null),c=Object(j.a)(t,2),r=c[0],a=c[1],i=Object(n.useState)(null),s=Object(j.a)(i,2),u=s[0],o=s[1],O=Object(n.useState)(null),x=Object(j.a)(O,2),p=x[0],v=x[1],m=Object(n.useState)(!1),g=Object(j.a)(m,2),w=g[0],_=g[1],k=Object(n.useState)(0),S=Object(j.a)(k,2),y=S[0],N=S[1],T=Object(n.useState)(null),C=Object(j.a)(T,2),I=C[0],R=C[1],E=Object(n.useState)(null),D=Object(j.a)(E,2),L=D[0],P=D[1],J=Object(n.useState)(null),M=Object(j.a)(J,2),U=M[0],W=M[1],F=Object(n.useState)(0),B=Object(j.a)(F,2),H=B[0],V=B[1],q=Object(n.useRef)(null),z=Object(n.useRef)(null),A=Object(n.useRef)(null),G=Object(n.useRef)(null),K=Object(n.useRef)(null),Q=Object(n.useRef)(null),X=Object(f.a)("common"),Y=X.t,Z=(X.i18n,function(){var e=Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r&&r.getTracks().forEach((function(e){return e.stop()})),e.t0=a,e.next=4,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:null!==p&&void 0!==p?p:void 0}},audio:!1});case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),$=function(){var e=Object(b.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u){e.next=5;break}return e.next=3,navigator.mediaDevices.enumerateDevices();case 3:t=e.sent,o(t.filter((function(e){return"videoinput"===e.kind})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){$()}),[]),Object(n.useEffect)((function(){Z()}),[p]),Object(n.useEffect)((function(){var e;A.current.srcObject=r,null===(e=A.current)||void 0===e||e.play()}),[r]),Object(n.useEffect)((function(){H>=5&&e.callback&&e.callback()}),[H]),Object(n.useEffect)((function(){var t=A.current,c=G.current,n=c.getContext("2d"),r=Q.current.offsetWidth/t.videoWidth,a=function(){var e=K.current,c=e.getContext("2d"),n=600*(t.videoHeight/t.videoWidth);return e.width=600,e.height=n,c.drawImage(t,0,0,600,n),e.toDataURL("image/jpeg",1)};!function(){var e,a;c.width=t.videoWidth*r,c.height=t.videoHeight*r,(null===(e=q.current)||void 0===e?void 0:e.checked)&&n.scale(-1,1),n.drawImage(t,(null===(a=q.current)||void 0===a?void 0:a.checked)?-1*c.width:0,0,c.width,c.height)}(),function(){if(I){var e,t=c.width/600;n.strokeStyle=I.color,n.lineWidth=2,n.rect(I.left*t-((null===(e=q.current)||void 0===e?void 0:e.checked)?c.width:0),I.top*t,(I.right-I.left)*t,(I.bottom-I.top)*t),n.stroke()}}();var i=function(){var t=Object(b.a)(l.a.mark((function t(){var c,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.submitImage(a(),e.faceID);case 2:c=t.sent,n=c.spoofing<.3&&c.face_score<.7,R(Object(d.a)(Object(d.a)({},c.bbox),{},{color:n?"green":"blue"})),W(c.face_score),P(c.spoofing),n&&V((function(e){return e+1}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();e.submitImage&&y%15===0&&i();var s=setTimeout((function(){return N((function(e){return e+1}))}),100);return function(){return clearTimeout(s)}}),[y]),Object(h.jsxs)("div",{children:[Object(h.jsx)("video",{autoPlay:!0,className:"hidden",ref:A,muted:!0}),Object(h.jsxs)("div",{className:"grid grid-cols-2",children:[Object(h.jsx)("div",{ref:Q,className:"col-span-2 lg:col-span-1",children:Object(h.jsx)("canvas",{ref:G})}),Object(h.jsx)("div",{className:"col-span-2 lg:col-span-1 w-50 p-6 bg-gray-100",children:Object(h.jsxs)("ul",{children:[Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Y("webcam.bar.success_count.title")}),Y("webcam.bar.success_count.text",{success_count:H})]}),Object(h.jsx)("li",{children:!U||U>.7?Object(h.jsxs)("b",{children:[" ",Y("webcam.bar.face_score.not_target_face_text")," "]}):Object(h.jsxs)("b",{children:[" ",Y("webcam.bar.face_score.target_face_text")," "]})}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:"spoofing:"})," ",L]}),Object(h.jsx)("li",{children:Object(h.jsxs)("label",{children:[Object(h.jsx)("b",{children:Y("webcam.bar.input_select.title")}),Object(h.jsx)("br",{}),Object(h.jsx)("select",{ref:z,onChange:function(e){return v(e.target.value)},children:null===u||void 0===u?void 0:u.map((function(e){return Object(h.jsxs)("option",{value:e.deviceId,children:[" ",e.label||"Camera ".concat(e.deviceId)," "]})}))})]})}),Object(h.jsx)("li",{children:Object(h.jsxs)("label",{className:"flex items-center",children:[Object(h.jsx)("b",{className:"pr-2 flex-col",children:Y("webcam.bar.mirror_toggle.title")}),Object(h.jsx)("input",{className:"flex-col",type:"checkbox",ref:q,checked:w,onChange:function(e){_(e.target.checked)}})]})}),Object(h.jsx)("li",{children:e.children}),Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:function(){return V((function(e){return e+1}))},children:" Success button "})})]})})]}),Object(h.jsx)("canvas",{ref:K,className:"hidden"})]})},x=function(e){var t,c=Object(n.useState)(null!==(t=e.seconds)&&void 0!==t?t:120),r=Object(j.a)(c,2),a=r[0],i=r[1];return Object(n.useEffect)((function(){if(!(a<=0)){var t=setTimeout((function(){return i((function(e){return e-1}))}),1e3);return function(){return clearTimeout(t)}}e.callback&&e.callback()}),[a]),Object(h.jsxs)("div",{children:[Object(h.jsxs)("span",{children:[" ",Math.floor(a/60).toString().padStart(2,"0")," "]}),":",Object(h.jsxs)("span",{children:[" ",Math.floor(a%60).toString().padStart(2,"0")," "]})]})},p=function(){var e=Object(b.a)(l.a.mark((function e(t,c){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.split(",")[1],e.abrupt("return",fetch("https://toloka.suricatvision.com:8443/predictions/biometric",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(JSON.stringify({image:n,id:c}))}).then((function(e){return e.json()})).catch((function(e){return null})));case 2:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}();function v(){var e=Object(u.f)(),t=new URLSearchParams(e.search).get("key"),c=new URLSearchParams(e.search).get("language"),r=new URLSearchParams(e.search).get("faceid"),a=Object(n.useState)(!1),i=Object(j.a)(a,2),s=i[0],o=i[1],d=Object(n.useState)(!1),v=Object(j.a)(d,2),m=v[0],g=v[1],w=Object(f.a)("common"),_=w.t,k=w.i18n;if(Object(n.useEffect)((function(){k.changeLanguage(null!==c&&void 0!==c?c:"en")}),[]),!r||!t)return Object(h.jsx)("div",{});if(s)return Object(h.jsx)("div",{children:_("webcam.view.timer.expired")});if(m){var S=btoa(atob(t)+"|>*<|aaaaa");return Object(h.jsxs)("div",{children:[_("webcam.view.success.text",{key:S}),Object(h.jsx)("button",{className:"pl-2 underline text-gray-600",onClick:Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText(S);case 2:case"end":return e.stop()}}),e)}))),children:_("webcam.view.success.copy_button")})]})}return Object(h.jsx)("div",{children:Object(h.jsx)(O,{callback:function(){return g(!0)},faceID:r,submitImage:p,children:Object(h.jsxs)("div",{children:[Object(h.jsx)("b",{children:_("webcam.view.timer.title")}),Object(h.jsx)("br",{}),Object(h.jsx)(x,{seconds:900,callback:function(){return o(!0)}})]})})})}var m=function(){return Object(h.jsx)(s.a,{children:Object(h.jsx)(u.c,{children:Object(h.jsxs)(u.a,{path:"/",children:[" ",Object(h.jsx)(v,{})," "]})})})},g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,54)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),r(e),a(e),i(e)}))},w=c(20),_=c(52),k=c(29),S=c(30);w.a.init({interpolation:{escapeValue:!1},lng:"en",resources:{en:{common:k},ru:{common:S}}}),i.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(_.a,{i18n:w.a,children:Object(h.jsx)(m,{})})}),document.getElementById("root")),g()}},[[51,1,2]]]);
//# sourceMappingURL=main.9b0bf741.chunk.js.map