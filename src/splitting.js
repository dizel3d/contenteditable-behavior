function textNodesUnder(el){
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode())) a.push(n);
    return a;
}

function splitHtml(element, baseNode, baseOffset, extentNode, extentOffset) {
    var textNodes = textNodesUnder(this[0]);
    var range = [];
    var pos = 0;

    for (var i = 0; i < textNodes.length; ++i) {
        var node = textNodes[i];
        if (selection.baseNode === node) {
            range.push(pos + selection.baseOffset);
        }
        if (selection.extentNode === node) {
            range.push(pos + selection.extentOffset);
        }
        pos += node.length;
    }
    range.sort();

    var html = this.html();
    var result = [];
    var add = true;
    var start = 0;
    pos = 0;

    console.log(range);

    for (var end = 0; end < html.length; ++end) {
        if (html[end] === '<') {
            add = false;
        } else if (html[end] === '>') {
            add = true;
        } else if (add) {
            if (pos === range[0]) {
                result.push(html.substring(start, end));
                start = end;
                range.shift();
            }
            ++pos;
        }
        if (range.length === 0) {
            result.push(html.substring(end));
            break;
        }
    }
    return result;
}
