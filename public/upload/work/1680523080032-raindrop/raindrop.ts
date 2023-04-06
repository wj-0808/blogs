let canvas: HTMLCanvasElement = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = screen.availWidth;
canvas.height = screen.availHeight;


const str: string[] = ['1','0'];
let chatArr = new Array(Math.ceil(canvas.width / 10)).fill(0);

const rain = (): void => {
    ctx.fillStyle = 'rgb(0,0,0,0.02)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = "10px";
    chatArr.forEach((item, index) => {
        let chat = str[Math.floor(Math.random() * str.length)];
        ctx.fillText(chat, index * 10, item + 10)
        chatArr[index] = item > canvas.height || item > Math.random() * 40000 ? 0 : item + 10
    })
}
setInterval(rain, 40)