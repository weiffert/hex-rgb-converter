const app = {
    init(selectors) {
        this.color = document.querySelector(selectors.color);
        this.hex = document.querySelector(selectors.hex);
        this.rgb = document.querySelector(selectors.rgb);
        this.form = document.querySelector(selectors.form);

        this.hex.addEventListener('keyup', event => {
            this.handleHexInput();
        });
        this.rgb.addEventListener('keyup', event => {
            this.handleRGBInput();
        });
        this.color.addEventListener('change', event => {
            this.handleColorInput();
        });
        this.form.addEventListener('submit', event => {
            event.preventDefault();
        });

        const random = [];
        for(let i = 0; i < 3; i++) {
            random.push(Math.floor(Math.random() * 256));
        }
        let rgb = `rgb(${random.join(',')})`;
        this.rgb.value = rgb;
        this.handleRGBInput();
    },

    handleHexInput() {
        let hex = this.hex.value;
        if (hex.charAt(0) === '#')
            hex = hex.substr(1);
        if (hex.length === 3) {
            hex = this.lengthenHexThreeCharacterCode(hex).substr(1);
        }
        if (hex.length === 6) {
            let colors = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)];
            colors = colors.map(color => this.convertToBaseTen(color));

            this.rgb.value = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
            this.color.value = '#' + hex;
            this.updateCSS(colors);
        }
    },

    lengthenHexThreeCharacterCode(hex) {
        if (hex.charAt(0) === '#')
            hex = hex.substr(1);
        if (hex.length === 3) {
            let colors = [hex.substr(0, 1), hex.substr(1, 1), hex.substr(2, 1)];
            colors = colors.map(color => color + color);
            hex = colors.join('');
            return "#" + hex;
        }
        return '#000000';
    },

    handleRGBInput() {
        const rgb = this.rgb.value;
        
        let colors = [''];
        for(let i = 0; i < rgb.length; i++) {
            if(rgb.charCodeAt(i) >= '0'.charCodeAt(0) && rgb.charCodeAt(i) <= '9'.charCodeAt(0)) {
                colors[colors.length - 1] += rgb.charAt(i);
            } else if(rgb.charAt(i) === ',') {
                colors.push('');
            }
        }

        if (colors.length === 3) {
            colors = colors.map(color => parseInt(color));
            hex = colors.map(color => {
                if (color >= 0 && color <= 255)
                    return this.convertToBaseHex(color);
                else
                    return undefined;
            });
 
            if(hex.indexOf(undefined) < 0) {
                hex = hex.map(color => {
                    color = color.toString();
                    while(color.length < 2)
                        color = '0' + color;
                    return color;
                });

                this.hex.value = '#' + hex.join('');
                this.color.value = this.hex.value;
                
                this.updateCSS(colors);
            }
        }
    },

    handleColorInput() {
        this.hex.value = this.color.value.toUpperCase();
        this.handleHexInput();
    },

    convertToBaseTen(value) {
        let ten = 0;
        value = value.toUpperCase();
        for (let i = 0; i < value.length; i++) {
            ten *= 16;
            if (value.charCodeAt(i) >= '0'.charCodeAt(0) && value.charCodeAt(i) <= '9'.charCodeAt(0)) {
                ten += (value.charCodeAt(i) - '0'.charCodeAt(0));
            }
            else if (value.charCodeAt(i) >= 'A'.charCodeAt(0) && value.charCodeAt(i) <= 'F'.charCodeAt(0)) {
                ten += (value.charCodeAt(i) - 'A'.charCodeAt(0) + 10);
            } else {
                console.error("Invalid character");
            }
        }
        return ten;
    },

    convertToBaseHex(value) {
        let hex = '';
        while (value >= 1) {
            const digit = value % 16;
            if (digit >= 10) {
                hex = (String.fromCharCode('A'.charCodeAt(0) + digit - 10)) + hex;
            } else {
                hex = digit.toString() + hex;
            }
            value = Math.floor(value / 16);
        }
        return hex;
    },

    updateCSS(colors) {
        const body = document.querySelector('body');
        body.style.backgroundColor = this.hex.value;

        let count = 0;
        colors.forEach(color => {
            if(color >= 90)
                count++;
        });

        body.classList.remove('black');
        body.classList.remove('white');
        body.classList.add(count >= 2 ? 'black' : 'white');
    },
}

app.init({
    color: 'input[name="color"]',
    hex: 'input[name="hex"]',
    rgb: 'input[name="rgb"]',
    form: 'form',
});