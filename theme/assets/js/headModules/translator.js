const _t = (toTranslate, context = '', stateIso = '') => {

    const settings = JSON.parse(localStorage.getItem('translationSettings'))
    const iso = settings ? settings.state : stateIso !== '' ? stateIso : 'cs'
    const dictionaryUrl = settings ? settings.dictionaryFileUrl : 'undefined'

    let translation = toTranslate

    const getTranslation = (toTranslate, context) => {
        const dictionary = JSON.parse(localStorage.getItem('translationDictionary'))
        if (dictionary) {
            if (context !== '') {
                for (let key in dictionary) {
                    if (key.includes(toTranslate) && key.includes('#' + context + '#')) {
                        // console.log(dictionary[key][iso])
                        translation = dictionary[key][iso] !== '' && dictionary[key][iso] !== undefined ? dictionary[key][iso] : translation
                        break
                    }
                }
            } else if (dictionary[toTranslate] !== undefined) {
                translation = dictionary[toTranslate][iso] !== undefined ? dictionary[toTranslate][iso] : translation
            }
        }

        //console.log(`Pro překlad: ${toTranslate} v contextu: ${context} je výstup: ${translation}`)
        return translation
    }

    if (dictionaryUrl) {
      return getTranslation(toTranslate, context)
    } else {
        return translation
    }
}

