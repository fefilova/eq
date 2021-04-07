// function generateRandomNumber(min, max) {
//     return Math.random() * (max - min) + min;
// };

generateRandomNumber();
document.querySelector('.eq_selector').addEventListener('change', function () {
    const n = this.value;
    switch (n) {
        case 'Normal': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach(el => {
                el.value = 0;
                el.dispatchEvent(new Event('change'));
            })
            break;
        }
        case 'Acoustics': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach((el, i) => {
                switch (i) {
                    case 0: {
                        el.value = 0
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
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
                    case 3: {
                        el.value = 0
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 4: {
                        el.value = 0
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 5: {
                        el.value = 0
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 6: {
                        el.value = 0
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 7: {
                        el.value = 0
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
            break;
        }
        case 'FullBass': {
            const a = document.querySelector('.eq-wrap')
            a.childNodes.forEach((el, i) => {
                switch (i) {
                    case 0: {
                        el.value = 10
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 1: {
                        el.value = 10
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 2: {
                        el.value = 7
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 3: {
                        el.value = 4
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 4: {
                        el.value = 2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 5: {
                        el.value = 2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 6: {
                        el.value = -2
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 7: {
                        el.value = -4
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 8: {
                        el.value = -7
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                    case 9: {
                        el.value = -10
                        el.dispatchEvent(new Event('change'));
                        break;
                    }
                }
            })
            break;
        }

        // case 'Рандом': {
        //     const a = document.querySelector('.eq-wrap')
        //     a.childNodes.forEach(el => {
        //         el.value = generateRandomNumber(-16, 16);
        //         el.dispatchEvent(new Event('change'));
        //     })
        //     break;
        // }
    }
})