const keyLayout = [
    {but: 'ё', keyCode:192,code:'Backquote'},{but: '1', keyCode:49,code:'Digit1'},{but: '2', keyCode:50,code:'Digit2'},
    {but: '3', keyCode:51,code:'Digit3'},{but: '4', keyCode:52,code:'Digit4'},{but: '5', keyCode:53,code:'Digit5'},{but: '6', keyCode:54,code:'Digit6'},
    {but: '7', keyCode:55,code:'Digit7'},{but: '8', keyCode:56,code:'Digit8'},{but: '9', keyCode:57,code:'Digit9'},{but: '0', keyCode:48,code:'Digit0'},
    {but: '-', keyCode:189,code:'Minus'},{but: '=', keyCode:187,code:'Equal'},{but: 'Backspace', keyCode:8,code:'Backspace'},{but: 'Tab', keyCode:9,code:'Tab'},
    {but: 'й', keyCode:81,code:'KeyQ'},{but: 'ц', keyCode:87,code:'KeyW'},{but: 'у', keyCode:69,code:'KeyE'},{but: 'к', keyCode:82,code:'KeyR'},
    {but: 'е', keyCode:84,code:'KeyT'},{but: 'н', keyCode:89,code:'KeyY'},{but: 'г', keyCode:85,code:'KeyU'},
    {but: 'ш', keyCode:73,code:'KeyI'},{but: 'щ', keyCode:79,code:'KeyO'},{but: 'з', keyCode:80,code:'KeyP'},{but: 'х', keyCode:219,code:'BracketLeft'},
    {but: 'ъ', keyCode:221,code:'BracketRight'},{but: '\\', keyCode:220,code:'Backslash'},{but: 'Del', keyCode:46,code:'Delete'},
    {but: 'CapsLock', keyCode:20,code:'CapsLock'},{but: 'ф', keyCode:65,code:'KeyA'},{but: 'ы', keyCode:83,code:'KeyS'},{but: 'в', keyCode:68,code:'KeyD'},
    {but: 'а', keyCode:70,code:'KeyF'},{but: 'п', keyCode:71,code:'KeyG'},{but: 'р', keyCode:72,code:'KeyH'},
    {but: 'о', keyCode:74,code:'KeyJ'},{but: 'л', keyCode:75,code:'KeyK'},{but: 'д', keyCode:76,code:'KeyL'},{but: 'ж', keyCode:186,code:'Semicolon'},{but: 'э', keyCode:222,code:'Quote'},
    {but: 'Enter', keyCode:13,code:'Enter'},{but: 'Shift', keyCode:16,code:'ShiftLeft'},
    {but: 'я', keyCode:90,code:'KeyZ'},{but: 'ч', keyCode:88,code:'KeyX'},{but: 'с', keyCode:67,code:'KeyC'},{but: 'м', keyCode:86,code:'KeyV'},{but: 'и', keyCode:66,code:'KeyB'},
    {but: 'т', keyCode:78,code:'KeyN'},{but: 'ь', keyCode:77,code:'KeyM'},{but: 'б', keyCode:188,code:'Comma'},
    {but: 'ю', keyCode:190,code:'Period'},{but: '.', keyCode:191,code:'Slash'},{but: '▲', keyCode:38,code:'ArrowUp'},{but: 'Shift', keyCode:16,code:'ShiftRight'},
    {but: 'Ctrl', keyCode:17,code:'ControlLeft'},{but: 'Win', keyCode:91,code:'MetaLeft'},{but: 'Alt', keyCode:18,code:'AltLeft'},
    {but: 'space', keyCode:32,code:'Space'},{but: 'Alt', keyCode:18,code:'AltRight'},{but: '◄', keyCode:37,code:'ArrowLeft'},{but: '▼', keyCode:40,code:'ArrowDown'},
    {but: '►', keyCode:39,code:'ArrowRight'},{but: 'Ctrl', keyCode:17,code:'ControlRight'}
];
const Keyboard = {
    
    elements:{
        main: null,
        keysContainer: null,
        keys: []
    },

    evenstHandlers:{
        oninput:null,
    },

    properties:{
        value:'',
        capsLock:false
    },

    init() {
        this.elements.textarea = document.createElement('textarea');
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');
        this.elements.wrap = document.createElement('div');
        this.elements.wrap.className = 'wrapper';
        this.elements.main.className = 'keyboard';
        this.elements.textarea.className = 'use-keyboard-input';
        this.elements.keysContainer.className = 'keyboard__keys';
        this.elements.main.prepend(this.elements.keysContainer);
        document.body.prepend(this.elements.wrap);
        this.elements.wrap.append(this.elements.main);
        this.elements.wrap.prepend(this.elements.textarea);
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
     
        document.querySelectorAll('.use-keyboard-input').forEach(element=>{
            element.addEventListener('focus',()=>{
                this.open(element.value, currentValue=>{
                    element.value = currentValue;
                });
                
            });
        });
    },

    _createKeys() {
        const fragment = document.createElement('div');
        // const keyLayoutEng = [
        //     '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        //     'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
        //     'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'ENTER',
        //     'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'top', 'Shift',
        //     'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'left', 'bottom', 'right', 'Ctrl'
        // ];
        const createIconHtml = (icon_name)=>{
            return `<i class='material-icons'>${icon_name}</i>`;
        };
        for(let key in keyLayout){
            const keyElement = document.createElement('button');
            const insertLineBreak = ['Backspace', 'Delete', 'Enter','ShiftRight'].indexOf(keyLayout[key].code) !== -1;

            keyElement.setAttribute('type','button');
            keyElement.className = 'keyboard__key';
            window.addEventListener('keydown',(e)=>{
                if(e.keyCode == keyLayout[key].keyCode && e.code ==keyLayout[key].code){
                    keyElement.classList.toggle('keyboard__key--dark');
                }
               
            });
            window.addEventListener('keyup',(e)=>{
                if(e.keyCode == keyLayout[key].keyCode && e.code ==keyLayout[key].code){
                    keyElement.classList.toggle('keyboard__key--dark');
                }
               
            });
            switch(keyLayout[key].but){
            case 'Backspace':
                keyElement.classList.add('keyboard__key--extra__wide');
                keyElement.textContent = keyLayout[key].but;
                keyElement.addEventListener('click',()=>{
                    this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
                    this._triggerEvent('oninput');
                });
                break;

            case 'CapsLock':
                keyElement.classList.add('keyboard__key--extra__wide', 'keyboard__key--activatable');
                keyElement.textContent = keyLayout[key].but;
                keyElement.addEventListener('click',()=>{
                    this._toggleCapsLock();
                    keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                    
                });
                window.addEventListener('keydown',(e)=>{
                    if(e.keyCode == keyLayout[key].keyCode && e.code == keyLayout[key].code){
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                    }
                   
                });
                break;
            case 'Enter':
                keyElement.textContent = keyLayout[key].but;
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click',()=>{
                    this.properties.value += '\n';
                    this._triggerEvent('oninput');
                });
                break;
            case '◄':
                keyElement.textContent = keyLayout[key].but.toLowerCase();
                break;
            case '▲':
                keyElement.textContent = keyLayout[key].but.toLowerCase();
                break;
            case '▼':
                keyElement.textContent = keyLayout[key].but.toLowerCase();
                break;
            case '►':
                keyElement.textContent = keyLayout[key].but.toLowerCase();
                break;
            case 'Alt':
                keyElement.textContent = keyLayout[key].but;
                break;
            case 'Ctrl':
                keyElement.textContent = keyLayout[key].but;
                break;
            case 'Del':
                keyElement.textContent = keyLayout[key].but;
                break;
            case 'Win':
                keyElement.textContent = keyLayout[key].but;
                break;
            case 'Tab':
                keyElement.textContent = keyLayout[key].but;
                keyElement.addEventListener('click',()=>{
                    this.properties.value += '  ';
                    this._triggerEvent('oninput');
                });
                break;
            case 'Shift':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.textContent = keyLayout[key].but; 
                keyElement.addEventListener('mousedown',()=>{
                    keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                    this._toggleCapsLock();
                });
                window.addEventListener('keydown',(e)=>{
                    if(e.keyCode == keyLayout[key].keyCode && e.code == keyLayout[key].code ){
                        keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                        this._toggleCapsLock();
                    }
                   
                });
                window.addEventListener('keyup',(e)=>{
                    if(e.keyCode == keyLayout[key].keyCode && e.code == keyLayout[key].code){
                        keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                        this._toggleCapsLock();
                    }
                   
                });
                keyElement.addEventListener('mouseup',()=>{
                    keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock);
                    this._toggleCapsLock();
                });
                break;
            case 'space':
                keyElement.classList.add('keyboard__key--space','keyboard__key');
                keyElement.innerHTML = createIconHtml('space_bar');
                keyElement.addEventListener('click',()=>{
                    this.properties.value += ' ';
                    this._triggerEvent('oninput');
                });
                break;
            default:
                keyElement.textContent = keyLayout[key].but.toLowerCase();
                keyElement.addEventListener('click',()=>{
                    this.properties.value += this.properties.capsLock ? keyLayout[key].but.toUpperCase() : keyLayout[key].but.toLowerCase(); 
                    this._triggerEvent('oninput');
                });
    
                break;

            }
            fragment.appendChild(keyElement);
            if(insertLineBreak){
                fragment.appendChild(document.createElement('br'));
            }
        }
        return fragment;
    },
    _triggerEvent(handlerName) {
        if(typeof(this.evenstHandlers[handlerName]) == 'function'){
            this.evenstHandlers[handlerName](this.properties.value);
        }
        
    },
    
    _toggleCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;
        for(const key of this.elements.keys){
            if(key.childElementCount === 0 && key.innerHTML!='Tab' && key.innerHTML!='Shift'&& key.innerHTML!='Del'&& key.innerHTML!='Alt'&& key.innerHTML!='Ctrl'&& key.innerHTML!='Win'&& key.innerHTML!='CapsLock'&& key.innerHTML!='Enter'&& key.innerHTML!='Backspace'){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(nitialValue, oninput, onclose) {
        this.properties.value = nitialValue || '';
        this.evenstHandlers.oninput = oninput;
        this.evenstHandlers.onclose = onclose;

    },
};

window.onload = function(){
    Keyboard.init();

};