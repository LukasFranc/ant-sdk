# ANT-SDK (Shoptet Developers Kit)

Basic frontend tools for developing Shoptet projects

## Struktura:
`assets`
*  defaultní assety (LESS, JS, Fonts) shoptet šablon
*  zároveň se zde nachází složka dist pro nahrání vygenerovaných minifikovancýh CSS a JS souborů
*  !! POZOR !! zde nic neupravovat a nemazat
        
`theme`
* složka pro projektové změny LESS, JS, IMGS, překlady atp.


## Rozjetí prostředí:

1. Ve složce `theme` spustit příkaz
```shell
npm install -g gulp
```

2. ve stejné složce spustit
```shell
npm install
```

## Vytvoření finálních assetů pro nahrání na FTP

POZOR: Pokud víme, že na projektu bude pracovat více vývojářů je potřeba, aby každý vývojář si vytvářel vlastní assety:


**Postup v případě jednoho vývojáře:**

ve složce `theme` spustit příkaz:
```shell
gulp production
```

Do složky `assets` v rootu přibude složka `dist`, do které je potřeba nahrát fonty z šablony, kteoru upravujeme `assets/XX/fonts`, kde 'XX' je číslo šablony.

Vytvořenou složku `dist` kompletně nahrajeme z její pozice na FTP projektu


**Postup v případě více vývojářů:**

ve složce `theme` spustit příkaz:
```shell
gulp production --developer 'Přijmení nebo iniciály bez diakritiky a malými písmeny'
```
Do složky `assets` v rootu přibude složka `dist'Přijmení nebo iniciály bez diakritiky a malými písmeny'`, do které je potřeba nahrát fonty z šablony, kteoru upravujeme `assets/XX/fonts`, kde 'XX' je číslo šablony.

Vytvořenou složku `dist'Přijmení nebo iniciály bez diakritiky a malými písmeny'` kompletně nahrajeme z její pozice na FTP projektu

Nyní je potřeba v editoru administrace shoptetu vložit následující [javascriptové kódy](https://git.antstudio.cz/snippets/55)

Aby se správně načítali developerovo assety je potřeba nastavit následující cookie v konzoli prohlížeče:
```shell
shoptet.cookie.create('developer','Přijmení nebo iniciály bez diakritiky a malými písmeny' , {days: 1000});
```
pro automatické vytváření verzí časových značek assetů (?v='...')
```shell
shoptet.cookie.create('debugTimestamp', 1, {days: 1000});
```

## Překlady
ANT projektové překlad textů slouží k překladu řetězců, či částí, které se přidávájí programově do shoptetu např. přidání tlačítka do stránky atp. Aby bylo možné mít editovat toto tlačítko pro jazykové mutace je vytvořen systém překladů.

**Postup při vytváření překladů:**

v JS souborech pro překlad stringu použijte metodu _t() , která má tři paramtery a to řetězec pro přeložení, context a jazyk (iso) překladu. Context není povinný parametr, slouží k odlišení případně dvou stejných řetězců, které mají v daném kontextu odlišný překlad. Jazyk také není povinný parametr a slouží k určení návratového jazyku překladu.
Příklad použití:
```shell
const preklad = _t('Více informací', 'eshop card btn', 'en');
```
Tímto jsme definovali překladači, aby nám vrátil překlad pro řetězec `Více informací`, s contextem `eshop card btn` a v pro jazyk `en` tedy angličtinu.

Následně je potřeba zanést řetězec do překladového `json` souboru nacházející se ve složce `theme/assets/data`. Struktura tohoto souboru by měla být následující:
```shell
{
  "Text k přeložení #context překladu#" : {
    "en" : "Překlad"
  },
  "Další text k přeložení #context překladu#" : {
      "en" : "Překlad"
  }
}
```

**Upload překladu do produkce:**

Ve složce `theme/assets/data` se nachází složka `locale` a v ní `*.json` soubory, ve kterých se nachází projektové překlady.

Složku  `locale` je potřeba nahrát na FTP projektu ve stejné struktuře jako v projektu tj. `theme/assets/data/locale` do složky `/user/documents/`. Finální cesta by měla tedy vypadat `/user/documents/theme/assets/data/locale/`

Jakmile máme překladové soubory na FTP projektu, je potřeba v editoru administrace shoptetu v části hlavičky aktualizovat javascriptovou constantu `translationFileVersion` o +1 a tím vytvořit novou verzi překladových souborů.

Překlady se poté uživateli načítají z překladových souborů a ukládají se do lokálního uložiště prohlížeče. Pokud se nezmění verze překladů, překlady se uživatteli již znocu nenačítají.





