function showDivComposable(){
    setTimeout(() => {
        let getDiv = document.querySelectorAll('.show-screen')
        getDiv.forEach(div => {
            let position = div.getBoundingClientRect();
            if (position.top <= window.innerHeight - 100) {
                div.style.top = '0em';
                div.style.opacity = 1
            }
        })
    }, 100);
}
function hideAllDiv(){
    let getDiv = document.querySelectorAll('.show-screen')
    getDiv.forEach(div => {
        div.style.opacity = 0
        div.style.top = '4em';
    })
}
export { showDivComposable, hideAllDiv}