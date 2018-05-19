const app = {
    init(selectors) {
        this.color = document.querySelector(selectors.color);
        this.hex = document.querySelector(selectors.hex);
        this.rgb = document.querySelector(selectors.rgb);
        this.form = document.querySelector(selectors.form);

        this.hex.addEventListener('keyup', event => {
            this.handleHexInput(event);
        });
        this.rgb.addEventListener('keyup', event => {
            this.handleRGBInput(event);
        });
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.handleSubmit(event);
        });
        this.color.addEventListener('change', event => {
            this.handleColorInput(event);
        });
    },

    handleHexInput(event) {
        const hex = this.hex.value;
        if (hex.length === 7) {
            let colors = [hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)];
            colors = colors.map(color => this.convertToBaseTen(color));

            this.rgb.value = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
            this.updateCSS();
        }
        if (hex.length === 4) {

        }
    },

    handleRGBInput(event) {
        const rgb = this.rgb.value
            .substring(4);

        let colors = rgb.split(',');
        colors = colors.map(color => color.trim());

        console.log(rgb);
        console.log(colors);

        if (colors.length === 3) {
            colors = colors.map(color => {
                let num = parseInt(color);
                if (num >= 0 && num <= 255)
                    return this.convertToHex(num);
                else
                    return undefined;
            });
            if(!colors.contains(undefined))
                this.updateCSS();
        }
    },

    handleColorInput(event) {
        this.hex.value = event.target.value;
        this.handleHexInput(event);
    },

    handleSubmit(event) {
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

    convertToHex(value) {
        let hex = "";
        while (value > 0) {
            const digit = value % 16 + hex;
            if (digit >= 10) {
                hex += ('A' + digit - 10);
            } else {
                hex += digit.toString();
            }
            value /= 16;
        }
        return hex;
    },

    updateCSS() {

    },
}

app.init({
    color: 'input[name="color"]',
    hex: 'input[name="hex"]',
    rgb: 'input[name="rgb"]',
    form: 'form',
});