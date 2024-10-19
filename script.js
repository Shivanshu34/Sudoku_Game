const block2 = document.querySelectorAll(".block2");
const start = document.querySelector(".start");
const quit = document.querySelector(".quit");
const sudoku = document.querySelector(".sudoku");
const h2 = document.querySelector(".side h2");
const inp = document.querySelectorAll("input");
const start2 = document.querySelector(".start2");
const front_p = document.querySelector(".front-page");
const h2_ = document.querySelector(".front-page h2");
const btn = document.querySelector(".front-page button");
const gif = document.querySelector(".gif");
const win = document.querySelector(".side img");
let isEnter = false;

let mySet = new Set();

start2.addEventListener("click",()=>
{
    front_p.style.width = "0vw";
    h2_.style.display = "none";
    btn.style.display = "none";
    gif.classList.add("remove");
});

for(el of block2)
    {
        let div = el.querySelector("div");
        let inp = div.querySelector("input");

        if(inp.disabled)
        {
            mySet.add(inp);
        }
    
    }

start.addEventListener("click",()=>
{
    sudoku.classList.remove("disabled");
    if(start.innerHTML.includes(`Reset`)){
        let txt = "Start the game";
        display(txt);
        win.style.width = "0rem";
        reset();
    }
          
        start.innerHTML = "Reset &nbsp; <i class='fa-solid fa-trash-arrow-up'></i>";
});

quit.addEventListener("click",()=>
{
    let txt = "Press Start to start the game!!";
    sudoku.classList.add("disabled");
    start.innerHTML = "Start &nbsp; <i class='fa-solid fa-play'></i>";
    display(txt);
    reset();
    win.style.width = "0rem";
    front_p.style.width = "100vw";
    h2_.style.display = "block";
    btn.style.display = "block";
    gif.classList.remove("remove");
});

for (let el of block2) {
    let div = el.querySelector("div");
    let inp = div.querySelector("input");
    
    inp.addEventListener("input", () => {
        let val = inp.value; 

        let id = div.getAttribute("class");
        let cl = inp.getAttribute("class");

        if(isEnter && (val > 0 || val < 9) && check(id, cl, val))
        {
            let txt = "Play your next move !!";
            display(txt);
            undisabled();
            isEnter = false;
        }

        if (val !== "") {
            val = parseInt(val, 10); 
            if (val < 1 || val > 9) {
                isEnter = true;
                let txt = "Enter a valid value";
                wrongAns(txt,id,cl);
            } else {
                if (!check(id, cl, val)) {
                    isEnter = true;
                    let txt = "Wrong!!"
                    wrongAns(txt,id,cl);
                } else {
                    if (check2()) {
                        hooray();
                    }
                }
            }
        }
    });
}

function check(id,cl,val)
{
      const bl = document.getElementsByClassName(`${id}`);
    //block
    for(let i = 0; i < 9; i++)
    {
        let cl2 = bl[i].querySelector("input").getAttribute("class");

        if(cl2 != cl  && bl[i].querySelector("input").value == val)
        {
            return false;
        }
    }

    //horizontal
    let cl_h1 = cl;
    let cl_v1 = cl;
    id = parseInt(id, 10);
    cl = parseInt(cl, 10);
    let bl_h2, bl_h3;

    if (id % 3 === 1) {
        bl_h2 = `0${id+1}`;
        bl_h3 = `0${id + 2}`;
    } else if (id % 3 === 2) {
        bl_h2 = `0${id-1}`;
        bl_h3 = `0${id + 1}`;
    } else {
        bl_h2 = `0${id-1}`;
        bl_h3 = `0${id - 2}`;
    }
    let cl_h2 = 0;
    let cl_h3 = 0;

    if(cl%3 == 1)
    {
        cl_h2 = cl+1;
        cl_h3 = cl+2;
    }
    if(cl%3 == 2)
    {
        cl_h2 = cl-1;
        cl_h3 = cl+1;
    }
    if(cl%3 == 0)
    {
        cl_h2 = cl-1;
        cl_h3 = cl-2;
    }

    for(el of block2)
    {
        let div = el.querySelector("div");
        if(div.getAttribute("class") == bl_h2 || div.getAttribute("class") == bl_h3)
        {
            let inp = div.querySelector("input");
            if(inp.getAttribute("class") == cl_h1 || inp.getAttribute("class") == cl_h2 || inp.getAttribute("class") == cl_h3)
            {
                if(inp.value == val)
                    return false;
            }
        }
    }

    // //vertical section
    let bl_v2 = 0;
    let bl_v3 = 0;
    if(id < 4)
    {
        bl_v2 = `0${id+3}`;
        bl_v3 = `0${id+6}`;
    }
    if(id > 3 && id < 7)
    {
        bl_v2 = `0${id-3}`;
        bl_v3 = `0${id+3}`;
    }
    if(id > 6)
    {
        bl_v2 = `0${id-3}`;
        bl_v3 = `0${id-6}`;
    }
    let cl_v2 = 0;
    let cl_v3 = 0;

    if(cl < 4)
    {
        cl_v2 = cl+3;
        cl_v3 = cl+6;
    }
    if(cl > 3 && cl < 7)
    {
        cl_v2 = cl+3;
        cl_v3 = cl-3;
    }
    if(cl > 6)
    {
        cl_v2 = cl-3;
        cl_v3 = cl-6;
    }

    for(el of block2)
    {
        let div = el.querySelector("div");
        if(div.getAttribute("class") == bl_v2 || div.getAttribute("class") == bl_v3)
        {
            let inp = div.querySelector("input");
            if(inp.getAttribute("class") == cl_v1 || inp.getAttribute("class") == cl_v2 || inp.getAttribute("class") == cl_v3)
            {
                if(inp.value == val)
                    return false;
            }
        }
    }

    return true;
}

function check2()
{
    for(el of block2)
    {
        let div = el.querySelector("div");
        let inp = div.querySelector("input");

        if(inp.value == "")
        {
            return false;
        }
    }

    return true;
}

function display(txt)
{
    h2.innerText = txt;
}

function wrongAns(txt,id,cl)
{
    h2.innerText = txt;
    disabled(id,cl);
}

function hooray()
{
    win.style.width = "10rem";
    h2.innerText = "You Won!!"; 
    disabled(11,11);
}

function disabled(id,cl)
{
    for(el of block2)
    {
        let div = el.querySelector("div");
        let inp = div.querySelector("input");

        if(div.getAttribute("class") != id || inp.getAttribute("class") != cl)
        {
            inp.disabled = true;
        }
    
    }
}

function undisabled()
{
    for(el of block2)
    {
        let div = el.querySelector("div");
        let inp = div.querySelector("input");

        if(!mySet.has(inp)){
            inp.disabled = false;
        }
    }
}

function reset()
{
    for(el of block2)
        {
            let div = el.querySelector("div");
            let inp = div.querySelector("input");
    
            if(!mySet.has(inp))
            {
                inp.value = "";
            }
        }
}