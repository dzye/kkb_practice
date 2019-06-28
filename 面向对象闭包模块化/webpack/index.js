import * as mod1 from './mod1'
import("./mod2").then(val => {
    alert(val);
});
alert(mod1.a);