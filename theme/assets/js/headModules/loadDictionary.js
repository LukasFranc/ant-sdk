const loadDictionary = async () => {
    const iso = dataLayer[0].shoptet['language']
    const translationVersion = translationFileVersion !== undefined ? translationFileVersion : '1'

    const getDictionaryFileUrl = (isocode, dictionaryVersion = '1') => {
        const filesUrls = {
            sk : '/user/documents/theme/assets/data/locale/sk.json?v=' + dictionaryVersion,
            cs : '/user/documents/theme/assets/data/locale/cs.json?v=' + dictionaryVersion,
            de : '/user/documents/theme/assets/data/locale/de.json?v=' + dictionaryVersion,
            en : '/user/documents/theme/assets/data/locale/en.json?v=' + dictionaryVersion
        }
        return filesUrls[isocode]
    }

    const dictionaryUrl = getDictionaryFileUrl(iso,translationVersion)


    const getTranslations = async (dictionaryUrl) => {
        const data = await fetch(dictionaryUrl)
        if (!data.ok) {
            const message = `An error has occured: ${data.status}`;
            throw new Error(message);
        } else {
            return await data.json()
        }
    }

    const actualizeDictionary = async () => {
        await getTranslations(dictionaryUrl).then(response => window.localStorage.setItem('translationDictionary', JSON.stringify(response)))
    }

    const setConfiguration = async (diffVersion = false) => {
        const translationContent = {
            state             : iso,
            version           : translationVersion,
            dictionaryFileUrl : dictionaryUrl
        }
        if (!window.localStorage.getItem('translationSettings') || diffVersion) {
            window.localStorage.setItem('translationSettings', JSON.stringify(translationContent))
            await actualizeDictionary().catch(error => console.log(error))
        }
    }

    if (!window.localStorage.getItem('translationSettings')) {
        await setConfiguration()
    }

    if (translationVersion !== JSON.parse(localStorage.getItem('translationSettings')).version || JSON.parse(localStorage.getItem('translationSettings')).state !== iso ) {
        await setConfiguration(true)
    }
}

loadDictionary()