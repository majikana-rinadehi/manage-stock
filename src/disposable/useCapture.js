import html2canvas from 'html2canvas'

export default function useCapture(){

    /**
     * ```ShoppingList.vue``` で表示される
     * 買い物メモのhtml要素を```canvas```要素にし、
     * ```<div id="result">``` に```canvas```要素を埋め込みます。
     * ```<div id="result">``` にすでに```canvas```要素があった場合上書きします.
     */
    const captureMemoItems = () => {

        const targetElement = document.getElementById('capture-items-target')
        const resultElement = document.getElementById('result')

        html2canvas(targetElement,{scrollY: -window.scrollY})
            .then((canvas) => {
                if (resultElement.hasChildNodes()){
                    resultElement.removeChild(document.getElementById('canvas'))
                }
                canvas.setAttribute('id','canvas')
                canvas.setAttribute('class','mx-auto')
                resultElement.appendChild(canvas)
            })
    }

    const deleteCapture = () => {
        const resultElement = document.getElementById("result")

        if (resultElement.hasChildNodes()){
            resultElement.removeChild(document.getElementById('canvas'))
        } 
    }
    return { captureMemoItems, deleteCapture }
}