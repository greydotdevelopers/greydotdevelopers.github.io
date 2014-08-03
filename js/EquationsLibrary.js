var equationsLibrary=(function(){
    var g = 9.8;
    var G = 6.67 * Math.pow(10,-7);
    return {
        period1: function(vars, values, solveFor){//T = 2 * PI * sqrt(m/k)
            var T = parseFloat(values[findVariable(vars, "T")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var k = parseFloat(values[findVariable(vars, "k")]);
            var ans;
            switch(solveFor){
                case "T":
                    ans = 2 * Math.PI * Math.sqrt(m/k);
                    break;
                case "m":
                    ans = k * Math.pow((T/2*Math.PI),2);
                    break;
                case "k":
                    ans = m/(Math.pow((T/2*Math.PI),2));
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        period2: function(vars, values, solveFor){//T = 2 * PI * sqrt(l/g)
            var T = parseFloat(values[findVariable(vars, "T")]);
            var l = parseFloat(values[findVariable(vars, "l")]);
            var ans;
            switch(solveFor){
                case "T":
                    ans = 2 * Math.PI * Math.sqrt(l/g);
                    break;
                case "l":
                    ans = g * Math.pow((T/2*Math.PI),2);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        period3: function(vars, values, solveFor){//T = 1/f
            var T = parseFloat(values[findVariable(vars, "T")]);
            var f = parseFloat(values[findVariable(vars, "f")]);
            var ans;
            switch(solveFor){
                case "T":
                    ans = (1/f);
                case "f":
                    ans = (1/T);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        gravity1: function(vars, values, solveFor){//Fg = (-Gm1m2)/r^2
            var Fg = parseFloat(values[findVariable(vars, "Fg")]);
            var m1 = parseFloat(values[findVariable(vars, "m1")]);
            var m2 = parseFloat(values[findVariable(vars, "m2")]);
            var r = parseFloat(values[findVariable(vars, "r")]);
            var ans;
            switch(solveFor){
                case "Fg":
                    ans = (-1 * G * m1 * m2)/Math.pow(r,2);
                    break;
                case "m1":
                    ans = (-1 * Fg * Math.pow(r,2))/(G * m2);
                    break;
                case "m2":
                    ans = (-1 * Fg * Math.pow(r,2))/(m1 * G);
                    break;
                case "r":
                    ans = -1 * Math.sqrt((G*m1*m2)/Fg);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        gravity2: function(vars, values, solveFor){//Ug = (-Gm1m2)/r
            var Ug = parseFloat(values[findVariable(vars, "Ug")]);
            var m1 = parseFloat(values[findVariable(vars, "m1")]);
            var m2 = parseFloat(values[findVariable(vars, "m2")]);
            var r = parseFloat(values[findVariable(vars, "r")]);
            var ans;
            switch(solveFor){
                case "Ug":
                    ans = (-1 * G * m1 * m2)/r;
                    break;
                case "m1":
                    ans = (-1 * Ug * r)/(G * m2);
                    break;
                case "m2":
                    ans = (-1 * Ug * r)/(m1 * G);
                    break;
                case "r":
                    ans = (-Ug * r)/(G * m1);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        power1: function(vars, values, solveFor){//P = W/t
            var P = parseFloat(values[findVariable(vars, "P")]);
            var W = parseFloat(values[findVariable(vars, "W")]);
            var t = parseFloat(values[findVariable(vars, "t")]);
            var ans;
            switch(solveFor){
                case "P":
                    ans = W/t;
                    break;
                case "W":
                    ans = P * t;
                    break;
                case "t":
                    ans = W/P;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        power2: function(vars, values, solveFor){//P = Fvcos(theta)
            var P = parseFloat(values[findVariable(vars, "P")]);
            var F = parseFloat(values[findVariable(vars, "F")]);
            var v = parseFloat(values[findVariable(vars, "v")]);
            var theta = parseFloat(values[findVariable(vars, "theta")]);
            var ans;
            switch(solveFor){
                case "P":
                    ans = F * v * (Math.cos(theta * (Math.PI/180)));
                    break;
                case "F":
                    ans = P/(v * (Math.cos(theta * (Math.PI/180))));
                    break;
                case "v":
                    ans = P/(F * (Math.cos(theta * (Math.PI/180))));
                    break;
                case "theta":
                    ans = Math.acos(P/(F*v))* (180/Math.PI);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        spring1: function(vars, values, solveFor){//Fs = -kd
            var Fs = parseFloat(values[findVariable(vars, "Fs")]);
            var k = parseFloat(values[findVariable(vars, "k")]);
            var d = parseFloat(values[findVariable(vars, "d")]);
            var ans;
            switch(solveFor){
                case "Fs":
                    ans = -1 * k * d;
                    break;
                case "k":
                    ans = (-1 * Fs)/d;
                    break;
                case "d":
                    ans = (-1 * Fs)/k;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        spring2: function(vars, values, solveFor){//Us = 1/2kd^2
            var Us = parseFloat(values[findVariable(vars, "Us")]);
            var k = parseFloat(values[findVariable(vars, "k")]);
            var d = parseFloat(values[findVariable(vars, "d")]);
            var ans;
            switch(solveFor){
                case "Us":
                    ans = .5 * k * Math.pow(d,2);
                    break;
                case "k":
                    ans = (2 * Us)/Math.pow(d,2);
                    break;
                case "d":
                    ans = Math.sqrt((2 * Us)/k);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        cenAccel: function(vars, values, solveFor){//ac = v^2/r
            var ac = parseFloat(values[findVariable(vars, "ac")]);
            var v = parseFloat(values[findVariable(vars, "v")]);
            var r = parseFloat(values[findVariable(vars, "r")]);
            var ans;
            switch(solveFor){
                case "ac":
                    ans = v * v / r;
                    break;
                case "v":
                    ans = Math.sqrt(ac * r);
                    break;
                case "r":
                    ans = ac / (v * v);
                    break;
            }
            ans = roundDecimal(ans, 3);
            return ans;
        },
        Newton2Law2: function(vars, values, solveFor){//Fc = m(ac)
            var Fc = parseFloat(values[findVariable(vars, "Fc")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var ac = parseFloat(values[findVariable(vars, "ac")]);
            var ans;
            switch(solveFor){
                case "Fc":
                    ans = m * ac;
                    break;
                case "m":
                    ans = Fc / ac;
                    break;
                case "ac":
                    ans = Fc / m;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        momentum1: function(vars, values, solveFor){//p = mv
            var p = parseFloat(values[findVariable(vars, "p")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var v = parseFloat(values[findVariable(vars, "v")]);
            var ans;
            switch(solveFor){
                case "p":
                    ans = m * v;
                    break;
                case "m":
                    ans = p / v;
                    break;
                case "v":
                    ans = p / m;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        momentum2: function(vars, values, solveFor){//J = Ft
            var J = parseFloat(values[findVariable(vars, "J")]);
            var F = parseFloat(values[findVariable(vars, "F")]);
            var t = parseFloat(values[findVariable(vars, "t")]);
            var ans;
            switch(solveFor){
                case "J":
                    ans = F * t;
                    break;
                case "F":
                    ans = J / t;
                    break;
                case "t":
                    ans = J / F;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        kinetic1: function(vars, values, solveFor){//K = 1/2 mv^2
            var K = parseFloat(values[findVariable(vars, "K")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var v = parseFloat(values[findVariable(vars, "v")]);
            var ans;
            switch(solveFor){
                case "K":
                    ans = 0.5 * m * v * v;
                    break;
                case "m":
                    ans = 2 * K / (v * v);
                    break;
                case "v":
                    ans = Math.sqrt(2 * K / m);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        gravPotential: function(vars, values, solveFor){//Ug = mgh
            var Ug = parseFloat(values[findVariable(vars, "Ug")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var h = parseFloat(values[findVariable(vars, "h")]);
            var ans;
            switch(solveFor){
                case "Ug":
                    ans = m*g*h;
                    break;
                case "m":
                    ans = Ug / (g*h);
                    break;
                case "h":
                    ans = Ug / (m*g);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        work1: function(vars, values, solveFor){//W = Fd cos(theta)
            var W = parseFloat(values[findVariable(vars, "W")]);
            var F = parseFloat(values[findVariable(vars, "F")]);
            var d = parseFloat(values[findVariable(vars, "d")]);
            var theta = parseFloat(values[findVariable(vars, "theta")]);
            var ans;
            switch(solveFor){
                case "W":
                    ans = F * d * Math.cos(theta * Math.PI / 180);
                    break;
                case "F":
                    ans = W / (d * Math.cos(theta * Math.PI / 180));
                    break;
                case "d":
                    ans = W / (F * Math.cos(theta * Math.PI / 180));
                    break;
                case "theta":
                    ans = Math.acos(W / (F*d));
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        work2: function(vars, values, solveFor){//W = Fd
            var W = parseFloat(values[findVariable(vars, "W")]);
            var F = parseFloat(values[findVariable(vars, "F")]);
            var d = parseFloat(values[findVariable(vars, "d")]);
            var ans;
            switch(solveFor){
                case "W":
                    ans = F * d;
                    break;
                case "F":
                    ans = W / d;
                    break;
                case "d":
                    ans = W / F;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        kinematics1: function(vars, values, solveFor){//v = vo + at
            var v = parseFloat(values[findVariable(vars, "v")]);
            var vo = parseFloat(values[findVariable(vars, "vo")]);
            var a = parseFloat(values[findVariable(vars, "a")]);
            var t= parseFloat(values[findVariable(vars, "t")]);
            var ans;
            switch(solveFor){  //What we are solving for
                case "v":
                    ans = ((a * t) + vo);
                    break;
                case "vo":
                    ans = (v - a * t);
                    break;
                case "a":
                    ans = ((v - vo)/t);
                    break;
                case "t":
                    ans = (v - vo)/a;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        kinematics2: function(vars, values, solveFor){//x = xo + vot + 1/2at^2
            var x = parseFloat(values[findVariable(vars, "x")]);
            var xo = parseFloat(values[findVariable(vars, "xo")]);
            var a = parseFloat(values[findVariable(vars, "a")]);
            var t= parseFloat(values[findVariable(vars, "t")]);
            var vo= parseFloat(values[findVariable(vars, "vo")]);
            var ans;
            switch(solveFor){
                case "x":
                    ans = (xo + vo * t + (1/2 * a * t * t));
                    break;
                case "xo":
                    ans = (x - vo * t - (1/2 * a * t * t));
                    break;
                case "a":
                    ans = (2 * ((x - xo - vo * t)/(t * t)));
                    break;
                case "vo":
                    ans = ((x - xo - (1/2 * a * t * t))/t);
                    break;
                case "t":
                    ans = ((-vo + Math.sqrt(vo * vo - 2 * a * (xo-x)))/a);
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        kinematics3: function(vars, values, solveFor){//v^2 = vo^2 + 2a(x-xo)
            var v = parseFloat(values[findVariable(vars, "v")]);
            var vo = parseFloat(values[findVariable(vars, "vo")]);
            var a = parseFloat(values[findVariable(vars, "a")]);
            var x= parseFloat(values[findVariable(vars, "x")]);
            var xo= parseFloat(values[findVariable(vars, "xo")]);
            var ans;
            switch(solveFor){
                case "v":
                    ans = (Math.sqrt(vo * vo + 2 * a * (x - xo)));
                    break;
                case "vo":
                    ans = (Math.sqrt(v * v - 2 * a * (x - xo)));
                    break;
                case "a":
                    ans = ((v * v - vo * vo)/(2 * (x - xo)));
                    break;
                case "x":
                    ans = (((v * v - vo * vo)/(2 * a)) + xo);
                    break;
                case "xo":
                    ans = (x - ((v * v - vo * vo)/(2 * a)));
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        kinematics4: function(vars, values, solveFor){//v^2 = vo^2 + 2ad
            var v = parseFloat(values[findVariable(vars, "v")]);
            var vo = parseFloat(values[findVariable(vars, "vo")]);
            var a = parseFloat(values[findVariable(vars, "a")]);
            var d = parseFloat(values[findVariable(vars, "d")]);
            var ans;
            switch(solveFor){
                case "v":
                    ans = (Math.sqrt(vo * vo + 2 * a * d));
                    break;
                case "vo":
                    ans = (Math.sqrt(v * v - 2 * a * d));
                    break;
                case "a":
                    ans = ((v * v - vo * vo)/(2 * d));
                    break;
                case "d":
                    ans = ((v * v - vo * vo)/(2 * a));
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        },
        Newton2Law: function(vars, values, solveFor){//F = ma
            var F = parseFloat(values[findVariable(vars, "F")]);
            var m = parseFloat(values[findVariable(vars, "m")]);
            var a = parseFloat(values[findVariable(vars, "a")]);
            var ans;
            switch(solveFor){
                case "F":
                    ans = m * a;
                    break;
                case "m":
                    ans = F / a;
                    break;
                case "a":
                    ans = F/m;
                    break;
            }
            //ans = roundDecimal(ans, 3);
            return ans;
        }
    };
}())