$(function()
{
    Dictionary.init();
});

var DICT_FILE_URL = "dict/dict.txt";

var Dictionary =
{
    dict : {},
    init: function()
	{
        $.get(DICT_FILE_URL,
        function(data)
        {
            var words = data.split( "\n" );

            // Initialize empty arrays
            for ( var i = 2; i <= Math.max(LetterGrid.Columns, LetterGrid.Rows); i++ )
                Dictionary.dict[i] = " ";
            
            for ( var i = 0; i < words.length; i++ )
                Dictionary.dict[words[i].length] += words[i] + " ";
        });
    },
    lookUp: function(word)
    {
        return (Dictionary.dict[word.length].indexOf(" " + word + " ") != -1);
    }
};
/*

    
    
    
    
function findWord( letters ) {
  var curLetters = letters.slice( 0 ), word = "";
  
  while ( curLetters.length > 2 ) {
    word = curLetters.join("");
  
    if ( dict[ word ] ) {
      return word;
    }

    curLetters.pop();
  }
}
*/