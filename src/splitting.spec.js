describe('textNodesUnder', function() {
    it('should return empty array if there is no text nodes', function() {
        var element = $('<p><input type="text" /><b></b></p>')[0];
        var actual = textNodesUnder(element);
        expect(actual).toEqual([]);
    });

    it('should return all text nodes', function() {
        var element = $('<p>abc d <input type="text" />   efg<b>hijk   lmnop</b></p>')[0];
        var actual = $.map(textNodesUnder(element), function(x) {
            return x.textContent;
        });
        expect(actual).toEqual(['abc d ', '   efg', 'hijk   lmnop']);
    });
});
