import html2canvas from 'html2canvas'

export default function useCapture(){
    
    /**
     * ```ShoppingList.vue``` で表示される
     * 買い物メモのhtml要素を```canvas```要素にし、
     * ```<div id="result">``` に```canvas```要素を埋め込みます。
     * ```<div id="result">``` にすでに```canvas```要素があった場合上書きします.
     */
    const captureMemoItems = async () => {

        const targetElement = document.getElementById('capture-items-target')
        const resultElement = document.getElementById('result')

        await html2canvas(targetElement,{scrollY: -window.scrollY})
            .then((canvas) => {
                if (resultElement.hasChildNodes()){
                    resultElement.removeChild(document.getElementById('canvas'))
                }
                canvas.setAttribute('id','canvas')
                canvas.setAttribute('class','mx-auto border-4 border-gray-800')
                resultElement.appendChild(canvas)
            })
    }

    /**
     * id="result" の子要素の `canvas` を削除する
     */
    const deleteCapture = () => {
        const resultElement = document.getElementById("result")

        if (resultElement.hasChildNodes()){
            resultElement.removeChild(document.getElementById('canvas'))
        } 
    }

    /**
     * `canvas` 要素を画像としてダウンロードする
     * 参考: https://qiita.com/lookman/items/d93dd62a41f17a4d2de8
     * @param {HTMLElement | null} canvas `canvas` 要素
     * @param {string} fileName ファイル名  
     */
    const downloadCanvas = (canvas, fileName) => {
        const link = document.createElement("a")
        if (!canvas) return 
        link.href = canvas.toDataURL("image/png")
        link.download = fileName
        link.click()
    }
    return { captureMemoItems, deleteCapture, downloadCanvas }
}