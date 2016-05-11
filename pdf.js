// In-Line PDF Preview Plugin. http://github.com/clonemeagain/pdf_preview
$(document).on('ready pjax:success',function() {
    // Only pages with a ticket_id will even work.. so, let's look for
    // the hidden field named "id" and get it's value.
    // not such a big deal now that the plugin determines it's inclusion.. but you never know with
    // pjax..
    var ticketID = $("input[name='id']").val();
    if (ticketID > 0) {
	function addElement($source, details, content) {
	    // Each new element should be independant..
	    // Ideally this wrapper would be in a stylesheet of it's own.
	    var wrapper = $('<div class="embedded" style="max-width: 100%; width: 100%; height: auto; padding: 4px; border: 1px solid #C3D9FF; margin-bottom: 10px !important;">');
	    wrapper.append('<span class="attachment-description"><a href="' + details.href + '">'
		    + details.name + '</a>' + $source.siblings('em').first()[0].innerHTML
		    + ':</span><br />');
	    wrapper.append(content);
	    details.where.append(wrapper);
	    console.log("Inserted attached " + details.ext + " document: " + details.name);
	    $source.siblings('em').first().remove();
	    $source.remove();

	}
	function filterHTML(html) {
	    // Uses browser to prevent all html'ness from a piece of text.
	    // http://stackoverflow.com/a/9251169 :-)
	    var escape = document.createElement('textarea');
	    escape.textContent = html;
	    return escape.innerHTML;
	}
	function textHandler(source, details) {
	    $.ajax({
		url : details.href,
		dataType : (details.ext == 'txt') ? "text" : "html",
			success : function(data) {
			    addElement(source, details, filterHTML(data));
			},
	    });
	}
	function pdfHandler(source, details) {
	    // TODO: convert the sizes to admin configurable settings... if anyone asks
	    addElement(source,details,
		    '<object title="'+ details.name+ '" data="'+ details.url
		    + '" type="application/pdf" height="1000px" width="100%"><b>This browser does not support PDFs</b>. Please download the PDF to view it: <a href="'
		    + details.href + '">' + details.name + '</a></object>');
	}
	function imageHandler(source, details) {
	    // Whatever the image size is.. use that
	    // Note the CSS in the wrapper, prevents it overflowing the div.
	    addElement(source, details, '<img alt="' + details.name + '" src="' + details.url + '" />');
	}
	/**
	 * Check for attachments
	 */
	$('.file').each(function() {
	    // Prepare some common data for each attachment.
	    var source = $(this), details = {
		where : source.closest('tbody').find('.thread-body'),
		name : source.text(),
		href : source.attr('href'),
		url : source.attr('href') + '&disposition=inline',
		ext : source.text().substr(source.text().lastIndexOf('.') + 1).toLowerCase()
	    };

	    // Compare the extension
	    switch (details.ext) {
	    case 'pdf':
		return pdfHandler(source, details);
	    case 'bmp':
	    case 'svg':
	    case 'gif':
	    case 'png':
	    case 'jpg':
	    case 'jpeg':
		return imageHandler(source, details);
	    case 'txt':
	    case 'html':
	    default:
		console.log("Unable to add " + details.name);
	    }
	});
    }
});
