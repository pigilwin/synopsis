import MarkDownIt from "markdown-it";
import MarkdownItHighlight from 'markdown-it-highlightjs';

/**
 * Load the converter and build the html
 */
const converter = new MarkDownIt({
    breaks: true,
    linkify: true
});
converter.configure('commonmark');
converter.use(MarkdownItHighlight);

export { converter };