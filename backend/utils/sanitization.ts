export function sanitizeText(input: string): string {
    // Remove unwanted HTML tags
    const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
    const tagOrComment = new RegExp(
        '<(?:'
        // Comment body.
        + '!--(?:(?:-*[^->])*--+|-?)'
        // Special "raw text" elements whose content should be elided.
        + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
        + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
        // Regular name
        + '|/?[a-z]'
        + tagBody
        + ')>',
        'gi');
    let oldInput;
    do {
        oldInput = input;
        input = input.replace(tagOrComment, '');
    } while (input !== oldInput);

    // Remove extra spaces
    input = input.replace(/\s+/g, ' ').trim();

    return input;
}