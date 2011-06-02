// Global variables
var dragging = false;
var dragged = false;
var cell_origin = { x : null, y : null };
var cell_offset = { x : null, y : null };
var cell_first = { x : null, y : null };
var cell_first_selected = false;
var LetterGrid;

// Callback functions
var cb_MouseDown = function(evt)
{
    dragging = true;
    dragged = false;
    cell_origin.x = $(this).attr("col");
    cell_origin.y = $(this).attr("row");
};

var cb_MouseUp = function(evt)
{
    dragging = false;

    if(dragged)
        return;

    var cell = $('.GridCell[col=x][row=y]'.replace('x',cell_origin.x).replace('y',cell_origin.y));
    var tmpWord = '';
    
    if(cell_first_selected) // A cell has already been selected, so do some checks
    {
        if(cell.hasClass("Selected")) // Clicking on a previously selected cell
        {            
            cell.removeClass('Selected');
            cell_first_selected = false;
        } else { // Second cell has not previously been selected
            // If cell isn't in line with previously selects cell, do nothing
            if(cell_origin.x == cell_first.x)
            {
                for (var y = Math.min(cell_origin.y, cell_first.y); y <= Math.max(cell_origin.y, cell_first.y); y++)
                    tmpWord += $('.GridCell[col=x][row=y]'.replace('x',cell_origin.x).replace('y', y)).addClass('Selected').text();
                cell_first_selected = false;
                LetterGrid.addWord(tmpWord);
            } else if(cell_origin.y == cell_first.y) {
                for(var x = Math.min(cell_origin.x, cell_first.x); x <= Math.max(cell_origin.x, cell_first.x); x++)
                    tmpWord += $('.GridCell[col=x][row=y]'.replace('x',x).replace('y', cell_origin.y)).addClass('Selected').text();
                cell_first_selected = false;
                LetterGrid.addWord(tmpWord);
            } else {
                return;
            }
        }
    } else { // Nothing selected, so no matter what you click, select it
        cell.addClass('Selected');
        cell_first_selected = true;
        cell_first.x = cell_origin.x;
        cell_first.y = cell_origin.y;
    }
};

var cb_MouseMove = function(evt)
{
    if(!dragging)
        return;
    
    var curX = Math.floor((evt.clientX - cell_offset.x) / cell_size.width);
    var curY = Math.floor((evt.clientY - cell_offset.y) / cell_size.height);

    if(curX != cell_origin.x)
    {
        LetterGrid.shift(cell_origin, 'Horizontal', curX - cell_origin.x);
        cell_origin.x = curX;
        dragged = true;
    } else if(curY != cell_origin.y) {
        LetterGrid.shift(cell_origin, 'Vertical', curY - cell_origin.y);
        cell_origin.y = curY;
        dragged = true;
    }
};

LetterGrid =
{
	initialized	: false,	
    Columns : 7,
    Rows : 7,
    Grid : [],
    GridHTML : null,
    Words : null,
    init: function()
	{
        if(LetterGrid.initialized)
		{
			alert('ALREADY initialized.');
			return false;
		}
        
        //var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        //var rand = 0;
        
        LetterGrid.Grid = [];
        
        // Build grid
        for(var x = 0; x < LetterGrid.Columns; x++)
		{
            LetterGrid.Grid[x] = [];
            for (var y = 0; y < LetterGrid.Rows; y++)
            {
                LetterGrid.Grid[x][y] = Letters.getRandomLetter();
                
                //// Legacy
                //rand = Math.floor(Math.random() * chars.length);
                //LetterGrid.Grid[x][y] = chars.substring(rand, rand+1);
            }
        }
        LetterGrid.toHtml();
    },
    toHtml: function()
    {
        LetterGrid.Words = [];
        $('#stats').html('');
        LetterGrid.GridHTML = '';

        // Build HTML
        for (var y = 0; y < LetterGrid.Rows; y++)
		{
            LetterGrid.GridHTML += '<div class="GridRow">\n';

            for(var x = 0; x < LetterGrid.Columns; x++)
            {
                LetterGrid.GridHTML += '<div class="GridCell" col={x} row={y}>'.replace("{x}", x).replace("{y}", y) + LetterGrid.Grid[x][y] + '</div>';
            }
            LetterGrid.GridHTML += '</div>\n';
        }
        
        $('#lettergrid').html(LetterGrid.GridHTML).mousemove(cb_MouseMove);
        $('.GridCell').mousedown(cb_MouseDown).mouseup(cb_MouseUp);
    },
    shift: function(origin, direction, offset)
    {
        // Letter to save for swap
        var save = '';
        var i;

        switch(direction)
        {
        case 'Horizontal':
            if(offset > 0)
            {
                // If distance is positive, save the right most letter...
                save = LetterGrid.Grid[LetterGrid.Columns - 1][origin.y];
                
                // ...and push right from right to left
                for (i = LetterGrid.Columns - 1; i >= 0; i--)
                    if(i === 0)
                        LetterGrid.Grid[i][origin.y] = save;
                    else
                        LetterGrid.Grid[i][origin.y] = LetterGrid.Grid[i - 1][origin.y];
            } else {
                // If distance is negative, save the left most letter...
                save = LetterGrid.Grid[0][origin.y];
                
                // ...and push left from left to right
                for (i = 0; i < LetterGrid.Columns; i++)
                    if(i == LetterGrid.Columns - 1)
                        LetterGrid.Grid[i][origin.y] = save;
                    else
                        LetterGrid.Grid[i][origin.y] = LetterGrid.Grid[i + 1][origin.y];
            }            
            break;
        case 'Vertical':
            if(offset > 0)
            {
                // If distance is negative, save the bottom most letter...
                save = LetterGrid.Grid[origin.x][LetterGrid.Rows - 1];
                
                // ...and push down from bottom to top
                for (i = LetterGrid.Rows - 1; i >= 0; i--)
                    if(i === 0)
                        LetterGrid.Grid[origin.x][i]= save;
                    else
                        LetterGrid.Grid[origin.x][i] = LetterGrid.Grid[origin.x][i - 1];
            } else {
                // If distance is positive, save the top most letter...
                save = LetterGrid.Grid[origin.x][0];
                
                // ...and push up from top to bottom
                for (i = 0; i < LetterGrid.Rows; i++)
                    if(i == LetterGrid.Rows - 1)
                        LetterGrid.Grid[origin.x][i] = save;
                    else
                        LetterGrid.Grid[origin.x][i] = LetterGrid.Grid[origin.x][i + 1];
            }
            break;
        }
        
        LetterGrid.toHtml();
        return;
    },
    addWord: function(word)
    {
        LetterGrid.Words.push(word.toLowerCase());
        LetterGrid.checkWords();
    },
    checkWords: function()
    {
        $('#stats').html('');
        for (i = 0; i < LetterGrid.Words.length; i++)
            $('#stats').append('<div>' + LetterGrid.Words[i] + ' is' + (Dictionary.lookUp(LetterGrid.Words[i]) ? '' : ' NOT') + ' a valid word : ' + Letters.getWordValue(LetterGrid.Words[i]) + ' points.</div>');
    }
};

$(function()
{
    LetterGrid.init();  
    
    cell_offset = { x : $('.GridCell:first').offset().left, y : $('.GridCell:first').offset().top };
    cell_size = {   width : $('.GridCell:first[col=1]').offset().left - cell_offset.x,
                    height : $('.GridCell:first[row=1]').offset().top - cell_offset.y };
});
