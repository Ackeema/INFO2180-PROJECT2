

   
// end of game notification
    var pieces;
    var blink;
    var timer;
    var emptyLeft;
    var emptyTop;

window.onload = function()
{
   
    var puzzleArea = document.getElementById('puzzlearea');
    
    pieces = puzzleArea.getElementsByTagName('div');

    for (var i=0; i<pieces.length; i++)
    {
        pieces[i].style.backgroundImage="url('background.jpg')";
        pieces[i].className = 'puzzlepiece';
        pieces[i].style.left = (i%4*100)+'px';
        pieces[i].style.top = (parseInt(i/4)*100) + 'px';
        pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-' + pieces[i].style.top;
        pieces[i].onmouseover = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        pieces[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        pieces[i].onclick = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (Finish())
                {
                    youWin();
                }
                return;
            }
        };
    }

    emptyTop = '300px';
    emptyLeft = '300px';

    var shufflebutton = document.getElementById('shufflebutton');
    shufflebutton.onclick = function()
    {

       for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var tmp = calcUp(emptyTop, emptyLeft);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }
            if (rand == 1)
            {
                var tmp = calcDown(emptyTop, emptyLeft);
                if ( tmp != -1) 
                {
                    swap(tmp);
                }
            }

            if (rand == 2)
            {
                var tmp = calcLeft(emptyTop, emptyLeft);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }

            if (rand == 3)
            {
                var tmp = calcRight(emptyTop, emptyLeft);
                if (tmp != -1)
                {
                    swap(tmp);
                }
            }
        }
    };
};

function move(position)
{
    if (calcLeft(emptyTop, emptyLeft) == (position-1))
    {
        return true;
    }

    if (calcDown(emptyTop, emptyLeft) == (position-1))
    {
        return true;
    }

    if (calcUp(emptyTop, emptyLeft) == (position-1))
    {
        return true;
    }

    if (calcRight(emptyTop, emptyLeft) == (position-1))
    {
        return true;
    }
}
function Blink()
{
    blink --;
    if (blink == 0)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FFFFFF";
        alert('You Win!');
        return;
    }
    if (blink % 2)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#00FF00";    
    }
    else
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FF0000";
    }
    timer = setTimeout(Blink, 100);
}

function youWin()
{
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
    blink = 10;
    timer = setTimeout(Blink, 100);
}

function Finish()
{
    var flag = true;
    for (var i = 0; i < pieces.length; i++) {
        var y = parseInt(pieces[i].style.top);
        var x = parseInt(pieces[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

function calcLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var z = 0; z < pieces.length; z++) 
        {
            if (parseInt(pieces[z].style.left) + 100 == xx && parseInt(pieces[z].style.top) == yy)
            {
                return z;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

function calcRight(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var c =0; c<pieces.length; c++){
            if (parseInt(pieces[c].style.left) - 100 == xx && parseInt(pieces[c].style.top) == yy) 
            {
                return c;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function calcUp(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<pieces.length; i++)
        {
            if (parseInt(pieces[i].style.top) + 100 == yy && parseInt(pieces[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

function calcDown(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var d=0; d<pieces.length; d++)
        {
            if (parseInt(pieces[d].style.top) - 100 == yy && parseInt(pieces[d].style.left) == xx) 
            {
                return d;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function swap(you)
{
    var temp = pieces[you].style.top;
    pieces[you].style.top = emptyLeft;
    emptyLeft = temp;

    temp = pieces[you].style.left;
    pieces[you].style.left = emptyTop;
    emptyTop = temp;
}