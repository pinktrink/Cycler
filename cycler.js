function NumCycler(min, max, init){
    if(min === undefined){
        throw "NumCycler requires at least 1 argument.";
    }

    if(max === undefined){
        if(min === 0){
            throw "NumCycler requires a non-zero argument if it's called with only 1 argument.";
        }

        if(min < 0){
            max = 0;
        }else{
            max = min;
            min = 0;
        }
    }

    if(init === undefined){
        init = min;
    }

    if(init > max){
        init = max;
    }else if(init < min){
        init = min;
    }

    this.min = min;
    this.max = max;
    this.num = init;
}

NumCycler.prototype = {
    min : 0,
    max : 0,
    num : 0,
    up : function(amt){
        var range = ((this.max - this.min) + 1);

        if(amt === undefined){
            amt = 1;
        }

        if(amt < 0){
            return this.down(Math.abs(amt));
        }

        amt %= range;

        this.num += amt;

        if(this.num > this.max){
            this.num -= range;
        }

        return this.num;
    },
    dn : function(amt){
        var range = ((this.max - this.min) + 1);

        if(amt === undefined){
            amt = 1;
        }

        if(amt < 0){
            return this.up(Math.abs(amt));
        }

        amt %= range;

        this.num -= amt;

        if(this.num < this.min){
            this.num = this.max - ((this.min - this.num) - 1);
        }

        return this.num;
    },
    upIterable : function(amt){
        var ret = [this.num];

        for(var i; !~ret.indexOf(i = this.up(amt)); ret.push(i));

        return ret;
    },
    dnIterable : function(amt){
        var ret = [this.num];

        for(var i; !~ret.indexOf(i = this.dn(amt)); ret.push(i));

        return ret;
    },
    cycle : function(amt){
        var ret = this.num;

        if(amt === undefined){
            amt = 1;
        }

        if(amt > 0){
            this.up(amt);
        }else if(amt < 0){
            this.dn(amt);
        }

        return ret;
    }
};

function Cycler(arr){
    if(arr === undefined){
        throw "Cycler requires one argument."
    }

    if(!(arr.hasOwnProperty('length') && arr.splice === [].splice)){
        throw "Cycler requires an array-like to be passed."
    }

    this.arr = arr;

    this.cyc = new NumCycler(0, arr.length - 1);
}

Cycler.prototype = {
    arr : [],
    index : 0,
    cyc : {},
    up : function(amt){
        return this.arr[this.cyc.up(amt)];
    },
    dn : function(amt){
        return this.arr[this.cyc.dn(amt)];
    },
    upIterable : function(amt){
        var thisArr = this.arr;

        return this.cyc.upIterable(amt).map(function(i){
            return thisArr[i];
        });
    },
    dnIterable : function(amt){
        var thisArr = this.arr;

        return this.cyc.dnIterable(amt).map(function(i){
            return thisArr[i];
        });
    },
    cycle : function(amt){
        return this.arr[this.cyc.cycle(amt)];
    }
};
