function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

generateRandomNumber();
document.querySelector('.eq_selector').addEventListener('change', function () {
    const n = this.value;
    switch (n) {
        case 'Баланс': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach(el => {
                el.value = 0;
                el.dispatchEvent(new Event('change'));
            })
            break;
        }
        case 'Акустика': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach((el, i) => {
                switch (i) {
                    case 1: {
                        el.value = 1
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 2: {
                        el.value = 2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 8: {
                        el.value = 2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 9: {
                        el.value = 2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                }
            })
        }
        
        case 'Рандом': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach(el => {
                el.value = generateRandomNumber(-16, 16);
                el.dispatchEvent(new Event('change'));
            })
            break;
        }
    }
})