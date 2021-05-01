/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
namespace MicroEncrypt {
    //% block="encrypt %text with key %key"
    //% weight=100
    //% text.defl="Hello!"
    //% key.defl=1234
    export function encrypt(text : string, key : number) : string {
        let fail : string = ''
        const out : string = text.split('').map(char => {
            if (fail) return ''
            const charCode = char.charCodeAt(0)
            if (charCode < 32 || charCode > 126) {
                fail = char
                return ''
            }
            return String.fromCharCode((charCode - 32 + key) % 93 + 32)
        }).join('')

        return fail ? 'Unexpected character ' + fail : out
    }

    //% block="decrypt %text with key %key"
    //% text.defl="a!((+:"
    //% key.defl=1234
    export function decrypt(text : string, key : number) : string {
        let fail : string = ''
        const out : string = text.split('').map(char => {
            if (fail) return ''
            let charCode = char.charCodeAt(0)
            if (charCode < 32 || charCode > 126) {
                fail = char
                return ''
            }
            charCode -= key

            while (charCode < 32) {
                charCode += 93
            }

            return String.fromCharCode(charCode)
        }).join('')

        return fail ? 'Unexpected character ' + fail : out
    }
}

//32 126
