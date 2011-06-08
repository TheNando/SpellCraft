var letterDistribution_AllWords;
var letterDistribution_Scrabble;
var letterDistribution_SuperScrabble;
var letterDistribution_Equal;
var letterDistribution_DoubleVowelEqual;

var letterPointValue_Scrabble;

var Letters =
{
    RandomGenerator : null,
    init: function()
    {
        letterDistributions = letterDistribution_AllWords;
        letterPointValues = letterPointValue_Scrabble;
        Letters.RandomGenerator = Math;
        //RandomGenerator = new MersenneTwister();
    },
    getRandomLetter: function()
    {
        var rand = Letters.RandomGenerator.random();
        
        for ( letter in letterDistributions )
        {
            if (letterDistributions.hasOwnProperty(letter))
            {
                if(rand < letterDistributions[letter].distribution)
                    return letter;
            }
        }

        return 0;
    },
    getWordValue: function(word)
    {
        var sum = 0;
        for (var i = 0; i < word.length; i++)
            sum += letterPointValues[word.substring(i, i + 1)].pointValue;
            
        return sum;
    }
};

$(function()
{
    Letters.init();
});

// Letter distribution packs
letterDistribution_AllWords =
{
    'a' : { distribution : 0.083198 },
    'b' : { distribution : 0.107108 },
    'c' : { distribution : 0.141132 },
    'd' : { distribution : 0.183195 },
    'e' : { distribution : 0.299250 },
    'f' : { distribution : 0.315559 },
    'g' : { distribution : 0.344892 },
    'h' : { distribution : 0.370204 },
    'i' : { distribution : 0.439177 },
    'j' : { distribution : 0.442605 },
    'k' : { distribution : 0.458912 },
    'l' : { distribution : 0.513652 },
    'm' : { distribution : 0.543078 },
    'n' : { distribution : 0.596928 },
    'o' : { distribution : 0.658729 },
    'p' : { distribution : 0.689334 },
    'q' : { distribution : 0.691060 },
    'r' : { distribution : 0.761155 },
    's' : { distribution : 0.854031 },
    't' : { distribution : 0.908534 },
    'u' : { distribution : 0.946707 },
    'v' : { distribution : 0.956307 },
    'w' : { distribution : 0.969969 },
    'x' : { distribution : 0.973752 },
    'y' : { distribution : 0.995085 },
    'z' : { distribution : 1.000000 }
};

letterDistribution_Scrabble =
{
    'a' : { distribution : 0.091836 },
    'b' : { distribution : 0.112244 },
    'c' : { distribution : 0.132653 },
    'd' : { distribution : 0.173469 },
    'e' : { distribution : 0.295918 },
    'f' : { distribution : 0.316326 },
    'g' : { distribution : 0.346938 },
    'h' : { distribution : 0.367346 },
    'i' : { distribution : 0.459183 },
    'j' : { distribution : 0.469387 },
    'k' : { distribution : 0.479591 },
    'l' : { distribution : 0.520408 },
    'm' : { distribution : 0.540816 },
    'n' : { distribution : 0.602040 },
    'o' : { distribution : 0.683673 },
    'p' : { distribution : 0.704081 },
    'q' : { distribution : 0.714285 },
    'r' : { distribution : 0.775510 },
    's' : { distribution : 0.816326 },
    't' : { distribution : 0.877551 },
    'u' : { distribution : 0.918367 },
    'v' : { distribution : 0.938775 },
    'w' : { distribution : 0.959183 },
    'x' : { distribution : 0.969387 },
    'y' : { distribution : 0.989795 },
    'z' : { distribution : 1.000000 }
};

letterDistribution_SuperScrabble =
{
    'a' : { distribution : 0.081632 },
    'b' : { distribution : 0.102040 },
    'c' : { distribution : 0.132653 },
    'd' : { distribution : 0.173469 },
    'e' : { distribution : 0.295918 },
    'f' : { distribution : 0.316326 },
    'g' : { distribution : 0.341836 },
    'h' : { distribution : 0.367346 },
    'i' : { distribution : 0.433673 },
    'j' : { distribution : 0.443877 },
    'k' : { distribution : 0.454081 },
    'l' : { distribution : 0.489795 },
    'm' : { distribution : 0.520408 },
    'n' : { distribution : 0.586734 },
    'o' : { distribution : 0.663265 },
    'p' : { distribution : 0.683673 },
    'q' : { distribution : 0.693877 },
    'r' : { distribution : 0.760204 },
    's' : { distribution : 0.811224 },
    't' : { distribution : 0.887755 },
    'u' : { distribution : 0.923469 },
    'v' : { distribution : 0.938775 },
    'w' : { distribution : 0.959183 },
    'x' : { distribution : 0.969387 },
    'y' : { distribution : 0.989795 },
    'z' : { distribution : 1.000000 }
};

letterDistribution_Equal =
{
    'a' : { distribution : 0.038461 },
    'b' : { distribution : 0.076923 },
    'c' : { distribution : 0.115384 },
    'd' : { distribution : 0.153846 },
    'e' : { distribution : 0.192307 },
    'f' : { distribution : 0.230769 },
    'g' : { distribution : 0.269230 },
    'h' : { distribution : 0.307692 },
    'i' : { distribution : 0.346153 },
    'j' : { distribution : 0.384615 },
    'k' : { distribution : 0.423076 },
    'l' : { distribution : 0.461538 },
    'm' : { distribution : 0.499999 },
    'n' : { distribution : 0.538461 },
    'o' : { distribution : 0.576923 },
    'p' : { distribution : 0.615384 },
    'q' : { distribution : 0.653846 },
    'r' : { distribution : 0.692307 },
    's' : { distribution : 0.730769 },
    't' : { distribution : 0.769230 },
    'u' : { distribution : 0.807692 },
    'v' : { distribution : 0.846153 },
    'w' : { distribution : 0.884615 },
    'x' : { distribution : 0.923076 },
    'y' : { distribution : 0.961538 },
    'z' : { distribution : 1.000000 }
};

letterDistribution_DoubleVowelEqual =
{
    'a' : { distribution : 0.064516 },
    'b' : { distribution : 0.096774 },
    'c' : { distribution : 0.129032 },
    'd' : { distribution : 0.161290 },
    'e' : { distribution : 0.225806 },
    'f' : { distribution : 0.258064 },
    'g' : { distribution : 0.290322 },
    'h' : { distribution : 0.322580 },
    'i' : { distribution : 0.387096 },
    'j' : { distribution : 0.419354 },
    'k' : { distribution : 0.451612 },
    'l' : { distribution : 0.483870 },
    'm' : { distribution : 0.516129 },
    'n' : { distribution : 0.548387 },
    'o' : { distribution : 0.612903 },
    'p' : { distribution : 0.645161 },
    'q' : { distribution : 0.677419 },
    'r' : { distribution : 0.709677 },
    's' : { distribution : 0.741935 },
    't' : { distribution : 0.774193 },
    'u' : { distribution : 0.838709 },
    'v' : { distribution : 0.870967 },
    'w' : { distribution : 0.903225 },
    'x' : { distribution : 0.935483 },
    'y' : { distribution : 0.967741 },
    'z' : { distribution : 1.000000 }
};


// Letter point value packs
letterPointValue_Scrabble =
{
    'a' : { pointValue :  1 },
    'b' : { pointValue :  3 },
    'c' : { pointValue :  3 },
    'd' : { pointValue :  2 },
    'e' : { pointValue :  1 },
    'f' : { pointValue :  4 },
    'g' : { pointValue :  2 },
    'h' : { pointValue :  4 },
    'i' : { pointValue :  1 },
    'j' : { pointValue :  8 },
    'k' : { pointValue :  5 },
    'l' : { pointValue :  1 },
    'm' : { pointValue :  3 },
    'n' : { pointValue :  1 },
    'o' : { pointValue :  1 },
    'p' : { pointValue :  3 },
    'q' : { pointValue : 10 },
    'r' : { pointValue :  1 },
    's' : { pointValue :  1 },
    't' : { pointValue :  1 },
    'u' : { pointValue :  1 },
    'v' : { pointValue :  4 },
    'w' : { pointValue :  4 },
    'x' : { pointValue :  8 },
    'y' : { pointValue :  4 },
    'z' : { pointValue : 10 }
};