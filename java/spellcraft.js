// Global variables
var dragging = false;
var dragged = false;
var cell_origin = { x : null, y : null };
var cell_offset = { x : null, y : null };
var cell_size = { height : null, width : null };
var cell_first = { x : null, y : null };
var cell_first_selected = false;
var LetterGrid;

// Callback functions
var cb_MouseDown = function(evt)
{
    dragging = true;
    dragged = false;

    cell_origin.x = Math.floor((evt.clientX - cell_offset.x) / cell_size.width);
    cell_origin.y = Math.floor((evt.clientY - cell_offset.y) / cell_size.height);
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
    } else if (curY != cell_origin.y) {
        LetterGrid.shift(cell_origin, 'Vertical', curY - cell_origin.y);
        cell_origin.y = curY;
        dragged = true;
    }
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

LetterGrid =
{
	initialized	: false,	
    Columns : 7,
    Rows : 7,
    Grid : [],
    GridHTML : null,
    Words : [],
    init: function()
	{
        if(LetterGrid.initialized)
		{
			alert('ALREADY initialized.');
			return false;
		}
        
        LetterGrid.Grid = [];
        
        // Build grid
        var x, y;
        for(x = 0; x < LetterGrid.Columns; x++)
		{
            LetterGrid.Grid[x] = [];
            for (y = 0; y < LetterGrid.Rows; y++)
            {
                LetterGrid.Grid[x][y] = Letters.getRandomLetter();
            }
        }

        LetterGrid.toHtml();
        
        $('#lettergrid').html(LetterGrid.GridHTML)
            .mousemove(cb_MouseMove)
            .mousedown(cb_MouseDown)
            .mouseup(cb_MouseUp);
            
        cell_offset = { x : $('.GridCell:first').offset().left, y : $('.GridCell:first').offset().top };
        
        cell_size = {   width : $('.GridCell:first').outerWidth() + 4,
                        height : $('.GridCell:first').outerHeight() + 4 };

        // Size grid to fit everything
        $('#lettergrid').css("width", cell_size.width * LetterGrid.Columns);
        $('#lettergrid').css("height", cell_size.height * LetterGrid.Rows);
        
        // Place letters onto grid (animation)
        for(x = 0; x < LetterGrid.Columns; x++)
        {
            for (y = 0; y < LetterGrid.Rows; y++)
            {
                $('.GridCell[col=x][row=y]'.replace('x', x).replace('y', y))
                    .animate({  "left": cell_offset.x + cell_size.width * x,
                                "top": cell_offset.y + cell_size.height * y }, 500, 'swing');
            }
        }
    },
    toHtml: function()
    {
        LetterGrid.GridHTML = '';

        // Build HTML
        for (var y = 0; y < LetterGrid.Rows; y++)
		{
            for(var x = 0; x < LetterGrid.Columns; x++)
            {
                LetterGrid.GridHTML += '<div class="GridCell" col={x} row={y}><span class="Letter">'.replace("{x}", x).replace("{y}", y) + LetterGrid.Grid[x][y] + '</span></div>';
            }
        }
    },
    shift: function(origin, direction, offset)
    {
        // Letter to save for swap
        var save = '';
        var i;
        var cell;
        
        // Clear selected words
        cell_first_selected = false;
        LetterGrid.Words = [];
        $('#stats').html('');

        switch(direction)
        {
        case 'Horizontal':
            if(offset > 0)
            {
                // If distance is positive, save the right most letter...
                save = LetterGrid.Grid[LetterGrid.Columns - 1][origin.y];
                
                // ...and push right from right to left
                for (i = LetterGrid.Columns - 1; i >= 0; i--)
                {
                    cell = $('.GridCell[col=x][row=y]'.replace('x', i).replace('y',origin.y));
                    
                    if(i === 0)
                        LetterGrid.Grid[i][origin.y] = save;
                    else
                        LetterGrid.Grid[i][origin.y] = LetterGrid.Grid[i - 1][origin.y];
                    
                    cell.attr("new_col", (i + 1) % LetterGrid.Columns);
                }
            } else {
                // If distance is negative, save the left most letter...
                save = LetterGrid.Grid[0][origin.y];
                
                // ...and push left from left to right
                for (i = 0; i < LetterGrid.Columns; i++)
                {
                    cell = $('.GridCell[col=x][row=y]'.replace('x', i).replace('y',origin.y));
                    
                    if(i === LetterGrid.Columns - 1)
                        LetterGrid.Grid[i][origin.y] = save;
                    else
                        LetterGrid.Grid[i][origin.y] = LetterGrid.Grid[i + 1][origin.y];
                    
                    cell.attr("new_col", (i - 1 === -1) ? LetterGrid.Columns - 1 : i - 1);
                }
            }

            // Animate and reset grid afterwards
            $('.GridCell[row=y]'.replace('y',origin.y)).each(
                function()
                {
                    $(this).animate({ left: cell_offset.x + cell_size.width * $(this).attr("new_col") }, 100);
                    $(this).attr("col", $(this).attr("new_col") );
                }
            );
            
            break;
        case 'Vertical':
            if(offset > 0)
            {
                // If distance is negative, save the bottom most letter...
                save = LetterGrid.Grid[origin.x][LetterGrid.Rows - 1];
                
                // ...and push down from bottom to top
                for (i = LetterGrid.Rows - 1; i >= 0; i--)
                {
                    cell = $('.GridCell[col=x][row=y]'.replace('x', origin.x).replace('y',i));
                    
                    if(i === 0)
                        LetterGrid.Grid[origin.x][i]= save;
                    else
                        LetterGrid.Grid[origin.x][i] = LetterGrid.Grid[origin.x][i - 1];
                        
                    cell.attr("new_row", (i + 1) % LetterGrid.Rows);
                }
            } else {
                // If distance is positive, save the top most letter...
                save = LetterGrid.Grid[origin.x][0];
                
                // ...and push up from top to bottom
                for (i = 0; i < LetterGrid.Rows; i++)
                {
                    cell = $('.GridCell[col=x][row=y]'.replace('x', origin.x).replace('y',i));
                    
                    if(i == LetterGrid.Rows - 1)
                        LetterGrid.Grid[origin.x][i] = save;
                    else
                        LetterGrid.Grid[origin.x][i] = LetterGrid.Grid[origin.x][i + 1];
                        
                    cell.attr("new_row", (i - 1 === -1) ? LetterGrid.Rows - 1 : i - 1);
                }
            }

            // Animate and reset grid afterwards
            $('.GridCell[col=x]'.replace('x',origin.x)).each(
                function()
                {
                    $(this).animate({ top: cell_offset.y + cell_size.height * $(this).attr("new_row") }, 100);
                    $(this).attr("row", $(this).attr("new_row") );
                }
            );

            break;
        }
        
        LetterGrid.toHtml();
        $('.Selected').removeClass('Selected');
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
});
