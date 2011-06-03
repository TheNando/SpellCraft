var DICT_FILE_URL = "dict/dict.txt";

var Dictionary =
{
    dict : {},
    init : function()
	{
        $.get(DICT_FILE_URL,
        function(data)
        {
            var words = data.split( "\n" );
            var i;
            
            // Initialize empty arrays
            for (i = 2; i <= Math.max(LetterGrid.Columns, LetterGrid.Rows); i++ )
                Dictionary.dict[i] = " ";
            
            for (i = 0; i < words.length; i++ )
            {
                words[i] = words[i].replace("\r","");
                Dictionary.dict[words[i].length] += words[i] + " ";
            }
        });
    },
    lookUp: function(word)
    {
        return (Dictionary.dict[word.length].indexOf(" " + word + " ") != -1);
    }
};

$(function()
{
    Dictionary.init();
});