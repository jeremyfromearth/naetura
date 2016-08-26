var UIBotId = 0;
function UIBot() {
    var bindId = 0;
    var bindings = [];
    var uibotId = ++UIBotId;
    
    function createUIElement(target, param, container) {
        if(!target.hasOwnProperty([param.name])) {
            console.log('UIBots Warning: target does not contain property: ', param.name);
        } else {
            input = null;
            type = typeof(target[param.name]); 
            switch(type) {
                case 'boolean':
                    input = createBooleanComponent(target, param, container);
                    break;
                case 'function':
                    input = createFunctionComponent(target, param, container);
                    break;
                case 'number':
                    input = createNumberComponent(target, param, container);
                    break;
                case 'string':
                    input = createStringComponent(target, param, container);
                    break;
            }
            
            if(input != null) {
                input.id = 'uibot-' + uibotId + '-' + param.name;
            }
        }
    }

    function createBooleanComponent(target, param, container) {
        var div = document.createElement('div');
        div.className = 'container';
        
        var label = document.createElement('div');
        label.className = 'label';
        label.innerHTML = param.label;

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = target[param.name];

        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);

        input.addEventListener('change', function(event) {
            target[param.name] = input.checked;
        });

        bindings.push(function() {
            input.checked = target[param.name];
        });

        return input;
    }

    function createFunctionComponent(target, param, container) {
        var div = document.createElement('div');
        div.className = 'container';
        
        var input = document.createElement('input');
        input.type = 'button';
        input.param = param;
        input.value = param.label;
        input.className = 'button';
        
        div.appendChild(input);
        container.appendChild(div);

        input.addEventListener('click', function() {
            var args = param.args || []
            target[param.name].apply(null, args);
        });

        return input;
    }

    function createNumberComponent(target, param, container) {
        if(param.hasOwnProperty('options')) {

        } else {
            param.step = param.step || 0.1;
            param.range = param.range || [0, 1.0];
            param.units = param.units || '';

            var div = document.createElement('div');
            div.className = 'container';

            var label = document.createElement('div');
            label.innerHTML = param.label + ':';
            label.className = 'label';

            var value = document.createElement('div');
            value.innerHTML = target[param.name] + ' ' + param.units;

            var rangeDiv = document.createElement('div');
            var input = document.createElement('input');
            input.type = 'range';
            input.min = param.range[0];
            input.max = param.range[1];
            input.step = param.step;
            input.value = target[param.name];
            input.param = param;

            var min = document.createElement('div');
            min.innerHTML = param.range[0];
            min.className = 'range-min';

            var max = document.createElement('div');
            max.innerHTML = param.range[1];
            max.className = 'range-max';

            rangeDiv.appendChild(min);
            rangeDiv.appendChild(input);
            rangeDiv.appendChild(max);

            div.appendChild(label);
            div.appendChild(value);
            div.appendChild(rangeDiv);
            container.appendChild(div);

            input.addEventListener('input', function(event) {
                target[param.name] = Number(input.value);
                value.innerHTML = target[param.name] + ' ' + param.units;
            });

            bindings.push(function() {
                input.value = target[param.name];
                value.innerHTML = target[param.name] + ' ' + param.units;
            });
        }
    }

    function createStringComponent(target, param, container) {
        if(param.hasOwnProperty('options')) {
            createSelectComponent(target, param, container);
        } else {
            var div = document.createElement('div');
            div.className = 'container';

            var label = document.createElement('div');
            label.className = 'label';
            label.innerHTML = param.label;

            var input = document.createElement('input');
            input.type = 'text';
            input.value = target[param.name];

            if(param.hasOwnProperty('max_length')) {
                input.maxLength = param.max_length;
            }

            div.appendChild(label);
            div.appendChild(input);
            container.appendChild(div);
            
            input.addEventListener('change', function(event) {
                target[param.name] = input.value;
            });

            var focus = false;
            input.addEventListener('focus', function(event) {
                focus = true;
            });

            input.addEventListener('blur', function(event) {
                focus = false;
            });

            bindings.push(function() {
                if(!focus) input.value = target[param.name];
            });

            return input;
        }
    }

    function createSelectComponent(target, param, container) {
        var div = document.createElement('div');
        div.className = 'container';

        var label = document.createElement('div');
        label.className = 'label';
        label.innerHTML = param.label;

        var select = document.createElement('select');
        for(var i = 0; i < param.options.length; i++) {
            var option = document.createElement('option');
            option.value = param.options[i];
            option.innerHTML = param.options[i];
            select.appendChild(option);
        }
        select.selectedIndex = param.options.indexOf(target[param.name]);

        div.appendChild(label);
        div.appendChild(select);
        container.appendChild(div);

        select.addEventListener('change', function(event) {
            target[param.name] = param.options[select.selectedIndex];
        })

        var focus = false;
        select.addEventListener('focus', function(event) {
            focus = true;
        });

        select.addEventListener('blur', function(event) {
            focus = false;
        });

        bindings.push(function() {
            if(!focus) {
                var index = param.options.indexOf(target[param.name]);
                select.selectedIndex = index;
            }
        });
    }

    function bind(interval) {
        bindId = setInterval(function() {
            for(var i = 0; i < bindings.length; i++) {
                bindings[i]();
            }
        }, interval || 500);
    }

    function unbind() {
        clearInterval(bindId);
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return {
        id : uibotId,
        bind : bind,
        build : function(target, params, container) {
            var container = container || document.createElement('div');
            container.className = 'uibot';
            container.id = 'uibot-' + uibotId + '-container';
            for(var name in params) {
                var param = params[name];
                if(name == 'defaults') {
                    for(var item in param) {
                        createUIElement(target, {label : toTitleCase(param[item]), name : param[item]}, container);
                    }
                } else {
                    param.name = name;
                    param.label = toTitleCase(param.label || name);
                    createUIElement(target, param, container);
                }
            }
        },
        unind : unbind
    }
}
