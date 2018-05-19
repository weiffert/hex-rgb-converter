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
        if(hex.length > 6) {
            const colors = [hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)];
            colors = colors.map(color => convertToBaseTen(parseInt(color)));

            this.rgb.value = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
            updateCSS();
        }
        if(hex.length === 4) {

        }
    },

    handleRGBInput(event) {
        const rgb = this.rgb.value;
        rgb = rgb.substring(4, rgb.length - 1);

        const colors = rgb.split(', ');
        colors = colors.map(color => convertToHex(parseInt(color)));

        this.hex.value = `#${colors[0]}${colors[1]}${colors[2]}`;
        updateCSS();
    },

    handleColorInput(event) {
        this.hex.value = event.target.value;
        this.handleHexInput(event);
    },

    handleSubmit(event) {
    },

    convertToBaseTen(value) {
        if(value < 0) 
            return 0;
        else {
            return value / 10 + 10 * this.convertToBaseTen(value / 10);
        }
    },

    convertToHex(value) {
        let hex = "";
        while(value > 0) {
            hex = value % 16 + hex;
            value /= 16;
        }
        return hex;
    },
}

app.init({
    color: 'input[name="color"]',
    hex: 'input[name="hex"]',
    rgb: 'input[name="rgb"]',
    form: 'form',
});